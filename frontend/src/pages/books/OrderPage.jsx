import React from 'react';
import { useGetOrderByEmailQuery } from '../../redux/features/orders/ordersApi';
import { useAuth } from '../../context/AuthContext';

const OrderPage = () => {
    const { currentUser } = useAuth();
    const { data: orders = [], isLoading, isError } = useGetOrderByEmailQuery(currentUser.email);

    if (isLoading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
    if (isError) return <div className="text-red-500 text-center">Error getting orders data</div>;

    return (
        <div className='container mx-auto p-6'>
            <h2 className='text-3xl font-bold mb-8 text-gray-800'>Your Orders</h2>
            {orders.length === 0 ? (
                <div className="text-center text-gray-600">No orders found!</div>
            ) : (
                <div className="space-y-8">
                    {orders.map((order, index) => (
                        <div key={order._id} className="bg-white shadow-md rounded-lg p-6 transition duration-300 ease-in-out hover:shadow-lg">
                            <div className="flex justify-between items-center mb-4">
                                <span className='px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-semibold'>
                                    Order #{index + 1}
                                </span>
                                <span className="text-sm text-gray-500">ID: {order._id}</span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-gray-600"><span className="font-semibold">Name:</span> {order.name}</p>
                                    <p className="text-gray-600"><span className="font-semibold">Email:</span> {order.email}</p>
                                    <p className="text-gray-600"><span className="font-semibold">Phone:</span> {order.phone}</p>
                                    <p className="text-gray-600"><span className="font-semibold">Total Price:</span> ${order.totalPrice}</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-800 mb-2">Address:</h3>
                                    <p className="text-gray-600">{order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}</p>
                                    <h3 className="font-semibold text-gray-800 mt-4 mb-2">Product IDs:</h3>
                                    <ul className="list-disc list-inside text-gray-600">
                                        {order.productIds.map((productId) => (
                                            <li key={productId}>{productId}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrderPage;

