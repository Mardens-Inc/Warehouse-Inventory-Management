import {Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@heroui/react";

type POInventoryViewProperties = {
    isOpen: boolean;
    onClose: () => void;
};

export default function POInventoryViewModal(props: POInventoryViewProperties)
{
    return (
        <Modal isOpen={props.isOpen} onClose={props.onClose}>
            <ModalContent>
                {onClose => (
                    <>
                        <ModalHeader>POInventoryView</ModalHeader>
                        <ModalBody>
                            No Body
                        </ModalBody>
                        <ModalFooter>
                            <Button onPress={onClose}>Close</Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}