import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../store/categorySlice";

const CategoryList = ({ onSelect }) => {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="overflow-x-auto whitespace-nowrap p-4">
      <div className="flex gap-2">
        {list.map((category) => (
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
