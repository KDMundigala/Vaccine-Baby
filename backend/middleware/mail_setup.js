const nodemailer = require('nodemailer');

// Create reusable transporter object using SMTP transport
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'dilshan.dynac@gmail.com', // Your Gmail address
        pass: 'zgsu sjhs huot ylhx' // Your Gmail password or App Password
    }
});

// Email sending function
const sendEmail = async (to, subject, templateData) => {
    try {
        // Validate required fields
        if (!to || !subject) {
            throw new Error('Email recipient and subject are required');
        }

        const htmlContent = `
            <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
                <div style="background-color: #AA60EA; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0;">
                    <h1>Vaccine Baby Tracker</h1>
                </div>
                <div style="background-color: #ffffff; padding: 20px; border: 1px solid #ddd; border-radius: 0 0 5px 5px;">
                    <h2>Hello ${templateData.name || 'User'},</h2>
                    <p>${templateData.message || 'This is a notification from Vaccine Baby Tracker.'}</p>
                    <p>Date: ${templateData.date || new Date().toLocaleDateString()}</p>
                    ${templateData.buttonText ? `
                        <a href="${templateData.buttonUrl}" style="display: inline-block; padding: 10px 20px; background-color: #AA60EA; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0;">
                            ${templateData.buttonText}
                        </a>
                    ` : ''}
                </div>
                <div style="text-align: center; margin-top: 20px; color: #666; font-size: 12px;">
                    <p>Best regards,<br>Vaccine Baby Tracker Team</p>
                    <p>This is an automated message, please do not reply directly to this email.</p>
                </div>
            </div>
        `;

        const mailOptions = {
            from: 'dilshan.dyna@gmail.com',
            to: to,
            subject: subject,
            html: htmlContent
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.response);
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};

// Example usage:
// sendEmail('recipient@example.com', 'Welcome to Baby Bloom Tracker', {
//     name: 'John',
//     message: 'Welcome to our platform!',
//     date: new Date().toLocaleDateString(),
//     buttonText: 'Get Started',
//     buttonUrl: 'https://example.com'
// });

module.exports = { sendEmail }; 