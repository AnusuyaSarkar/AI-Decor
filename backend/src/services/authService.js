const crypto = require('crypto');
const AppError = require('../utils/AppError');
const { createPasswordResetToken } = require('../utils/resetToken');
const { sendPasswordResetEmail } = require('./emailService');

const buildResetPasswordFlow = async ({ account, resetBaseUrl, accountType, modelName }) => {
  const { resetToken, hashedResetToken, resetTokenExpires } = createPasswordResetToken();
  account.passwordResetToken = hashedResetToken;
  account.passwordResetExpires = resetTokenExpires;
  await account.save({ validateBeforeSave: false });

  const resetUrl = `${resetBaseUrl}/reset-password?token=${resetToken}&type=${accountType}`;
  await sendPasswordResetEmail({
    to: account.email,
    resetUrl,
    accountName: account.name || account.ownerName || modelName,
  });

  return {
    resetToken,
    resetUrl,
  };
};

const verifyPasswordResetToken = (account, token) => {
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
  if (account.passwordResetToken !== hashedToken || account.passwordResetExpires < Date.now()) {
    throw new AppError('Token is invalid or has expired', 400);
  }
};

module.exports = {
  buildResetPasswordFlow,
  verifyPasswordResetToken,
};