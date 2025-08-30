const twilio = require('twilio');
require('dotenv').config();

// Initialize Twilio client
const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

/**
 * Send a WhatsApp message using Twilio
 * @param {string} to - The recipient's phone number (with country code, no +)
 * @param {string} message - The message to send
 * @returns {Promise} - Twilio message object
 */
async function sendWhatsAppMessage(to, message) {
  try {
    // For WhatsApp sandbox, use the default Twilio WhatsApp number
    // Format: whatsapp:+[recipient_number]
    const whatsappTo = `whatsapp:+${to}`;
    
    // Use the default Twilio WhatsApp sandbox number
    // You can also use your own Twilio phone number if configured
    const whatsappFrom = process.env.TWILIO_PHONE_NUMBER 
      ? `whatsapp:${process.env.TWILIO_PHONE_NUMBER}`
      : 'whatsapp:+14155238886'; // Default Twilio WhatsApp sandbox number

    console.log(`📤 Attempting to send WhatsApp message...`);
    console.log(`📱 From: ${whatsappFrom}`);
    console.log(`📱 To: ${whatsappTo}`);

    const result = await client.messages.create({
      body: message,
      from: whatsappFrom,
      to: whatsappTo
    });

    console.log(`✅ Message sent successfully!`);
    console.log(`📱 To: ${to}`);
    console.log(`💬 Message: ${message}`);
    console.log(`🆔 Message SID: ${result.sid}`);
    console.log(`📊 Status: ${result.status}`);
    
    return result;
  } catch (error) {
    console.error('❌ Error sending WhatsApp message:', error.message);
    
    // Provide helpful error messages for common issues
    if (error.message.includes('Channel with the specified From address')) {
      console.log('\n🔧 Troubleshooting tips:');
      console.log('1. Make sure you have enabled WhatsApp in your Twilio Console');
      console.log('2. Go to Messaging → Try it out → Send a WhatsApp message');
      console.log('3. Join the WhatsApp sandbox by sending the provided code to +14155238886');
      console.log('4. Recipients must also join your sandbox to receive messages');
      console.log('5. Check that your TWILIO_PHONE_NUMBER is correct in .env file');
    }
    
    throw error;
  }
}

/**
 * Send WhatsApp message to multiple recipients
 * @param {string[]} phoneNumbers - Array of phone numbers
 * @param {string} message - The message to send
 * @returns {Promise<Array>} - Array of results
 */
async function sendBulkWhatsAppMessages(phoneNumbers, message) {
  const results = [];
  
  for (const phoneNumber of phoneNumbers) {
    try {
      const result = await sendWhatsAppMessage(phoneNumber, message);
      results.push({ phoneNumber, success: true, result });
    } catch (error) {
      results.push({ phoneNumber, success: false, error: error.message });
    }
    
    // Add a small delay between messages to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  return results;
}

// Example usage
async function main() {
  // Single message example
  try {
    await sendWhatsAppMessage('7338978082', 'Hello from Twilio WhatsApp! 🚀');
  } catch (error) {
    console.error('Failed to send single message:', error.message);
  }

  // Bulk messages example
  const phoneNumbers = ['7338978082'];
  const bulkMessage = 'This is a bulk message from Twilio WhatsApp! 📱';
  
  try {
    const bulkResults = await sendBulkWhatsAppMessages(phoneNumbers, bulkMessage);
    console.log('\n📊 Bulk message results:');
    bulkResults.forEach(result => {
      if (result.success) {
        console.log(`✅ ${result.phoneNumber}: Sent successfully`);
      } else {
        console.log(`❌ ${result.phoneNumber}: ${result.error}`);
      }
    });
  } catch (error) {
    console.error('Failed to send bulk messages:', error.message);
  }
}

// Export functions for use in other modules
module.exports = {
  sendWhatsAppMessage,
  sendBulkWhatsAppMessages
};

// Run the example if this file is executed directly
if (require.main === module) {
  main();
}
