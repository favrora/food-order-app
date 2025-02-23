import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../redux/slices/cartSlice';
import { setLocation } from '../redux/slices/locationSlice';
import OrderStatus from './OrderStatus';
import PropTypes from 'prop-types';
import locationIcon from '../assets/icons/location-delivery.svg';
import phoneIcon from '../assets/icons/phone.svg';
import commentIcon from '../assets/icons/comment.svg';

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    dispatch(setLocation(formData.address));
    setIsSubmitting(false);
    dispatch(clearCart());
    setIsOrderPlaced(true);
  };

  if (isOrderPlaced) return <OrderStatus onClose={onClose} />;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-[20px] shadow-lg w-120 max-w-[90%] relative flex flex-col gap-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-10 h-10 flex cursor-pointer items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 text-[25px] font-bold transition-colors shadow-md cursor pointer"
        >
          ×
        </button>

        <h2 className="text-xl font-medium">Enter delivery data</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Delivery Address */}
          <div className="flex items-center w-full gap-3">
            <span className="w-8 text-xl">
              <img src={locationIcon} alt="Location Icon" />
            </span>
            <div className="w-full">
              <label className="block mb-1">Delivery address</label>
              <input
                type="text"
                name="address"
                placeholder=""
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full p-1 bg-transparent border-[0.9px] border-[#3C3C434A] rounded-[9px] outline-none caret-[#007AFF]"
              />
            </div>
          </div>

          {/* Phone Number */}
          <div className="flex items-center w-full gap-3">
            <span className="w-8 text-xl">
              <img src={phoneIcon} alt="Phone Icon" />
            </span>
            <div className="w-full">
              <label className="block mb-1">Phone number</label>
              <input
                type="tel"
                name="phone"
                placeholder="+370"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full p-1 bg-transparent border-[0.9px] border-[#3C3C434A] rounded-[9px] outline-none caret-[#007AFF]"
              />
            </div>
          </div>

          {/* Comment to Courier */}
          <div className="flex items-center w-full gap-3">
            <span className="w-8 text-xl">
              <img src={commentIcon} alt="Comment Icon" />
            </span>
            <div className="w-full">
              <label className="block mb-1">Comment to courier</label>
              <input
                type="text"
                name="comment"
                placeholder=""
                value={formData.comment}
                onChange={handleChange}
                className="w-full p-1 bg-transparent border-[0.9px] border-[#3C3C434A] rounded-[9px] outline-none caret-[#007AFF]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-brandYellow hover:bg-yellow-600 transition-colors text-black cursor-pointer rounded-full py-2 text-lg shadow-[0px_4px_12px_0px_#F9BA4266]"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Submit'}
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
