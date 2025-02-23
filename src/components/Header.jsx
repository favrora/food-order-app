import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLocation } from '../redux/slices/locationSlice';
import locationIcon from '../assets/icons/location.svg';
import { LOCATIONS } from '../config';

const Header = () => {
  const dispatch = useDispatch();
  const selectedAddress = useSelector((state) => state.location);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (location) => {
    dispatch(setLocation(location));
    setIsOpen(false);
  };

  const closeModal = () => setIsOpen(false);

  return (
    <header className="bg-white p-4 shadow-md flex items-center justify-between">
      <div className="w-10 flex-shrink-0">
        <button
          onClick={() => setIsOpen(true)}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 cursor-pointer transition-colors shadow-md"
        >
          <img src={locationIcon} alt="Location Icon" />
        </button>
      </div>

      <h1 className="text-xl font-medium text-center flex-1">
        Restaurant name
      </h1>

      <div className="w-10 flex-shrink-0"></div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white p-6 relative rounded-lg shadow-lg w-120 max-w-[90%]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 w-10 h-10 flex cursor-pointer items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 text-[25px] font-bold transition-colors shadow-md"
            >
              ×
            </button>

            <h2 className="text-lg font-bold mb-4">Select Location</h2>

            <ul className="max-h-[60vh] overflow-y-auto custom-scrollbar p-2">
              {LOCATIONS.map((loc) => (
                <li
                  key={loc}
                  className={`p-3 cursor-pointer rounded text-center transition-colors ${
                    loc === selectedAddress
                      ? 'bg-brandYellow text-black'
                      : 'hover:bg-gray-200'
                  }`}
                  onClick={() => handleSelect(loc)}
                >
                  {loc}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
