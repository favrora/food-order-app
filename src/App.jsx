import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCategory } from './redux/slices/categorySlice';
import { useGetCategoriesQuery } from './services/api';
import { loadCart } from './redux/slices/cartSlice';
import Header from './layout/Header';
import CategoryList from './components/CategoryList';
import ProductList from './components/ProductList';
import Cart from './components/Cart';

const App = () => {
  const dispatch = useDispatch();
  const selectedCategory = useSelector(
    (state) => state.categories.selectedCategory
  );

  const { data: categories } = useGetCategoriesQuery();

  useEffect(() => {
    const savedCategory = localStorage.getItem('selectedCategory');
    if (savedCategory) dispatch(setCategory(savedCategory));

    dispatch(loadCart());
  }, [dispatch]);

  const handleCategorySelect = useCallback(
    (category) => dispatch(setCategory(category)),
    [dispatch]
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <CategoryList onSelect={handleCategorySelect} categories={categories} />
      <ProductList category={selectedCategory} />
      <Cart />
    </div>
  );
};

export default App;
