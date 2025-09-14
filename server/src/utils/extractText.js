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
    if (!buffer || buffer.length === 0) {
      throw new Error("Empty PDF buffer provided");
    }

    const data = await pdfParse(buffer);
    const text = data.text?.trim();
    
    if (!text || text.length === 0) {
      throw new Error("No text content found in PDF");
    }
    
    return text;
  } catch (error) {
    console.error("PDF extraction error:", error.message);
    throw new Error("Failed to extract text from PDF file");
  }
}

// Extract text from TXT file
function extractTextFromTxt(buffer) {
  try {
    if (!buffer || buffer.length === 0) {
      throw new Error("Empty text buffer provided");
    }

    const text = buffer.toString("utf-8").trim();
    
    if (!text || text.length === 0) {
      throw new Error("No text content found in file");
    }
    
    return text;
  } catch (error) {
    console.error("TXT extraction error:", error.message);
    throw new Error("Failed to extract text from text file");
  }
}

// Extract text from PPTX file
async function extractTextFromPptx(buffer) {
  let tmpPath = null;
  
  try {
    if (!buffer || buffer.length === 0) {
      throw new Error("Empty PPTX buffer provided");
    }

    // Create temp directory
    const tmpDir = path.join(__dirname, "../tmp");
    if (!fsSync.existsSync(tmpDir)) {
      fsSync.mkdirSync(tmpDir, { recursive: true });
    }

    // Create unique temp file
    tmpPath = path.join(tmpDir, `upload-${Date.now()}-${Math.random().toString(36).substr(2, 9)}.pptx`);
    await fs.writeFile(tmpPath, buffer);

    // Parse the .pptx file
    const result = await pptx2json.toJson(tmpPath);

    // Extract text from slides
    let lines = [];
    if (result.slides && Array.isArray(result.slides)) {
      result.slides.forEach((slide, index) => {
        if (slide.texts && Array.isArray(slide.texts)) {
          slide.texts.forEach((textItem) => {
            if (textItem.text && typeof textItem.text === "string") {
              const cleanText = textItem.text.trim();
              if (cleanText.length > 0) {
                lines.push(cleanText);
              }
            }
          });
        }
      });
    }

    // Clean up and deduplicate
    const cleanedLines = Array.from(
      new Set(lines.filter(line => line.length > 0))
    );

    const extractedText = cleanedLines.join("\n").trim();
    
    if (!extractedText || extractedText.length === 0) {
      throw new Error("No text content found in presentation");
    }
    
    return extractedText;
  } catch (error) {
    console.error("PPTX extraction error:", error.message);
    throw new Error("Failed to extract text from PowerPoint file");
  } finally {
    // Cleanup temp file
    if (tmpPath) {
      try {
        await fs.unlink(tmpPath);
      } catch (cleanupError) {
        console.warn("Failed to cleanup temp PPTX file:", cleanupError.message);
      }
    }
  }
}

// Extract text from DOCX file
async function extractTextFromDocx(buffer) {
  try {
    if (!buffer || buffer.length === 0) {
      throw new Error("Empty DOCX buffer provided");
    }

    const { value } = await mammoth.extractRawText({ buffer });
    const text = value?.trim();
    
    if (!text || text.length === 0) {
      throw new Error("No text content found in document");
    }
    
    return text;
  } catch (error) {
    console.error("DOCX extraction error:", error.message);
    throw new Error("Failed to extract text from Word document");
  }
}

module.exports = {
  extractTextFromPdf,
  extractTextFromPptx,
  extractTextFromTxt,
  extractTextFromDocx,
};
