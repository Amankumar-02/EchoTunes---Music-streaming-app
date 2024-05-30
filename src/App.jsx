import React, { useEffect, useContext } from "react";
import "remixicon/fonts/remixicon.css";
import { Outlet } from "react-router-dom";
import { fetchData, formatTime } from "./customHooks";
import { Menu, MusicPlayer, Header, Footer } from "./components/index";
import { setSongs, setAlbums, setPlayerSongs } from "./features/test/test";
import {
  setSeekBar,
  setMediaStart,
  setMediaEnd,
  setIsPlaying,
  setPlayIcon,
  setCurrentIndex,
  setCurrentSong,
  setMediaInfo,
} from "./features/customStates/customStates";
import { useDispatch, useSelector } from "react-redux";
import { AudioContext } from "./context/audioContext";

function App() {
  const dispatch = useDispatch();
  // main audio ref
  const audioRef = useContext(AudioContext);
  // state with copy of current songs
  const { playerSongs } = useSelector((state) => state.test);
  const { currentIndex } = useSelector((state) => state.customState);

  // get data from server
  useEffect(() => {
    const fetch = async () => {
      const songs = await fetchData("http://localhost:3000/songs/");
      if (songs) {
        dispatch(setSongs(songs));
        dispatch(setPlayerSongs(songs));
      }
      const albums = await fetchData("http://localhost:3000/albums/");
      if (albums) {
        dispatch(setAlbums(albums));
      }
    };
    fetch();
  }, []);

  // Handle audio updates
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

    const resetPlayer = async () => {
      const nextIndex = currentIndex + 1;
      const nextSong = playerSongs[nextIndex];
      if (nextSong) {
        dispatch(setCurrentIndex(nextIndex));
        audio.src = nextSong.media;
        await audio.play();
        dispatch(setCurrentSong(nextSong));
        dispatch(setIsPlaying(true));
        dispatch(setMediaInfo(nextSong.title));
        dispatch(setPlayIcon(true));
      }else{
        dispatch(setSeekBar(0));
        dispatch(setMediaStart(formatTime(0)));
        dispatch(setIsPlaying(false));
        dispatch(setPlayIcon(false));
      }
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("ended", resetPlayer);
    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("ended", resetPlayer);
    };
  }, [audioRef, currentIndex, dispatch, playerSongs]);

  return (
    <>
      <div className="w-full flex">
        <Menu />
        <div className="w-full md:w-[75vw] h-[77vh] overflow-hidden m-2 md:ms-0 bg-[#1C1C1C] rounded-lg">
          <Header />
          <div id="scrollComponent" className="scroll h-[92%] md:h-[86%] overflow-scroll overflow-x-hidden">
            <Outlet />
            <Footer />
          </div>
        </div>
      </div>
      <MusicPlayer />
    </>
  );
}

export default App;
