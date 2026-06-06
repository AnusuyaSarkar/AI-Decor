const { uploadBufferToCloudinary } = require('../utils/uploadToCloudinary');

const uploadImage = async (buffer, folder) => uploadBufferToCloudinary(buffer, folder);

module.exports = { uploadImage };