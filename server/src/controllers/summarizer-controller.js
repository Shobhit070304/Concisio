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
  const { videoUrl, model } = req.body;

  if (!videoUrl) {
    return res.status(400).json({ error: "Video URL is required" });
  }

  let videoId;
  try {
    const urlObj = new URL(videoUrl);
    videoId = urlObj.searchParams.get("v") || urlObj.pathname.split("/").pop();
    if (!videoId) throw new Error("Invalid video URL format");
  } catch (e) {
    return res.status(404).json({ error: "Invalid YouTube URL" });
  }

  try {
    const text = await getYoutubeTranscriptText(videoId, "en");

    if (model === "llama") {
      const summary = await summarizeTextWithLLaMA(text, "youtube");
    } else if (model === "claude") {
      const summary = await summarizeTextWithClaude(text, "youtube");
    } else if (model === "gemini") {
      const summary = await summarizeTextWithGemini(text, "youtube");
    } else {
      return res.status(400).json({ error: "Invalid model" });
    }

    res.status(200).json({ summary });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to summarize video" });
  }
};

exports.summarizeNotes = async (req, res) => {
  const { rawNotes } = req.body;
  try {
    if (!rawNotes || rawNotes.trim().length === 0) {
      return res.status(400).json({ error: "Notes text is required" });
    }
    if (model === "llama") {
      const summary = await summarizeTextWithLLaMA(rawNotes, "notes");
    } else if (model === "claude") {
      const summary = await summarizeTextWithClaude(rawNotes, "notes");
    } else if (model === "gemini") {
      const summary = await summarizeTextWithGemini(rawNotes, "notes");
    } else {
      return res.status(400).json({ error: "Invalid model" });
    }
    res.status(200).json({ summary });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to summarize notes" });
  }
};

exports.summarizePdf = async (req, res) => {
  try {
    // Check file upload
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Get selected model from request body
    const model = req.body.model; // e.g., "gemini", "llama", "claude"

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
        return await summarizeTextWithGemini(text, mode); // default Gemini
      }
    };

    // File type handling
    if (mime === "application/pdf") {
      extractedText = await extractTextFromPdf(req.file.buffer);
      summary = await summarize(extractedText, "pdf");
    } else if (
      mime ===
        "application/vnd.openxmlformats-officedocument.presentationml.presentation" ||
      mime === "application/vnd.ms-powerpoint"
    ) {
      extractedText = await extractTextFromPptx(req.file.buffer);
      summary = await summarize(extractedText, "pptx");
    } else if (mime === "text/plain") {
      extractedText = await extractTextFromTxt(req.file.buffer);
      summary = await summarize(extractedText, "pdf");
    } else if (
      mime ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      extractedText = await extractTextFromDocx(req.file.buffer);
      summary = await summarize(extractedText, "pdf");
    } else {
      return res.status(400).json({ error: "Unsupported file format" });
    }

    if (!extractedText || extractedText.trim().length === 0) {
      return res
        .status(201)
        .json({ error: "No text extracted from the document" });
    }

    res.status(200).json({ summary });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to process document" });
  }
};

exports.downloadPdf = async (req, res) => {
  const { summary } = req.body;

  if (!summary || typeof summary !== "string" || summary.trim() === "") {
    return res.status(400).json({ error: "Invalid or empty summary text" });
  }
  try {
    const pdfBuffer = await generatePdfBuffer(summary);
    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="summary.pdf"',
      "Content-Length": pdfBuffer.length,
    });
    res.send(pdfBuffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to generate PDF" });
  }
};
