import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { Box, Button, Spinner } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import defaultcity from "../../../../assets/images/defaultcity.png";

interface IPlaceInfo {
  formatted_address: string;
  name: string;
}

const EventInfo = ({ isOpen, onClose, event, handleDelete }: any) => {
  const [imageReference, setImageReference] = useState<string | null>();
  const [placeInfo, setPlaceInfo] = useState<IPlaceInfo>();

  const getImage = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/google/cityImage?id=${event.extendedProps.place_id}`
      );
      if (response.data.photoReference) {
        setImageReference(response.data.photoReference);
      }
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  const handleClose = () => {
    setImageReference(null);
    onClose();
  };

  const getPlaceInfo = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/google/placeDetails?id=${event.extendedProps.place_id}`
      );
      setPlaceInfo(response.data.result);
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  useEffect(() => {
    if (event && event.extendedProps && event.extendedProps.place_id) {
      getImage();
      getPlaceInfo();
    }
  }, [event]);

  if (!placeInfo && !imageReference) {
    return (
      <>
        <Modal isOpen={isOpen} onClose={handleClose}>
          <ModalOverlay />
          <ModalContent
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <ModalBody
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
              />
              <p className="text-2xl font-semibold">Loading event...</p>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    );
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Event details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              {imageReference ? (
                <img
                  src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=1080&photoreference=${imageReference}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`}
                  alt={placeInfo ? placeInfo.name : ""}
                  className="w-full max-h-80 object-cover mb-2"
                />
              ) : (
                <img
                  src={defaultcity}
                  alt={placeInfo ? placeInfo.name : ""}
                  className="w-full max-h-80 object-cover mb-2"
                />
              )}

              <p className="text-2xl font-semibold ">
                {placeInfo ? placeInfo.name : ""}
              </p>
              <p className="text-lg font-medium text-gray-600 py-2">
                <span className="font-semibold text-black">Address:</span>{" "}
                {placeInfo ? placeInfo.formatted_address : ""}
              </p>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" onClick={() => handleDelete(event)}>
              Remove
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EventInfo;
