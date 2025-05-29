// import express from 'express';
// import path from 'path';
// import fs from 'fs';
// import { config } from '../config';

// const router = express.Router();

// // Download endpoint with proper error handling
// router.get('/download/:filename', (req, res) => {
//   const { filename } = req.params;
//   const filePath = path.join(config.filesDir, filename);
  
//   try {
//     // Check if file exists
//     if (!fs.existsSync(filePath)) {
//       return res.status(404).json({ 
//         success: false,
//         error: 'File not found' 
//       });
//     }
    
//     // Get file stats
//     const stats = fs.statSync(filePath);
    
//     // Set headers
//     res.setHeader('Content-Type', 'application/octet-stream');
//     res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
//     res.setHeader('Content-Length', stats.size);
    
//     // Stream the file
//     const fileStream = fs.createReadStream(filePath);
//     fileStream.pipe(res);
    
//     // Handle errors during streaming
//     fileStream.on('error', (error) => {
//       console.error(`Error streaming file: ${error}`);
//       if (!res.headersSent) {
//         res.status(500).json({ 
//           success: false,
//           error: 'Error downloading file' 
//         });
//       }
//     });
//   } catch (error) {
//     console.error(`Error handling download: ${error}`);
//     return res.status(500).json({ 
//       success: false,
//       error: 'Internal server error' 
//     });
//   }
// });

// // List available files - useful for load testing
// router.get('/files', (req, res) => {
//   try {
//     const files = fs.readdirSync(config.filesDir);
//     return res.status(200).json({
//       success: true,
//       data: files
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       error: 'Error listing files'
//     });
//   }
// });

// export default router;