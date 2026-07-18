const Tesseract = require('tesseract.js');
const fs = require('fs');
const path = require('path');

const srcDir = 'c:\\xLab\\ahmedabad\\goldmine\\v2_gfx\\source\\goldmine_newsletter';
const vueDir = 'c:\\xLab\\ahmedabad\\goldmine\\v2_gfx\\dist\\goldmine_newsletter\\src\\views';

async function runAudit() {
  const results = {};
  console.log("Starting audit on 15 pages...");
  
  const worker = await Tesseract.createWorker('eng');
  
  for (let i = 1; i <= 15; i++) {
    const imgPath = path.join(srcDir, `page_${i}.png`);
    const vuePath = path.join(vueDir, `GmPage${i}.vue`);
    
    console.log(`Processing Page ${i}...`);
    let ocrText = "";
    try {
      if (fs.existsSync(imgPath)) {
        const { data: { text } } = await worker.recognize(imgPath);
        ocrText = text;
      } else {
        ocrText = "IMAGE NOT FOUND";
      }
    } catch (e) {
      ocrText = "OCR FAILED: " + e.message;
    }

    let vueText = "";
    try {
      if (fs.existsSync(vuePath)) {
        vueText = fs.readFileSync(vuePath, 'utf8');
      } else {
        vueText = "VUE FILE NOT FOUND";
      }
    } catch (e) {
      vueText = "READ FAILED: " + e.message;
    }

    results[`Page_${i}`] = {
      ocr: ocrText,
      vue: vueText
    };
  }
  
  await worker.terminate();
  fs.writeFileSync(path.join(srcDir, 'audit_results.json'), JSON.stringify(results, null, 2));
  console.log("Audit extraction complete. Results saved to audit_results.json");
}

runAudit();
