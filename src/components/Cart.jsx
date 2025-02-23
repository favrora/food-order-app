import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../redux/slices/cartSlice';
import CheckoutForm from './CheckoutForm';
import shoppingCartIcon from '../assets/icons/shopping-cart.svg';
import plusIcon from '../assets/icons/plus.svg';
import minusIcon from '../assets/icons/minus.svg';

const Cart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCheckout, setIsCheckout] = useState(false);
  const dispatch = useDispatch();
  const { items, total } = useSelector((state) => state.cart);

  const closeModal = () => setIsOpen(false);

  return (
    <>
      {/* Floating cart button */}
      <div className="fixed bottom-4 right-0 p-2 custom-boxShadow bg-white rounded-tl-full rounded-bl-full">
        <button
          className="bg-brandYellow hover:bg-yellow-600 text-black rounded-full w-20 h-20 transition-colors flex flex-col items-center justify-center text-xl font-bold custom-boxShadow cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          <span className="text-sm mb-1">{total.toFixed(2)} €</span>
          <img src={shoppingCartIcon} alt="Shopping Cart Icon" />
        </button>
      </div>

      {/* Cart modal */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center"
          onClick={closeModal} // Close when clicking outside
        >
          <div
            className="bg-white p-6 relative rounded-lg shadow-lg w-80"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 w-10 h-10 flex cursor-pointer items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 text-[25px] font-bold transition-colors shadow-md cursor pointer"
            >
              ×
            </button>
            <h2 className="text-xl font-bold mb-4">Cart</h2>

            {items.length === 0 ? (
              <p>The cart is empty</p>
            ) : (
              <ul className="mb-4 p-2 max-h-60 overflow-y-auto custom-scrollbar">
                {items.map((item) => (
                  <li
                    key={item.name}
                    className="flex justify-between items-center border-b border-b-gray-300 py-2"
                  >
                    <span>{item.name}</span>

                    <div className="flex items-center gap-2">
                      <button
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-white hover:bg-gray-200 transition-colors cursor-pointer custom-boxShadow"
                        onClick={() => dispatch(removeFromCart(item.name))}
                      >
                        <img src={minusIcon} alt="Minus Icon" />
                      </button>

                      <span className="text-lg font-semibold">
                        {item.quantity}
                      </span>

                      <button
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-white hover:bg-gray-200 transition-colors cursor-pointer custom-boxShadow"
                        onClick={() => dispatch(addToCart(item))}
                      >
                        <img src={plusIcon} alt="Plus Icon" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            <p className="text-right font-bold mb-2">
              Total: {total.toFixed(2)} €
            </p>

            <button
              className="w-full bg-brandYellow hover:bg-yellow-600 transition-colors text-black cursor-pointer rounded-full py-2 text-lg font-medium custom-boxShadow"
              onClick={() => {
                setIsOpen(false);
                setIsCheckout(true);
              }}
            >
              Checkout
            </button>
          </div>
        </div>
      )}

      {isCheckout && (
        <CheckoutForm
          onClose={() => setIsCheckout(false)}
          onSubmit={() => {
            setIsCheckout(false);
            alert('Order placed!');
          }}
        />
      )}
    </>
  );
};

export default Cart;
