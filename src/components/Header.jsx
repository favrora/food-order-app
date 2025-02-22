import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setLocation } from "../store/locationSlice";

const locations = ["New York", "Los Angeles", "Chicago", "Dubai", "London"];

const Header = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const savedLocation = localStorage.getItem("selectedLocation");
    if (savedLocation) dispatch(setLocation(savedLocation));
  }, []);

  const handleSelect = (location) => {
    dispatch(setLocation(location));
    localStorage.setItem("selectedLocation", location);
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
          📍
        </button>
      </div>

      <h1 className="text-xl font-bold text-center flex-1">Restaurant name</h1>

      <div className="w-10 flex-shrink-0"></div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={closeModal} // Close modal when clicking outside
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg w-80 relative"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 text-xl font-bold transition-colors shadow-md cursor pointer"
            >
              ×
            </button>

            <h2 className="text-lg font-bold mb-4">Select Location</h2>

            <ul>
              {locations.map((loc) => (
                <li
                  key={loc}
                  className="p-3 hover:bg-gray-200 cursor-pointer rounded text-center"
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
