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

### Validar YAML
```bash
npm run validate
```
Valida todos os arquivos .yml das categorias

### Verificar Links
```bash
npm run check-links
```
Verifica se todos os links estão funcionando

## Estrutura do Projeto

```
awesome-list/
├── src/
│   └── pages/
│       ├── index.astro          # Página inicial
│       └── [category].astro     # Páginas de categoria
├── livros/                      # YAML dos livros
├── comunidades/                 # YAML das comunidades
├── exercicios-tecnicos/         # YAML dos exercícios
├── freelas-disfarcados/         # YAML dos freelas
├── astro.config.mjs             # Configuração Astro
└── package.json
```

## Adicionar Novo Recurso

1. Crie um arquivo `.yml` na pasta da categoria
2. Preencha os campos obrigatórios
3. Execute `npm run validate` para verificar
4. Commit e push

Exemplo para livros (`livros/meu-livro.yml`):
```yaml
title: Nome do Livro
author: Autor
year: 2024
language: Portuguese
difficulty: Intermediate
link: https://example.com
description: |
  Descrição do livro
```

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
