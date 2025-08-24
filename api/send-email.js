import { google } from 'googleapis';

// Add error handling for missing environment variables
const requiredEnvVars = [
  'GMAIL_CLIENT_ID',
  'GMAIL_CLIENT_SECRET', 
  'GMAIL_REFRESH_TOKEN',
  'GMAIL_RECIPIENT_1'
];

const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
if (missingVars.length > 0) {
  console.error('Missing required environment variables:', missingVars);
}

// Log all environment variables for debugging (remove in production)
console.log('Environment variables check:', {
  hasClientId: !!process.env.GMAIL_CLIENT_ID,
  hasClientSecret: !!process.env.GMAIL_CLIENT_SECRET,
  hasRefreshToken: !!process.env.GMAIL_REFRESH_TOKEN,
  hasRecipient: !!process.env.GMAIL_RECIPIENT_1,
  totalEnvVars: Object.keys(process.env).length
});

export default async function handler(req, res) {
  console.log('Email API called:', { method: req.method, timestamp: new Date().toISOString() });
  
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Validate required fields
  const { customerName, customerPhone, customerAddress, cartItems, totalAmount } = req.body;
  
  if (!customerName || !customerPhone || !customerAddress || !cartItems || !totalAmount) {
    return res.status(400).json({ 
      message: 'Missing required fields: customerName, customerPhone, customerAddress, cartItems, totalAmount' 
    });
  }

  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    return res.status(400).json({ message: 'Cart items must be a non-empty array' });
  }

  try {
    // Check if all required environment variables are present
    if (missingVars.length > 0) {
      return res.status(500).json({ 
        success: false, 
        message: 'Server configuration error. Please contact support.' 
      });
    }

    // Initialize Gmail API
    const oauth2Client = new google.auth.OAuth2(
      process.env.GMAIL_CLIENT_ID,
      process.env.GMAIL_CLIENT_SECRET,
      'https://developers.google.com/oauthplayground'
    );

    oauth2Client.setCredentials({
      refresh_token: process.env.GMAIL_REFRESH_TOKEN,
    });

    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

    // Create email content
    const emailContent = `
New Order from Kurtos Cafe Website

Customer Details:
Name: ${customerName}
Phone: ${customerPhone}
Address: ${customerAddress}

Order Details:
${cartItems.map(item => `- ${item.name} (${item.quantity}x) - Rs. ${item.price}`).join('\n')}

Total Amount: Rs. ${totalAmount}

Order Date: ${new Date().toLocaleString('en-US', { 
  timeZone: 'Asia/Karachi',
  year: 'numeric', 
  month: 'long', 
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
})}

This order was placed through the Kurtos Cafe website checkout system.
    `;

    // Create email message
    const message = {
      to: process.env.GMAIL_RECIPIENT_1,
      subject: `New Order from ${customerName} - Kurtos Cafe`,
      text: emailContent,
    };

    // Encode the email
    const encodedMessage = Buffer.from(
      `To: ${message.to}\r\n` +
      `Subject: ${message.subject}\r\n` +
      `Content-Type: text/plain; charset=utf-8\r\n` +
      `\r\n` +
      `${message.text}`
    ).toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

    // Send the email
    const emailResponse = await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: encodedMessage,
      },
    });

    if (!emailResponse.data || !emailResponse.data.id) {
      throw new Error('Failed to send email - no response from Gmail API');
    }

    console.log('Email sent successfully:', {
      emailId: emailResponse.data.id,
      customerName,
      orderTotal: totalAmount,
      timestamp: new Date().toISOString()
    });

    res.status(200).json({ 
      success: true, 
      message: 'Order email sent successfully!',
      emailId: emailResponse.data.id
    });

  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send order email. Please try again.' 
    });
  }
}
