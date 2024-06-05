import React, { useEffect, useContext } from "react";
import "remixicon/fonts/remixicon.css";
import { fetchDataWithoutShuffle } from "../../customHooks";
import { useSelector, useDispatch } from "react-redux";
import { setPlayerSongs } from "../../features/test/test";
import {
  setIsPlaying,
  setCurrentIndex,
  setCurrentSong,
  setPlayIcon,
  setMediaInfo,
} from "../../features/customStates/customStates";
import { SongCard, Shimmer } from "../index";
import { AudioContext } from "../../context/audioContext";
import { useParams } from "react-router-dom";

function SongList() {
  // accessing the url params
  const {songName} = useParams();
  const dispatch = useDispatch();
  // main audio ref
  const audioRef = useContext(AudioContext);
  // state with copy new album of songs
  const { playerSongs } = useSelector((state) => state.test);
  // custom states
  const currentSong = useSelector((state) => state.customState.currentSong);

  // get filtered albumSongs from server then setPlayerSongs
  useEffect(() => {
    setTimeout(()=>{
      const fetch = async () => {
        const songs = await fetchDataWithoutShuffle(`http://localhost:3000/media/find/${songName}`);
        if (songs) {
          dispatch(setPlayerSongs(songs.songs));
          dispatch(setCurrentIndex(0))
        }
      };
      fetch();
    },10)
  }, []);
  
  // get audio file from playerSongs
  // audio play handler 1of3
  const playBtn = (title, index = 0) => {
    const song = playerSongs.find((item) => item.title === title);
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

  // scroll to top when re-render
  useEffect(()=>{
    document.getElementById("scrollComponent").scrollTo(0,0)
  })
  
  return (
    <>
      {playerSongs.length <= 0 ? (
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
            {playerSongs.map((item, index) => (
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
