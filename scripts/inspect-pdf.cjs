const fs = require('fs');
const path = require('path');

const PDF_PATH = path.join(__dirname, '../Rules-V5.1.pdf');

async function extractTextFromPDF(pdfPath) {
    const pdfjsMod = await import('pdfjs-dist/legacy/build/pdf.mjs');
    const pdfjsLib = pdfjsMod;

    const data = new Uint8Array(fs.readFileSync(pdfPath));
    const loadingTask = pdfjsLib.getDocument(data);
    const pdfDocument = await loadingTask.promise;

    console.log(`PDF has ${pdfDocument.numPages} pages.`);

    const i = 37;
    if (i <= pdfDocument.numPages) {
        const page = await pdfDocument.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map(item => item.str).join(' ');

        console.log(`\n--- Page ${i} ---`);
        console.log("START[" + pageText.substring(0, 500) + "]END");
    }
}

extractTextFromPDF(PDF_PATH).catch(console.error);
