const fs = require('fs');
const path = require('path');

const propsDir = path.join(__dirname, 'src/components/editor/props');
const files = fs.readdirSync(propsDir).filter(f => f.startsWith('Props') && f.endsWith('.vue') && f !== 'PropsPage.vue');

for (const file of files) {
  const filePath = path.join(propsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Add import PropField from './PropField.vue';
  if (!content.includes("import PropField")) {
    content = content.replace(/<script setup lang="ts">/, `<script setup lang="ts">\nimport PropField from './PropField.vue';`);
  }

  // Remove p-4 from root container
  content = content.replace(/<div class="flex flex-col gap-4 p-4">/, '<div class="flex flex-col gap-4">');

  // Replace label wrappers with PropField
  // Regex needs to handle multiline input elements inside the div
  // A div with class="flex flex-col gap-1" containing a label and some component
  const regex = /<div class="flex flex-col gap-1">\s*<label[^>]*>(.*?)<\/label>([\s\S]*?)<\/div>/g;
  
  content = content.replace(regex, (match, labelText, innerContent) => {
    // Add fluid to inputs inside
    let newInner = innerContent
      .replace(/<InputText/g, '<InputText fluid')
      .replace(/<InputNumber/g, '<InputNumber fluid')
      .replace(/<Textarea/g, '<Textarea fluid autoResize')
      .replace(/<Select\s/g, '<Select fluid ');
    
    return `<PropField label="${labelText}">${newInner}</PropField>`;
  });

  fs.writeFileSync(filePath, content);
  console.log(`Refactored ${file}`);
}
