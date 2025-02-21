import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/productSlice";
import { addToCart } from "../store/cartSlice";

const ProductList = ({ category }) => {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (category) dispatch(fetchProducts(category));
  }, [category, dispatch]);

  const products = useMemo(() => list.map((p) => ({ ...p, _key: crypto.randomUUID() })), [list]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex flex-col gap-4 p-4">
      {products.map(({ _key, name, french_name, rating_quality }) => (
        <div key={_key} className="p-4 border rounded flex items-center justify-between">
          <div>
            <h3 className="font-bold">{name}</h3>
            <p className="text-sm text-gray-500">{french_name}</p>
            <p className="text-lg font-semibold">{rating_quality} €</p>
          </div>
          <button 
            className="w-10 h-10 flex items-center justify-center bg-white text-black border border-gray-300 rounded-full cursor-pointer text-xl font-bold transition-colors hover:bg-gray-200 active:bg-gray-300"
            onClick={() => dispatch(addToCart({ name, rating_quality }))}
          >
            +
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
