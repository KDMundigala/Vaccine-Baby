const cron = require('node-cron');
const mongoose = require('mongoose');
const User = require('../models/User');
const Baby = require('../models/Baby');
const Vaccine = require('../models/Vaccine');
const { sendEmail } = require('./mail_setup');
const { sendSMS } = require('./message_setup');
const notifyMail = async () => {
    const add_months = ['0', '2', '4', '6', '9', '12', '18', '36'];
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    try {
        // Get all babies
        const babies = await Baby.find({});
        console.log('Found babies:', babies.length);

        // Group babies by parent (userId)
        const babiesByParent = babies.reduce((acc, baby) => {
            const parentId = baby.userId.toString();
            if (!acc[parentId]) {
                acc[parentId] = [];
            }
            acc[parentId].push(baby);
            return acc;
        }, {});

        // Get all parents
        const parentIds = Object.keys(babiesByParent);
        const parents = await User.find({ _id: { $in: parentIds } });
        console.log('Found parents:', parents.length);

        // Send email to each parent about their babies with upcoming schedules
        for (const parent of parents) {
            try {
                const parentBabies = babiesByParent[parent._id.toString()];
                const babiesWithSchedules = [];

                // Check each baby for upcoming schedules
                for (const baby of parentBabies) {
                    const birthDate = new Date(baby.dateOfBirth);
                    const schedules = [];

                    // Calculate all schedule dates for this baby
                    for (const month of add_months) {
                        const scheduleDate = new Date(birthDate);
                        scheduleDate.setMonth(scheduleDate.getMonth() + parseInt(month));
                        
                        // Check if this schedule is for tomorrow
                        if (scheduleDate.toDateString() === tomorrow.toDateString()) {
                            schedules.push({
                                month: month,
                                date: scheduleDate
                            });
                        }
                    }

                    if (schedules.length > 0) {
                        babiesWithSchedules.push({
                            baby: baby,
                            schedules: schedules
                        });
                    }
                }

                // If there are babies with upcoming schedules, send email
                if (babiesWithSchedules.length > 0) {
                    // Create a message listing babies with their schedules
                    const scheduleList = babiesWithSchedules.map(({ baby, schedules }) => {
                        const scheduleDetails = schedules.map(s => 
                            `- ${s.month} month checkup on ${s.date.toLocaleDateString()}`
                        ).join('\n');
                        return `${baby.name}:\n${scheduleDetails}`;
                    }).join('\n\n');

                    // Send email to parent
                    await sendEmail(parent.email, 'Upcoming Baby Checkups Tomorrow', {
                        name: parent.fullName,
                        message: `You have upcoming checkups scheduled for tomorrow:\n\n${scheduleList}\n\nPlease make sure to bring your baby for these important checkups.`,
                        date: tomorrow.toLocaleDateString(),
                        buttonText: 'View Schedule',
                        buttonUrl: 'http://localhost:8081/schedule'
                    });
                    console.log(`Notification sent to ${parent.email} about ${babiesWithSchedules.length} babies with upcoming schedules`);
                }
            } catch (error) {
                console.error(`Error sending email to parent ${parent.email}:`, error);
            }
        }
        
        return { success: true, message: 'Notifications sent successfully' };
    } catch (error) {
        console.error('Error in notifyMail:', error);
        throw error;
    }
};

// Schedule the notification to run every day at 9 AM
cron.schedule('0 9 * * *', async () => {
    console.log('Running scheduled notifications...');
    try {
        await notifyMail();
        await sendSMS('+94718932289', 'Scheduled notifications completed successfully');
        console.log('Scheduled notifications completed successfully');
    } catch (error) {
        console.error('Error in scheduled notifications:', error);
    }
});

module.exports = {
    notifyMail
};