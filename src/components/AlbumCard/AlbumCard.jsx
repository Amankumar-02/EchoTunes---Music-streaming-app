import React from "react";
import { useNavigate } from "react-router-dom";
import "remixicon/fonts/remixicon.css";

function AlbumCard({item}) {
  const navigate = useNavigate();
  return (
    <div
      className="card p-2 md:p-4 hover:bg-[#181818] rounded-lg"
      onClick={()=>{
        navigate(`/find/${item.folderName}`)
      }}
    >
      <div className="w-[170px] md:w-[164px]">
        <div className="relative h-[170px] md:h-[164px] rounded-lg overflow-hidden">
          <img
            src={item.img}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-1 md:gap-2 my-2 px-1">
          <h2 style={{overflowWrap: "anywhere"}}>{item.folderName} <span className="text-gray-400 text-xs">{item?.songs.length ? ' - ('+item?.songs.length+')' : null}</span></h2>
        </div>
      </div>
    </div>
  );
}

export default AlbumCard;
