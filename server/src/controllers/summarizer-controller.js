const { YoutubeTranscript } = require("youtube-transcript");
const summarizeTextWithGemini = require("../utils/ai-service");
const generatePdfBuffer = require("../utils/generatePdf");
const {
  extractTextFromDocx,
  extractTextFromPptx,
  extractTextFromTxt,
} = require("../utils/extractText");

exports.summarizeVideo = async (req, res) => {
  const { videoUrl } = req.body;

  if (!videoUrl) {
    return res.status(400).json({ error: "Video URL is required" });
  }

  let videoId;
  try {
    const urlObj = new URL(videoUrl);
    videoId = urlObj.searchParams.get("v") || urlObj.pathname.split("/").pop();
    if (!videoId) throw new Error("Invalid video URL format");
  } catch (e) {
    return res.status(400).json({ error: "Invalid YouTube URL" });
  }

  try {
    const transcript = await YoutubeTranscript.fetchTranscript(videoId);
    const fullText = transcript.map((t) => t.text).join(" ");

    const summary = await summarizeTextWithGemini(fullText, "youtube");
    res.status(200).json({ summary });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to summarize video" });
  }
};

exports.downloadPdf = async (req, res) => {
  const { summary } = req.body;

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

exports.summarizeNotes = async (req, res) => {
  const { rawNotes } = req.body;
  try {
    if (!rawNotes || rawNotes.trim().length === 0) {
      return res.status(400).json({ error: "Notes text is required" });
    }
    const summary = await summarizeTextWithGemini(rawNotes, "notes");

    res.status(200).json({ summary });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to summarize notes" });
  }
};

exports.summarizePdf = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    console.log(req.file)

    const mime = req.file.mimetype;
    let extractedText = "";

    if (
      mime ===
      "application/pdf"
    ) {
      extractedText = await extractTextFromDocx(req.file.buffer);
    } else if (
      mime ===
      "application/vnd.openxmlformats-officedocument.presentationml.presentation"
    ) {
      extractedText = await extractTextFromPptx(req.file.buffer);
    } else if (mime === "text/plain") {
      extractedText = await extractTextFromTxt(req.file.buffer);
    } else {
      return res.status(400).json({ error: "Unsupported file format" });
    }

    const summary = await summarizeTextWithGemini(extractedText, "pdf");
    res.status(200).json({ summary });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to process document" });
  }
};
