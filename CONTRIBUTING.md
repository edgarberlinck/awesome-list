# 🤝 Guia de Contribuição

Obrigado por querer contribuir com o Tech Resources Hub! Este guia vai te ajudar a adicionar novos recursos ao site.

## 📋 Antes de Contribuir

- ✅ Verifique se o recurso já não existe no site
- ✅ Certifique-se de que o recurso é de qualidade e relevante
- ✅ Tenha o link/URL do recurso em mãos

## 🚀 Como Adicionar um Recurso

### 1. Fork e Clone

```bash
# Fork o repositório no GitHub
# Depois clone seu fork:
git clone https://github.com/SEU-USUARIO/awesome-list.git
cd awesome-list
```

### 2. Crie um Branch

```bash
git checkout -b add-nome-do-recurso
```

### 3. Adicione o Arquivo Markdown

Crie um arquivo `.md` na pasta da categoria apropriada:

- `livros/` - Para livros
- `comunidades/` - Para comunidades e fóruns
- `exercicios-tecnicos/` - Para desafios de código
- `freelas-disfarcados/` - Para testes técnicos abusivos
- `newsletters/` - Para newsletters

**Nome do arquivo:** Use kebab-case (exemplo: `meu-livro-incrivel.md`)

### 4. Formato do Conteúdo

Você tem total liberdade para escrever o conteúdo em Markdown! Aqui estão alguns exemplos:

#### Exemplo: Livro

```markdown
# Nome do Livro

**Autor:** Nome do Autor  
**Ano:** 2024  
**Idioma:** Portuguese  
**Dificuldade:** Intermediate

## Descrição

Uma breve descrição sobre o livro e por que vale a pena ler.

## Por que ler?

- Motivo 1
- Motivo 2
- Motivo 3

## Links

- [Comprar na Amazon](https://amazon.com/...)
- [Site oficial](https://example.com)

## Tags

`programming` `design-patterns` `best-practices`
```

#### Exemplo: Newsletter

```markdown
# Nome da Newsletter

**Autor/Organização:** Nome  
**Idioma:** English  
**Frequência:** Semanal

## Sobre

Descrição da newsletter e do que ela trata.

## Links

- [Assinar](https://newsletter.com)
- [LinkedIn](https://linkedin.com/...)

## Tags

`javascript` `newsletter` `web-development`
```

#### Exemplo: Comunidade

```markdown
# Nome da Comunidade

**Plataforma:** Discord / Slack / Reddit  
**Idioma:** Portuguese  
**Membros:** ~5000

## Sobre

Descrição da comunidade, foco e atividades.

## Como Participar

Instruções para entrar na comunidade.

## Links

- [Entrar no Discord](https://discord.gg/...)

## Tags

`community` `discord` `backend`
```

### 5. Commit e Push

```bash
git add .
git commit -m "feat: Add [nome do recurso]"
git push origin add-nome-do-recurso
```

### 6. Abra um Pull Request

1. Vá até o repositório original no GitHub
2. Clique em "New Pull Request"
3. Selecione seu branch
4. Preencha a descrição explicando o recurso
5. Aguarde a revisão!

## ✅ Checklist do PR

Antes de abrir o PR, verifique:

- [ ] O arquivo está na pasta correta
- [ ] O nome do arquivo está em kebab-case
- [ ] O markdown está bem formatado
- [ ] Os links funcionam
- [ ] O conteúdo é relevante e de qualidade
- [ ] Não há informações sensíveis ou ofensivas

## 🔍 Processo de Revisão

1. **Markdown Lint** - O CI valida a formatação automaticamente
2. **Revisão Manual** - Um maintainer revisa o conteúdo
3. **Merge** - Se aprovado, seu recurso é adicionado ao site!
4. **Deploy** - O site é atualizado automaticamente em poucos minutos

## 🚫 O que NÃO adicionar

- Links quebrados ou spam
- Conteúdo ofensivo ou discriminatório
- Recursos de baixa qualidade
- Propaganda excessiva
- Informações falsas ou enganosas

## 🎨 Dicas de Markdown

```markdown
# Título Principal (H1)
## Subtítulo (H2)
### Sub-subtítulo (H3)

**Negrito**
*Itálico*

- Lista
- De
- Items

1. Lista
2. Numerada

[Link](https://example.com)

`código inline`

\```javascript
// Bloco de código
const hello = "world";
\```
```

## 💬 Dúvidas?

- Abra uma [issue](https://github.com/edgarberlinck/awesome-list/issues/new) com a tag `question`
- Ou inicie uma [discussion](https://github.com/edgarberlinck/awesome-list/discussions)

## 📜 Código de Conduta

Seja respeitoso, inclusivo e colaborativo. Este é um projeto da comunidade para a comunidade.

---

**Obrigado por contribuir!** 🎉
