import fs from 'fs';
import path from 'path';

const dir = 'c:\\xLab\\ahmedabad\\goldmine\\v2_gfx\\packages\\blocks\\src\\props';

const files = fs.readdirSync(dir);

for (const file of files) {
  if (!file.endsWith('.vue')) continue;
  
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  let modified = false;

  // Replace import from './PropField.vue'
  if (content.includes("import PropField from './PropField.vue';")) {
    content = content.replace("import PropField from './PropField.vue';", "import { GmdPropField as PropField } from '@goldmine/ui';");
    modified = true;
  }
  
  if (content.includes("import { GmPropSection, PropField } from '@goldmine/blocks';")) {
    content = content.replace("import { GmPropSection, PropField } from '@goldmine/blocks';", "import { GmdPropSection as GmPropSection, GmdPropField as PropField } from '@goldmine/ui';");
    modified = true;
  }

  if (content.includes("import { PropField } from '@goldmine/blocks';")) {
    content = content.replace("import { PropField } from '@goldmine/blocks';", "import { GmdPropField as PropField } from '@goldmine/ui';");
    modified = true;
  }
  
  if (content.includes("import { GmPropSection } from '@goldmine/blocks';")) {
    content = content.replace("import { GmPropSection } from '@goldmine/blocks';", "import { GmdPropSection as GmPropSection } from '@goldmine/ui';");
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log('Fixed', file);
  }
}
