const mammoth = require("mammoth");
const fs = require("fs").promises;
const fsSync = require("fs");
const path = require("path");
const pdfParse = require("pdf-parse");
const PPTX2Json = require("pptx2json");
const pptx2json = new PPTX2Json();

// Extract text from PDF file
async function extractTextFromPdf(buffer) {
  try {
    const data = await pdfParse(buffer);
    return data.text; // Extracted text from PDF
  } catch (err) {
    console.error(err);
    throw new Error("Failed to parse PDF");
  }
}

// Extract text from TXT file
function extractTextFromTxt(buffer) {
  try {
    return buffer.toString("utf-8");
  } catch (err) {
    console.error("Failed to convert buffer to text:", err);
    return "";
  }
}

// Extract text from PPTX file
async function extractTextFromPptx(buffer) {
  try {
    const tmpDir = path.join(__dirname, "../tmp");
    if (!fsSync.existsSync(tmpDir)) {
      fsSync.mkdirSync(tmpDir, { recursive: true });
    }

    const tmpPath = path.join(tmpDir, `upload-${Date.now()}.pptx`);
    await fs.writeFile(tmpPath, buffer);

    // Parse the .pptx file using pptx2json
    const result = await pptx2json.toJson(tmpPath);

    // Delete the temp file after parsing
    await fs.unlink(tmpPath);

    // Extract text
    let lines = [];
    if (result.slides && Array.isArray(result.slides)) {
      result.slides.forEach((slide) => {
        if (slide.texts && Array.isArray(slide.texts)) {
          slide.texts.forEach((textItem) => {
            if (textItem.text && typeof textItem.text === "string") {
              lines.push(textItem.text.trim());
            }
          });
        }
      });
    }

    // Clean up: remove empty lines, trim, and deduplicate
    const cleanedLines = Array.from(
      new Set(
        lines.map((line) => line.trim()).filter((line) => line.length > 0)
      )
    );

    return cleanedLines.join("\n");
  } catch (err) {
    console.error("Error extracting PPTX text:", err);
    throw new Error("Failed to parse PPTX");
  }
}

// Extract text from DOCX file
async function extractTextFromDocx(buffer) {
  const { value } = await mammoth.extractRawText({ buffer });
  return value.trim();
}

module.exports = {
  extractTextFromPdf,
  extractTextFromPptx,
  extractTextFromTxt,
  extractTextFromDocx,
};
