const User = require('../models/User');
const asyncHandler = require('../utils/asyncHandler');
const AppError = require('../utils/AppError');
const { sendResponse } = require('../utils/apiResponse');

const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
    .populate('wishlist')
    .populate('savedDesigns');

  return sendResponse(res, 200, 'Profile fetched successfully', { user });
});

const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    throw new AppError('User not found', 404);
  }

  const { name, email, profileImage } = req.body;
  if (name !== undefined) user.name = name;
  if (email !== undefined) user.email = email;
  if (profileImage !== undefined) user.profileImage = profileImage;

  await user.save();

  return sendResponse(res, 200, 'Profile updated successfully', { user });
});

module.exports = {
  getProfile,
  updateProfile,
};