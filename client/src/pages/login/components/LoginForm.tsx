import React, { useContext, useState } from "react";
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
import { ILogin } from "../../../assets/interfaces/Login";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../assets/context/usercontext";

const validationSchema = Yup.object({
  email: Yup.string().required("The email is required").email("Invalid email"),
});

const LoginForm = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();

  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error(
      "useContext(UserContext) is undefined, please verify the context provider"
    );
  }

  const { setUser } = userContext;

  const setUserContext = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(
        "http://localhost:3001/login/verifyUser",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.user) {
        setUser(response.data.user);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogin = (values: ILogin, resetForm: () => void) => {
    if (values.email === "" || values.password === "") {
      toast({
        title: "Password required",
        description: "Please fill every field before loging in",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else {
      axios
        .post(`http://localhost:3001/login/`, values)
        .then((res) => {
          console.log(res);
          const token = res.data.token;
          localStorage.setItem("token", token);
          navigate("/");
          resetForm();
          setUserContext();
        })
        .catch((error) => {
          if (error.response.status === 401) {
            toast({
              title: "Invalid password",
              description: "Your password is incorrect, please try again",
              status: "error",
              duration: 5000,
              isClosable: true,
            });
          } else if (error.response.status === 404) {
            toast({
              title: "Email not found",
              description: "This email is not assigned to any account",
              status: "error",
              duration: 5000,
              isClosable: true,
            });
          } else {
            toast({
              title: "Error",
              description: "There was an error, please try again later",
              status: "error",
              duration: 5000,
              isClosable: true,
            });
          }
        });
    }
  };

  return (
    <div className="w-full">
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          console.log(values);
          handleLogin(values, resetForm);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
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
                  type={show ? "text" : "password"}
                  name="password"
                  as={Input}
                  pr="4.5rem"
                  placeholder="Password"
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {show ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </div>

            <div className="my-3 w-full">
              <button
                type="submit"
                disabled={isSubmitting}
                className="text-white rounded-md bg-[#55ab00] py-2 text-lg font-semibold w-full duration-200 hover:bg-[#528e16]"
              >
                Log in
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
