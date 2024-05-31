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
import EditProductForm from '../Forms/EditProductForm';

const EditOrderModal = ({  isOpen, onClose, order }) => {
  
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Product Multi select Snippet of sale Edit order form</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {/* <MultiSelect /> */}
                    <EditProductForm order={order}  />

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

export default EditOrderModal;