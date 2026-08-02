const nodemailer = require('nodemailer');

/**
 * Robust, fail-safe email dispatcher.
 * Guaranteed to NEVER crash caller routes or hang requests for more than 2.5 seconds.
 */
const sendEmail = async (options) => {
  try {
    const toEmail = options.email || options.to;
    const htmlMessage = options.message || options.html;

    if (!toEmail) {
      console.log('Skipping email: recipient email missing.');
      return { success: false, message: 'Recipient missing' };
    }

    // If SMTP credentials aren't configured, skip email delivery gracefully
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER) {
      console.log('SMTP credentials missing (SMTP_HOST/SMTP_USER). Skipping email delivery.');
      return { success: false, message: 'SMTP not configured' };
    }

    // Create transporter with short 2.5s timeouts so unroutable SMTP hosts fail fast
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      connectionTimeout: 2500, // 2.5 seconds max connection wait
      greetingTimeout: 2500,
      socketTimeout: 2500,
    });

    const mailOptions = {
      from: `${process.env.FROM_NAME || "Cook'N'Crop"} <${process.env.FROM_EMAIL || process.env.SMTP_USER}>`,
      to: toEmail,
      subject: options.subject || "Cook'N'Crop Notification",
      html: htmlMessage,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log(`Email sent successfully to ${toEmail}`);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    // Fail-safe error capture: NEVER throw, ALWAYS catch and return error status gracefully
    console.error('Email delivery skipped/failed:', error.message || error);
    return { success: false, error: error.message };
  }
};

module.exports = sendEmail;