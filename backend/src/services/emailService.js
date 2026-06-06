const { createTransporter } = require('../config/email');

const sendPasswordResetEmail = async ({ to, resetUrl, accountName }) => {
  if (!process.env.EMAIL_HOST || !process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    return { skipped: true, resetUrl };
  }

  const transporter = createTransporter();

  await transporter.sendMail({
    from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
    to,
    subject: 'Reset your Decor With Love password',
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.6">
        <h2>Hello ${accountName || 'there'},</h2>
        <p>You requested a password reset for Decor With Love.</p>
        <p><a href="${resetUrl}" target="_blank" rel="noreferrer">Reset your password</a></p>
        <p>This link expires in 10 minutes.</p>
      </div>
    `,
  });

  return { sent: true };
};

module.exports = { sendPasswordResetEmail };