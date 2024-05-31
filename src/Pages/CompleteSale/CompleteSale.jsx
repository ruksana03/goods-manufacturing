import { useState } from 'react';
import { useOrders } from "../../Hooks/useOrders";
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
import { BsThreeDots } from "react-icons/bs";
import ViewOrderModal from '../../Modal/ViewOrderModal';

const CompleteSale = () => {
    const { isOpen: isViewOrderModalOpen, onOpen: onViewOrderModalOpen, onClose: onViewOrderModalClose } = useDisclosure();
    const { orders } = useOrders();
    const [orderStatus] = useState('Complete'); 
    const [activeRow, setActiveRow] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null);

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

    const completeOrders = orders.filter(order => order.orderStatus === orderStatus);
    console.log(completeOrders);
    return (
        <div>
            <h2 className='subHead mt-4'>Complete Sale Orders</h2>
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
                            {completeOrders.map((order, index) => (
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
                                                        onClick={onViewOrderModalOpen}
                                                    >
                                                        View
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

            <ViewOrderModal
                isOpen={isViewOrderModalOpen}
                onClose={onViewOrderModalClose}
                order={selectedOrder}
            />
        </div>
    );
};

export default CompleteSale;
