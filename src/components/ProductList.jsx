import { useGetProductsByCategoryQuery } from "../store/apiSlice";

const ProductList = ({ category, addToCart }) => {
  const { data: products, error, isLoading } = useGetProductsByCategoryQuery(category, {
    skip: !category,
  });

  if (!category) return <p>Select a category</p>;
  if (isLoading) return <p>Loading products...</p>;
  if (error) return <p>Error loading products.</p>;

  return (
    <div className="flex flex-col gap-4 p-4">
      {products.map(({ name, rating_quality }) => (
        <div key={name} className="p-4 border rounded flex items-center justify-between">
          <div>
            <h3 className="font-bold">{name}</h3>
            <p className="text-lg font-semibold">{rating_quality} €</p>
          </div>
          <button 
            className="w-10 h-10 flex items-center justify-center bg-white text-black border border-gray-300 rounded-full cursor-pointer text-xl font-bold transition-colors hover:bg-gray-200 active:bg-gray-300"
            onClick={() => addToCart({ name, rating_quality })}
          >
            +
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
