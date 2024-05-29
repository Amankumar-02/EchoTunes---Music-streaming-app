import React, { useEffect, useState } from "react";
import { arr, links } from "../../utils";
import "remixicon/fonts/remixicon.css";

function Playlist({songs, albums, playBtn, currentSong, menuToggleHandler}) {
  return (
    <div className="w-full md:w-[75vw] h-[77vh] overflow-hidden m-2 md:ms-0 bg-[#1C1C1C] rounded-lg">
      <div className="px-6 py-2 md:py-4 flex justify-between items-center bg-[#121212]">
        <div className="flex items-center gap-2">
          <div className="md:hidden bg-black rounded-full px-2 py-1 cursor-pointer" onClick={menuToggleHandler}>
          <i class="ri-menu-2-line text-2xl"></i>
          </div>
          <div className="hidden md:inline-block bg-black rounded-full px-1 cursor-pointer">
            <i className="ri-arrow-left-s-line text-2xl"></i>
          </div>
          <div className="hidden md:inline-block bg-black rounded-full px-1 cursor-pointer">
            <i className="ri-arrow-right-s-line text-2xl"></i>
          </div>
        </div>
        <div className="flex gap-2 md:gap-4">
          <button className="font-bold text-gray-400 py-1 md:py-2 px-3 md:px-6 hover:scale-[1.06] text-sm md:text-base">
            Sign up
          </button>
          <button className="rounded-3xl font-bold bg-white text-black py-1 md:py-2 px-3 md:px-6 hover:scale-[1.06] text-sm md:text-base">
            Login
          </button>
        </div>
      </div>
      <div className="scroll h-[92%] md:h-[86%] overflow-scroll overflow-x-hidden">
        {songs.length <= 0? null : (
          <div id="section1">
          <div className="title bg-[#1C1C1C] px-6 py-2 md:py-4">
            <h1 className="text-xl md:text-2xl font-bold mt-2 md:mt-4">EchoTunes Musics</h1>
          </div>
          <div className="list cards flex flex-wrap bg-[#1C1C1C]">
            {songs.map((item, index) => (
              <div
                key={index}
                className="card p-2 md:p-4 hover:bg-[#181818] rounded-lg"
              >
                <div className="w-[170px] md:w-[164px]">
                  <div className="relative h-[170px] md:h-[164px] rounded-lg overflow-hidden">
                    <img
                      src={item.img}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                    <div className={`playBtn absolute right-2 bottom-2 rounded-full ${currentSong?.title === item.title? "bg-black text-green-500" : "bg-green-500 text-black"} px-3 py-2 cursor-pointer`} onClick={()=>{playBtn(item.title, index)}}>
                        <i className="ri-play-fill text-3xl"></i>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 md:gap-2 my-2 px-1">
                    <h2>{item.title}</h2>
                    <p className="max-h-[30px] md:max-h-[40px] overflow-hidden text-xs md:text-sm text-gray-400">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        )}
        {albums.length <= 0? null : (
          <div id="section2">
          <div className="title bg-[#1C1C1C] px-6 py-2 md:py-4">
            <h1 className="text-xl md:text-2xl font-bold mt-2 md:mt-4">EchoTunes Playlists</h1>
          </div>
          <div className="list cards flex flex-wrap bg-[#1C1C1C]">
            {albums.map((item, index) => (
              <div
                key={index}
                className="card p-2 md:p-4 hover:bg-[#181818] rounded-lg"
                // onClick={}
              >
                <div className="w-[170px] md:w-[164px]">
                  <div className="relative h-[170px] md:h-[164px] rounded-lg overflow-hidden">
                    <img
                      src={item.songs[0].img}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                    {/* <div className="playBtn absolute right-2 bottom-2 rounded-full bg-green-500 px-3 py-2">
                      <i className="ri-play-fill text-3xl text-black"></i>
                    </div> */}
                  </div>
                  <div className="flex flex-col gap-1 md:gap-2 my-2 px-1">
                    <h2>{item.folderName}</h2>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        )}
        <div className="footer bg-[#1C1C1C] px-4 md:px-8 py-6 md:py-16">
          <hr />
          <div className="flex flex-wrap lg:flex-nowrap gap-6 md:gap-2 md:justify-between py-6 md:py-16">
            {links.map((item1, index1) => (
              <div key={index1}>
                <h3 className="text-sm md:text-base font-semibold mb-2">{item1.title}</h3>
                <ul>
                  {item1.more.map((item2, index2) => (
                    <li key={index2} className="text-xs md:text-sm mb-1">
                      {item2}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <ul className="flex gap-2 md:gap-4">
                <li className="bg-[#242424] hover:bg-[#727272] px-3 py-2 rounded-full">
                  <i className="ri-instagram-line text-xl"></i>
                </li>
                <li className="bg-[#242424] hover:bg-[#727272] px-3 py-2 rounded-full">
                  <i className="ri-twitter-fill text-xl"></i>
                </li>
                <li className="bg-[#242424] hover:bg-[#727272] px-3 py-2 rounded-full">
                  <i className="ri-facebook-circle-fill text-xl"></i>
                </li>
              </ul>
            </div>
          </div>
          <hr />
          <div className="pt-6 md:pt-16 text-xs">© 2024 EchoTunes</div>
        </div>
      </div>
    </div>
  );
}

export default Playlist;
