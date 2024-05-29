import React from "react";
import "remixicon/fonts/remixicon.css";

function SongCard({item, index, playBtn, currentSong}) {
  return (
    <div className="card p-2 md:p-4 hover:bg-[#181818] rounded-lg">
      <div className="w-[170px] md:w-[164px]">
        <div className="relative h-[170px] md:h-[164px] rounded-lg overflow-hidden">
          <img src={item.img} alt="" className="h-full w-full object-cover" />
          <div
            className={`playBtn absolute right-2 bottom-2 rounded-full ${
              currentSong?.title === item.title
                ? "bg-black text-green-500"
                : "bg-green-500 text-black"
            } px-3 py-2 cursor-pointer`}
            onClick={() => {
              playBtn(item.title, index);
            }}
          >
            <i className="ri-play-fill text-3xl"></i>
          </div>
        </div>
        <div className="flex flex-col gap-1 md:gap-2 my-2 px-1">
          <h2>{item.title}</h2>
          <p className="max-h-[30px] md:max-h-[40px] overflow-hidden text-xs md:text-sm text-gray-400">
            {item.desc}
          </p>
        </div>
      </div>
    </div>
  );
}

export default SongCard;
