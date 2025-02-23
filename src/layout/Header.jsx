import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLocation } from '../redux/slices/locationSlice';
import locationIcon from '../assets/icons/location.svg';
import LocationModal from '../modals/LocationModal';

const Header = () => {
  const dispatch = useDispatch();
  const selectedAddress = useSelector((state) => state.location);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = useCallback(
    (location) => {
      dispatch(setLocation(location));
      setIsOpen(false);
    },
    [dispatch]
  );

  const closeModal = useCallback(() => setIsOpen(false), []);

  return (
    <header className="bg-white p-4 shadow-md flex items-center justify-between">
      <button
        onClick={() => setIsOpen(true)}
        className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 transition-colors shadow-md cursor-pointer"
      >
        <img src={locationIcon} alt="Location Icon" />
      </button>

      <h1 className="text-2xl font-medium">Restaurant name</h1>

      <div className="w-10"></div>

      {isOpen && (
        <LocationModal
          selectedAddress={selectedAddress}
          onSelect={handleSelect}
          onClose={closeModal}
        />
      )}
    </header>
  );
};

export default Header;
