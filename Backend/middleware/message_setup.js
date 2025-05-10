const twilio = require('twilio');

// Initialize Twilio client with direct credentials
const client = new twilio(
    'ACd70d5f18d5fa78620b299ba1e3037bd5',
    '80295e6ce29999b0f0e33cdc46cc17da'
);

// Track successful SMS deliveries
const successfulDeliveries = new Map();

// Validate phone number format
const validatePhoneNumber = (phoneNumber) => {
    // Remove any non-digit characters
    const cleaned = phoneNumber.replace(/\D/g, '');
    
    // Check if the number starts with '94' (Sri Lanka country code)
    if (cleaned.startsWith('94')) {
        return `+${cleaned}`;
    }
    
    // If number starts with '0', replace with '94'
    if (cleaned.startsWith('0')) {
        return `+94${cleaned.substring(1)}`;
    }
    
    // If number doesn't start with either, add '94'
    return `+94${cleaned}`;
};

// Notify about successful SMS delivery
const notifyDelivery = (messageId, to, status) => {
    const deliveryInfo = {
        messageId,
        to,
        status,
        timestamp: new Date().toISOString(),
        delivered: status === 'delivered'
    };

    // Store delivery info
    successfulDeliveries.set(messageId, deliveryInfo);

    // Log successful delivery
    console.log('SMS Delivery Notification:', {
        messageId,
        to,
        status,
        timestamp: deliveryInfo.timestamp
    });

    return deliveryInfo;
};

// Send SMS with enhanced error handling and logging
const sendSMS = async (to, message) => {
    try {
        // Validate phone number
        const formattedNumber = validatePhoneNumber(to);
        
        // Validate message
        if (!message || message.trim().length === 0) {
            throw new Error('Message cannot be empty');
        }

        // Check message length
        if (message.length > 1600) {
            console.warn('Message exceeds 1600 characters and will be split into multiple messages');
        }

        // Send message
        const result = await client.messages.create({
            body: message,
            from: '+12707139861',
            to: formattedNumber
        });

        // Notify about initial send
        notifyDelivery(result.sid, formattedNumber, result.status);

        // Check delivery status after a short delay
        setTimeout(async () => {
            try {
                const status = await checkSMSStatus(result.sid);
                if (status.status === 'delivered') {
                    notifyDelivery(result.sid, formattedNumber, 'delivered');
                }
            } catch (error) {
                console.error('Error checking delivery status:', error);
            }
        }, 5000); // Check after 5 seconds

        console.log(`SMS sent successfully to ${formattedNumber}`, {
            messageId: result.sid,
            status: result.status,
            timestamp: new Date().toISOString()
        });

        return {
            success: true,
            messageId: result.sid,
            status: result.status,
            to: formattedNumber
        };
    } catch (error) {
        console.error('Error sending SMS:', {
            error: error.message,
            code: error.code,
            to: to,
            timestamp: new Date().toISOString()
        });

        // Handle specific Twilio errors
        if (error.code === 21211) {
            throw new Error('Invalid phone number format');
        } else if (error.code === 21214) {
            throw new Error('Phone number is not mobile');
        } else if (error.code === 21608) {
            throw new Error('Message content is not allowed');
        }

        throw error;
    }
};

// Send bulk SMS to multiple recipients
const sendBulkSMS = async (recipients, message) => {
    try {
        const results = await Promise.allSettled(
            recipients.map(recipient => sendSMS(recipient, message))
        );

        const summary = {
            total: recipients.length,
            successful: results.filter(r => r.status === 'fulfilled').length,
            failed: results.filter(r => r.status === 'rejected').length,
            errors: results
                .filter(r => r.status === 'rejected')
                .map(r => r.reason)
        };

        console.log('Bulk SMS sending summary:', summary);
        return summary;
    } catch (error) {
        console.error('Error in bulk SMS sending:', error);
        throw error;
    }
};

// Check SMS status
const checkSMSStatus = async (messageId) => {
    try {
        const message = await client.messages(messageId).fetch();
        return {
            status: message.status,
            sentAt: message.dateCreated,
            deliveredAt: message.dateUpdated,
            errorCode: message.errorCode,
            errorMessage: message.errorMessage
        };
    } catch (error) {
        console.error('Error checking SMS status:', error);
        throw error;
    }
};

// Get delivery history
const getDeliveryHistory = () => {
    return Array.from(successfulDeliveries.values());
};

// Get delivery status for a specific message
const getDeliveryStatus = (messageId) => {
    return successfulDeliveries.get(messageId);
};

module.exports = {
    sendSMS,
    sendBulkSMS,
    checkSMSStatus,
    validatePhoneNumber,
    getDeliveryHistory,
    getDeliveryStatus
};