const Tesseract = require('tesseract.js');

Tesseract.recognize(
  'page_12.png',
  'eng',
  { logger: m => console.log(m) }
).then(({ data: { text } }) => {
  console.log('--- EXTRACTED TEXT ---');
  console.log(text);
});
