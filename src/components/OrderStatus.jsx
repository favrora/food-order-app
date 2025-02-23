import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useGetOrderStatusQuery } from '../services/api';
import PropTypes from 'prop-types';
import successIcon from '../assets/icons/success.svg';
import arrowBackIcon from '../assets/icons/arrow-back.svg';
import checkmarkBrandIcon from '../assets/icons/checkmark-brand.svg';

const OrderStatus = ({ onClose }) => {
  const selectedAddress = useSelector((state) => state.location);

  const orderId = useMemo(
    () => `CZ${Math.floor(10000000 + Math.random() * 90000000)}QR`,
    []
  );

  // Checking order status every 5 seconds
  const { data, refetch } = useGetOrderStatusQuery(orderId, {
    pollingInterval: 5000,
  });

  const status = data?.status || 0;

  useEffect(() => {
    // If the API returned that the order was successful, then stop polling
    if (data?.status === 1) return;

    refetch();
  }, [data, refetch]);

  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center p-6 h-[100vh] overflow-y-auto custom-scrollbar">
      <button
        className="absolute top-4 left-4 w-[42px] h-[42px] flex items-center justify-center bg-brandYellow hover:bg-yellow-600 transition-colors cursor-pointer rounded-full py-2 custom-boxShadow"
        onClick={onClose}
      >
        <img src={arrowBackIcon} alt="Arrow Back Icon" />
      </button>

      <div
        className={`w-[165px] h-[165px] flex items-center justify-center border-10 rounded-full mb-6 flex-shrink-0 
          ${status === 0 ? 'border-brandYellow' : 'border-green-500'}`}
      >
        {status === 0 ? (
          <div className="flex space-x-3 animate-pulse">
            {[0, 200, 400].map((delay) => (
              <span
                key={delay}
                className="w-5 h-5 bg-brandYellow rounded-full animate-bounce"
                style={{ animationDelay: `${delay}ms` }}
              ></span>
            ))}
          </div>
        ) : (
          <img src={successIcon} alt="Success Icon" />
        )}
      </div>

      <h2 className="text-lg">{selectedAddress}</h2>
      <p className="text-xl font-semibold text-center mt-1">
        {status === 0 ? 'We are sending your order' : 'Order is ready'}
      </p>
      <p className="mt-2">Your order number</p>
      <p className="text-3xl font-bold">{orderId.slice(2, 5)}</p>

      <div className="flex flex-col items-center gap-2 mt-6">
        {[
          'Order is sent',
          'Restaurant approved your order',
          'Your order is ready',
        ].map((text, index) => (
          <OrderStep key={index} text={text} completed={status === 1} />
        ))}
      </div>
    </div>
  );
};

const OrderStep = ({ text, completed }) => (
  <div className="flex flex-col items-center text-gray-400">
    {completed ? (
      <img src={checkmarkBrandIcon} alt="Checkmark Brand Icon" />
    ) : (
      <div className="w-6 h-6 rounded-full bg-gray-200"></div>
    )}
    <p className={completed ? 'text-brandYellow' : ''}>{text}</p>
  </div>
);

OrderStep.propTypes = {
  text: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
};

OrderStatus.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default OrderStatus;
