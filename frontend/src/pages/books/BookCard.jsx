import React from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import { getImgUrl } from '../../utils/getImgUrl';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/features/cart/cartSlice';

const BookCard = ({ book }) => {
    const dispatch = useDispatch();

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
            <div className="flex flex-col sm:flex-row sm:h-64">
                <div className="sm:w-1/3 p-4">
                    <Link to={`/books/${book._id}`} className="block h-full">
                        <img
                            src={`${getImgUrl(book?.coverImage)}`}
                            alt={book?.title}
                            className="w-full h-full object-cover rounded-md transition-transform duration-300 hover:scale-105"
                        />
                    </Link>
                </div>
                <div className="sm:w-2/3 p-4 flex flex-col justify-between">
                    <div>
                        <Link to={`/books/${book._id}`} className="block mb-2">
                            <h3 className="text-xl font-semibold text-gray-900 hover:text-indigo-600 transition-colors duration-300">
                                {book?.title}
                            </h3>
                        </Link>
                        <p className="text-gray-600 mb-4">
                            {book?.description.length > 100
                                ? `${book.description.slice(0, 100)}...`
                                : book?.description}
                        </p>
                    </div>
                    <div>
                        <p className="text-lg font-medium text-gray-900 mb-4">
                            ${book?.newPrice}{' '}
                            <span className="text-sm text-gray-500 line-through ml-2">
                                ${book?.oldPrice}
                            </span>
                        </p>
                        <button
                            onClick={() => handleAddToCart(book)}
                            className="w-full sm:w-auto px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-300 flex items-center justify-center"
                        >
                            <FiShoppingCart className="mr-2" />
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookCard;

