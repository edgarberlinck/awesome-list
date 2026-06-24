import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as yaml from 'js-yaml';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');

const categories = {
  livros: {
    required: ['title', 'author', 'year', 'language', 'link'],
  },
  comunidades: {
    required: ['name', 'platform', 'language', 'focus', 'url'],
  },
  'exercicios-tecnicos': {
    required: ['title', 'company', 'difficulty', 'technologies', 'url'],
  },
  'freelas-disfarcados': {
    required: ['company', 'title', 'technologies', 'estimated_hours', 'status', 'url'],
  },
};

const validStatuses = ['active', 'removed', 'expired'];
const errors = [];
let filesProcessed = 0;

function isValidUrl(urlString) {
  try {
    new URL(urlString);
    return true;
  } catch {
    return false;
  }
}

function validateFile(filePath, category) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const data = yaml.load(content);

    const required = categories[category].required;
    const missing = required.filter((field) => !data[field]);

    if (missing.length > 0) {
      errors.push(`❌ ${filePath}: Missing fields: ${missing.join(', ')}`);
      return false;
    }

    // Validate URLs
    const urlFields = Object.keys(data).filter((key) => key.includes('url') || key.includes('link'));
    urlFields.forEach((field) => {
      if (data[field] && !isValidUrl(data[field])) {
        errors.push(`❌ ${filePath}: Invalid URL in field '${field}': ${data[field]}`);
      }
    });

    // Validate status for freelas-disfarcados
    if (category === 'freelas-disfarcados' && data.status) {
      if (!validStatuses.includes(data.status)) {
        errors.push(
          `❌ ${filePath}: Invalid status '${data.status}'. Must be one of: ${validStatuses.join(', ')}`
        );
      }
    }

    filesProcessed++;
    return true;
  } catch (error) {
    errors.push(`❌ ${filePath}: ${error.message}`);
    return false;
  }
}

function validateCategory(categoryPath, categoryName) {
  if (!fs.existsSync(categoryPath)) {
    return;
  }

  const files = fs.readdirSync(categoryPath).filter((f) => f.endsWith('.yml') && f !== 'README.md');

  files.forEach((file) => {
    const filePath = path.join(categoryPath, file);
    validateFile(filePath, categoryName);
  });
}

console.log('🔍 Validating Tech Resources Hub...\n');

Object.keys(categories).forEach((category) => {
  const categoryPath = path.join(rootDir, category);
  validateCategory(categoryPath, category);
});

console.log(`✅ Processed ${filesProcessed} files\n`);

if (errors.length > 0) {
  console.log('Validation Errors:\n');
  errors.forEach((error) => console.log(error));
  process.exit(1);
} else {
  console.log('✅ All validations passed!');
  process.exit(0);
}
