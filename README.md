# Music School Learning Platform 🎵

This is a responsive web application project for a music school learning platform, built using **HTML**, **Sass (SCSS)**, and **vanilla JavaScript**. The project structure follows EPAM’s predefined template and uses local JSON data.

---
Deploy for testing: https://project-deploy-test.onrender.com/

## 📦 Prerequisites

Please install the following:

- [Node.js & npm](https://nodejs.org/)
- [Sass (Dart Sass standalone or npm-based)](https://sass-lang.com/install)

> Note: This project uses the standalone Dart Sass version installed manually and linked via PATH on Linux.

---

## 🚀 Project Setup

1. Clone the repository
2. Open the folder in VS Code
3. Initialize and install dependencies (optional if you later add npm packages):
   ```bash
   npm install
   ```
4. Compile Sass files:
   ```bash
   npm run compile
   ```
5. Compile TS files:
   ```bash
   npm run build:ts
   ```

6. Right-click `index.html` and choose **"Open with Live Server"**

## 📁 Folder Structure

project-root/
├── src/
│   ├── css/
│   ├── data/
│   ├── images/
│   ├── js/
│   ├── scss/
│   ├── contact.html
│   ├── gallery.html
│   ├── index.html
├── .eslintignore
├── .gitignore
├── .stylelintignore
├── eslint.config.mjs
├── package-lock.json
├── package.json
├── README.md
├── stylelint.config.cjs


## Linting

To check code quality:

```bash
npm run lint        # Lint JS and SCSS
npm run lint:js     # Lint JavaScript files
npm run lint:styles # Lint SCSS styles
```
