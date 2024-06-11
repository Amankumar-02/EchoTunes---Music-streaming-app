import React from 'react'
import "remixicon/fonts/remixicon.css";
import { useSelector, useDispatch } from "react-redux";
import { setLoginStatus, setMenuToggle } from '../../features/customStates/customStates';
import axios from 'axios';

function Header() {
  const dispatch = useDispatch();
  const menuToggle = useSelector((state) => state.customState.menuToggle);
  const {loginStatus} = useSelector(state=>state.customState);

  const menuToggleHandler = () => {
    dispatch(setMenuToggle(!menuToggle));
  };

  const backForwEvent = (direction)=>{
    if (direction === "left") {
      window.history.back();
    } else if (direction === "right") {
      window.history.forward();
    }
  }
  const logoutEventHandler = async (e)=>{
    e.preventDefault();
    try {
      await axios.get(
        "http://localhost:3000/auth/userlogout",
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      dispatch(setLoginStatus(false))
      } catch (error) {
        console.log("Error:", error.response.data);
        }
  }

  return (
    <div className="px-6 py-2 md:py-4 flex justify-between items-center bg-[#121212]">
        <div className="flex items-center gap-2">
          <div className="md:hidden bg-black rounded-full px-2 py-1 cursor-pointer" onClick={menuToggleHandler}>
          <i className="ri-menu-2-line text-2xl"></i>
          </div>
          <div className="hidden md:inline-block bg-black rounded-full px-1 cursor-pointer" onClick={()=>{backForwEvent("left")}}>
            <i className="ri-arrow-left-s-line text-2xl"></i>
          </div>
          <div className="hidden md:inline-block bg-black rounded-full px-1 cursor-pointer" onClick={()=>{backForwEvent("right")}}>
            <i className="ri-arrow-right-s-line text-2xl"></i>
          </div>
        </div>
        <div className="flex gap-2 md:gap-4">
        {!loginStatus? (
          <>
          <a href="/signup">
            <button className="font-bold text-gray-400 py-1 md:py-2 px-3 md:px-6 hover:scale-[1.06] text-sm md:text-base">
              Sign up
            </button>
          </a>
          <a href="/login">
            <button className="rounded-3xl font-bold bg-white text-black py-1 md:py-2 px-3 md:px-6 hover:scale-[1.06] text-sm md:text-base">
              Login
            </button>
          </a>
          </>
        ) : (
          <>
            <button className="rounded-3xl font-bold bg-white text-black py-1 md:py-2 px-3 md:px-6 hover:scale-[1.06] text-sm md:text-base" onClick={logoutEventHandler}>
              Logout
            </button>
          </>
        )}
        </div>
        {/* <div className="flex gap-2 md:gap-4">
          <a href="/signup">
            <button className="font-bold text-gray-400 py-1 md:py-2 px-3 md:px-6 hover:scale-[1.06] text-sm md:text-base">
              Sign up
            </button>
          </a>
          <a href="/login">
            <button className="rounded-3xl font-bold bg-white text-black py-1 md:py-2 px-3 md:px-6 hover:scale-[1.06] text-sm md:text-base">
              Login
            </button>
          </a>
        </div> */}
      </div>
  )
}

export default Header