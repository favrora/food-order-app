import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../store/cartSlice";
import OrderStatus from "./OrderStatus";

const CheckoutForm = ({ onClose }) => {
  const { total } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({ address: "", phone: "+370", comment: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Real API call should be here
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    dispatch(clearCart());
    setIsOrderPlaced(true);
  };

  if (isOrderPlaced) return <OrderStatus onClose={onClose} />;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" onClick={onClose}>
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative" onClick={(e) => e.stopPropagation()}>
        <button
          className="absolute top-3 right-3 text-2xl font-bold text-gray-600 hover:text-black"
          onClick={onClose}
        >
          ×
        </button>

        <h2 className="text-xl font-bold mb-4 text-center">Enter delivery data</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <label className="flex items-center gap-2">
            <span>📍</span>
            <input
              type="text"
              name="address"
              placeholder="Delivery address"
              value={formData.address}
              onChange={handleChange}
              required
              className="border p-2 rounded flex-1"
            />
          </label>

          <label className="flex items-center gap-2">
            <span>📞</span>
            <input
              type="tel"
              name="phone"
              placeholder="Phone number"
              value={formData.phone}
              onChange={handleChange}
              required
              className="border p-2 rounded flex-1"
            />
          </label>

          <label className="flex items-center gap-2">
            <span>💬</span>
            <input
              type="text"
              name="comment"
              placeholder="Comment to courier"
              value={formData.comment}
              onChange={handleChange}
              className="border p-2 rounded flex-1"
            />
          </label>

          <button
            type="submit"
            className="w-full bg-yellow-500 text-black rounded-full py-2 text-lg font-bold transition-colors hover:bg-yellow-600 active:bg-yellow-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processing..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;
