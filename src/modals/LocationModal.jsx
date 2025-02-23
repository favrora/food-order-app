import PropTypes from 'prop-types';
import { LOCATIONS } from '../config';

const LocationModal = ({ selectedAddress, onSelect, onClose }) => (
  <div
    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    onClick={onClose}
  >
    <div
      className="bg-white p-6 relative rounded-[20px] shadow-lg w-120 max-w-[90%] flex flex-col gap-6"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={onClose}
        className="absolute top-3 right-3 w-10 h-10 flex items-center cursor-pointer justify-center rounded-full bg-gray-200 hover:bg-gray-300 text-[25px] font-bold transition-colors shadow-md"
      >
        ×
      </button>

      <h2 className="text-xl font-medium">Select Location</h2>

      <ul className="max-h-[60vh] overflow-y-auto custom-scrollbar p-2">
        {LOCATIONS.map((loc) => (
          <li
            key={loc}
            className={`p-3 cursor-pointer rounded text-center transition-colors ${
              loc === selectedAddress
                ? 'bg-brandYellow text-black'
                : 'hover:bg-gray-200'
            }`}
            onClick={() => onSelect(loc)}
          >
            {loc}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

LocationModal.propTypes = {
  selectedAddress: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default LocationModal;
