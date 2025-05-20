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

                    // Send email to guardian
                    for (const { baby } of babiesWithSchedules) {
                        const method = baby.notificationMethod || 'email';
                        // Ensure guardian and email exist
                        if ((method === 'email' || method === 'both') && baby.guardian && baby.guardian.email) {
                            await sendEmail(baby.guardian.email, 'Upcoming Baby Checkups Tomorrow', {
                                name: baby.guardian.name,
                                message: `Dear Parent,\n\nWe would like to remind you that your child's vaccination appointment is scheduled for tomorrow. Please find the details of your child's vaccination schedule below:\n\n${scheduleList}\n\nWe kindly request you to ensure your presence and bring your little one for these essential checkups. Your commitment to their health is greatly appreciated.\n\nThank you for being proactive in ensuring your child's well-being.\n\nBest regards,\n`,
                                date: tomorrow.toLocaleDateString(),
                                buttonText: 'View Schedule',
                                buttonUrl: 'http://localhost:8081/vaccination'
                            });
                            console.log(`Notification sent to guardian ${baby.guardian.email} about ${baby.name}`);
                        }
                        if (method === 'sms' || method === 'both') {
                            await sendSMS(
                                '+94718932289', // or baby.guardian.phone if you want dynamic
                                `Dear Parent,\n\nWe would like to remind you that your child's vaccination appointment is scheduled for tomorrow.\n\nWe kindly request you to ensure your presence and bring your little one for these essential checkups. Your commitment to their health is greatly appreciated.\n\nThank you for being proactive in ensuring your child's well-being.\n\nBest regards,\n`
                            );
                            console.log(`SMS sent to guardian ${baby.guardian.phone} about ${baby.name}`);
                        }
                    }
                }
            } catch (error) {
                console.error(`Error sending email to parent `, error);
            }
        }
        
        return { success: true, message: 'Notifications sent successfully' };
    } catch (error) {
        console.error('Error in notifyMail:', error);
        throw error;
    }
};


cron.schedule('36 18 * * *', async () => {
    console.log('Running scheduled notifications...');
    try {
        await notifyMail();
        console.log('Scheduled notifications completed successfully');
    } catch (error) {
        console.error('Error in scheduled notifications:', error);
    }
});

module.exports = {
    notifyMail
};