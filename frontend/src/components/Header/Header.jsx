import React, { useState, useEffect } from "react";
import "remixicon/fonts/remixicon.css";
import { useSelector, useDispatch } from "react-redux";
import {
  setLoginStatus,
  setMenuToggle,
} from "../../features/customStates/customStates";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const menuToggle = useSelector((state) => state.customState.menuToggle);
  const { loginStatus } = useSelector((state) => state.customState);

  const menuToggleHandler = () => {
    dispatch(setMenuToggle(!menuToggle));
  };

  const backForwEvent = (direction) => {
    if (direction === "left") {
      window.history.back();
    } else if (direction === "right") {
      window.history.forward();
    }
  };

  const [userData, setUserData] = useState([]);
  console.log(import.meta.env.VITE_API_SERVER_URL)
  // fetch user Data
  useEffect(() => {
    const checkUserLogin = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_SERVER_URL}auth/loginUserDets`, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        setUserData(response.data?.data?.resource);
      } catch (error) {
        console.log("Error:", error.response.data.message);
      }
    };
    checkUserLogin();
  }, [loginStatus]);

  const logoutEventHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_SERVER_URL}auth/userlogout`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log(response?.data?.message);
      dispatch(setLoginStatus(false));
    } catch (error) {
      console.log("Error:", error.response.data.message);
    }
    // window.location.reload();
  };

  return (
    <div className="px-4 py-2 md:px-6 md:py-4 flex justify-between items-center bg-[#121212]">
      <div className="flex items-center gap-2">
        {/* Mobile menu button */}
        <div
          className="md:hidden bg-black rounded-full px-2 py-1 cursor-pointer"
          onClick={menuToggleHandler}
        >
          <i className="ri-menu-2-line text-xl md:text-2xl"></i>
        </div>

        {/* Backward navigation */}
        <div
          className="hidden md:inline-block bg-black rounded-full px-1 cursor-pointer active:scale-[0.9]"
          onClick={() => backForwEvent("left")}
        >
          <i className="ri-arrow-left-s-line text-xl md:text-2xl"></i>
        </div>

        {/* Forward navigation */}
        <div
          className="hidden md:inline-block bg-black rounded-full px-1 cursor-pointer active:scale-[0.9]"
          onClick={() => backForwEvent("right")}
        >
          <i className="ri-arrow-right-s-line text-xl md:text-2xl"></i>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
        {!loginStatus ? (
          <>
            {/* Sign Up button */}
            <button
              className="font-bold text-gray-400 py-1 px-2 sm:px-3 sm:py-1.5 md:py-2 md:px-6 hover:scale-[1.06] active:scale-[0.9] transition text-sm md:text-base"
              onClick={() => navigate("/signup")}
            >
              Sign up
            </button>

            {/* Login button */}
            <button
              className="rounded-3xl font-bold bg-white text-black py-1 px-2 sm:px-3 sm:py-1.5 md:py-2 md:px-6 hover:scale-[1.06] active:scale-[0.9] transition text-sm md:text-base"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </>
        ) : (
          <>
            {/* User profile icon */}
            <div
              className="rounded-3xl px-3 md:px-4 hover:scale-[1.06] active:scale-[0.9] transition"
              onClick={() => navigate("/userProfile")}
            >
              <i className="ri-file-user-line cursor-pointer text-xl md:text-3xl text-gray-400">
                <span className="ms-2 text-base md:text-lg">
                  {userData?.username?.length > 8 ? (userData?.username.slice(0,8)+"...") : (userData?.username)}
                </span>
              </i>
            </div>

            {/* Logout button */}
            <button
              className="rounded-3xl font-bold bg-white text-black py-1 px-2 sm:px-3 sm:py-1.5 md:py-2 md:px-6 hover:scale-[1.06] active:scale-[0.9] transition text-sm md:text-base"
              onClick={logoutEventHandler}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
