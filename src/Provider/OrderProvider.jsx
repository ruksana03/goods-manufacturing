/* eslint-disable react/prop-types */
import  { createContext, useContext } from 'react';
import useOrder from '../Hooks/useOrders';


const OrderContext = createContext();

export const useOrderContext = () => useContext(OrderContext);

const OrderProvider = ({ children }) => {
    const order = useOrder();

    return (
        <OrderContext.Provider value={order}>
            {children}
        </OrderContext.Provider>
    );
};

export default OrderProvider;
