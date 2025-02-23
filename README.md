# Food Order App

## Demo

![Food Order App](https://github.com/favrora/food-order-app/blob/master/public/demo.jpg?raw=true)

## Features

- Lazy loading for products when selecting categories. The frontend displays 10 products at the beginning and starts loading 5 at a time as the page is scrolled. This helps reduce the load on the browser and speed up the app since there can be hundreds of products for each category

- Caching of API calls. Each API result is cached in localStorage with an expiration of 1 day. After a day, the cache is reset and the frontend requests the data again if the mode is opened. The cache expiration can be changed in the config.js file. When big changes eventually happen, we need send to the frontend that the cache is no longer valid and the data needs to be requested again.

- ESLint + Prettier. ESLint finds errors and helps apply best practices, and Prettier automatically formats code, making it consistent. Together, they prevent bugs, respect stylistic conflicts, and simplify development.

### Built With

- React.js
- Redux
- Tailwind CSS
- Prettier
- Vite

## Getting Started

To get a local copy up and running follow these simple steps.

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/favrora/food-order-app.git
   ```
2. From the root, install NPM packages
   ```sh
   npm install
   ```
3. Start the vite app:
   ```sh
   npm run dev
   ```
