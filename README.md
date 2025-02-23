# Food Order App

Food Order App is a simple demo React application for ordering food with the ability to select a category, add products to the cart and place an order.

## Demo

Demo url: [`https://food-order-appx.netlify.app/`](https://food-order-appx.netlify.app/)

<p>
  <img src="https://github.com/favrora/food-order-app/blob/master/public/demo.jpg?raw=true" width="60%">
</p>

## Features

- **Lazy loading** for products when selecting categories. The frontend displays 10 products at the beginning and starts loading 5 at a time as the page is scrolled. This helps reduce the load on the browser and speed up the app since there can be hundreds of products for each category

- **Caching of API calls.** Each API result is cached in localStorage with an expiration of 1 day. After a day, the cache is reset and the frontend requests the data again if the mode is opened. The cache expiration can be changed in the config.js file. When big changes eventually happen, we need send to the frontend that the cache is no longer valid and the data needs to be requested again.

- **Order Status Polling.** The order status is automatically updated with RTK Query's polling mechanism, reducing unnecessary API calls and keeping the user informed in real-time.

- **Persistent Cart and Selected Category.** The cart state and selected category are stored in localStorage, so users don’t lose their selections after a page refresh or closing the browser.

- **Strict ESLint & Prettier Configuration.** The project enforces consistent coding standards using ESLint + Prettier, helping to prevent bugs and maintain clean code.

- **Optimized Component Structure.** The project is structured to separate global layout components (Header, Cart), reusable modals, and main UI components, making it easy to scale and maintain.

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
