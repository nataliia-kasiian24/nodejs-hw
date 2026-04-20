import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';
import 'dotenv/config';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const saveFileToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: 'avatars' },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );

    // Створюємо стрім із буфера та "вливаємо" його в Cloudinary
    const stream = new Readable();
    stream.push(buffer);
    stream.push(null);
    stream.pipe(uploadStream);
  });
};