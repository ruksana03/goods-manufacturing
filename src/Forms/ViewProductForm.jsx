/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";


const ViewProductForm = ({order}) => {
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [productDetails, setProductDetails] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [orderStatus, setOrderStatus] = useState("Active");

    useEffect(() => {
        if (order) {
            setSelectedProducts(order.selectedProducts || []);
            setProductDetails(order.productDetails || []);
            setTotalPrice(order.totalPrice || 0);
            setOrderStatus(order.orderStatus || "Active");
        }
    }, [order]);

    console.log(order)
    return (
        <div className=''>
            <h2 className='mb-2'>All Products <span className='text-red-800'>*</span></h2>
            {selectedProducts.map((product, index) => (
                <div key={product.id} className='border border-gray-200 shadow-lg rounded-lg my-4 p-4'>
                    <div className='flex justify-between border-b rounded-lg p-2'>
                        <h3>{index + 1}. {product?.name}</h3> 
                        <h3 className='bg-gray-200 rounded-lg p-1'>Rate: ₹ {product?.rate}</h3>
                    </div>
                    <div className='flex justify-between gap-4 mt-4 w-full px-2'>
                        <div className='flex flex-col w-1/2'>
                            <label>Selling Rate:</label>
                            <input
                                type="number"
                                readOnly
                                defaultValue={order?.sellingPrice[index]}
                                placeholder='Enter selling rate'
                                className='border rounded-lg px-2 py-1 focus:outline-none mt-2'
                            />
                        </div>
                        <div className='flex flex-col w-1/2'>
                            <label>Total Items:</label>
                            <input
                                type="number"
                                readOnly
                                defaultValue={order?.quantity[index]}
                                placeholder='Enter Quantity'
                                className='border rounded-lg px-2 py-1 focus:outline-none mt-2'
                            />
                        </div>
                    </div>
                </div>
            ))}

            <div className='my-4'>
                <label htmlFor='orderStatus'>Order Status:</label>
                <select
                    id='orderStatus'
                    readOnly
                    value={orderStatus}
                    className='border w-full p-2 mt-2'
                >
                    <option value="Active">Active</option>
                    <option value="Complete">Complete</option>
                </select>
            </div>
            <h2>Summary</h2>
            <p>Total Price: ${totalPrice.toFixed(2)}</p>

            <div className='my-8'>
                <h2>Order Information</h2>
                <p>Customer Name: {order?.customerName}</p>
                <p>Total Price: ${order?.totalPrice.toFixed(2)}</p>
                <p>Last Modified: {order?.lastModified}</p>
                <h3>Selected Products:</h3>
                <ul>
                    {order.selectedProducts.map((product, index) => (
                        <li key={product.id}>{index + 1}. {product.name}</li>
                    ))}
                </ul>
            </div>

        </div>
    );
};

export default ViewProductForm;