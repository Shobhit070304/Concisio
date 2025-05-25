const express = require("express");
const router = express.Router();
const {
  summarizeVideo,
  downloadPdf,
  summarizeNotes,
  summarizePdf,
} = require("../controllers/summarizer-controller");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() }); // store file in memory buffer

router.post("/video", summarizeVideo);

router.post("/download-pdf", downloadPdf);

router.post("/notes", summarizeNotes);


router.post("/upload-doc", upload.single("document"), summarizePdf);

module.exports = router;
