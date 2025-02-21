import { useGetCategoriesQuery } from "../store/apiSlice";

const CategoryList = ({ onSelect }) => {
  const { data: categories, error, isLoading } = useGetCategoriesQuery();

  if (isLoading) return <p className="text-center text-gray-500">Loading categories...</p>;

  if (error || categories.length === 0)
    return (
      <div className="text-center p-4">
        <p className="text-red-500">Failed to load categories. Please try again later.</p>
      </div>
    );

  return (
    <div className="overflow-x-auto whitespace-nowrap p-4">
      <div className="flex gap-2">
        {categories.map((category) => (
          <button
            key={category}
            className="px-4 py-2 bg-yellow-500 text-black rounded-full cursor-pointer transition-colors hover:bg-yellow-600 active:bg-yellow-700"
            onClick={() => onSelect(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
