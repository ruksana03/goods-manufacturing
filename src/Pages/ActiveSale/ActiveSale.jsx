import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    useDisclosure,
} from '@chakra-ui/react';
// import SaleOrderModal from '../../Modal/SaleOrderModal';
import SaleOrderModal from '../../Modal/SaleOrderModal';
import { useState } from 'react';
import { BsThreeDots } from "react-icons/bs";
import { useOrders } from '../../Hooks/useOrders';
import EditOrderModal from '../../Modal/EditOrderModal';
import useAuth from '../../Hooks/useAuth';
import { Link } from 'react-router-dom';
// import { useOrders } from '../../context/OrdersContext'; 

const ActiveSale = () => {
    const { user } = useAuth();
    const { isOpen: isSaleOrderModalOpen, onOpen: onSaleOrderModalOpen, onClose: onSaleOrderModalClose } = useDisclosure();

    const { isOpen: isEditOrderModalOpen, onOpen: onEditOrderModalOpen, onClose: onEditOrderModalClose } = useDisclosure();
    const [activeRow, setActiveRow] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const { orders, setOrders } = useOrders();
    const [orderStatus] = useState('Active');

    const handleDotButton = (index, order) => {
        setActiveRow(index === activeRow ? null : index);
        setSelectedOrder(order);
    };

    const formatDate = (dateTimeString) => {
        const date = new Date(dateTimeString);
        const options = {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        };
        return date.toLocaleDateString('en-US', options);
    };

    console.log(orders);

    const activeOrders = orders.filter(order => order.orderStatus === orderStatus);
    console.log(activeOrders);

    return (
        <div className="">
            
            <div className="flex justify-end">
                {user ? <button className="btn-style" onClick={onSaleOrderModalOpen}>+ Sale Order</button> : <Link to={'login'} className='btn-style'>+ Sale Order</Link> }
            </div>

            <h2 className='subHead mt-4'>Active Sale Orders</h2>
            <div className='my-8'>
                <TableContainer>
                    <Table variant='simple' className='normalText'>
                        <TableCaption>Imperial to metric conversion factors</TableCaption>
                        <Thead >
                            <Tr>
                                <Th>Id</Th>
                                <Th>Customer Name</Th>
                                <Th isNumeric>price (₹)</Th>
                                <Th>last modified</Th>
                                <Th>Edit/view</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {activeOrders.map((order, index) => (
                                <Tr key={index} className='normalText'>
                                    <Td>{index + 1}</Td>
                                    <Td>{order.customerName}</Td>
                                    <Td isNumeric>${order.totalPrice.toFixed(2)}</Td>
                                    <Td>{formatDate(order.lastModified)}</Td>
                                    <Td>
                                        <button className='absolute ' onClick={() => handleDotButton(index, order)}><BsThreeDots />
                                            {activeRow === index && (
                                                <div className='relative'>

                                                    <button
                                                        className="btn-style"
                                                        onClick={onEditOrderModalOpen}
                                                    >
                                                        Edit
                                                    </button>
                                                </div>
                                            )}
                                        </button>
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                        <Tfoot>
                            <Tr>
                                <Th>To convert</Th>
                                <Th>into</Th>
                                <Th isNumeric>multiply by</Th>
                            </Tr>
                        </Tfoot>
                    </Table>
                </TableContainer>
            </div>
            <SaleOrderModal
                isOpen={isSaleOrderModalOpen}
                onClose={onSaleOrderModalClose}
                orders={orders} setOrders={setOrders}
            />

            <EditOrderModal
                isOpen={isEditOrderModalOpen}
                onClose={onEditOrderModalClose}
                order={selectedOrder}
            />


        </div>
    );
};

export default ActiveSale;
