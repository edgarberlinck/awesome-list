# 🛠️ Desenvolvimento Local

## Pré-requisitos

- Node.js 22+ instalado
- npm

## Instalação

```bash
# Instalar dependências
npm install
```

## Comandos Disponíveis

### Desenvolvimento
```bash
npm run dev
```
Inicia o servidor de desenvolvimento em `http://localhost:4321`
- Hot reload automático
- Atualiza ao modificar arquivos

### Build de Produção
```bash
npm run build
```
Gera os arquivos estáticos em `./dist/`

### Preview do Build
```bash
npm run preview
```
Testa o build de produção localmente

## Estrutura do Projeto

```
awesome-list/
├── src/
│   └── pages/
│       ├── index.astro          # Página inicial
│       └── [category].astro     # Páginas de categoria
├── livros/                      # Markdown dos livros
├── comunidades/                 # Markdown das comunidades
├── exercicios-tecnicos/         # Markdown dos exercícios
├── freelas-disfarcados/         # Markdown dos freelas
├── astro.config.mjs             # Configuração Astro
└── package.json
```

## Adicionar Novo Recurso

1. Crie um arquivo `.md` na pasta da categoria
2. Escreva o conteúdo em Markdown (formato livre!)
3. Commit e push
4. GitHub Actions faz o deploy automaticamente

### Exemplo: `livros/meu-livro.md`

```markdown
# Nome do Livro

**Autor:** Nome do Autor  
**Ano:** 2024  
**Linguagem:** Portuguese  
**Dificuldade:** Intermediate

## Descrição

Breve descrição do livro e por que vale a pena ler.

## Por que ler?

- Ponto interessante 1
- Ponto interessante 2
- Ponto interessante 3

## Links

- [Comprar na Amazon](https://amazon.com/...)
- [Site oficial](https://example.com)

## Tags

`programming` `design-patterns` `best-practices`
```

## Vantagens do Markdown

✅ **Liberdade total** - Escreva o conteúdo como quiser  
✅ **Rica formatação** - Headers, listas, links, código, etc  
✅ **Simples** - Qualquer um sabe editar  
✅ **Flexível** - Cada recurso pode ter estrutura diferente  
✅ **Preview** - GitHub mostra renderizado automaticamente

## Troubleshooting

### Erro de Node.js
Se receber erro de versão do Node:
```bash
node --version  # Deve ser 22+
```

### Cache Issues
```bash
rm -rf node_modules .astro dist
npm install
npm run dev
```

## Qualidade do Código

### Markdown Lint

O projeto usa markdownlint para garantir a qualidade dos arquivos Markdown.

```bash
# Instalar globalmente
npm install -g markdownlint-cli2

# Rodar o lint
markdownlint-cli2 "**/*.md" "!node_modules" "!dist"
```

### Configuração

As regras do markdownlint estão em `.markdownlint.json`:
- Line length (MD013): desabilitada - permite linhas longas
- HTML tags (MD033): permite algumas tags específicas
- First line heading (MD041): desabilitada - flexível
- Bare URLs (MD034): desabilitada - permite URLs sem markdown
- Emphasis style (MD036): desabilitada - flexível

### CI/CD

O workflow `markdown-lint.yml` roda automaticamente em:
- Pull Requests que modificam arquivos `.md`
- Push na branch main com arquivos `.md`

Se o lint falhar, o PR não poderá ser mergeado.
