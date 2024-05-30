import React, { useEffect, useContext } from "react";
import "remixicon/fonts/remixicon.css";
import { Outlet } from "react-router-dom";
import { fetchData, formatTime } from "./customHooks";
import {  Menu, MusicPlayer, Header, Footer } from "./components/index";
import { setSongs, setAlbums } from "./features/test/test";
import {
  setSeekBar,
  setMediaStart,
  setMediaEnd,
  setIsPlaying,
  setPlayIcon,
} from "./features/customStates/customStates";

import { useDispatch } from "react-redux";
import { AudioContext } from "./context/audioContext";

function App() {
  const dispatch = useDispatch();
  const audioRef = useContext(AudioContext);

  // get data from server
  useEffect(() => {
    const fetch = async () => {
      const songs = await fetchData("http://localhost:3000/songs/");
      if (songs) {
        dispatch(setSongs(songs));
      }
      const albums = await fetchData("http://localhost:3000/albums/");
      if (albums) {
        dispatch(setAlbums(albums));
      }
    };
    fetch();
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    const updateTime = () => {
      // dispatch(setSeekBar((audio.currentTime / audio.duration) * 100));
      dispatch(
        setSeekBar(
          isNaN((audio.currentTime / audio.duration) * 100)
            ? 0
            : (audio.currentTime / audio.duration) * 100
        )
      );
      dispatch(setMediaStart(formatTime(audio.currentTime)));
      dispatch(setMediaEnd(formatTime(audio.duration)));
    };
    const resetPlayer = () => {
      dispatch(setSeekBar(0));
      dispatch(setMediaStart(formatTime(0)));
      dispatch(setIsPlaying(false));
      dispatch(setPlayIcon(false));
    };
    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("ended", resetPlayer);
    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("ended", resetPlayer);
    };
  }, []);

  return (
    <>
      <div className="w-full flex">
        <Menu />
        <div className="w-full md:w-[75vw] h-[77vh] overflow-hidden m-2 md:ms-0 bg-[#1C1C1C] rounded-lg">
          <Header/>
          <div className="scroll h-[92%] md:h-[86%] overflow-scroll overflow-x-hidden">
            <Outlet/>
            <Footer />
          </div>
        </div>
      </div>
      <MusicPlayer />
    </>
  );
}

export default App;
