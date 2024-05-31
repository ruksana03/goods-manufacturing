/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useState, useEffect } from "react";
import { useOrders } from "../Hooks/useOrders";
import { useNavigate } from "react-router-dom";

const productsList = [
    { id: 1, name: 'Product 22', rate: 10, unit: 'kg', max_retail_price: 8, amount: 25 },
    { id: 2, name: 'Product 5', rate: 15, unit: 'kg', max_retail_price: 11, amount: 25 },
    { id: 3, name: 'Stocked Product I', rate: 20, unit: 'kg', max_retail_price: 28, amount: 25 },
    { id: 4, name: 'Benoit Saint Denis', rate: 25, unit: 'kg', max_retail_price: 22, amount: 25 },
    { id: 5, name: 'Anonymous Product', rate: 30, unit: 'kg', max_retail_price: 28, amount: 25 },
    { id: 6, name: 'Stocked Tea I', rate: 35, unit: 'kg', max_retail_price: 32, amount: 25 },
    { id: 7, name: 'Stocked Tea II', rate: 40, unit: 'kg', max_retail_price: 36, amount: 25 },
];

const EditProductForm = ({ order }) => {
    const navigate =  useNavigate();
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [productDetails, setProductDetails] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [orderStatus, setOrderStatus] = useState("Active");
    const { orders, setOrders } = useOrders();


    useEffect(() => {
        if (order) {
            setSelectedProducts(order.selectedProducts || []);
            setProductDetails(order.productDetails || []);
            setTotalPrice(order.totalPrice || 0);
            setOrderStatus(order.orderStatus || "Active");
        }
    }, [order]);

    const handleProductSelect = (e) => {
        const productId = parseInt(e.target.value);
        const product = productsList.find(p => p.id === productId);
        const alreadySelected = selectedProducts.find(p => p.id === productId);
        if (!alreadySelected) {
            setSelectedProducts(prevSelected => [...prevSelected, product]);
            setProductDetails(prevDetails => [...prevDetails, { productId: product.id, sellingPrice: 0, quantity: 0 }]);
        }
    };

    const handleDetailChange = (index, field, value) => {
        setProductDetails(prevDetails => {
            const newProductDetails = [...prevDetails];
            if (newProductDetails[index]) {
                newProductDetails[index][field] = parseFloat(value);
                calculateTotalPrice(newProductDetails);
            }
            return newProductDetails;
        });
    };

    const calculateTotalPrice = (details) => {
        const total = details.reduce((sum, detail) => sum + (detail.sellingPrice * detail.quantity), 0);
        setTotalPrice(total);
    };

    const handleOrderUpdate = () => {
        const currentTime = new Date().toISOString();
        const addingDate = order?.addingDate;

        const updatedOrders = orders.map(existingOrder => {
            if (existingOrder.addingDate === addingDate) {
                return {
                    ...existingOrder,
                    selectedProducts,
                    productDetails,
                    totalPrice,
                    lastModified: currentTime,
                    orderStatus,
                };
            }
            return existingOrder;
        });
        setOrders(updatedOrders);
    };




    return (
        <div className=''>
            <h2 className='mb-2'>All Products <span className='text-red-800'>*</span></h2>
            <select onChange={handleProductSelect} defaultValue="" required className='border w-full p-2'>
                <option value="" disabled>Select a product</option>
                {productsList.map(product => (
                    <option key={product.id} value={product.id}>{product.name}</option>
                ))}
            </select>

            {selectedProducts.map((product, index) => (
                <div key={product.id} className='border border-gray-200 shadow-lg rounded-lg my-4 p-4'>
                    <div className='flex justify-between border-b rounded-lg p-2'>
                        <h3>{index + 1}. {product?.name}</h3> {/* Increment index by 1 */}
                        <h3 className='bg-gray-200 rounded-lg p-1'>Rate: ₹ {product?.rate}</h3>
                    </div>
                    <div className='flex justify-between gap-4 mt-4 w-full px-2'>
                        <div className='flex flex-col w-1/2'>
                            <label>Selling Rate:</label>
                            <input
                                type="number"
                                defaultValue={order?.sellingPrice[index]}
                                placeholder='Enter selling rate'
                                className='border rounded-lg px-2 py-1 focus:outline-none mt-2'
                                onChange={(e) => handleDetailChange(index, 'sellingPrice', e.target.value)}
                            />
                        </div>
                        <div className='flex flex-col w-1/2'>
                            <label>Total Items:</label>
                            <input
                                type="number"
                                defaultValue={order?.quantity[index]}
                                placeholder='Enter Quantity'
                                className='border rounded-lg px-2 py-1 focus:outline-none mt-2'
                                onChange={(e) => handleDetailChange(index, 'quantity', e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            ))}

            <div className='my-4'>
                <label htmlFor='orderStatus'>Order Status:</label>
                <select
                    id='orderStatus'
                    value={orderStatus}
                    onChange={(e) => setOrderStatus(e.target.value)}
                    className='border w-full p-2 mt-2'
                >
                    <option value="Active">Active</option>
                    <option value="Complete">Complete</option>
                </select>
            </div>
            <h2>Summary</h2>
            <p>Total Price: ${totalPrice.toFixed(2)}</p>
            <button onClick={handleOrderUpdate} className='btn-style my-4'>Update Order</button>

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

export default EditProductForm;
