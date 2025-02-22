import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "./store/categorySlice";
import { useGetCategoriesQuery } from "./store/apiSlice";
import CategoryList from "./components/CategoryList";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";

const App = () => {
  const dispatch = useDispatch();
  const selectedCategory = useSelector((state) => state.categories.selectedCategory);

  useGetCategoriesQuery();

  useEffect(() => {
    const savedCategory = localStorage.getItem("selectedCategory");
    if (savedCategory) dispatch(setCategory(savedCategory));
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-100">
      <h1 className="text-center text-2xl font-bold p-4">Food Order App</h1>
      <CategoryList onSelect={(category) => dispatch(setCategory(category))} />
      <ProductList category={selectedCategory} />
      <Cart />
    </div>
  );
};

export default App;
