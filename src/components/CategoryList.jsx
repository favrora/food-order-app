import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useGetCategoriesQuery } from "../store/apiSlice";
import { setCategory } from "../store/categorySlice";

const CategoryList = () => {
  const dispatch = useDispatch();
  const selectedCategory = useSelector((state) => state.categories.selectedCategory);
  const { data: categories, error, isLoading } = useGetCategoriesQuery();
  const [isOpen, setIsOpen] = useState(false);

  if (isLoading) return <p className="text-center text-gray-500">Loading categories...</p>;

  if (error || !categories || categories.length === 0)
    return (
      <div className="text-center p-4">
        <p className="text-red-500">Failed to load categories. Please try again later.</p>
      </div>
    );

  // Remove the selected category from the list and put it first order
  const sortedCategories = selectedCategory
    ? [selectedCategory, ...categories.filter((c) => c !== selectedCategory)]
    : categories;

  return (
    <div className="p-4 flex items-center gap-2 overflow-x-auto whitespace-nowrap">
      <button 
        onClick={() => setIsOpen(true)} 
        className="w-10 h-10 flex items-center justify-center bg-yellow-500 text-black rounded-full cursor-pointer text-xl font-bold"
      >
        ⬇️
      </button>

      {/* Display categories */}
      <div className="flex gap-2">
        {sortedCategories.map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded-full cursor-pointer transition-colors 
              ${category === selectedCategory ? "bg-yellow-500 text-black hover:bg-yellow-500" : "bg-white text-black hover:bg-gray-200"}`}
            onClick={() => dispatch(setCategory(category))}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Category selection dialog */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg w-80">
            <h2 className="text-lg font-bold mb-2 text-center">Select Category</h2>
            <ul>
              {categories.map((category) => (
                <li
                  key={category}
                  className="p-2 hover:bg-gray-200 cursor-pointer rounded text-center"
                  onClick={() => {
                    dispatch(setCategory(category));
                    setIsOpen(false);
                  }}
                >
                  {category}
                </li>
              ))}
            </ul>
            <button onClick={() => setIsOpen(false)} className="mt-4 w-full bg-gray-300 p-2 rounded">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryList;
