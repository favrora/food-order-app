import { useState } from "react";
import CategoryList from "./components/CategoryList";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100">
      <h1 className="text-center text-2xl font-bold p-4">Food Order App</h1>
      <CategoryList onSelect={setSelectedCategory} />
      <ProductList category={selectedCategory} />
      <Cart />
    </div>
  );
};

export default App;
