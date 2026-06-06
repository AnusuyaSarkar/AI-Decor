const crypto = require('crypto');

const createPasswordResetToken = () => {
  const resetToken = crypto.randomBytes(32).toString('hex');
  const hashedResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  const resetTokenExpires = Date.now() + 10 * 60 * 1000;

  return {
    resetToken,
    hashedResetToken,
    resetTokenExpires,
  };
};

module.exports = { createPasswordResetToken };