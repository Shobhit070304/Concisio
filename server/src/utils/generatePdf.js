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

//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.setContent(finalHtml);
//   const pdfBuffer = await page.pdf({ format: 'A4' });

//   await browser.close();
//   return pdfBuffer;
// };

// module.exports = generatePdfBuffer;



// To use puppeteer in browsers
const chromium = require("chrome-aws-lambda");
const puppeteer = require("puppeteer-core");
const marked = require("marked");

const generatePdfBuffer = async (markdownText) => {
  const htmlContent = marked.parse(markdownText);

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

  let executablePath = await chromium.executablePath;

  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: executablePath,
    headless: chromium.headless,
  });

  const page = await browser.newPage();
  await page.setContent(finalHtml, { waitUntil: "networkidle0" });

  const pdfBuffer = await page.pdf({ format: "A4" });

  await browser.close();
  return pdfBuffer;
};

module.exports = generatePdfBuffer;
