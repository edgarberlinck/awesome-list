import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');

const categories = ['livros', 'comunidades', 'exercicios-tecnicos', 'freelas-disfarcados'];
const brokenLinks = [];
let linksChecked = 0;

async function checkUrl(url) {
  try {
    const response = await fetch(url, {
      method: 'HEAD',
      redirect: 'follow',
      timeout: 5000,
    });
    return response.status >= 200 && response.status < 400;
  } catch {
    return false;
  }
}

function extractUrls(data) {
  const urls = {};
  const urlFields = ['url', 'link'];

  urlFields.forEach((field) => {
    if (data[field]) {
      urls[field] = data[field];
    }
  });

  return urls;
}

async function validateFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(content);
    const urls = extractUrls(data);

    for (const [field, url] of Object.entries(urls)) {
      linksChecked++;
      const isValid = await checkUrl(url);

      if (!isValid) {
        brokenLinks.push(`❌ ${filePath} (${field}): ${url}`);
      }
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
  }
}

async function validateCategory(categoryPath) {
  if (!fs.existsSync(categoryPath)) {
    return;
  }

  const files = fs.readdirSync(categoryPath).filter((f) => f.endsWith('.yml') && f !== 'README.md');

  for (const file of files) {
    const filePath = path.join(categoryPath, file);
    await validateFile(filePath);
  }
}

async function main() {
  console.log('🔗 Checking links...\n');

  for (const category of categories) {
    const categoryPath = path.join(rootDir, category);
    await validateCategory(categoryPath);
  }

  console.log(`✅ Checked ${linksChecked} links\n`);

  if (brokenLinks.length > 0) {
    console.log('Broken Links Found:\n');
    brokenLinks.forEach((link) => console.log(link));
    process.exit(1);
  } else {
    console.log('✅ All links are valid!');
    process.exit(0);
  }
}

main();
