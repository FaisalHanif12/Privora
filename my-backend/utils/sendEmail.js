const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  try {
    // Log configuration for debugging
    console.log('Email configuration:', {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      user: process.env.EMAIL_USER,
      fromName: process.env.FROM_NAME,
      fromEmail: process.env.FROM_EMAIL
    });

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Verify transporter configuration
    await transporter.verify();

    const message = {
      from: `"${process.env.FROM_NAME}" <${process.env.FROM_EMAIL}>`,
      to: options.email,
      subject: options.subject,
      text: options.message,
      headers: {
        'X-Priority': '1',
        'X-MSMail-Priority': 'High',
        'Importance': 'high'
      }
    };

    const info = await transporter.sendMail(message);

    console.log('Message sent: %s', info.messageId);
    return info;
  } catch (error) {
    console.error('Email sending error:', error);
    throw new Error(`Email could not be sent: ${error.message}`);
  }
};

module.exports = sendEmail; 