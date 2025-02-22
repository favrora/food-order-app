import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useGetCategoriesQuery } from '../services/api';
import { setCategory } from '../store/slices/categorySlice';

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
    <div className="p-4 flex gap-2">
      <div>
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 my-4 mx-2 flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 rounded-full cursor-pointer"
        >
          ⬇️
        </button>
      </div>

      <div className="p-4 flex items-center gap-2 overflow-x-auto whitespace-nowrap custom-scrollbar">
        {/* Display categories */}
        <div className="flex gap-2">
          {sortedCategories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full cursor-pointer transition-colors 
                ${category === selectedCategory ? 'bg-yellow-500 text-black hover:bg-yellow-600' : 'bg-white text-black hover:bg-gray-200'}`}
              onClick={() => dispatch(setCategory(category))}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Category selection dialog */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setIsOpen(false)}
          >
            <div
              className="bg-white p-6 rounded-lg shadow-lg w-80 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 text-xl font-bold transition-colors shadow-md cursor-pointer"
              >
                ×
              </button>

              <h2 className="text-lg font-bold mb-4 text-center">
                Select Category
              </h2>

              <ul className="max-h-60 overflow-y-auto p-2">
                {categories.map((category) => (
                  <li
                    key={category}
                    className={`p-3 cursor-pointer rounded break-words whitespace-normal 
                      ${selectedCategory === category ? 'bg-yellow-500 hover:bg-yellow-600' : 'hover:bg-gray-200'}`}
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
