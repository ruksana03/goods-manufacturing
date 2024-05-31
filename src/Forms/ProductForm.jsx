/* eslint-disable react/prop-types */
import { useState } from 'react';
import useAuth from '../Hooks/useAuth';

const productsList = [
    { id: 1, name: 'Product 22', rate: 10, unit:'kg', max_retail_price: 8, amount: 25},
    { id: 2, name: 'Product 5', rate: 15, unit:'kg', max_retail_price: 11, amount: 25 },
    { id: 3, name: 'Stocked Product I', rate: 20, unit:'kg', max_retail_price: 28, amount: 25 },
    { id: 4, name: 'Benoit Saint Denis', rate: 25, unit:'kg', max_retail_price: 22, amount: 25 },
    { id: 5, name: 'Anonymous Product', rate: 30, unit:'kg', max_retail_price: 28, amount: 25 },
    { id: 6, name: 'Stocked Tea I', rate: 35, unit:'kg', max_retail_price: 32, amount: 25 },
    { id: 7, name: 'Stocked Tea II', rate: 40, unit:'kg', max_retail_price: 36, amount: 25 },
];

const ProductForm = ({ orders, setOrders}) => {
    const { user } = useAuth();
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [productDetails, setProductDetails] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
  

    const handleProductSelect = (e) => {
        const productId = parseInt(e.target.value);
        const product = productsList.find(p => p.id === productId);
        setSelectedProducts([...selectedProducts, product]);
        setProductDetails([...productDetails, { productId: product.id, sellingPrice: 0, quantity: 0 }]);
    };

    const handleDetailChange = (index, field, value) => {
        const newProductDetails = [...productDetails];
        // Update the specific field for the product at the given index
        newProductDetails[index][field] = parseFloat(value);
        setProductDetails(newProductDetails);
        calculateTotalPrice(newProductDetails);
    };
    

    const calculateTotalPrice = (details) => {
        const total = details.reduce((sum, detail) => sum + (detail.sellingPrice * detail.quantity), 0);
        setTotalPrice(total);
    };

    const handleOrderPlaced = () => {
        // Calculate sellingPrice and quantity from productDetails
        const sellingPrice = productDetails.map(detail => detail.sellingPrice);
        const quantity = productDetails.map(detail => detail.quantity);
    
        const order = {
            customerName: user?.name,
            selectedProducts,
            totalPrice,
            sellingPrice,
            quantity,
            addingDate: new Date().toISOString(),
            lastModified: new Date().toISOString(),
            orderStatus: "Active"
        };
    
        setOrders([...orders, order]); 
        setSelectedProducts([]); 
        setProductDetails([]);
        setTotalPrice(0);
    };
    
    console.log(orders);

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
                            <label>
                                Selling Rate:
                            </label>
                            <input
                                type="number"
                                placeholder='Enter selling rate'
                                // value={productDetails[index].sellingPrice}
                                className='border rounded-lg px-2 py-1 focus:outline-none mt-2'
                                onChange={(e) => handleDetailChange(index, 'sellingPrice', e.target.value)}
                            />
                        </div>
                        <div className='flex flex-col w-1/2'>
                            <label>
                                Total Items:
                            </label>
                            <input
                                type="number"
                                placeholder='Enter Quantity'
                                // value={productDetails[index].quantity}
                                className='border rounded-lg px-2 py-1 focus:outline-none mt-2'
                                onChange={(e) => handleDetailChange(index, 'quantity', e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            ))}
            <h2>Summary</h2>
            <p>Total Price: ${totalPrice.toFixed(2)}</p>
            <button onClick={handleOrderPlaced} className='btn-style my-4'>Order Placed</button>
            {orders.map((order, index) => (
                <div key={index} className='my-8'>
                    <h2>Order Information</h2>
                    <p>Customer Name: {order.customerName}</p>
                    <p>Total Price: ${order.totalPrice.toFixed(2)}</p>
                    <p>Last Modified: {order.lastModified}</p>
                    <h3>Selected Products:</h3>
                    <ul>
                        {order.selectedProducts.map((product, index) => (
                            <li key={product.id}>{index + 1}. {product.name}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default ProductForm;
