const Design = require('../models/Design');
const User = require('../models/User');
const asyncHandler = require('../utils/asyncHandler');
const AppError = require('../utils/AppError');
const { sendResponse } = require('../utils/apiResponse');
const { uploadImage } = require('../services/cloudinaryService');
const { analyzeRoomDesign, generateRoomRedesign } = require('../services/aiService');

const analyzeDecor = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new AppError('Room image is required', 400);
  }

  const { prompt } = req.body;
  const uploadedImage = await uploadImage(req.file.buffer, 'decor-with-love/originals');
  const aiResponse = await analyzeRoomDesign({ imageUrl: uploadedImage.secure_url, prompt });

  const design = await Design.create({
    userId: req.user._id,
    originalImage: uploadedImage.secure_url,
    originalImagePublicId: uploadedImage.public_id,
    userPrompt: prompt,
    analysisType: 'analysis',
    aiResponse,
    budgetRecommendation: aiResponse.budgetRecommendation,
    colorPalette: aiResponse.colorPalette,
    furnitureSuggestions: aiResponse.furnitureSuggestions,
  });

  await User.findByIdAndUpdate(req.user._id, { $addToSet: { savedDesigns: design._id } });

  return sendResponse(res, 201, 'Decor analysis completed', {
    design,
    aiResponse,
  });
});

const redesignRoom = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new AppError('Room image is required', 400);
  }

  const { style, prompt = '' } = req.body;
  const uploadedImage = await uploadImage(req.file.buffer, 'decor-with-love/room-redesign');
  const aiResponse = await generateRoomRedesign({ imageUrl: uploadedImage.secure_url, style, prompt });

  const design = await Design.create({
    userId: req.user._id,
    originalImage: uploadedImage.secure_url,
    originalImagePublicId: uploadedImage.public_id,
    userPrompt: prompt || style,
    analysisType: 'redesign',
    style,
    aiResponse,
    generatedImage: aiResponse.generatedImage,
  });

  await User.findByIdAndUpdate(req.user._id, { $addToSet: { savedDesigns: design._id } });

  return sendResponse(res, 201, 'Room redesign generated successfully', {
    design,
    generatedImage: aiResponse.generatedImage,
  });
});

const getDesigns = asyncHandler(async (req, res) => {
  const filter = req.user.role === 'admin' ? {} : { userId: req.user._id };
  const designs = await Design.find(filter).sort({ createdAt: -1 });

  return sendResponse(res, 200, 'Design history fetched successfully', { designs });
});

const getDesignById = asyncHandler(async (req, res) => {
  const design = await Design.findById(req.params.id);
  if (!design) {
    throw new AppError('Design not found', 404);
  }

  if (req.user.role !== 'admin' && String(design.userId) !== String(req.user._id)) {
    throw new AppError('Not authorized to access this design', 403);
  }

  return sendResponse(res, 200, 'Design fetched successfully', { design });
});

module.exports = {
  analyzeDecor,
  redesignRoom,
  getDesigns,
  getDesignById,
};