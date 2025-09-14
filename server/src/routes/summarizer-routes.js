const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const {
  summarizeVideo,
  downloadPdf,
  summarizeNotes,
  summarizePdf,
} = require("../controllers/summarizer-controller");
const multer = require("multer");
const handleValidationErrors = require("../middlewares/validation");

// Configure multer for file uploads
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'application/vnd.ms-powerpoint',
      'text/plain'
    ];
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF, DOCX, PPTX, and TXT files are allowed.'), false);
    }
  }
});

// Handle multer errors
const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: "File too large. Maximum size is 10MB",
        data: null
      });
    }
  }
  if (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
      data: null
    });
  }
  next();
};

// Validation rules
const videoValidation = [
  body('videoUrl')
    .isURL()
    .withMessage('Please provide a valid YouTube URL'),
  body('model')
    .isIn(['llama', 'claude', 'gemini'])
    .withMessage('Model must be one of: llama, claude, gemini')
];

const notesValidation = [
  body('rawNotes')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Notes content is required'),
  body('model')
    .isIn(['llama', 'claude', 'gemini'])
    .withMessage('Model must be one of: llama, claude, gemini')
];

const pdfDownloadValidation = [
  body('summary')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Summary content is required for PDF generation')
];

const documentValidation = [
  body('model')
    .isIn(['llama', 'claude', 'gemini'])
    .withMessage('Model must be one of: llama, claude, gemini')
];

router.post("/video", videoValidation, handleValidationErrors, summarizeVideo);
router.post("/download-pdf", pdfDownloadValidation, handleValidationErrors, downloadPdf);
router.post("/notes", notesValidation, handleValidationErrors, summarizeNotes);
router.post("/upload-doc", upload.single("document"), handleMulterError, documentValidation, handleValidationErrors, summarizePdf);

module.exports = router;
