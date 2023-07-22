import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  VStack,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { BiSolidPlaneLand, BiSolidPlaneTakeOff } from "react-icons/bi";
import * as Yup from "yup";

const validationSchema = Yup.object({
  aDeparture: Yup.date().required("Required"),
  aArrival: Yup.date().required("Required"),
  aAirline: Yup.string().required("Required"),
  aDeparture_airport: Yup.string().required("Required"),
  aLanding_airport: Yup.string().required("Required"),
  dDeparture: Yup.date().required("Required"),
  dArrival: Yup.date().required("Required"),
  dAirline: Yup.string().required("Required"),
  dDeparture_airport: Yup.string().required("Required"),
  dLanding_airport: Yup.string().required("Required"),
});

const FlightModal = ({ isOpen, onClose, setFlightIn, setFlightOut }: any) => {
  const setFlights = (values: any) => {
    setFlightIn({
      departure: values.aDeparture,
      landing: values.aLanding,
      airline: values.aAirline,
      departure_airport: values.aDeparture_airport,
      landing_airport: values.aLanding_airport,
    });
    setFlightOut({
      departure: values.dDeparture,
      landing: values.dLanding,
      airline: values.dAirline,
      departure_airport: values.dDeparture_airport,
      landing_airport: values.dLanding_airport,
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Flights</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Formik
            initialValues={{
              // Arrival flight
              aDeparture: new Date(),
              aArrival: new Date(),
              aAirline: "",
              aDeparture_airport: "",
              aLanding_airport: "",
              // Flight back home
              dDeparture: new Date(),
              dArrival: new Date(),
              dAirline: "",
              dDeparture_airport: "",
              dLanding_airport: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values: any, actions: any) => {
              setFlights(values);
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <Box display="flex" justifyContent="space-between">
                  <HStack spacing={5}>
                    <Box>
                      <BiSolidPlaneLand size="2rem" />
                      <FormLabel>Arrival Flight</FormLabel>
                      <Field name="aDeparture">
                        {({ field, form }: any) => (
                          <FormControl>
                            <FormLabel htmlFor="aDeparture">
                              Departure
                            </FormLabel>
                            <Input {...field} id="aDeparture" type="date" />
                            <FormErrorMessage>
                              {form.errors.aDeparture}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="aArrival">
                        {({ field, form }: any) => (
                          <FormControl>
                            <FormLabel htmlFor="aArrival">Arrival</FormLabel>
                            <Input {...field} id="aArrival" type="date" />
                          </FormControl>
                        )}
                      </Field>
                      <Field name="aAirline">
                        {({ field, form }: any) => (
                          <FormControl>
                            <FormLabel htmlFor="aAirline">Airline</FormLabel>
                            <Input {...field} id="aAirline" type="text" />
                          </FormControl>
                        )}
                      </Field>
                      <Field name="aDeparture_airport">
                        {({ field, form }: any) => (
                          <FormControl>
                            <FormLabel htmlFor="aDeparture_airport">
                              Departure Airport
                            </FormLabel>
                            <Input
                              {...field}
                              id="aDeparture_airport"
                              type="text"
                            />
                          </FormControl>
                        )}
                      </Field>
                      <Field name="aLanding_airport">
                        {({ field, form }: any) => (
                          <FormControl>
                            <FormLabel htmlFor="aLanding_airport">
                              Landing Airport
                            </FormLabel>
                            <Input
                              {...field}
                              id="aLanding_airport"
                              type="text"
                            />
                          </FormControl>
                        )}
                      </Field>
                    </Box>

                    <Box>
                      <BiSolidPlaneTakeOff size="2rem" />
                      <FormLabel>Flight Back Home</FormLabel>
                      <Field name="dDeparture">
                        {({ field, form }: any) => (
                          <FormControl>
                            <FormLabel htmlFor="dDeparture">
                              Departure
                            </FormLabel>
                            <Input {...field} id="dDeparture" type="date" />
                          </FormControl>
                        )}
                      </Field>
                      <Field name="dArrival">
                        {({ field, form }: any) => (
                          <FormControl>
                            <FormLabel htmlFor="dArrival">Arrival</FormLabel>
                            <Input {...field} id="dArrival" type="date" />
                          </FormControl>
                        )}
                      </Field>
                      <Field name="dAirline">
                        {({ field, form }: any) => (
                          <FormControl>
                            <FormLabel htmlFor="dAirline">Airline</FormLabel>
                            <Input {...field} id="dAirline" type="text" />
                          </FormControl>
                        )}
                      </Field>
                      <Field name="dDeparture_airport">
                        {({ field, form }: any) => (
                          <FormControl>
                            <FormLabel htmlFor="dDeparture_airport">
                              Departure Airport
                            </FormLabel>
                            <Input
                              {...field}
                              id="dDeparture_airport"
                              type="text"
                            />
                          </FormControl>
                        )}
                      </Field>
                      <Field name="dLanding_airport">
                        {({ field, form }: any) => (
                          <FormControl>
                            <FormLabel htmlFor="dLanding_airport">
                              Landing Airport
                            </FormLabel>
                            <Input
                              {...field}
                              id="dLanding_airport"
                              type="text"
                            />
                          </FormControl>
                        )}
                      </Field>
                    </Box>
                  </HStack>
                </Box>
                <Button
                  colorScheme="blue"
                  isLoading={isSubmitting}
                  type="submit"
                  m="1rem"
                >
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default FlightModal;
