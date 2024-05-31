/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from 'react';

// Create the context
const OrdersContext = createContext();

// Custom hook to use the OrdersContext
export const useOrders = () => useContext(OrdersContext);

// Provider component
export const OrdersProvider = ({ children }) => {
    const [orders, setOrders] = useState([]);

    // Load orders from localStorage when the component mounts
    useEffect(() => {
        const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];
        setOrders(storedOrders);
    }, []);

    // Save orders to localStorage whenever orders change
    useEffect(() => {
        localStorage.setItem('orders', JSON.stringify(orders));
    }, [orders]);

    const addOrder = (order) => {
        setOrders(prevOrders => [...prevOrders, order]);
    };

    return (
        <OrdersContext.Provider value={{ orders, setOrders, addOrder }}>
            {children}
        </OrdersContext.Provider>
    );
};
