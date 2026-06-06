const AppError = require('../utils/AppError');
const { cloudinary } = require('../config/cloudinary');
const { uploadBufferToCloudinary } = require('../utils/uploadToCloudinary');

const DEFAULT_FOLDER = 'decor-with-love';

const validateBuffer = (buffer) => {
	if (!buffer) {
		throw new AppError('Image buffer is required', 400);
	}
};

const validatePublicId = (publicId) => {
	if (!publicId || typeof publicId !== 'string') {
		throw new AppError('Public ID is required', 400);
	}
};

const uploadImage = async (buffer, folder = DEFAULT_FOLDER) => {
	validateBuffer(buffer);
	return uploadBufferToCloudinary(buffer, folder);
};

const uploadImages = async (buffers = [], folder = DEFAULT_FOLDER) => {
	if (!Array.isArray(buffers) || buffers.length === 0) {
		throw new AppError('At least one image buffer is required', 400);
	}

	return Promise.all(buffers.map((buffer) => uploadImage(buffer, folder)));
};

const deleteImage = async (publicId) => {
	validatePublicId(publicId);
	return cloudinary.uploader.destroy(publicId, { resource_type: 'image' });
};

const deleteImages = async (publicIds = []) => {
	if (!Array.isArray(publicIds) || publicIds.length === 0) {
		throw new AppError('At least one public ID is required', 400);
	}

	return Promise.all(publicIds.map((publicId) => deleteImage(publicId)));
};

module.exports = {
	uploadImage,
	uploadImages,
	deleteImage,
	deleteImages,
};