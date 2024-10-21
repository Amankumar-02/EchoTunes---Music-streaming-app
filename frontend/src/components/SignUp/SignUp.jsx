import React, { useEffect } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setLoginStatus } from "../../features/customStates/customStates";

function SignUp() {
  const { loginStatus } = useSelector((state) => state.customState);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const signupEventHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_SERVER_URL}auth/userregister`,
        data,
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
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tight">EchoTunes</h1>
        <h1 className="text-base md:text-lg lg:text-xl mb-2 tracking-tight">
          Sign up to start listening
        </h1>
        <form
          onSubmit={signupEventHandler}
          className="flex flex-col gap-2 w-full max-w-xs md:max-w-md lg:max-w-lg"
        >
          <label htmlFor="userNameId" className="text-sm md:text-base font-semibold">
            User Name
          </label>
          <input
            type="text"
            id="userNameId"
            name="username"
            className="py-2 px-4 text-sm md:text-base rounded-sm bg-transparent border border-gray-500 placeholder:text-gray-500 mb-2"
            placeholder="jake_paul"
          />
          <label htmlFor="emailId" className="text-sm md:text-base font-semibold">
            Email
          </label>
          <input
            type="email"
            id="emailId"
            name="email"
            className="py-2 px-4 text-sm md:text-base rounded-sm bg-transparent border border-gray-500 placeholder:text-gray-500 mb-2"
            placeholder="name@domin.com"
          />
          <label htmlFor="fullnameId" className="text-sm md:text-base font-semibold">
            Full Name
          </label>
          <input
            type="text"
            id="fullnameId"
            name="fullname"
            className="py-2 px-4 text-sm md:text-base rounded-sm bg-transparent border border-gray-500 placeholder:text-gray-500 mb-2"
            placeholder="Jake Paul"
          />
          <label htmlFor="passwordId" className="text-sm md:text-base font-semibold">
            Password
          </label>
          <input
            type="password"
            id="passwordId"
            name="password"
            className="py-2 px-4 text-sm md:text-base rounded-sm bg-transparent border border-gray-500 placeholder:text-gray-500 mb-2"
            placeholder="****5678"
          />
          <input
            type="submit"
            value="Signup"
            className="bg-[#1FDD63] py-2 rounded-full mt-2 text-black font-semibold active:scale-[0.96] hover:bg-green-500 cursor-pointer"
          />
        </form>
        <p className="text-sm md:text-base font-light">Already User? <span className="font-semibold cursor-pointer" onClick={()=>{navigate("/login")}}>Sign In now</span></p>
      </div>
    </>
  );
}

export default SignUp;
