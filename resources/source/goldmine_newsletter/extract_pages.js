const fs = require('fs');
const path = require('path');

const inputFile = path.join(__dirname, '..', 'goldmine_newsletter.html');
const outputDir = __dirname;

const htmlContent = fs.readFileSync(inputFile, 'utf-8');

// Regex to find base64 images
const regex = /data:image\/(png|jpeg|jpg);base64,([^'"]+)/g;

let match;
let pageNumber = 1;

while ((match = regex.exec(htmlContent)) !== null) {
  const ext = match[1];
  const base64Data = match[2];
  
  const buffer = Buffer.from(base64Data, 'base64');
  const filename = path.join(outputDir, `page_${pageNumber}.${ext}`);
  
  fs.writeFileSync(filename, buffer);
  console.log(`Saved ${filename}`);
  pageNumber++;
}

console.log('Extraction complete.');
