### Holiday App Frontend

[![Deployed App](https://img.shields.io/badge/preview-online-brightgreen)](https://beereket.github.io/holiday-app/)

This project is the frontend for the Holiday App, built with [Angular](https://angular.dev/).  
You can check it live: [https://beereket.github.io/holiday-app/](https://beereket.github.io/holiday-app/)

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [Angular CLI](https://angular.dev/tools/cli) (`npm install -g @angular/cli`)

### Install Dependencies


npm install


### Development Server

Start the dev server with hot reload:


ng serve
# Or, equivalently
npm start


Visit [http://localhost:4200/](http://localhost:4200/) in your browser.

---

## 🏗️ Project Structure

- src/app/ — Angular app components, modules, and routes
- src/assets/ — Static assets (images, etc)
- src/styles.css, src/custom-theme.scss — Global and theme styles
- public/ — Public static files (copied to `dist/`)
- dist/ — Output directory after building

---

## 🛠️ Useful Commands

Generate a new component:

ng generate component component-name


Run unit tests:

ng test


Build for production:

ng build --configuration production


---

## 🌍 Deployment

This app is deployed to GitHub Pages using [`angular-cli-ghpages`](https://github.com/angular-schule/angular-cli-ghpages).

To deploy:

ng build --base-href "https://beereket.github.io/holiday-app/"
npx angular-cli-ghpages --dir=dist/frontend


---

## 📦 Dependencies

- Angular v20.x
- Angular Material
- Syncfusion Maps (`@syncfusion/ej2-angular-maps`)
- See package.json for more

---

## 📝 License

This project is released under the MIT License.
