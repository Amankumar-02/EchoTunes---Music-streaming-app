import React, { useState } from "react";
import "remixicon/fonts/remixicon.css";
import { menuLinks } from '../../utils';
import { useSelector, useDispatch } from "react-redux";
import {setMenuToggle} from '../../features/customStates/customStates';
import { useNavigate } from "react-router-dom";

function Menu() {
  const menuToggle = useSelector(state=>state.customState.menuToggle);
  const [searchToggle, setSearchToggle] = useState(true);
  const [searchInputValue, setSearchInputValue] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const searchTimeOutFunc = ()=>{
    setTimeout(()=>{
      setSearchToggle(true);
    }, 20000)
  };

  const menuToggleHandler = ()=>{
    dispatch(setMenuToggle(!menuToggle))
  }

  const searchEventHandler = (e)=>{
    e.preventDefault();
    const searchValue = new FormData(e.target).get('songName');
    navigate(`/search/${searchValue}`);
    setSearchInputValue("");
    setSearchToggle(true);
    clearTimeout(searchTimeOutFunc);
  };

  return (
    <div className={`${menuToggle? "inline-block absolute top-0 left-0 z-10 bg-black pe-2 w-[50vw]" : "hidden"} md:inline-block md:relative md:z-0 md:pe-0 md:w-[25vw] md:bg-transparent m-2 h-[77vh] rounded-lg overflow-hidden`}>
      <div className="homeSection rounded-lg py-3 lg:py-4 px-4 lg:px-6 bg-[#121212] mb-2">
        <div className="logo mb-4 text-lg flex justify-between items-center font-semibold cursor-pointer">
          <p onClick={()=>{navigate('/')}}>EchoTunes</p>
          <div className="md:hidden bg-black rounded-full px-2 py-1 cursor-pointer w-fit" onClick={menuToggleHandler}>
          <i className="ri-close-line text-xl md:text-2xl"></i>
          </div>
        </div>
        <ul>
          <li className="flex gap-4 mb-4 items-center cursor-pointer">
            <i className="ri-home-4-line text-xl md:text-2xl"></i>
              <div className="font-semibold hover:underline text-sm md:text-base" onClick={()=>{navigate("/")}}>Home</div>
          </li>
          <li className="flex gap-4 items-center cursor-pointer">
            <i className="ri-search-line text-xl md:text-2xl"></i>
            {searchToggle? (<>
            <div className="font-semibold hover:underline text-sm md:text-base" onClick={()=>{
              setSearchToggle(prev=>!prev);
              searchTimeOutFunc();
              }}>Search</div>
            </>) : (<>
            <form onSubmit={searchEventHandler} className="w-full">
              <input type="text" value={searchInputValue} onChange={(e)=>{setSearchInputValue(e.target.value)}} placeholder="Search Input" className=" px-1 md:px-2 py-1 w-full rounded-lg bg-transparent border border-gray-500 text-sm" name="songName"/>
            </form>
            <i className="ri-close-fill" onClick={()=>{
              setSearchToggle(prev=>!prev);
              clearTimeout(searchTimeOutFunc);
              }}></i>
            </>)}
          </li>
        </ul>
      </div>
      <div className="librarySection rounded-lg py-4 px-2 bg-[#121212]">
        <div className="flex justify-between items-center mb-4 px-4">
          <div className="flex gap-4 items-center">
            <i className="ri-flip-horizontal-line text-xl md:text-2xl"></i>
            <div className="font-semibold text-sm md:text-base">Your Library</div>
          </div>
          <i className="ri-add-line text-lg md:text-xl cursor-pointer"></i>
        </div>
        <div className="scroll flex flex-col gap-2 h-full lg:h-[110px] overflow-scroll overflow-x-hidden scroll-smooth">
          <div className="bg-[#242424] rounded-lg py-3 lg:py-4 px-4 lg:px-6">
            <div className="text-[12px] md:text-sm mb-1 font-semibold">Create your first playlist</div>
            <p className="text-[10px] md:text-xs mb-2">It's easy, we'll help you</p>
            <button className="rounded-3xl bg-white text-black text-xs md:text-sm font-semibold md:font-bold px-2 lg:px-3 py-1 w-fit">Create Playlist</button>
          </div>
          <div className="bg-[#242424] rounded-lg py-3 lg:py-4 px-4 lg:px-6">
            <div className="text-[12px] md:text-sm mb-1 font-semibold">Let’s find some created playlist</div>
            <p className="text-[10px] md:text-xs mb-2">We’ll keep your playlist saved</p>
            <button className="rounded-3xl bg-white text-black text-xs md:text-sm font-semibold md:font-bold px-2 lg:px-3  py-1 w-fit" onClick={()=>{navigate("/allUserPlaylists")}}>Browse Playlist</button>
          </div>
        </div>
        <div className="px-4">
          <ul className="flex flex-wrap gap-2 lg:gap-4 text-[10px] md:text-xs text-gray-400 my-5">
            {menuLinks.map((item, index)=>(
              <li key={index} className="cursor-pointer">{item}</li>
            ))}
          </ul>
          <div className="flex gap-1 items-center px-3 rounded-3xl border w-fit cursor-pointer">
          <i className="ri-global-line text-lg md:text-xl"></i>
          <div className="text-xs md:text-sm font-semibold">English</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menu;
