import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToCart,
  removeFromCart,
  clearItemFromCart,
} from '../redux/slices/cartSlice';
import { useGetProductsByCategoryQuery } from '../services/api';
import PropTypes from 'prop-types';
import plusIcon from '../assets/icons/plus.svg';
import minusIcon from '../assets/icons/minus.svg';
import placeholderImage from '../assets/images/placeholder.jpg';

const ProductList = ({ category }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const {
    data: products,
    error,
    isLoading,
  } = useGetProductsByCategoryQuery(category, { skip: !category });

  const observerRef = useRef(null);
  const [visibleProducts, setVisibleProducts] = useState([]);

  // Loading the first 10 products at once
  useEffect(() => {
    if (products) setVisibleProducts(products.slice(0, 10));
  }, [products]);

  const handleAddToCart = useCallback(
    (product) => dispatch(addToCart(product)),
    [dispatch]
  );

  const handleRemoveFromCart = useCallback(
    (name) => dispatch(removeFromCart(name)),
    [dispatch]
  );

  // Loading more products when scrolling
  useEffect(() => {
    if (!products || visibleProducts.length >= products.length) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleProducts((prev) => [
            ...prev,
            ...products.slice(prev.length, prev.length + 5),
          ]);
        }
      },
      { rootMargin: '100px' }
    );

    if (observerRef.current) observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [visibleProducts, products]);

  const cartItemsMap = useMemo(() => {
    return cartItems.reduce((acc, item) => {
      acc[item.name] = item.quantity;
      return acc;
    }, {});
  }, [cartItems]);

  if (!category) return <p>Select a category</p>;
  if (isLoading) return <p>Loading products...</p>;
  if (error) return <p>Error loading products.</p>;

  return (
    <div className="flex flex-col gap-4 p-4">
      {visibleProducts.map(
        ({ name, french_name, rating_quality, image }, index) => {
          const quantity = cartItemsMap[name] || 0;
          const inCart = quantity > 0;

          return (
            <div
              key={`${name}-${index}`}
              className={`p-1 custom-boxShadow bg-white rounded-[18px] flex items-center border-2 gap-4 ${
                inCart ? 'border-brandYellow' : 'border-transparent'
              }`}
            >
              <div className="w-23 h-23 flex-shrink-0 rounded-[18px] overflow-hidden bg-gray-200">
                <img
                  src={image || placeholderImage}
                  alt={name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-1 flex flex-col flex-1 gap-y-2">
                <h3 className="font-bold text-lg">{name}</h3>
                <h4 className="text-gray-500 text-sm">{french_name}</h4>

                <div className="flex items-end justify-between">
                  <div className="flex gap-3">
                    <p className="text-lg font-semibold">
                      €{Number(rating_quality).toFixed(2)}
                    </p>
                    <p className="text-lg font-semibold text-gray-500 opacity-60 line-through">
                      €6.00
                    </p>
                  </div>

                  <div className="flex h-full gap-2">
                    {inCart && (
                      <>
                        <button
                          className="w-8 h-8 flex items-center justify-center rounded-full bg-white hover:bg-gray-200 transition-colors cursor-pointer custom-boxShadow"
                          onClick={() => handleRemoveFromCart(name)}
                        >
                          <img src={minusIcon} alt="Minus Icon" />
                        </button>

                        <QuantityInput
                          name={name}
                          french_name={french_name}
                          rating_quality={rating_quality}
                          quantity={quantity}
                          dispatch={dispatch}
                        />
                      </>
                    )}

                    <button
                      className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors cursor-pointer ${
                        inCart
                          ? 'bg-white hover:bg-gray-200 custom-boxShadow'
                          : 'bg-brandYellow hover:bg-yellow-600'
                      }`}
                      onClick={() =>
                        handleAddToCart({ name, french_name, rating_quality })
                      }
                    >
                      <img src={plusIcon} alt="Plus Icon" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        }
      )}

      <div ref={observerRef} className="h-10"></div>
    </div>
  );
};

const QuantityInput = ({
  name,
  french_name,
  rating_quality,
  quantity,
  dispatch,
}) => {
  const [inputValue, setInputValue] = useState(quantity > 0 ? quantity : '');

  useEffect(() => {
    setInputValue(quantity > 0 ? quantity : '');
  }, [quantity]);

  const handleQuantityChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleQuantityBlur = () => {
    const parsedValue = parseInt(inputValue, 10);

    if (Number.isNaN(parsedValue) || parsedValue <= 0) {
      dispatch(clearItemFromCart(name));
    } else {
      dispatch(
        addToCart({ name, french_name, rating_quality, quantity: parsedValue })
      );
    }
  };

  return (
    <input
      type="number"
      min="1"
      value={inputValue}
      onChange={handleQuantityChange}
      onBlur={handleQuantityBlur}
      className="w-12 text-center text-2xl font-semibold border border-gray-300 rounded-md"
    />
  );
};

ProductList.propTypes = {
  category: PropTypes.string,
};

QuantityInput.propTypes = {
  name: PropTypes.string.isRequired,
  french_name: PropTypes.string.isRequired,
  rating_quality: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  quantity: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default ProductList;
