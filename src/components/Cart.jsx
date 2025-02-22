import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../store/cartSlice";
import CheckoutForm from "./CheckoutForm";

const Cart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCheckout, setIsCheckout] = useState(false);
  const dispatch = useDispatch();
  const { items, total } = useSelector((state) => state.cart);

  const closeModal = () => setIsOpen(false);

  return (
    <>
      {/* Floating cart button */}
      <button 
        className="fixed bottom-4 right-4 bg-yellow-500 hover:bg-yellow-600 text-black rounded-full w-20 h-20 transition-colors flex flex-col items-center justify-center text-xl font-bold shadow-lg cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <span className="text-sm mt-1">{total.toFixed(2)} €</span>
        🛒
      </button>

      {/* Cart modal */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          onClick={closeModal} // Close when clicking outside
        >
          <div 
            className="bg-white p-6 relative rounded-lg shadow-lg w-80"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            <button className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 text-xl font-bold transition-colors shadow-md cursor pointer"
            onClick={closeModal}
            >
              ×
            </button>
            <h2 className="text-xl font-bold mb-4">Cart</h2>

            {items.length === 0 ? (
              <p>The cart is empty</p>
            ) : (
              <ul className="mb-4">
                {items.map((item) => (
                  <li key={item.name} className="flex justify-between items-center border-b border-b-gray-300 py-2">
                    <span>{item.name}</span>
                    
                    <div className="flex items-center gap-2">
                      {/* Decrease quantity button */}
                      <button
                        className="w-8 h-8 flex items-center justify-center border border-gray-300 cursor-pointer rounded-full bg-white hover:bg-gray-200 transition-colors text-black font-bold"
                        onClick={() => dispatch(removeFromCart(item.name))}
                      >
                        -
                      </button>

                      {/* Item quantity */}
                      <span className="text-lg font-semibold">{item.quantity}</span>

                      {/* Increase quantity button */}
                      <button
                        className="w-8 h-8 flex items-center justify-center border border-gray-300 cursor-pointer rounded-full bg-white hover:bg-gray-200 transition-colors text-black font-bold"
                        onClick={() => dispatch(addToCart(item))}
                      >
                        +
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            {/* Cart total */}
            <p className="text-right font-bold mb-2">Total: {total.toFixed(2)} €</p>

            {/* Checkout button */}
            <button 
              className="w-full bg-green-500 text-white rounded-full py-2 text-lg font-bold"
              onClick={() => { setIsOpen(false); setIsCheckout(true); }}
            >
              Checkout
            </button>
          </div>
        </div>
      )}

      {isCheckout && <CheckoutForm onClose={() => setIsCheckout(false)} onSubmit={() => { setIsCheckout(false); alert('Order placed!'); }} />}
    </>
  );
};

export default Cart;
