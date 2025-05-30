// const marked = require('marked');
// const puppeteer = require('puppeteer');

// const generatePdfBuffer = async (markdownText) => {
//   const htmlContent = marked.parse(markdownText); // Convert Markdown → HTML

//   const finalHtml = `
//     <html>
//       <head>
//         <style>
//           body { font-family: Arial, sans-serif; padding: 20px; }
//           h1, h2, h3 { color: #333; }
//           ul {}
//           li { margin-bottom: 5px; }
//           strong { font-weight: bold; }
//         </style>
//       </head>
//       <body>
//         ${htmlContent}
//       </body>
//     </html>
//   `;

//   const browser = await puppeteer.launch({
//     args: ['--no-sandbox', '--disable-setuid-sandbox'],
//     headless: true,
//   });

//   // const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.setContent(finalHtml);
//   const pdfBuffer = await page.pdf({ format: 'A4' });

//   await browser.close();
//   return pdfBuffer;
// };

// module.exports = generatePdfBuffer;



const markdownpdf = require("markdown-pdf");
const fs = require("fs-extra");
const path = require("path");
const os = require("os");
const cssPath = path.join(__dirname, "../styles/pdf-style.css");

const generatePdfBuffer = async (markdownText) => {
  const tempDir = os.tmpdir(); // Get temp folder
  const inputPath = path.join(tempDir, `input-${Date.now()}.md`);
  const outputPath = path.join(tempDir, `output-${Date.now()}.pdf`);

  // Write markdown to temp file
  await fs.writeFile(inputPath, markdownText);

  return new Promise((resolve, reject) => {
    markdownpdf({ cssPath })
      .from(inputPath)
      .to(outputPath, async function () {
        try {
          const buffer = await fs.readFile(outputPath);
          // Cleanup temp files
          await fs.unlink(inputPath);
          await fs.unlink(outputPath);
          resolve(buffer);
        } catch (err) {
          reject(err);
        }
      });
  });
};

module.exports = generatePdfBuffer;



// const html_to_pdf = require('html-pdf-node');
// const marked = require('marked');

// const generatePdfBuffer = async (markdownText) => {
//   const htmlContent = marked.parse(markdownText); // Markdown → HTML

//   const finalHtml = `
//     <html>
//       <head>
//         <style>
//           body { font-family: Arial, sans-serif; padding: 20px; }
//           h1, h2, h3 { color: #333; }
//           ul {}
//           li { margin-bottom: 5px; }
//           strong { font-weight: bold; }
//         </style>
//       </head>
//       <body>
//         ${htmlContent}
//       </body>
//     </html>
//   `;

//   const file = { content: finalHtml };

//   // Options (you can tweak this as needed)
//   const options = { format: 'A4' };

//   const pdfBuffer = await html_to_pdf.generatePdf(file, options);
//   return pdfBuffer;
// };

// module.exports = generatePdfBuffer;
