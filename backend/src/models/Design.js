const mongoose = require('mongoose');

const designSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    originalImage: {
      type: String,
      required: true,
    },
    originalImagePublicId: {
      type: String,
      default: '',
    },
    userPrompt: {
      type: String,
      required: true,
      trim: true,
    },
    analysisType: {
      type: String,
      enum: ['analysis', 'redesign'],
      default: 'analysis',
    },
    style: {
      type: String,
      default: '',
    },
    aiResponse: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    generatedImage: {
      type: String,
      default: '',
    },
    generatedImagePublicId: {
      type: String,
      default: '',
    },
    budgetRecommendation: {
      type: String,
      default: '',
    },
    colorPalette: [String],
    furnitureSuggestions: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Design', designSchema);