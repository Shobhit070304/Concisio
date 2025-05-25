const mammoth = require("mammoth");
const fs = require("fs").promises;
const fsSync = require("fs");
const path = require("path");
const pdfParse = require("pdf-parse");
const PPTX2Json = require("pptx2json");

async function extractTextFromDocx(buffer) {
  try {
    const data = await pdfParse(buffer);
    console.log(data.text);
    return data.text; // Extracted text from PDF
  } catch (err) {
    console.error(err);
    throw new Error("Failed to parse PDF");
  }
}

async function extractTextFromPptx(buffer) {
  try {
    const tmpDir = path.join(__dirname, "../tmp");
    if (!fsSync.existsSync(tmpDir)) {
      fsSync.mkdirSync(tmpDir, { recursive: true });
    }

    const tmpPath = path.join(tmpDir, `upload-${Date.now()}.pptx`);
    await fs.writeFile(tmpPath, buffer);

    const pptx2json = new PPTX2Json();
    const result = await pptx2json.parse(tmpPath);

    await fs.unlink(tmpPath); // delete temp file after parsing

    let text = "";
    if (result.slides && Array.isArray(result.slides)) {
      result.slides.forEach((slide) => {
        if (slide.texts && Array.isArray(slide.texts)) {
          slide.texts.forEach((textItem) => {
            text += textItem.text + "\n";
          });
        }
      });
    }

    return text;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to parse PPTX");
  }
}

function extractTextFromTxt(buffer) {
  return buffer.toString("utf-8");
}

// async function extractTextFromPptx(buffer) {
//   try {
//     const tmpDir = path.join(__dirname, "../tmp");
//     if (!fsSync.existsSync(tmpDir)) {
//       fsSync.mkdirSync(tmpDir, { recursive: true });
//     }

//     const tmpPath = path.join(tmpDir, `upload-${Date.now()}.pptx`);
//     await fs.writeFile(tmpPath, buffer);

//     const result = await pptx2json.parse(tmpPath);
//     await fs.unlink(tmpPath); // cleanup

//     let text = "";
//     result.slides.forEach((slide) => {
//       slide.texts.forEach((textItem) => {
//         text += textItem.text + "\n";
//       });
//     });

//     return text;
//   } catch (err) {
//     console.error(err);
//     throw new Error("Failed to parse PPTX");
//   }
// }

// async function extractTextFromTxt(buffer) {
//   return buffer.toString("utf-8");
// }

module.exports = {
  extractTextFromDocx,
  extractTextFromPptx,
  extractTextFromTxt,
};
