import React from "react";
import "remixicon/fonts/remixicon.css";

function Playlist() {
  let arr = [1, 2, 3, 4, 5, 6, 7, 8,9,10,11,12,13,14,15,16,17,18];
  return (
    <div className="w-[75vw] m-2 ms-0 bg-[#121212] rounded-lg">
      <div className="px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-black rounded-full px-1 cursor-pointer">
            <i class="ri-arrow-left-s-line text-2xl"></i>
          </div>
          <div className="bg-black rounded-full px-1 cursor-pointer">
            <i class="ri-arrow-right-s-line text-2xl"></i>
          </div>
        </div>
        <div className="flex gap-4">
          <button className="font-bold text-gray-400 py-2 px-6 hover:scale-[1.06]">
            Sign up
          </button>
          <button className="rounded-3xl font-bold bg-white text-black py-2 px-6 hover:scale-[1.06]">
            Login
          </button>
        </div>
      </div>
      <div className="bg-[#1C1C1C] px-6 py-4">
        <h1 className="text-2xl font-bold mt-4">EchoTunes Playlists</h1>
      </div>
      <div className="cards flex flex-wrap bg-[#1C1C1C]">
        {arr.map((item) => (
          <div className="card p-4 hover:bg-[#181818] rounded-lg">
            <div className="w-[166px]">
              <div className="relative h-[166px] rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1493612276216-ee3925520721?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tfGVufDB8fDB8fHww"
                  alt=""
                  className="h-full w-full object-cover"
                />
                <div className="playBtn absolute right-2 bottom-2 rounded-full bg-green-500 px-3 py-2">
                  <i class="ri-play-fill text-3xl text-black"></i>
                </div>
              </div>
              <div className="flex flex-col gap-2 my-2 px-1">
                <h2>New Music Friday</h2>
                <p className="h-[40px] overflow-hidden text-sm text-gray-400">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Nostrum odit quasi ipsum laborum voluptate repudiandae
                  necessitatibus consectetur dolor animi nulla repellat, labore,
                  laboriosam dolorem quisquam.
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Playlist;
