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
} from "../../features/customStates/customStates";
import { SongCard, Shimmer } from "../index";
import { AudioContext } from "../../context/audioContext";
import { useParams } from "react-router-dom";
import axios from "axios";

function UserSongList() {
  // accessing the url params
  const { songName } = useParams();
  const dispatch = useDispatch();
  // main audio ref
  const audioRef = useContext(AudioContext);
  // state with copy new album of songs
  const { playerSongs } = useSelector((state) => state.test);
  // custom states
  const { currentSong, loginStatus } = useSelector(
    (state) => state.customState
  );
  const [playListHeading, setPlaylistHeading] = useState("");
  const [tempData, setTempData] = useState([]);
  const [tempMsg, setTempMsg] = useState(null);
  const [songEditStatus, setSongEditStatus] = useState(false);

  // get filtered albumSongs from server then setPlayerSongs
  useEffect(() => {
    setTimeout(() => {
      const fetch = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3000/savedPlaylist/playlist/${songName}`,
            {
              headers: {
                "Content-Type": "application/json",
              },
              withCredentials: true,
            }
          );
          if (response) {
            dispatch(setPlayerSongs(response.data.data.personalisedSongs));
            dispatch(setCurrentIndex(0));
            setPlaylistHeading(response.data.data.playlistTitle);
            setTempData(response.data.data.personalisedSongs);
          }
        } catch (error) {
          console.log("Error:", error.response.data.message);
          setTempMsg(error.response.data.message);
        }
      };
      fetch();
    }, 12);
  }, [songEditStatus]);

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
  useEffect(() => {
    document.getElementById("scrollComponent").scrollTo(0, 0);
  });

  return (
    <>
      {loginStatus === false ? (
        <>
          <div className="flex pt-20 items-center justify-center">
            Please Login First
          </div>
        </>
      ) : (
        <>
          {tempData.length <= 0 ? (
            <>
              <div className="flex pt-20 items-center justify-center">
                {tempMsg || "Playlist is empty"}
              </div>
            </>
          ) : (
            <div id="section1">
              <div className="title bg-[#1C1C1C] px-6 py-2 md:py-4">
                <h1 className="text-xl md:text-2xl font-bold mt-2 md:mt-4">
                  User Playlist - {playListHeading}
                </h1>
              </div>
              <div className="md:ps-2 list cards flex flex-wrap bg-[#1C1C1C]">
                {playerSongs.map((item, index) => (
                  <SongCard
                    key={index}
                    item={item}
                    index={index}
                    playBtn={playBtn}
                    currentSong={currentSong}
                    setSongEditStatus={setSongEditStatus}
                  />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default UserSongList;
