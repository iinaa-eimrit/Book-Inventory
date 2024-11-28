import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getImgUrl } from '../../utils/getImgUrl';
import { clearCart, removeFromCart } from '../../redux/features/cart/cartSlice';

const CartPage = () => {
    const cartItems = useSelector(state => state.cart.cartItems);
    const dispatch = useDispatch();

    const totalPrice = cartItems.reduce((acc, item) => acc + item.newPrice, 0).toFixed(2);

    const handleRemoveFromCart = (product) => {
        dispatch(removeFromCart(product));
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    return (
        <div className="bg-gray-100 min-h-screen py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="px-4 py-5 sm:p-6">
                        <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                            <h2 className="text-2xl font-semibold text-gray-800">Shopping Cart</h2>
                            <button
                                onClick={handleClearCart}
                                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                            >
                                Clear Cart
                            </button>
                        </div>

                        <div className="mt-8">
                            {cartItems.length > 0 ? (
                                <ul className="divide-y divide-gray-200">
                                    {cartItems.map((product) => (
                                        <li key={product?._id} className="py-6 flex items-center">
                                            <img
                                                src={`${getImgUrl(product?.coverImage)}`}
                                                alt={product?.title}
                                                className="h-24 w-24 rounded-md object-cover"
                                            />
                                            <div className="ml-4 flex-1">
                                                <div className="flex justify-between">
                                                    <h3 className="text-lg font-medium text-gray-900">
                                                        <Link to='/' className="hover:text-indigo-600 transition duration-300 ease-in-out">{product?.title}</Link>
                                                    </h3>
                                                    <p className="text-lg font-medium text-gray-900">${product?.newPrice}</p>
                                                </div>
                                                <p className="mt-1 text-sm text-gray-500 capitalize"><strong>Category:</strong> {product?.category}</p>
                                                <div className="mt-4 flex justify-between items-center">
                                                    <p className="text-sm text-gray-500"><strong>Qty:</strong> 1</p>
                                                    <button
                                                        onClick={() => handleRemoveFromCart(product)}
                                                        className="text-sm font-medium text-indigo-600 hover:text-indigo-500 transition duration-300 ease-in-out"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-center text-gray-500 py-4">No products found in the cart.</p>
                            )}
                        </div>
                    </div>

                    <div className="bg-gray-50 px-4 py-5 sm:p-6">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                            <p>Subtotal</p>
                            <p>${totalPrice}</p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                        <div className="mt-6">
                            <Link
                                to="/checkout"
                                className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Checkout
                            </Link>
                        </div>
                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                            <p>
                                or{' '}
                                <Link to="/" className="font-medium text-indigo-600 hover:text-indigo-500 transition duration-300 ease-in-out">
                                    Continue Shopping
                                    <span aria-hidden="true"> &rarr;</span>
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;

