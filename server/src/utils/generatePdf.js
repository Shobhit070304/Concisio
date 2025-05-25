const PDFDocument = require('pdfkit');

const generatePdfBuffer = (text) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    const chunks = [];

    doc.on('data', chunk => chunks.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);

    doc.fontSize(12).text(text, { align: 'left' });
    doc.end();
  });
};

module.exports = generatePdfBuffer;

