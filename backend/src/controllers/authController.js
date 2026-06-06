const User = require('../models/User');
const asyncHandler = require('../utils/asyncHandler');
const AppError = require('../utils/AppError');
const { sendResponse } = require('../utils/apiResponse');
const { signToken } = require('../utils/generateToken');
const { buildResetPasswordFlow, verifyPasswordResetToken } = require('../services/authService');

const createAuthPayload = (account, accountType) => ({
  id: account._id,
  name: account.name,
  email: account.email,
  role: account.role,
  accountType,
});

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, profileImage = '' } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError('User already exists', 400);
  }

  const user = await User.create({
    name,
    email,
    password,
    profileImage,
    role: 'user',
  });

  const token = signToken({ id: user._id, role: user.role, accountType: 'user' });

  return sendResponse(res, 201, 'User registered successfully', {
    user: createAuthPayload(user, 'user'),
    token,
  });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw new AppError('Invalid credentials', 401);
  }

  const isPasswordValid = await user.matchPassword(password);
  if (!isPasswordValid) {
    throw new AppError('Invalid credentials', 401);
  }

  if (user.isBlocked) {
    throw new AppError('User account is blocked', 403);
  }

  const token = signToken({ id: user._id, role: user.role, accountType: 'user' });

  return sendResponse(res, 200, 'Login successful', {
    user: createAuthPayload(user, 'user'),
    token,
  });
});

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return sendResponse(res, 200, 'If the email exists, a reset link has been sent');
  }

  const resetBaseUrl = process.env.CLIENT_URL || `${req.protocol}://${req.get('host')}`;
  const { resetToken, resetUrl } = await buildResetPasswordFlow({
    account: user,
    resetBaseUrl,
    accountType: 'user',
    modelName: 'user',
  });

  return sendResponse(res, 200, 'Password reset instructions generated', {
    resetToken: process.env.NODE_ENV === 'production' ? undefined : resetToken,
    resetUrl: process.env.NODE_ENV === 'production' ? undefined : resetUrl,
  });
});

const resetPassword = asyncHandler(async (req, res) => {
  const { token, password } = req.body;
  const hashedToken = require('crypto').createHash('sha256').update(token).digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    throw new AppError('Token is invalid or has expired', 400);
  }

  verifyPasswordResetToken(user, token);
  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  const newToken = signToken({ id: user._id, role: user.role, accountType: 'user' });

  return sendResponse(res, 200, 'Password reset successful', {
    user: createAuthPayload(user, 'user'),
    token: newToken,
  });
});

module.exports = {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
};