import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');

const categories = {
  livros: {
    title: '📖 Livros',
    description: 'Referências essenciais em desenvolvimento de software',
    columns: ['Título', 'Autor', 'Ano', 'Linguagem', 'Dificuldade'],
    fields: ['title', 'author', 'year', 'language', 'difficulty'],
  },
  comunidades: {
    title: '👥 Comunidades',
    description: 'Espaços para networking e aprendizado colaborativo',
    columns: ['Nome', 'Plataforma', 'Linguagem', 'Foco'],
    fields: ['name', 'platform', 'language', 'focus'],
  },
  'exercicios-tecnicos': {
    title: '💪 Exercícios Técnicos',
    description: 'Desafios de programação propostos por empresas',
    columns: ['Título', 'Empresa', 'Dificuldade', 'Tecnologias'],
    fields: ['title', 'company', 'difficulty', 'technologies'],
  },
  'freelas-disfarcados': {
    title: '🎭 Freelas Disfarçados',
    description: 'Testes que parecem desafios mas solicitam trabalho real',
    columns: ['Empresa', 'Título', 'Tecnologias', 'Status'],
    fields: ['company', 'title', 'technologies', 'status'],
  },
};

function formatArray(arr) {
  if (Array.isArray(arr)) {
    return arr.join(', ');
  }
  return arr || '-';
}

function sortByTitle(items) {
  return items.sort((a, b) => {
    const titleA = a.data.title || a.data.name || a.data.company || '';
    const titleB = b.data.title || b.data.name || b.data.company || '';
    return titleA.localeCompare(titleB);
  });
}

function readFilesInCategory(categoryPath) {
  if (!fs.existsSync(categoryPath)) {
    return [];
  }

  const files = fs.readdirSync(categoryPath).filter((f) => f.endsWith('.yml'));

  return files.map((file) => {
    const filePath = path.join(categoryPath, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(content);
    return { file, data };
  });
}

function generateMarkdownTable(items, config) {
  if (items.length === 0) {
    return '_(Nenhum recurso adicionado ainda)_';
  }

  const sorted = sortByTitle(items);
  const rows = sorted.map((item) => {
    const cells = config.fields.map((field) => {
      const value = item.data[field];
      const formatted = formatArray(value);
      return formatted.substring(0, 50); // Truncate long values
    });
    return `| ${cells.join(' | ')} |`;
  });

  const header = `| ${config.columns.join(' | ')} |`;
  const separator = `| ${config.columns.map(() => '---').join(' | ')} |`;

  return [header, separator, ...rows].join('\n');
}

function generateCategoryReadme(categoryName, config) {
  const categoryPath = path.join(rootDir, categoryName);
  const items = readFilesInCategory(categoryPath);

  const table = generateMarkdownTable(items, config);

  const readme = `# ${config.title}

${config.description}

## Recursos Disponíveis

${table}

## Como Contribuir

Para adicionar um novo recurso a esta categoria:

1. Crie um arquivo `.yml` na pasta \`${categoryName}/\`
2. Siga o formato esperado com todos os campos obrigatórios
3. Abra um Pull Request
4. Aguarde revisão

Veja [CONTRIBUTING.md](../CONTRIBUTING.md) para detalhes completos.

---

**Total de recursos:** ${items.length}
`;

  return readme;
}

function main() {
  console.log('📝 Generating category READMEs...\n');

  Object.entries(categories).forEach(([categoryName, config]) => {
    const readme = generateCategoryReadme(categoryName, config);
    const readmePath = path.join(rootDir, categoryName, 'README.md');

    // Create directory if it doesn't exist
    const categoryDir = path.dirname(readmePath);
    if (!fs.existsSync(categoryDir)) {
      fs.mkdirSync(categoryDir, { recursive: true });
    }

    fs.writeFileSync(readmePath, readme);
    console.log(`✅ Generated ${categoryName}/README.md`);
  });

  console.log('\n✅ All documentation generated!');
  process.exit(0);
}

main();
