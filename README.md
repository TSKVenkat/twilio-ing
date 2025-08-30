# Twilio WhatsApp Message Sender

A JavaScript script to send WhatsApp messages using Twilio's API.

## Prerequisites

1. **Twilio Account**: Sign up at [twilio.com](https://www.twilio.com)
2. **WhatsApp Sandbox**: Enable WhatsApp messaging in your Twilio Console
3. **Node.js**: Version 14 or higher

## Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure environment variables**:
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` with your Twilio credentials:
   - `TWILIO_ACCOUNT_SID`: Your Twilio Account SID
   - `TWILIO_AUTH_TOKEN`: Your Twilio Auth Token  
   - `TWILIO_PHONE_NUMBER`: Your Twilio phone number (optional for sandbox)

3. **Get your Twilio credentials**:
   - Go to [Twilio Console](https://console.twilio.com/)
   - Copy your Account SID and Auth Token
   - Note your Twilio phone number

## WhatsApp Setup (IMPORTANT)

### 1. Enable WhatsApp in Twilio Console:
   - Go to [Twilio Console](https://console.twilio.com/)
   - Navigate to **Messaging** → **Try it out** → **Send a WhatsApp message**
   - Click **Get started with WhatsApp**

### 2. Join the WhatsApp Sandbox:
   - You'll see a WhatsApp number (usually +14155238886)
   - Send the provided code to that number via WhatsApp
   - Example: Send "join <code>" to +14155238886

### 3. Recipients Must Join Your Sandbox:
   - **CRITICAL**: Recipients must also join your sandbox
   - They need to send the same code to your Twilio WhatsApp number
   - Without this, messages will fail with "Channel not found" error

### 4. Production Setup:
   - For production use, contact Twilio to enable WhatsApp Business API
   - You'll need to verify your business and phone number

## Usage

### Run the example script:
```bash
npm start
```

### Use in your own code:
```javascript
const { sendWhatsAppMessage, sendBulkWhatsAppMessages } = require('./send-whatsapp');

// Send single message
await sendWhatsAppMessage('1234567890', 'Hello from Twilio!');

// Send bulk messages
const phoneNumbers = ['1234567890', '0987654321'];
await sendBulkWhatsAppMessages(phoneNumbers, 'Bulk message!');
```

## Functions

### `sendWhatsAppMessage(to, message)`
- **to**: Phone number with country code (no +)
- **message**: Text message to send
- Returns: Twilio message object

### `sendBulkWhatsAppMessages(phoneNumbers, message)`
- **phoneNumbers**: Array of phone numbers
- **message**: Text message to send
- Returns: Array of results with success/error status

## Troubleshooting

### "Channel with the specified From address" Error:
1. **Join the WhatsApp sandbox** by sending the code to +14155238886
2. **Recipients must also join** your sandbox
3. **Check your .env file** has correct credentials
4. **Verify WhatsApp is enabled** in Twilio Console

### Common Issues:
- **Sandbox not joined**: Both sender and recipients must join
- **Wrong phone number format**: Use country code without +
- **Invalid credentials**: Check Account SID and Auth Token
- **Rate limiting**: Script includes 1-second delays

## Important Notes

- **Sandbox Mode**: By default, you're in WhatsApp sandbox mode
- **Recipient Setup**: Recipients must join your sandbox to receive messages
- **Production**: Contact Twilio to enable production WhatsApp messaging
- **Rate Limiting**: Script includes 1-second delays between bulk messages

## Error Handling

The script includes comprehensive error handling and logging:
- ✅ Success messages with message SID and status
- ❌ Error messages with detailed error information
- 📊 Bulk message results summary
- 🔧 Troubleshooting tips for common errors

## Support

For Twilio-related issues, check the [Twilio Documentation](https://www.twilio.com/docs/whatsapp).
