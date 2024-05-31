/* eslint-disable react/prop-types */
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
} from '@chakra-ui/react';
import ViewProductForm from '../Forms/ViewProductForm';
// import MultiSelect from '../Forms/MultiSelect';
// import ProductForm from '../Forms/ProductForm';

const ViewOrderModal  = ({ isOpen, onClose, order}) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Product Multi select Snippet of sale order form</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {/* <MultiSelect /> */}
                    {/* <ProductForm orders={orders} setOrders={setOrders}/> */}
                    <ViewProductForm order={order}/>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={onClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};


export default ViewOrderModal;