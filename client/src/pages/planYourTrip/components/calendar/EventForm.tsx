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
  FormControl,
  FormLabel,
  useToast,
  Box,
} from "@chakra-ui/react";
import axios from "axios";
import { SetStateAction, useEffect, useState } from "react";

const EventForm = ({ isOpen, onClose, handleModalSubmit }: any) => {
  const [title, setTitle] = useState("");
  const [place_id, setPlace_id] = useState<string | SetStateAction<null>>(null);
  const [searchPlace, setSearchPlace] = useState("");
  const [suggestions, setSuggestions] = useState<
    { place_id: string; description: string }[]
  >([]);
  const [isFocused, setIsFocused] = useState(false);

  const toast = useToast();

  useEffect(() => {
    if (searchPlace.length > 1) {
      axios
        .get(
          `http://localhost:3001/google/suggestedEstablishments?input=${searchPlace}`
        )
        .then((res) => {
          setSuggestions(res.data);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setSuggestions([]);
    }
  }, [searchPlace]);

  const handleSubmit = () => {
    if (title != "" && place_id) {
      setTitle("");
      setSearchPlace("");
      setPlace_id(null);
      handleModalSubmit(title, place_id);
    } else {
      toast({
        title: `Please fill all the fields and select a valid place`,
        position: "top",
        status: "error",
        isClosable: true,
        duration: 5000,
      });
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New event</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Name of the activity</FormLabel>
              <Input
                name="name"
                id="name"
                autoComplete="off"
                value={title}
                m="1rem"
                w="80%"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Place of the activity</FormLabel>
              <Box position="relative">
                <Input
                  name="place"
                  id="place"
                  autoComplete="off"
                  value={searchPlace}
                  m="1rem"
                  w="80%"
                  onChange={(e) => {
                    setSearchPlace(e.target.value);
                    setPlace_id(null);
                  }}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                />
                {isFocused && (
                  <Box
                    mt={2}
                    boxShadow="md"
                    borderRadius="md"
                    position="absolute"
                    width="100%"
                    zIndex="1"
                    bg="white"
                  >
                    {suggestions.slice(0, 5).map((suggestion) => (
                      <Box
                        key={suggestion.place_id}
                        p={2}
                        borderBottom="1px solid"
                        borderColor="gray.200"
                        className="bg-white duration-150 cursor-pointer hover:bg-[#0096FF] hover:text-white hover:font-medium"
                        onMouseDown={() => {
                          setSearchPlace(suggestion.description);
                          setPlace_id(suggestion.place_id);
                          setIsFocused(false);
                        }}
                      >
                        <p className="overflow-hidden overflow-ellipsis whitespace-nowrap">
                          {suggestion.description}
                        </p>
                      </Box>
                    ))}
                  </Box>
                )}
              </Box>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={() => handleSubmit()}>
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EventForm;
