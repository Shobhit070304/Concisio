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

const generatePdfBuffer = async (markdownText) => {
  const tempDir = os.tmpdir();
  const inputPath = path.join(tempDir, `input-${Date.now()}-${Math.random().toString(36).substr(2, 9)}.md`);
  const outputPath = path.join(tempDir, `output-${Date.now()}-${Math.random().toString(36).substr(2, 9)}.pdf`);
  const cssPath = path.resolve(__dirname, "../styles/pdf-style.css");

  try {
    // Validate input
    if (!markdownText || typeof markdownText !== 'string' || markdownText.trim().length === 0) {
      throw new Error("Invalid markdown text provided");
    }

    // Write markdown to temp file
    await fs.writeFile(inputPath, markdownText);

    // Configure markdown-pdf options for better PDF generation
    const options = {
      cssPath: cssPath,
      paperFormat: 'A4',
      paperOrientation: 'portrait',
      paperBorder: '1in',
      renderDelay: 1000,
      css: `
        @page { margin: 1in; }
        body { 
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          font-size: 14px;
          line-height: 1.7;
          color: #333;
        }
        h1, h2, h3, h4, h5, h6 { 
          page-break-after: avoid;
          color: #2c3e50;
        }
        p, li { 
          orphans: 2; 
          widows: 2; 
        }
        table { 
          page-break-inside: avoid; 
        }
        pre, blockquote { 
          page-break-inside: avoid; 
        }
      `
    };

    return new Promise((resolve, reject) => {
      markdownpdf(options)
        .from(inputPath)
        .to(outputPath, async function (err) {
          try {
            if (err) {
              console.error("PDF generation error:", err);
              reject(new Error("Failed to generate PDF"));
              return;
            }

            const buffer = await fs.readFile(outputPath);
            
            // Cleanup temp files
            try {
              await fs.unlink(inputPath);
              await fs.unlink(outputPath);
            } catch (cleanupErr) {
              console.warn("Failed to cleanup temp files:", cleanupErr.message);
            }
            
            resolve(buffer);
          } catch (err) {
            console.error("Error processing PDF:", err);
            reject(err);
          }
        });
    });
  } catch (error) {
    console.error("PDF generation error:", error);
    throw new Error("Failed to generate PDF");
  }
};

module.exports = generatePdfBuffer;
