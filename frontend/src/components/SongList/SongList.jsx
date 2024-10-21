import React, { useEffect, useContext, useState } from "react";
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
  setCurrentPlayingSong,
} from "../../features/customStates/customStates";
import { SongCard, Shimmer } from "../index";
import { AudioContext } from "../../context/audioContext";
import { useParams } from "react-router-dom";

function SongList() {
  // accessing the url params
  const { songName } = useParams();
  const dispatch = useDispatch();
  // main audio ref
  const audioRef = useContext(AudioContext);
  // state with copy new album of songs
  const { playerSongs } = useSelector((state) => state.test);
  // custom states
  const currentSong = useSelector((state) => state.customState.currentSong);

  const [tempData, setTempData] = useState([]);
  const [tempMsg, setTempMsg] = useState(null);

  // get filtered albumSongs from server then setPlayerSongs
  useEffect(() => {
    setTimeout(() => {
      const fetch = async () => {
        const songs = await fetchDataWithoutShuffle(
          `${import.meta.env.VITE_API_SERVER_URL}media/find/${songName}`
        );
        if (songs) {
          dispatch(setPlayerSongs(songs.songs));
          dispatch(setCurrentIndex(0));
          setTempData(songs.songs);
        } else {
          setTempMsg("Playlist not found");
        }
      };
      fetch();
    }, 10);
  }, []);

  // get audio file from playerSongs
  // audio play handler 1of3
  const playBtn = (title, index = 0) => {
    const song = playerSongs.find((item) => item.title === title);
    dispatch(setCurrentIndex(index));
    dispatch(setCurrentPlayingSong(song.media));
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
  useEffect(() => {
    document.getElementById("scrollComponent").scrollTo(0, 0);
  });

  return (
    <>
      {tempData.length <= 0 ? (
        <>
          {/* <Shimmer /> */}
          <div className="flex flex-col gap-4 pt-20 h-[60vh] items-center justify-center">
            <img
              src="https://cdni.iconscout.com/illustration/premium/thumb/error-404-illustration-download-in-svg-png-gif-file-formats--no-results-service-landing-page-security-empty-state-pack-design-development-illustrations-3613889.png?f=webp"
              alt=""
              className="w-[160px] md:w-[180px] lg:w-[200px] h-[160px] md:h-[180px] lg:h-[200px] object-cover rounded-lg"
            />
            <h1 className="text-base md:text-lg">{tempMsg}</h1>
          </div>
        </>
      ) : (
        <div id="section1">
          <div className="title bg-[#1C1C1C] px-4 py-2 md:px-6 md:py-4">
            <h1 className="text-base md:text-xl font-bold mt-2 md:mt-4 text-gray-400">
              Playlist - <span className="text-lg md:text-2xl text-white">{songName}</span>
            </h1>
          </div>
          <div className="list cards flex flex-wrap bg-[#1C1C1C] gap-4 px-4 py-4 md:px-6">
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
