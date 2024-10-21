import React from "react";
import { useNavigate } from "react-router-dom";
import "remixicon/fonts/remixicon.css";

function AlbumCard({ item }) {
  const navigate = useNavigate();
  return (
    <div
      className="card p-2 sm:p-3 md:p-4 lg:p-5 hover:bg-[#181818] rounded-lg cursor-pointer"
      onClick={() => {
        navigate(`/find/${item.folderName}`);
      }}
    >
      <div className="w-[140px] sm:w-[160px] md:w-[180px]">
        <div className="relative h-[140px] sm:h-[160px] md:h-[180px] rounded-lg overflow-hidden">
          <img
            src={item.img}
            alt={item.folderName}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-1 sm:gap-1.5 md:gap-2 lg:gap-3 my-2 px-1">
          <h2
            style={{ overflowWrap: "anywhere" }}
            className="text-sm sm:text-base"
          >
            {item.folderName}{" "}
            <span className="text-gray-400 text-xs sm:text-sm block">
              {item?.songs.length ? `(Nos. ${item?.songs.length})` : null}
            </span>
          </h2>
        </div>
      </div>
    </div>
  );
}

export default AlbumCard;
