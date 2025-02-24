import { useState, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useCreateOrderMutation } from '../services/api';
import { clearCart } from '../redux/slices/cartSlice';
import { setLocation } from '../redux/slices/locationSlice';
import OrderStatus from './OrderStatus';
import PropTypes from 'prop-types';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import locationIcon from '../assets/icons/location-delivery.svg';
import phoneIcon from '../assets/icons/phone.svg';
import commentIcon from '../assets/icons/comment.svg';

const CheckoutForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const selectedAddress = useSelector((state) => state.location);
  const [createOrder, { isLoading, isSuccess }] = useCreateOrderMutation();

  const [formData, setFormData] = useState({
    address: selectedAddress,
    phone: '',
    comment: '',
  });

  const [phoneError, setPhoneError] = useState('');

  const validatePhone = (phone) => {
    const phoneNumber = parsePhoneNumberFromString(phone);
    if (!phoneNumber || !phoneNumber.isValid()) {
      return 'Invalid phone number format';
    }
    return '';
  };

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === 'phone') {
      const errorMessage = validatePhone(value);
      setPhoneError(errorMessage);
    }
  }, []);

  const isDisabled = useMemo(
    () => isLoading || cartItems.length === 0 || phoneError || !formData.phone,
    [isLoading, cartItems, phoneError, formData.phone]
  );

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (isDisabled) return;

      await createOrder({ cartItems, deliveryData: formData });
      dispatch(setLocation(formData.address));
      dispatch(clearCart());
    },
    [cartItems, formData, createOrder, dispatch, isDisabled]
  );

  if (isSuccess) return <OrderStatus onClose={onClose} />;

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
          className="absolute top-3 right-3 w-10 h-10 flex cursor-pointer 
          items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 text-[25px] font-bold transition-colors shadow-md"
        >
          ×
        </button>

        <h2 className="text-xl font-medium">Enter delivery data</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Delivery Address */}
          <InputField
            icon={locationIcon}
            label="Delivery address"
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />

          {/* Phone Number */}
          <div>
            <InputField
              icon={phoneIcon}
              label="Phone number"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+370"
              required
            />
            {phoneError && (
              <p className="text-red-500 text-sm ml-11">{phoneError}</p>
            )}
          </div>

          {/* Comment to Courier */}
          <InputField
            icon={commentIcon}
            label="Comment to courier"
            type="text"
            name="comment"
            value={formData.comment}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="w-full bg-brandYellow hover:bg-yellow-600 transition-colors text-black cursor-pointer 
              rounded-full py-2 text-lg shadow-[0px_4px_12px_0px_#F9BA4266] disabled:bg-gray-200 disabled:cursor-not-allowed disabled:shadow-none"
            disabled={isDisabled}
          >
            {isLoading ? 'Sending...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

const InputField = ({ icon, label, ...props }) => (
  <div className="flex items-center w-full gap-3">
    <span className="w-8 text-xl">
      <img src={icon} alt={`${label} Icon`} />
    </span>
    <div className="w-full">
      <label className="block mb-1">{label}</label>
      <input
        className="w-full p-1 bg-transparent border-[0.9px] border-[#3C3C434A] rounded-[9px] outline-none caret-[#007AFF]"
        {...props}
      />
    </div>
  </div>
);

CheckoutForm.propTypes = {
  onClose: PropTypes.func.isRequired,
};

InputField.propTypes = {
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default CheckoutForm;
