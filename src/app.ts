import express from 'express';
import path from 'path';
import fs from 'fs';
import { config } from './config';
import uploadRoutes from './routes/uploadRoutes';
// import downloadRoutes from './routes/downloadRoutes';

// Create Express app
const app = express();

// Ensure directories exist
[config.uploadDir, config.filesDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(uploadRoutes);
// app.use(downloadRoutes);

// Health check endpoint - useful for load testing
app.get('/health', (req, res) => {
  res.status(200).json({ 
    success: true,
    status: 'OK', 
    timestamp: new Date().toISOString() 
  });
});

// Start server
app.listen(config.port, () => {
  console.log(`Server running on http://localhost:${config.port}`);
  console.log('\nAvailable endpoints:');
  console.log(`- Health check:     GET    http://localhost:${config.port}/health`);
  
  console.log(`- Upload single:        POST   http://localhost:${config.port}/upload`);
  console.log(`- Upload 10KB max:      POST   http://localhost:${config.port}/upload/10kb`);
  console.log(`- Upload 100KB max:     POST   http://localhost:${config.port}/upload/100kb`);
  console.log(`- Upload 1000KB max:    POST   http://localhost:${config.port}/upload/1000kb`);
  console.log(`- Upload multiple:      POST   http://localhost:${config.port}/upload/multiple`);

});

export default app;