import React, { useEffect } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setLoginStatus } from "../../features/customStates/customStates";

function Login() {
  const { loginStatus } = useSelector((state) => state.customState);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginEventHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_SERVER_URL}auth/userlogin`, data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log(response.data.message);
      toast.success(response.data.message);
      dispatch(setLoginStatus(true));
      navigate("/");
    } catch (error) {
      console.log("Error:", error.response.data.message);
      toast.warning(error.response.data.message);
    }
  };
  const guestLoginEventHandler = async () => {
    const randomUserName = `guest${Math.floor(Math.random() * 9999)}`;
    const randomEmail = `guest${Math.floor(Math.random() * 9999)}@gmail.com`;
    const randomFullName = `Guest${Math.floor(Math.random() * 9999)}`;
    const randomPassword = "12345678";
    const guestRegister = {
      username: randomUserName,
      email: randomEmail,
      fullname: randomFullName,
      password: randomPassword,
    };
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_SERVER_URL}auth/userregister`,
        guestRegister,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(response.data.message);
      toast.success(response.data.message);
      dispatch(setLoginStatus(true));
      navigate("/");
    } catch (error) {
      console.log("Error:", error.response.data.message);
      toast.warning(error.response.data.message);
    }
  };
  useEffect(() => {
    if (loginStatus === true) {
      navigate("/");
    }
  }, [loginStatus, navigate]);

  return (
    <>
      <div className="flex items-center justify-center px-4 py-6 flex-col gap-2 lg:gap-4">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tight">
          EchoTunes
        </h1>
        <h1 className="text-base md:text-lg lg:text-xl mb-2 tracking-tight">
          Log in to EchoTunes
        </h1>

        <form
          onSubmit={loginEventHandler}
          className="flex flex-col gap-2 w-full max-w-xs md:max-w-md lg:max-w-lg"
        >
          <label
            htmlFor="email_usernameId"
            className="text-sm md:text-base font-semibold"
          >
            User Name
          </label>
          <input
            type="text"
            id="email_usernameId"
            name="email_username"
            className="py-2 px-4 text-sm md:text-base rounded-sm bg-transparent border border-gray-500 placeholder:text-gray-500 mb-2"
            placeholder="jake_paul / name@domain.com"
          />
          <label
            htmlFor="passwordId2"
            className="text-sm md:text-base font-semibold"
          >
            Password
          </label>
          <input
            type="password"
            id="passwordId2"
            name="password"
            className="py-2 px-4 text-sm md:text-base rounded-sm bg-transparent border border-gray-500 placeholder:text-gray-500 mb-2"
            placeholder="****5678"
          />
          <input
            type="submit"
            value="Login"
            className="bg-[#1FDD63] py-2 rounded-full mt-2 text-black font-semibold active:scale-[0.96] hover:bg-green-500 cursor-pointer"
          />
        </form>

        <button
          className="bg-gray-400 py-2 rounded-full mt-2 text-black font-semibold w-full max-w-xs md:max-w-md lg:max-w-lg cursor-pointer active:scale-[0.96] hover:bg-gray-500"
          onClick={guestLoginEventHandler}
        >
          Guest Login
        </button>
        <p className="text-sm md:text-base font-light">New to EchoTunes? <span className="font-semibold cursor-pointer" onClick={()=>{navigate("/signup")}}>Sign Up now</span></p>
      </div>
    </>
  );
}

export default Login;
