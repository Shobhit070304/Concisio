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

  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    headless: true,
  });

  // const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(finalHtml);
  const pdfBuffer = await page.pdf({ format: 'A4' });

  await browser.close();
  return pdfBuffer;
};

module.exports = generatePdfBuffer;



// To use puppeteer in browsers
// const chromium = require("chrome-aws-lambda");
// const puppeteer = require("puppeteer-core");
// const marked = require("marked");

// const generatePdfBuffer = async (markdownText) => {
//   console.log("1");
//   const htmlContent = marked.parse(markdownText);
//   console.log("1");
//   const finalHtml = `
//     <html>
//       <head>
//         <style>
//           body { font-family: Arial, sans-serif; padding: 20px; }
//           h1, h2, h3 { color: #333; }
//           li { margin-bottom: 5px; }
//           strong { font-weight: bold; }
//         </style>
//       </head>
//       <body>${htmlContent}</body>
//     </html>
//   `;
//   console.log("1");
//   // fallback for executablePath
//   const executablePath =
//     (await chromium.executablePath) ||
//     "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
//   console.log("1");
//   const browser = await puppeteer.launch({
//     args: chromium.args,
//     defaultViewport: chromium.defaultViewport,
//     executablePath: executablePath,
//     headless: chromium.headless,
//   });
//   console.log("1");
//   const page = await browser.newPage();
//   await page.setContent(finalHtml, { waitUntil: "networkidle0" });

//   const pdfBuffer = await page.pdf({ format: "A4" });

//   await browser.close();
//   return pdfBuffer;
// };

// module.exports = generatePdfBuffer;
