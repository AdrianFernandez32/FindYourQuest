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
import { Field, Formik, Form } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  checkin: Yup.date().required("Required"),
  checkout: Yup.date().required("Required"),
  place_id: Yup.string().required("Required"),
});

const HotelModal = ({ isOpen, onClose, setHotel }: any) => {
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
                <VStack>
                  <Box display="flex" justifyContent="space-between" w="400px">
                    <VStack>
                      <Field name="checkin">
                        {({ field, form }: any) => (
                          <FormControl>
                            <FormLabel htmlFor="checkin">
                              Check-in date
                            </FormLabel>
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
                      <Field name="place_id">
                        {({ field, form }: any) => (
                          <FormControl>
                            <FormLabel htmlFor="place_id">
                              Search for the Hotel
                            </FormLabel>
                            <Input {...field} id="place_id" type="text" />
                            <FormErrorMessage>
                              {form.errors.place_id}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </VStack>
                  </Box>
                  <Button
                    colorScheme="blue"
                    isLoading={isSubmitting}
                    type="submit"
                    m="1rem"
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
