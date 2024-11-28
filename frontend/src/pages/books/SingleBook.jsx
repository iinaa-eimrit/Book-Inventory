import React from 'react';
import { FiShoppingCart } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { getImgUrl } from '../../utils/getImgUrl';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/features/cart/cartSlice';
import { useFetchBookByIdQuery } from '../../redux/features/books/booksApi';

const SingleBook = () => {
    const { id } = useParams();
    const { data: book, isLoading, isError } = useFetchBookByIdQuery(id);
    const dispatch = useDispatch();

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    };

    if (isLoading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
    if (isError) return <div className="text-red-500 text-center">Error loading book information</div>;

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="md:flex">
                    <div className="md:flex-shrink-0">
                        <img
                            src={`${getImgUrl(book.coverImage)}`}
                            alt={book.title}
                            className="h-full w-full object-cover md:w-48"
                        />
                    </div>
                    <div className="p-8">
                        <h1 className="text-2xl font-bold text-gray-900 mb-4">{book.title}</h1>
                        <p className="text-gray-600 mb-2"><span className="font-semibold">Author:</span> {book.author || 'admin'}</p>
                        <p className="text-gray-600 mb-2">
                            <span className="font-semibold">Published:</span> {new Date(book?.createdAt).toLocaleDateString()}
                        </p>
                        <p className="text-gray-600 mb-4 capitalize">
                            <span className="font-semibold">Category:</span> {book?.category}
                        </p>
                        <p className="text-gray-700 mb-6"><span className="font-semibold">Description:</span> {book.description}</p>
                        <button 
                            onClick={() => handleAddToCart(book)} 
                            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 ease-in-out"
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

export default SingleBook;

