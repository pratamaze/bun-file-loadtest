import express from 'express';
import { upload } from '../middlewares/uploadMiddleware';

const router = express.Router();

// Small file upload (up to 10KB)
router.post('/upload/small', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // Check file size (10KB = 10 * 1024 bytes)
  if (req.file.size > 10 * 1024) {
    return res.status(400).json({ error: 'File too large. Maximum size is 10KB' });
  }
  
  return res.status(200).json({
    success: true,
    message: 'Small file uploaded successfully',
    data: {
      filename: req.file.filename,
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      path: req.file.path
    }
  });
});

// Medium file upload (up to 100KB)
router.post('/upload/medium', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // Check file size (100KB = 100 * 1024 bytes)
  if (req.file.size > 100 * 1024) {
    return res.status(400).json({ error: 'File too large. Maximum size is 100KB' });
  }
  
  return res.status(200).json({
    success: true,
    message: 'Medium file uploaded successfully',
    data: {
      filename: req.file.filename,
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      path: req.file.path
    }
  });
});

// Large file upload (up to 1000KB)
router.post('/upload/large', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // Check file size (1000KB = 1000 * 1024 bytes)
  if (req.file.size > 1000 * 1024) {
    return res.status(400).json({ error: 'File too large. Maximum size is 1000KB' });
  }
  
  return res.status(200).json({
    success: true,
    message: 'Large file uploaded successfully',
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