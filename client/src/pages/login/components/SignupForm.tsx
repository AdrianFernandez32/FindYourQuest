import React, { Dispatch, SetStateAction, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Toast,
} from "@chakra-ui/react";
import axios from "axios";
import { ISignup } from "../../../assets/interfaces/Signup";
import { useToast } from "@chakra-ui/react";

const validationSchema = Yup.object({
  email: Yup.string().required("The email is required").email("Invalid email"),
  password: Yup.string().required("Password is required"),
  confirm_password: Yup.string().oneOf(
    [Yup.ref("password"), undefined],
    "Passwords must match"
  ),
});

type Props = {
  setLogin: Dispatch<SetStateAction<boolean>>;
};

const SignUpForm = ({ setLogin }: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfPassword, setConfPassword] = useState(false);
  const handleClickPassword = () => setShowPassword(!showPassword);
  const hanldeClickConfPassword = () => setConfPassword(!showConfPassword);
  const toast = useToast();

  const handleSignup = (values: ISignup, resetForm: () => void) => {
    const { confirm_password, ...valuesToSend } = values;
    const newUser = {
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
      password: values.password,
    };
    if (
      values.email === "" ||
      values.password === "" ||
      values.first_name === "" ||
      values.last_name === ""
    ) {
      toast({
        title: "Field value missing",
        description: "Please fill every field before loging in",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else {
      axios
        .post(`http://localhost:3001/users/`, newUser)
        .then((res) => {
          console.log(res);
          toast({
            title: "Account created",
            description: "Thanks for joining, now you can login",
            position: "top",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          setLogin((login) => !login);
          resetForm();
        })
        .catch((error) => {
          console.error(error);
          toast({
            title: "Error",
            description: error.response.data.message,
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        });
    }
  };

  return (
    <div className="w-full">
      <Formik
        initialValues={{
          email: "",
          password: "",
          confirm_password: "",
          first_name: "",
          last_name: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          console.log(values);
          handleSignup(values, resetForm);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="my-3 flex gap-2">
              <Field
                type="text"
                name="first_name"
                as={Input}
                placeholder="First name"
              />
              <Field
                type="text"
                name="last_name"
                as={Input}
                placeholder="Last name"
              />
            </div>

            <div className="my-3">
              <Field type="email" name="email" as={Input} placeholder="Email" />
              <ErrorMessage
                name="email"
                component="div"
                className="text-xs text-red-700"
              />
            </div>

            <div className="my-3">
              <InputGroup size="md">
                <Field
                  type={showPassword ? "text" : "password"}
                  name="password"
                  as={Input}
                  pr="4.5rem"
                  placeholder="Password"
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleClickPassword}>
                    {showPassword ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <ErrorMessage
                name="password"
                component="div"
                className="text-xs text-red-700"
              />
            </div>

            <div className="my-3">
              <InputGroup size="md">
                <Field
                  type={showConfPassword ? "text" : "password"}
                  name="confirm_password"
                  as={Input}
                  pr="4.5rem"
                  placeholder="Confirm Password"
                />
                <InputRightElement width="4.5rem">
                  <Button
                    h="1.75rem"
                    size="sm"
                    onClick={hanldeClickConfPassword}
                  >
                    {showConfPassword ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <ErrorMessage
                name="confirm_password"
                component="div"
                className="text-xs text-red-700"
              />
            </div>

            <div className="my-3 w-full">
              <button
                type="submit"
                disabled={isSubmitting}
                className="text-white rounded-md bg-[#55ab00] py-2 text-lg font-semibold w-full duration-200 hover:bg-[#528e16]"
              >
                Register
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignUpForm;
