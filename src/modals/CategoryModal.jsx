import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { setCategory } from '../redux/slices/categorySlice';

const CategoryModal = ({ categories, selectedCategory, onClose }) => {
  const dispatch = useDispatch();

  return (
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
          className="absolute top-3 right-3 w-10 h-10 flex cursor-pointer items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 text-[25px] font-bold transition-colors shadow-md"
        >
          ×
        </button>

        <h2 className="text-xl font-medium">Select Category</h2>

        <ul className="max-h-[60vh] overflow-y-auto p-2 custom-scrollbar">
          {categories.map((category) => (
            <li
              key={category}
              className={`p-3 cursor-pointer rounded break-words whitespace-normal 
                ${selectedCategory === category ? 'bg-brandYellow hover:bg-yellow-600' : 'hover:bg-gray-200'}`}
              onClick={() => {
                dispatch(setCategory(category));
                onClose();
              }}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

CategoryModal.propTypes = {
  categories: PropTypes.array.isRequired,
  selectedCategory: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

export default CategoryModal;
