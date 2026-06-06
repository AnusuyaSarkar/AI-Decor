const streamifier = require('streamifier');
const { cloudinary, configureCloudinary } = require('../config/cloudinary');

configureCloudinary();

const uploadBufferToCloudinary = (buffer, folder = 'decor-with-love') =>
  new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'image',
      },
      (error, result) => {
        if (error) {
          reject(error);
          return;
        }

        resolve(result);
      }
    );

    streamifier.createReadStream(buffer).pipe(uploadStream);
  });

module.exports = { uploadBufferToCloudinary };