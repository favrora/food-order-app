import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../store/cartSlice";
import CheckoutForm from "./CheckoutForm";

const Cart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCheckout, setIsCheckout] = useState(false);
  const dispatch = useDispatch();
  const { items, total } = useSelector((state) => state.cart);

  return (
    <>
      <button 
        className="fixed bottom-4 right-4 bg-yellow-500 text-black rounded-full w-16 h-16 flex flex-col items-center justify-center text-xl font-bold shadow-lg"
        onClick={() => setIsOpen(true)}
      >
        🛒
        <span className="text-sm font-normal mt-1">{total.toFixed(2)} €</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-xl font-bold mb-4">Cart</h2>
            {items.length === 0 ? (
              <p>The cart is empty</p>
            ) : (
              <ul className="mb-4">
                {items.map((item, index) => (
                  <li key={index} className="flex justify-between items-center border-b py-2">
                    <span>{item.name}</span>
                    <button 
                      className="text-red-500 text-xl font-bold" 
                      onClick={() => dispatch(removeFromCart(index))}
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <p className="text-right font-bold mb-2">Total: {total.toFixed(2)} €</p>
            <button 
              className="w-full bg-green-500 text-white rounded-full py-2 text-lg font-bold"
              onClick={() => { setIsOpen(false); setIsCheckout(true); }}
            >
              Checkout
            </button>
            <button 
              className="w-full bg-gray-300 text-black rounded-full py-2 text-lg font-bold mt-2"
              onClick={() => setIsOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {isCheckout && <CheckoutForm onClose={() => setIsCheckout(false)} onSubmit={() => { setIsCheckout(false); alert('Order placed!'); }} />}
    </>
  );
};

export default Cart;
