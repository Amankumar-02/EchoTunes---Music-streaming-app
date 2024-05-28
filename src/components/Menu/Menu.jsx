import React from "react";
import "remixicon/fonts/remixicon.css";
import { menuLinks } from '../../utils';

function Menu() {
  return (
    <div className="w-[25vw] m-2 h-[77vh] rounded-lg overflow-hidden">
      <div className="homeSection rounded-lg py-4 px-6 bg-[#121212] mb-2">
        <div className="logo mb-4 text-lg font-semibold cursor-pointer">EchoTunes</div>
        <ul>
          <li className="flex gap-4 mb-4 items-center cursor-pointer">
            <i className="ri-home-4-line text-2xl"></i>
            <div className="font-semibold hover:underline">Home</div>
          </li>
          <li className="flex gap-4 items-center cursor-pointer">
            <i className="ri-search-line text-2xl"></i>
            <div className="font-semibold hover:underline">Search</div>
          </li>
        </ul>
      </div>
      <div className="librarySection rounded-lg py-4 px-2 bg-[#121212]">
        <div className="flex justify-between items-center mb-4 px-4">
          <div className="flex gap-4 items-center">
            <i className="ri-flip-horizontal-line text-2xl"></i>
            <div className="font-semibold">Your Library</div>
          </div>
          <i className="ri-add-line text-xl cursor-pointer"></i>
        </div>
        <div className="scroll flex flex-col gap-2 h-[110px] overflow-scroll overflow-x-hidden scroll-smooth">
          <div className="bg-[#242424] rounded-lg py-4 px-6">
            <div className="text-sm mb-1 font-semibold">Create your first playlist</div>
            <p className="text-xs mb-2">It's easy, we'll help you</p>
            <button className="rounded-3xl bg-white text-black text-sm font-bold px-3 py-1 w-fit">Create Playlist</button>
          </div>
          <div className="bg-[#242424] rounded-lg py-4 px-6">
            <div className="text-sm mb-1 font-semibold">Let’s find some playlist</div>
            <p className="text-xs mb-2">We’ll keep you updated</p>
            <button className="rounded-3xl bg-white text-black text-sm font-bold px-3 py-1 w-fit">Browse Playlist</button>
          </div>
        </div>
        <div className="px-4">
          <ul className="flex flex-wrap gap-4 text-xs text-gray-400 my-5">
            {menuLinks.map((item, index)=>(
              <li key={index} className="cursor-pointer">{item}</li>
            ))}
          </ul>
          <div className="flex gap-1 items-center px-3 rounded-3xl border w-fit cursor-pointer">
          <i className="ri-global-line text-xl"></i>
          <div className="text-sm font-semibold">English</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menu;
