import express from 'express';
import { upload } from '../middlewares/uploadMiddleware';

const router = express.Router();

// Single file upload
router.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  
  return res.status(200).json({
    success: true,
    message: 'File uploaded successfully',
    data: {
      filename: req.file.filename,
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      path: req.file.path
    }
  });
});

// Multiple files upload - useful for load testing
router.post('/upload/multiple', upload.array('files', 10), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: 'No files uploaded' });
  }

  const files = Array.isArray(req.files) ? req.files : [req.files];
  
  return res.status(200).json({
    success: true,
    message: `Successfully uploaded ${files.length} files`,
    data: files.map(file => ({
      filename: file.filename,
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      path: file.path
    }))
  });
});

export default router;