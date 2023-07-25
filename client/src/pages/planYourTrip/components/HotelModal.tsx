import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { Field, Formik, Form } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";

const validationSchema = Yup.object({
  checkin: Yup.date().required("Required"),
  checkout: Yup.date().required("Required"),
  place_id: Yup.string().required("Required"),
});

const HotelModal = ({ isOpen, onClose, setHotel }: any) => {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState<
    { place_id: string; description: string }[]
  >([]);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (search.length > 1) {
      axios
        .get(
          `http://localhost:3001/google/suggestedEstablishments?input=${search}`
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
  }, [search]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Hotel</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Formik
            initialValues={{
              checkin: new Date(),
              checkout: new Date(),
              place_id: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values: any, actions: any) => {
              setHotel({
                checkin: values.checkin,
                checkout: values.checkout,
                place_id: values.place_id,
              });
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <VStack spacing={4}>
                  <Field name="place_id">
                    {({ field, form }: any) => (
                      <FormControl>
                        <FormLabel htmlFor="place_id">
                          Search for the hotel
                        </FormLabel>
                        <Box position="relative">
                          <Input
                            {...field}
                            id="place_id"
                            type="text"
                            autoComplete="off"
                            value={search}
                            onChange={(e) => {
                              setSearch(e.target.value);
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
                                    setSearch(suggestion.description);
                                    form.setFieldValue(
                                      "place_id",
                                      suggestion.place_id
                                    );
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
                        <FormErrorMessage>
                          {form.errors.checkin}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Box
                    display="flex"
                    width="full"
                    justifyContent="space-between"
                    gap="1em"
                  >
                    <Field name="checkin">
                      {({ field, form }: any) => (
                        <FormControl>
                          <FormLabel htmlFor="checkin">Check-in date</FormLabel>
                          <Input {...field} id="checkin" type="date" />
                          <FormErrorMessage>
                            {form.errors.checkin}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <Field name="checkout">
                      {({ field, form }: any) => (
                        <FormControl>
                          <FormLabel htmlFor="checkout">
                            Check-out date
                          </FormLabel>
                          <Input {...field} id="checkout" type="date" />
                          <FormErrorMessage>
                            {form.errors.checkout}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </Box>

                  <Button
                    colorScheme="blue"
                    isLoading={isSubmitting}
                    type="submit"
                  >
                    Submit
                  </Button>
                </VStack>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default HotelModal;
