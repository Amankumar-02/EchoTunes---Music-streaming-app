import React, { useContext } from "react";
import "remixicon/fonts/remixicon.css";
import { useSelector, useDispatch } from "react-redux";
import {
  setIsPlaying,
  setCurrentIndex,
  setCurrentSong,
  setPlayIcon,
  setMediaInfo,
} from "../../features/customStates/customStates";
import { SongCard, AlbumCard, Shimmer } from "../index";
import { AudioContext } from "../../context/audioContext";
import { useParams } from "react-router-dom";

function SongList() {
  const songName = useParams();
  const dispatch = useDispatch();
  const audioRef = useContext(AudioContext);
  const { albumSongs } = useSelector((state) => state.test);
  const currentSong = useSelector((state) => state.customState.currentSong);

  const playBtn = (title, index = 0) => {
    const song = albumSongs.find((item) => item.title === title);
    dispatch(setCurrentIndex(index));
    if (song) {
      audioRef.current.src = song.media;
      audioRef.current.play();
      dispatch(setCurrentSong(song));
      dispatch(setIsPlaying(true));
      dispatch(setMediaInfo(song.title));
      dispatch(setPlayIcon(true));
    }
  };
  return (
    <>
      {albumSongs.length <= 0 ? (
        <>
          <Shimmer />
        </>
      ) : (
        <div id="section1">
          <div className="title bg-[#1C1C1C] px-6 py-2 md:py-4">
            <h1 className="text-xl md:text-2xl font-bold mt-2 md:mt-4">
              EchoTunes Musics
            </h1>
          </div>
          <div className="list cards flex flex-wrap bg-[#1C1C1C]">
            {albumSongs.map((item, index) => (
              <SongCard
                key={index}
                item={item}
                index={index}
                playBtn={playBtn}
                currentSong={currentSong}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default SongList;
