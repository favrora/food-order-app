import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../redux/slices/cartSlice';
import OrderStatus from './OrderStatus';
import PropTypes from 'prop-types';

const CheckoutForm = ({ onClose }) => {
  const selectedAddress = useSelector((state) => state.location);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    address: selectedAddress || '',
    phone: '',
    comment: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    dispatch(clearCart());
    setIsOrderPlaced(true);
  };

  if (isOrderPlaced) return <OrderStatus onClose={onClose} />;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-2xl shadow-lg w-96 relative flex flex-col gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 text-xl font-bold transition-colors shadow-md cursor pointer"
          onClick={onClose}
        >
          ×
        </button>

        <h2 className="text-xl font-bold">Enter delivery data</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Delivery Address */}
          <div className="flex items-center w-full">
            <span className="w-8 text-xl mr-2">📍</span>
            <div className="w-full">
              <label className="block text-gray-700 font-medium mb-1">
                Delivery address
              </label>
              <input
                type="text"
                name="address"
                placeholder=""
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-lg bg-transparent"
              />
            </div>
          </div>

          {/* Phone Number */}
          <div className="flex items-center w-full">
            <span className="w-8 text-xl mr-2">📞</span>
            <div className="w-full">
              <label className="block text-gray-700 font-medium mb-1">
                Phone number
              </label>
              <input
                type="tel"
                name="phone"
                placeholder="+370"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-lg bg-transparent"
              />
            </div>
          </div>

          {/* Comment to Courier */}
          <div className="flex items-center w-full">
            <span className="w-8 text-xl mr-2">💬</span>
            <div className="w-full">
              <label className="block text-gray-700 font-medium mb-1">
                Comment to courier
              </label>
              <input
                type="text"
                name="comment"
                placeholder=""
                value={formData.comment}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg bg-transparent"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-500 text-black rounded-full py-3 text-lg font-bold transition-colors hover:bg-yellow-600 active:bg-yellow-700 shadow-md"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Processing...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

CheckoutForm.propTypes = {
  onClose: PropTypes.bool.isRequired,
};

export default CheckoutForm;
