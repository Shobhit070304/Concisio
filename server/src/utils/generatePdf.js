// const PDFDocument = require('pdfkit');

// const generatePdfBuffer = (text) => {
//   return new Promise((resolve, reject) => {
//     const doc = new PDFDocument();
//     const chunks = [];

//     doc.on('data', chunk => chunks.push(chunk));
//     doc.on('end', () => resolve(Buffer.concat(chunks)));
//     doc.on('error', reject);

//     doc.fontSize(12).text(text, { align: 'left' });
//     doc.end();
//   });
// };

// module.exports = generatePdfBuffer;

const marked = require('marked');
const puppeteer = require('puppeteer');

const generatePdfBuffer = async (markdownText) => {
  const htmlContent = marked.parse(markdownText); // Convert Markdown → HTML

  const finalHtml = `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          h1, h2, h3 { color: #333; }
          ul {}
          li { margin-bottom: 5px; }
          strong { font-weight: bold; }
        </style>
      </head>
      <body>
        ${htmlContent}
      </body>
    </html>
  `;

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(finalHtml);
  const pdfBuffer = await page.pdf({ format: 'A4' });

  await browser.close();
  return pdfBuffer;
};

module.exports = generatePdfBuffer;


