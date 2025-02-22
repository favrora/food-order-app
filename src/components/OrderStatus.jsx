import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const OrderStatus = ({ onClose }) => {
  const [status, setStatus] = useState(0);

  useEffect(() => {
    // Update the status after 3 seconds
    // In a real project here we should make an API call and after receiving data we show the result
    const timer = setTimeout(() => setStatus(1), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center p-6">
      <button
        className="absolute top-4 left-4 bg-yellow-500 text-black w-10 h-10 flex items-center justify-center rounded-full text-xl font-bold"
        onClick={onClose}
      >
        ←
      </button>

      <div
        className="w-24 h-24 flex items-center justify-center border-4 rounded-full mb-6"
        style={{ borderColor: status === 0 ? 'orange' : 'green' }}
      >
        {status === 0 ? (
          <div className="flex space-x-1 animate-pulse">
            <span className="w-3 h-3 bg-orange-400 rounded-full"></span>
            <span className="w-3 h-3 bg-orange-400 rounded-full"></span>
            <span className="w-3 h-3 bg-orange-400 rounded-full"></span>
          </div>
        ) : (
          <span className="text-green-500 text-6xl">✔</span>
        )}
      </div>

      <h2 className="text-lg font-bold">Street 1, City</h2>
      <p className="text-xl font-semibold text-center mt-1">
        We are sending your order
      </p>
      <p className="text-gray-500">CZ00006846QR</p>
      <p className="text-lg font-bold mt-2">Your order number</p>
      <p className="text-3xl font-bold">
        {Math.floor(Math.random() * 900) + 100}
      </p>

      <div className="flex flex-col items-center mt-6">
        <div
          className={`flex items-center gap-2 ${status === 0 ? 'text-orange-500' : 'text-green-500'}`}
        >
          <div
            className={`w-5 h-5 rounded-full flex items-center justify-center border-2 ${status === 0 ? 'border-orange-500' : 'border-green-500'}`}
          >
            {status === 1 && <span className="text-green-500">✔</span>}
          </div>
          <p>Order is sent</p>
        </div>
        <div
          className={`flex items-center gap-2 mt-2 text-gray-400 ${status === 1 && 'text-green-500'}`}
        >
          <div className="w-5 h-5 rounded-full flex items-center justify-center border-2 border-gray-400">
            {status === 1 && <span className="text-green-500">✔</span>}
          </div>
          <p>Restaurant approved your order</p>
        </div>
        <div
          className={`flex items-center gap-2 mt-2 text-gray-400 ${status === 1 && 'text-green-500'}`}
        >
          <div className="w-5 h-5 rounded-full flex items-center justify-center border-2 border-gray-400">
            {status === 1 && <span className="text-green-500">✔</span>}
          </div>
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
