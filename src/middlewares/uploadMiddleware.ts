import multer from 'multer';
import path from 'path';
import { config } from '../config';

// Storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, config.uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// File filter (optional)
const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  // Accept only certain types (e.g., images, text, etc.)
  cb(null, true); 
};

// Uploaders with size limits
export const upload = multer({ storage, fileFilter });

export const upload10KB = multer({ storage, limits: { fileSize: 10 * 1024 }, fileFilter });
export const upload100KB = multer({ storage, limits: { fileSize: 100 * 1024 }, fileFilter });
export const upload1000KB = multer({ storage, limits: { fileSize: 1000 * 1024 }, fileFilter });
