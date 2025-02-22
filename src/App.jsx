import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "./store/categorySlice";
import { useGetCategoriesQuery } from "./store/apiSlice";
import { loadCart } from "./store/cartSlice";
import Header from "./components/Header";
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

    // load card data from localStorage
    dispatch(loadCart());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <CategoryList onSelect={(category) => dispatch(setCategory(category))} />
      <ProductList category={selectedCategory} />
      <Cart />
    </div>
  );
};

export default App;
