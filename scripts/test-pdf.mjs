import { createRequire } from "module";
const require = createRequire(import.meta.url);
const pdf = require("pdf-parse");
const fs = require("fs");

console.log("Reading file...");
try {
    const dataBuffer = fs.readFileSync("Rules-V5.1.pdf");
    console.log("File read. Size:", dataBuffer.length);
    console.log("Type of pdf:", typeof pdf);
    // console.log("pdf export:", pdf); // Reduce noise

    let parseFunc = pdf;
    if (typeof pdf !== 'function') {
        if (typeof pdf.default === 'function') {
            parseFunc = pdf.default;
            console.log("Using pdf.default");
        } else {
            console.log("pdf is not a function and has no default function. Keys:", Object.keys(pdf));
        }
    }

    console.log("Parsing...");
    parseFunc(dataBuffer).then(function (data) {
        console.log("Success! Text length:", data.text.length);
        console.log("Preview:", data.text.substring(0, 100));
    }).catch(function (error) {
        console.error("Promise Error:", error);
    });
} catch (e) {
    console.error("Sync Error:", e);
}
