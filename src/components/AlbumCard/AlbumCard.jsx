import React from "react";
import { setAlbumSongs, setPlayerSongs } from "../../features/test/test";
import {setCurrentIndex} from '../../features/customStates/customStates'
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "remixicon/fonts/remixicon.css";

function AlbumCard({item}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div
      className="card p-2 md:p-4 hover:bg-[#181818] rounded-lg"
      onClick={()=>{
        dispatch(setAlbumSongs(item.songs))
        dispatch(setPlayerSongs(item.songs))
        dispatch(setCurrentIndex(0))
        navigate(`/songList/${item.folderName}`)
      }}
    >
      <div className="w-[170px] md:w-[164px]">
        <div className="relative h-[170px] md:h-[164px] rounded-lg overflow-hidden">
          <img
            src={item.songs[0].img}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-1 md:gap-2 my-2 px-1">
          <h2>{item.folderName}</h2>
        </div>
      </div>
    </div>
  );
}

export default AlbumCard;
