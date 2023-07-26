import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";

const EventDetails = ({ isOpen, onClose, handleModalSubmit }: any) => {
  const [title, setTitle] = useState("");
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>hi</ModalBody>
          <Input
            name="name"
            id="name"
            autoComplete="off"
            value={title}
            m="1rem"
            w="80%"
            onChange={(e) => setTitle(e.target.value)}
          />
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost" onClick={() => handleModalSubmit(title)}>
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EventDetails;
