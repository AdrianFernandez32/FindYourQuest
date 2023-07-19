import { useState } from "react";
import defaultcity from "../../assets/images/bg_oaxaca.png";
import FYQLogo from "../../assets/images/FYQ_logo.png";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignupForm";

const Login = () => {
  const [login, setLogin] = useState(true);
  return (
    <div className="flex justify-center items-center w-full min-h-full h-screen">
      <img
        src={defaultcity}
        alt="photo"
        className="absolute object-cover w-full h-full z-0"
      />
      <div className="z-10 w-full h-full flex justify-end items-center md:p-20 lg:p-10">
        <div className="flex flex-col justify-evenly items-center h-full lg:h-2/3 w-full lg:w-1/3 bg-white rounded-lg">
          <img src={FYQLogo} alt="FindYourQuest" className="w-3/5" />
          <div className="flex flex-col w-4/5">
            <h1 className="text-2xl text-[#55ab00] font-bold">
              {login ? "Log in" : "Sign up"}
            </h1>
            {login ? <LoginForm /> : <SignUpForm setLogin={setLogin} />}
          </div>
          <div className="flex flex-col justify-center items-center w-3/5 text-gray-600">
            {login ? "Don't have an account?" : "Have an account?"}

            <span
              className="text-[#55ab00] hover:underline"
              onClick={() => setLogin((prevLogin) => !prevLogin)}
            >
              {login ? "Register now" : "Sign in"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
