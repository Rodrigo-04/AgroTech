# AgroTech


# 🔍 Comandos do GitBash
Repositório com alguns comandos úteis para facilitar o uso do GitHub

## 📚 Documentação
- [Documentação Git](https://git-scm.com/doc)
- [Documentação GitHub](https://docs.github.com/pt)

## 💻 Comandos mais utilizados

- Navegue até o diretorio desejado, abrindo o GitBash na pasta correta ou utilizando:
```
cd /caminho/para/o/diretorio
```

- Para clonar o repositório utilize:
```
git clone "url do repositório"
```

- Para mudar a branch:
  ```
git branch -m master main
  ```

- Para atualizar o repositório local do seu PC verifique a branch em que se econtra utilizando "git branch". Nesse caso estamos utilizando apenas a branch "main", então para atualizar o repositório, utilize:
```
git pull origin main
```
- Para fazer o upload de alterações de um repositório local para o repositório remoto do GitHub, siga os passos:
Verifica o status do repositório, ou seja, quais arquivos foram alterados
```
git status
```
Adiciona todos os arquivos alterados
```
git add .
```
para arquivo específico
```
git add caminho/do/arquivo
```
Faça o commit
```
git commit -m "Descrição das alterações, preferencialmente com data e arquivo alterado"
```
Envie as alterações para o GitHub
```
git push origin main
```

----

# JDO-FRONT-REACT
Este projeto se trata de um App para a materia de Laboratório de Engenaria de Software, aplicada pela professora Sandra na Faculdade de Tecnologia de São Paulo (FATECSP).

## Sumário

- [Funcionalidades](#funcionalidades)
- [Requisitos do Sistema](#requisitos-do-sistema)
- [Instalação](#instalação)

## Funcionalidades

Listar as principais funcionalidades ou recursos do projeto.

## Requisitos do Sistema

[Node.js](https://nodejs.org/pt-br/download) na versão ^22.16.0
```diff
node -v
```
npm na versão ^11.4.1
```diff
npm -v
```

## Instalação

Siga as etapas abaixo para instalar e executar o projeto em sua máquina:

1. Clone este repositório para sua máquina.
2. Abra o terminal e navegue até o diretório do projeto.
3. Execute o comando `npm install` para instalar as dependências.
4. Execute o comando `npx expo run` para rodar o projeto
5. Agora você está pronto para começar a editar/testar projeto.
