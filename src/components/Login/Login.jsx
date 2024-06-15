import React, { useEffect } from "react";
import axios from "axios";
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
      const response = await axios.post(
        "http://localhost:3000/auth/userlogin",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(response.data.message);
      dispatch(setLoginStatus(true));
      navigate("/");
    } catch (error) {
      console.log("Error:", error.response.data.message);
    }
  };
  useEffect(() => {
    if (loginStatus === true) {
      navigate("/");
    }
  }, [loginStatus, navigate]);

  return (
    <>
      <div className="flex items-center justify-center px-4 py-6 flex-col gap-2">
        <h1 className="text-3xl font-bold -tracking-tighter">EchoTunes</h1>
        <h1 className="text-3xl mb-2 -tracking-tight">Log in to EchoTunes</h1>
        <form
          onSubmit={loginEventHandler}
          className="flex flex-col gap-1 w-[90%] md:w-1/3"
        >
          <label htmlFor="email_usernameId" className="text-sm font-semibold">
            User Name
          </label>
          <input
            type="text"
            id="email_usernameId"
            name="email_username"
            className="py-2 px-4 text-sm rounded-sm bg-transparent border border-gray-500 placeholder:text-gray-500 mb-1"
            placeholder="jake_paul / name@domain.com"
          />
          <label htmlFor="passwordId2" className="text-sm font-semibold">
            Password
          </label>
          <input
            type="password"
            id="passwordId2"
            name="password"
            className="py-2 px-4 text-sm rounded-sm bg-transparent border border-gray-500 placeholder:text-gray-500 mb-1"
            placeholder="****5678"
          />
          <input
            type="submit"
            value="Login"
            className="bg-[#1FDD63] py-2 rounded-full mt-2 text-black font-semibold"
          />
        </form>
      </div>
    </>
  );
}

export default Login;
