import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useGetCategoriesQuery } from '../services/api';
import { setCategory } from '../redux/slices/categorySlice';
import arrowDownIcon from '../assets/icons/arrow-down.svg';

const CategoryList = () => {
  const dispatch = useDispatch();
  const selectedCategory = useSelector(
    (state) => state.categories.selectedCategory
  );
  const { data: categories, error, isLoading } = useGetCategoriesQuery();
  const [isOpen, setIsOpen] = useState(false);

  if (isLoading)
    return <p className="text-center text-gray-500">Loading categories...</p>;

  if (error || !categories || categories.length === 0)
    return (
      <div className="text-center p-4">
        <p className="text-red-500">
          Failed to load categories. Please try again later.
        </p>
      </div>
    );

  // Remove the selected category from the list and put it first order
  const sortedCategories = selectedCategory
    ? [selectedCategory, ...categories.filter((c) => c !== selectedCategory)]
    : categories;

  return (
    <div className="px-4 flex gap-2">
      <div className="py-4">
        <button
          onClick={() => setIsOpen(true)}
          className="w-[43px] h-[43px] flex items-center justify-center bg-brandYellow custom-boxShadow hover:bg-yellow-600 rounded-full cursor-pointer"
        >
          <img src={arrowDownIcon} alt="Arrow Down Icon" />
        </button>
      </div>

      <div className="flex items-center py-4 gap-2 overflow-x-auto whitespace-nowrap scrollbar-hide">
        {/* Display categories */}
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

        {/* Category selection dialog */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setIsOpen(false)}
          >
            <div
              className="bg-white p-6 relative rounded-[20px] shadow-lg w-120 max-w-[90%] flex flex-col gap-6"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-3 right-3 w-10 h-10 flex cursor-pointer items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 text-[25px] font-bold transition-colors shadow-md cursor pointer"
              >
                ×
              </button>

              <h2 className="text-xl font-medium">Select Category</h2>

              <ul className="max-h-[60vh] overflow-y-auto p-2 custom-scrollbar">
                {categories.map((category) => (
                  <li
                    key={category}
                    className={`p-3 cursor-pointer rounded break-words whitespace-normal 
                      ${selectedCategory === category ? 'bg-brandYellow hover:bg-yellow-600' : 'hover:bg-gray-200'}`}
                    onClick={() => {
                      dispatch(setCategory(category));
                      setIsOpen(false);
                    }}
                  >
                    {category}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryList;
