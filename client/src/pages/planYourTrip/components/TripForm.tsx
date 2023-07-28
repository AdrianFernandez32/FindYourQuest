import { Formik, Field, Form, useFormikContext } from "formik";
import * as Yup from "yup";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  FormErrorMessage,
  HStack,
  Box,
} from "@chakra-ui/react";
import { ITrip } from "../../../assets/interfaces/Trip";
import { useEffect, useState } from "react";
import axios from "axios";
import { formattedDate } from "../../../assets/functions/FormatDate";

interface TripFormProps {
  setTrip: React.Dispatch<React.SetStateAction<ITrip>>;
}

const validationSchema = Yup.object({
  start_date: Yup.date().required("Required"),
  city_id: Yup.string().required("Required"),
});

const TripForm: React.FC<TripFormProps> = ({ setTrip }) => {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState<
    { description: string; place_id: string }[]
  >([]);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (search.length > 1) {
      axios
        .get(`http://localhost:3001/google/suggestedCities?input=${search}`)
        .then((res) => {
          setSuggestions(res.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [search]);

  return (
    <Formik
      initialValues={{
        start_date: new Date(),
        end_date: new Date(),
        city_id: "",
        flight_in_id: 0,
        flight_out_id: 0,
        hotel_id: 0,
      }}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        actions.setSubmitting(false);
      }}
    >
      {(formik) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
          const values = formik.values as ITrip;
          formik.validateForm(values).then((errors) => {
            if (Object.keys(errors).length === 0) {
              setTrip({
                ...values,
                start_date: formattedDate(new Date(values.start_date)),
                end_date: formattedDate(new Date(values.end_date)),
              });
            }
          });
        }, [formik.values]);

        return (
          <Form>
            <VStack>
              <Field name="city_id">
                {({ field, form }: any) => (
                  <FormControl
                    isInvalid={form.errors.city_id && form.touched.city_id}
                  >
                    <FormLabel htmlFor="city_id">City</FormLabel>
                    <Box position="relative">
                      <Input
                        {...field}
                        id="city_id"
                        name="city_id"
                        placeholder="Search for a City"
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
                                  "city_id",
                                  suggestion.place_id
                                );
                                setIsFocused(false);
                              }}
                            >
                              {suggestion.description}
                            </Box>
                          ))}
                        </Box>
                      )}
                    </Box>
                    <FormErrorMessage>{form.errors.city_id}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <HStack>
                <Field name="start_date">
                  {({ field, form }: any) => (
                    <FormControl
                      isInvalid={
                        form.errors.start_date && form.touched.start_date
                      }
                    >
                      <FormLabel htmlFor="start_date">Start Date</FormLabel>
                      <Input {...field} id="start_date" type="date" />
                      <FormErrorMessage>
                        {form.errors.start_date}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name="end_date">
                  {({ field, form }: any) => (
                    <FormControl
                      isInvalid={form.errors.end_date && form.touched.end_date}
                    >
                      <FormLabel htmlFor="end_date">End Date</FormLabel>
                      <Input {...field} id="end_date" type="date" />
                      <FormErrorMessage>
                        {form.errors.end_date}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </HStack>
            </VStack>
          </Form>
        );
      }}
    </Formik>
  );
};

export default TripForm;
