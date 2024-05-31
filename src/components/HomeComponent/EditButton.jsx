import { useDisclosure } from "@chakra-ui/react";
import EditOrderModal from "../../Modal/EditOrderModal";


const EditButton = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <div>
            <button
                className="btn-style"
                onClick={onOpen}
            >
                Edit
            </button>
            <EditOrderModal isEditOpen={isOpen} onEditClose={onClose}/>
        </div>
    );
};

export default EditButton;