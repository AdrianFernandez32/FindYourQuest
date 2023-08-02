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
import axios from "axios";
import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { BiSolidPlaneLand, BiSolidPlaneTakeOff } from "react-icons/bi";
import * as Yup from "yup";
import { formattedDate } from "../../../assets/functions/FormatDate";

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

const useGoogleSuggestions = (search: string) => {
  const [suggestions, setSuggestions] = useState<
    { place_id: string; description: string }[]
  >([]);

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

  return suggestions;
};

const FlightModal = ({ isOpen, onClose, setFlightIn, setFlightOut }: any) => {
  const [searchFinin, setSearchFinin] = useState("");
  const suggestionsFinin = useGoogleSuggestions(searchFinin);

  const [searchFinout, setSearchFinout] = useState("");
  const suggestionsFinout = useGoogleSuggestions(searchFinout);

  const [searchFoutin, setSearchFoutin] = useState("");
  const suggestionsFoutin = useGoogleSuggestions(searchFoutin);

  const [searchFoutout, setSearchFoutout] = useState("");
  const suggestionsFoutout = useGoogleSuggestions(searchFoutout);

  const [isFocusedFinin, setIsFocusedFinin] = useState(false);
  const [isFocusedFinout, setIsFocusedFinout] = useState(false);
  const [isFocusedFoutin, setIsFocusedFoutin] = useState(false);
  const [isFocusedFoutout, setIsFocusedFoutout] = useState(false);

  const setFlights = (values: any) => {
    setFlightIn({
      departure: formattedDate(new Date(values.aDeparture)),
      landing: formattedDate(new Date(values.aArrival)),
      airline: values.aAirline,
      departure_airport: values.aDeparture_airport,
      landing_airport: values.aLanding_airport,
    });
    setFlightOut({
      departure: formattedDate(new Date(values.dDeparture)),
      landing: formattedDate(new Date(values.dArrival)),
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
              aDeparture: new Date(Date.UTC(1, 0, 1, 0, 0, 0, 0)),
              aArrival: new Date(Date.UTC(1, 0, 1, 0, 0, 0, 0)),
              aAirline: "",
              aDeparture_airport: "",
              aLanding_airport: "",
              // Flight back home
              dDeparture: new Date(Date.UTC(1, 0, 1, 0, 0, 0, 0)),
              dArrival: new Date(Date.UTC(1, 0, 1, 0, 0, 0, 0)),
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
                              autoComplete="off"
                              value={searchFinin}
                              onChange={(e) => {
                                setSearchFinin(e.target.value);
                              }}
                              onFocus={() => setIsFocusedFinin(true)}
                              onBlur={() => setIsFocusedFinin(false)}
                            />
                            {isFocusedFinin && (
                              <Box
                                mt={2}
                                boxShadow="md"
                                borderRadius="md"
                                position="absolute"
                                width="100%"
                                zIndex="1"
                                bg="white"
                              >
                                {suggestionsFinin
                                  .slice(0, 5)
                                  .map((suggestion) => (
                                    <Box
                                      key={suggestion.place_id}
                                      p={2}
                                      borderBottom="1px solid"
                                      borderColor="gray.200"
                                      className="bg-white duration-150 cursor-pointer hover:bg-[#0096FF] hover:text-white hover:font-medium"
                                      onMouseDown={() => {
                                        setSearchFinin(suggestion.description);
                                        form.setFieldValue(
                                          "aDeparture_airport",
                                          suggestion.place_id
                                        );
                                        setIsFocusedFinin(false);
                                      }}
                                    >
                                      <p className="overflow-hidden overflow-ellipsis whitespace-nowrap">
                                        {suggestion.description}
                                      </p>
                                    </Box>
                                  ))}
                              </Box>
                            )}
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
                              autoComplete="off"
                              value={searchFinout}
                              onChange={(e) => {
                                setSearchFinout(e.target.value);
                              }}
                              onFocus={() => setIsFocusedFinout(true)}
                              onBlur={() => setIsFocusedFinout(false)}
                            />
                            {isFocusedFinout && (
                              <Box
                                mt={2}
                                boxShadow="md"
                                borderRadius="md"
                                position="absolute"
                                width="100%"
                                zIndex="1"
                                bg="white"
                              >
                                {suggestionsFinout
                                  .slice(0, 5)
                                  .map((suggestion) => (
                                    <Box
                                      key={suggestion.place_id}
                                      p={2}
                                      borderBottom="1px solid"
                                      borderColor="gray.200"
                                      className="bg-white duration-150 cursor-pointer hover:bg-[#0096FF] hover:text-white hover:font-medium"
                                      onMouseDown={() => {
                                        setSearchFinout(suggestion.description);
                                        form.setFieldValue(
                                          "aLanding_airport",
                                          suggestion.place_id
                                        );
                                        setIsFocusedFinout(false);
                                      }}
                                    >
                                      <p className="overflow-hidden overflow-ellipsis whitespace-nowrap">
                                        {suggestion.description}
                                      </p>
                                    </Box>
                                  ))}
                              </Box>
                            )}
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
                              autoComplete="off"
                              value={searchFoutin}
                              onChange={(e) => {
                                setSearchFoutin(e.target.value);
                              }}
                              onFocus={() => setIsFocusedFoutin(true)}
                              onBlur={() => setIsFocusedFoutin(false)}
                            />
                            {isFocusedFoutin && (
                              <Box
                                mt={2}
                                boxShadow="md"
                                borderRadius="md"
                                position="absolute"
                                width="100%"
                                zIndex="1"
                                bg="white"
                              >
                                {suggestionsFoutin
                                  .slice(0, 5)
                                  .map((suggestion) => (
                                    <Box
                                      key={suggestion.place_id}
                                      p={2}
                                      borderBottom="1px solid"
                                      borderColor="gray.200"
                                      className="bg-white duration-150 cursor-pointer hover:bg-[#0096FF] hover:text-white hover:font-medium"
                                      onMouseDown={() => {
                                        setSearchFoutin(suggestion.description);
                                        form.setFieldValue(
                                          "dDeparture_airport",
                                          suggestion.place_id
                                        );
                                        setIsFocusedFoutin(false);
                                      }}
                                    >
                                      <p className="overflow-hidden overflow-ellipsis whitespace-nowrap">
                                        {suggestion.description}
                                      </p>
                                    </Box>
                                  ))}
                              </Box>
                            )}
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
                              autoComplete="off"
                              value={searchFoutout}
                              onChange={(e) => {
                                setSearchFoutout(e.target.value);
                              }}
                              onFocus={() => setIsFocusedFoutout(true)}
                              onBlur={() => setIsFocusedFoutout(false)}
                            />
                            {isFocusedFoutout && (
                              <Box
                                mt={2}
                                boxShadow="md"
                                borderRadius="md"
                                position="absolute"
                                width="100%"
                                zIndex="1"
                                bg="white"
                              >
                                {suggestionsFoutout
                                  .slice(0, 5)
                                  .map((suggestion) => (
                                    <Box
                                      key={suggestion.place_id}
                                      p={2}
                                      borderBottom="1px solid"
                                      borderColor="gray.200"
                                      className="bg-white duration-150 cursor-pointer hover:bg-[#0096FF] hover:text-white hover:font-medium"
                                      onMouseDown={() => {
                                        setSearchFoutout(
                                          suggestion.description
                                        );
                                        form.setFieldValue(
                                          "dLanding_airport",
                                          suggestion.place_id
                                        );
                                        setIsFocusedFoutout(false);
                                      }}
                                    >
                                      <p className="overflow-hidden overflow-ellipsis whitespace-nowrap">
                                        {suggestion.description}
                                      </p>
                                    </Box>
                                  ))}
                              </Box>
                            )}
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
