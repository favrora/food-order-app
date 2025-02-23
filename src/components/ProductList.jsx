import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../redux/slices/cartSlice';
import { useGetProductsByCategoryQuery } from '../services/api';
import PropTypes from 'prop-types';
import plusIcon from '../assets/icons/plus.svg';
import minusIcon from '../assets/icons/minus.svg';

const ProductList = ({ category }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const {
    data: products,
    error,
    isLoading,
  } = useGetProductsByCategoryQuery(category, { skip: !category });

  if (!category) return <p>Select a category</p>;
  if (isLoading) return <p>Loading products...</p>;
  if (error) return <p>Error loading products.</p>;

  return (
    <div className="flex flex-col gap-4 p-4">
      {products.map(({ name, french_name, rating_quality }) => {
        const cartItem = cartItems.find((item) => item.name === name);
        const quantity = cartItem ? cartItem.quantity : 0;
        const inCart = quantity > 0;

        return (
          <div
            key={name}
            className={`p-4 custom-boxShadow bg-white rounded-[18px] gap-2 flex items-end justify-between border-2 ${
              inCart ? 'border-brandYellow' : 'border-transparent'
            }`}
          >
            <div>
              <h3 className="font-bold">{name}</h3>
              <h4 className="text-gray-500">{french_name}</h4>
              <p className="text-lg font-semibold">€{rating_quality}</p>
            </div>

            <div className="flex items-center gap-2">
              {inCart && (
                <button
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-white hover:bg-gray-200 transition-colors cursor-pointer custom-boxShadow"
                  onClick={() => dispatch(removeFromCart(name))}
                >
                  <img src={minusIcon} alt="Minus Icon" />
                </button>
              )}

              {inCart && (
                <span className="text-lg font-semibold">{quantity}</span>
              )}

              <button
                className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors cursor-pointer ${
                  inCart
                    ? 'bg-white hover:bg-gray-200 custom-boxShadow'
                    : 'bg-brandYellow hover:bg-yellow-600'
                }`}
                onClick={() =>
                  dispatch(addToCart({ name, french_name, rating_quality }))
                }
              >
                <img src={plusIcon} alt="Plus Icon" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

ProductList.propTypes = {
  category: PropTypes.string,
};

export default ProductList;
