import { useState, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useGetCategoriesQuery } from '../services/api';
import { setCategory } from '../redux/slices/categorySlice';
import arrowDownIcon from '../assets/icons/arrow-down.svg';
import CategoryModal from '../modals/CategoryModal';

const CategoryList = () => {
  const dispatch = useDispatch();
  const selectedCategory = useSelector(
    (state) => state.categories.selectedCategory
  );
  const { data: categories, error, isLoading } = useGetCategoriesQuery();
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);

  const sortedCategories = useMemo(() => {
    if (!categories) return [];
    return selectedCategory
      ? [selectedCategory, ...categories.filter((c) => c !== selectedCategory)]
      : categories;
  }, [selectedCategory, categories]);

  if (isLoading)
    return <p className="text-center text-gray-500">Loading categories...</p>;

  if (error || !categories?.length)
    return (
      <div className="text-center p-4">
        <p className="text-red-500">
          Failed to load categories. Please try again later.
        </p>
      </div>
    );

  return (
    <div className="px-4 flex gap-2">
      <div className="py-4">
        <button
          onClick={openModal}
          className="w-[43px] h-[43px] flex items-center justify-center bg-brandYellow custom-boxShadow hover:bg-yellow-600 transition-colors rounded-full cursor-pointer"
        >
          <img src={arrowDownIcon} alt="Arrow Down Icon" />
        </button>
      </div>

      <div className="flex items-center py-4 gap-2 overflow-x-auto whitespace-nowrap scrollbar-hide">
        <div className="flex h-full gap-2">
          {sortedCategories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full cursor-pointer transition-colors custom-boxShadow 
                ${category === selectedCategory ? 'bg-brandYellow text-black hover:bg-yellow-600' : 'bg-white text-black hover:bg-gray-200'}`}
              onClick={() => dispatch(setCategory(category))}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {isOpen && (
        <CategoryModal
          categories={categories}
          selectedCategory={selectedCategory}
          onSelect={(category) => {
            dispatch(setCategory(category));
            closeModal();
          }}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default CategoryList;
