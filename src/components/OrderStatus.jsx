import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import successIcon from '../assets/icons/success.svg';
import arrowBackIcon from '../assets/icons/arrow-back.svg';
import checkmarkBrandIcon from '../assets/icons/checkmark-brand.svg';

const OrderStatus = ({ onClose }) => {
  const [status, setStatus] = useState(0);
  const selectedAddress = useSelector((state) => state.location);

  useEffect(() => {
    // Update the status after 3 seconds
    // In a real project here we should make an API call and after receiving data we show the result
    const timer = setTimeout(() => setStatus(1), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center p-6">
      <button
        className="absolute top-4 left-4 w-10 h-10 flex items-center justify-center bg-brandYellow hover:bg-yellow-600 transition-colors cursor-pointer rounded-full py-2 custom-boxShadow round-full"
        onClick={onClose}
      >
        <img src={arrowBackIcon} alt="Arrow Back Icon" />
      </button>

      <div
        className={`w-[165px] h-[165px] flex items-center justify-center border-10 rounded-full mb-6 
          ${status === 0 ? 'border-brandYellow' : 'border-green-500'}`}
      >
        {status === 0 ? (
          <div className="flex space-x-3 animate-pulse">
            <span className="w-5 h-5 bg-brandYellow rounded-full animate-bounce [animation-delay:0ms]"></span>
            <span className="w-5 h-5 bg-brandYellow rounded-full animate-bounce [animation-delay:200ms]"></span>
            <span className="w-5 h-5 bg-brandYellow rounded-full animate-bounce [animation-delay:400ms]"></span>
          </div>
        ) : (
          <img src={successIcon} alt="Success Icon" />
        )}
      </div>

      <h2 className="text-lg">{selectedAddress}</h2>
      <p className="text-xl font-semibold text-center mt-1">
        We are sending your order
      </p>
      <p className="mt-2">CZ00006846QR</p>
      <p className="mt-2">Your order number</p>
      <p className="text-3xl font-bold">
        {Math.floor(Math.random() * 900) + 100}
      </p>

      <div className="flex flex-col items-center gap-2 mt-6">
        <div className="flex flex-col items-center text-gray-400">
          {status === 1 ? (
            <img src={checkmarkBrandIcon} alt="Checkmark Brand Icon" />
          ) : (
            <div className="w-6 h-6 rounded-full bg-gray-200"></div>
          )}
          <p className={`${status === 1 ? 'text-brandYellow' : ''}`}>
            Order is sent
          </p>
        </div>

        <div className="flex flex-col items-center text-gray-400">
          {status === 1 ? (
            <img src={checkmarkBrandIcon} alt="Checkmark Brand Icon" />
          ) : (
            <div className="w-6 h-6 rounded-full bg-gray-200"></div>
          )}
          <p>Restaurant approved your order</p>
        </div>

        <div className="flex flex-col items-center text-gray-400">
          {status === 1 ? (
            <img src={checkmarkBrandIcon} alt="Checkmark Brand Icon" />
          ) : (
            <div className="w-6 h-6 rounded-full bg-gray-200"></div>
          )}
          <p>Your order is ready</p>
        </div>
      </div>
    </div>
  );
};

OrderStatus.propTypes = {
  onClose: PropTypes.bool.isRequired,
};

export default OrderStatus;
