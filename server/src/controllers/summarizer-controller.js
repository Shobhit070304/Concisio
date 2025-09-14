// const { YoutubeTranscript } = require("youtube-transcript");
const generatePdfBuffer = require("../utils/generatePdf");
const {
  extractTextFromPdf,
  extractTextFromDocx,
  extractTextFromPptx,
  extractTextFromTxt,
} = require("../utils/extractText");
const getYoutubeTranscriptText = require("../utils/youtube-transcript-extractor.js");
const summarizeTextWithGemini = require("../ai-models/summarizeTextWithGemini.js");
const summarizeTextWithLLaMA = require("../ai-models/summarizeTextWithLLaMA.js");
const summarizeTextWithClaude = require("../ai-models/summarizeTextWithClaude.js");

exports.summarizeVideo = async (req, res) => {
  try {
    const { videoUrl, model } = req.body;

    // Validate input
    if (!videoUrl) {
      return res.status(400).json({ 
        success: false,
        message: "Video URL is required",
        data: null
      });
    }

    if (!model || !["llama", "claude", "gemini"].includes(model)) {
      return res.status(400).json({ 
        success: false,
        message: "Valid model is required (llama, claude, or gemini)",
        data: null
      });
    }

    // Extract video ID
    let videoId;
    try {
      const urlObj = new URL(videoUrl);
      videoId = urlObj.searchParams.get("v") || urlObj.pathname.split("/").pop();
      if (!videoId) throw new Error("Invalid video URL format");
    } catch (e) {
      return res.status(400).json({ 
        success: false,
        message: "Invalid YouTube URL format",
        data: null
      });
    }

    // Get transcript
    const text = await getYoutubeTranscriptText(videoId, "en");
    if (!text || text.trim().length === 0) {
      return res.status(400).json({ 
        success: false,
        message: "No transcript available for this video",
        data: null
      });
    }

    // Generate summary based on model
    let summary;
    if (model === "llama") {
      summary = await summarizeTextWithLLaMA(text, "youtube");
    } else if (model === "claude") {
      summary = await summarizeTextWithClaude(text, "youtube");
    } else if (model === "gemini") {
      summary = await summarizeTextWithGemini(text, "youtube");
    }

    res.status(200).json({ 
      success: true,
      message: "Video summarized successfully",
      data: { summary }
    });
  } catch (error) {
    console.error("Video summarization error:", error);
    res.status(500).json({ 
      success: false,
      message: "Failed to summarize video",
      data: null
    });
  }
};

exports.summarizeNotes = async (req, res) => {
  try {
    const { rawNotes, model } = req.body;

    // Validate input
    if (!rawNotes || rawNotes.trim().length === 0) {
      return res.status(400).json({ 
        success: false,
        message: "Notes text is required",
        data: null
      });
    }

    if (!model || !["llama", "claude", "gemini"].includes(model)) {
      return res.status(400).json({ 
        success: false,
        message: "Valid model is required (llama, claude, or gemini)",
        data: null
      });
    }

    // Generate summary based on model
    let summary;
    if (model === "llama") {
      summary = await summarizeTextWithLLaMA(rawNotes, "notes");
    } else if (model === "claude") {
      summary = await summarizeTextWithClaude(rawNotes, "notes");
    } else if (model === "gemini") {
      summary = await summarizeTextWithGemini(rawNotes, "notes");
    }

    res.status(200).json({ 
      success: true,
      message: "Notes summarized successfully",
      data: { summary }
    });
  } catch (error) {
    console.error("Notes summarization error:", error);
    res.status(500).json({ 
      success: false,
      message: "Failed to summarize notes",
      data: null
    });
  }
};

exports.summarizePdf = async (req, res) => {
  try {
    // Check file upload
    if (!req.file) {
      return res.status(400).json({ 
        success: false,
        message: "No file uploaded",
        data: null
      });
    }

    // Get selected model from request body
    const model = req.body.model;
    if (!model || !["llama", "claude", "gemini"].includes(model)) {
      return res.status(400).json({ 
        success: false,
        message: "Valid model is required (llama, claude, or gemini)",
        data: null
      });
    }

    const mime = req.file.mimetype;
    let extractedText = "";
    let summary = "";

    // Helper: choose correct summarizer function
    const summarize = async (text, mode) => {
      if (model === "claude") {
        return await summarizeTextWithClaude(text, mode);
      } else if (model === "llama") {
        return await summarizeTextWithLLaMA(text, mode);
      } else {
        return await summarizeTextWithGemini(text, mode);
      }
    };

    // File type handling
    if (mime === "application/pdf") {
      extractedText = await extractTextFromPdf(req.file.buffer);
      summary = await summarize(extractedText, "pdf");
    } else if (
      mime === "application/vnd.openxmlformats-officedocument.presentationml.presentation" ||
      mime === "application/vnd.ms-powerpoint"
    ) {
      extractedText = await extractTextFromPptx(req.file.buffer);
      summary = await summarize(extractedText, "pptx");
    } else if (mime === "text/plain") {
      extractedText = await extractTextFromTxt(req.file.buffer);
      summary = await summarize(extractedText, "pdf");
    } else if (
      mime === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      extractedText = await extractTextFromDocx(req.file.buffer);
      summary = await summarize(extractedText, "pdf");
    } else {
      return res.status(400).json({ 
        success: false,
        message: "Unsupported file format. Please upload PDF, DOCX, PPTX, or TXT files",
        data: null
      });
    }

    if (!extractedText || extractedText.trim().length === 0) {
      return res.status(400).json({ 
        success: false,
        message: "No text could be extracted from the document",
        data: null
      });
    }

    res.status(200).json({ 
      success: true,
      message: "Document summarized successfully",
      data: { summary }
    });
  } catch (error) {
    console.error("Document summarization error:", error);
    res.status(500).json({ 
      success: false,
      message: "Failed to process document",
      data: null
    });
  }
};

exports.downloadPdf = async (req, res) => {
  try {
    const { summary } = req.body;

    // Validate input
    if (!summary || typeof summary !== "string" || summary.trim() === "") {
      return res.status(400).json({ 
        success: false,
        message: "Valid summary text is required for PDF generation",
        data: null
      });
    }

    // Generate PDF buffer
    const pdfBuffer = await generatePdfBuffer(summary);
    
    // Set response headers
    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="summary.pdf"',
      "Content-Length": pdfBuffer.length,
    });
    
    res.status(200).send(pdfBuffer);
  } catch (error) {
    console.error("PDF generation error:", error);
    res.status(500).json({ 
      success: false,
      message: "Failed to generate PDF",
      data: null
    });
  }
};
