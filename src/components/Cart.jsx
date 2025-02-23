import { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import CheckoutForm from './CheckoutForm';
import shoppingCartIcon from '../assets/icons/shopping-cart.svg';

const Cart = () => {
  const [isCheckout, setIsCheckout] = useState(false);
  const total = useSelector((state) => state.cart.total).toFixed(2);

  const openCheckout = useCallback(() => setIsCheckout(true), []);
  const closeCheckout = useCallback(() => setIsCheckout(false), []);

  return (
    <>
      <div className="fixed bottom-4 right-0 p-2 custom-boxShadow bg-white rounded-tl-full rounded-bl-full">
        <button
          className="bg-brandYellow hover:bg-yellow-600 text-black rounded-full w-20 h-20 transition-colors flex flex-col items-center justify-center text-xl font-bold custom-boxShadow cursor-pointer"
          onClick={openCheckout}
        >
          <span className="text-sm mb-1">{total} €</span>
          <img src={shoppingCartIcon} alt="Shopping Cart Icon" />
        </button>
      </div>

      {isCheckout && (
        <CheckoutForm onClose={closeCheckout} onSubmit={closeCheckout} />
      )}
    </>
  );
};

export default Cart;
