import React, { useEffect, useContext, useState } from "react";
import "remixicon/fonts/remixicon.css";
import { serverURL } from "../../utils";
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
            `${serverURL}savedPlaylist/playlist/${songName}`,
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
      {loginStatus === false ? (
        <>
          <div className="flex flex-col gap-4 pt-20 h-[60vh] items-center justify-center">
            <img src="https://www.londonappbrewery.com/wp-content/uploads/2016/05/no-Login-min.png" alt="" className="w-[160px] md:w-[180px] lg:w-[200px] h-[160px] md:h-[180px] lg:h-[200px] object-cover rounded-lg"/>
            <h1 className="text-base md:text-lg">Please Login First</h1>
          </div>
        </>
      ) : (
        <>
          {tempData.length <= 0 ? (
            <>
              <div className="flex flex-col gap-4 pt-20 h-[60vh] items-center justify-center">
                <img
                  src="https://cdni.iconscout.com/illustration/premium/thumb/error-404-illustration-download-in-svg-png-gif-file-formats--no-results-service-landing-page-security-empty-state-pack-design-development-illustrations-3613889.png?f=webp"
                  alt=""
                  className="w-[160px] md:w-[180px] lg:w-[200px] h-[160px] md:h-[180px] lg:h-[200px] object-cover rounded-lg"
                />
                <h1 className="text-base md:text-lg">{tempMsg || "Playlist is empty"}</h1>
              </div>
            </>
          ) : (
            <div id="section1">
              <div className="title bg-[#1C1C1C] px-4 py-2 md:px-6 md:py-4">
                <h1 className="text-base md:text-xl font-bold mt-2 md:mt-4 text-gray-400">
                  User Playlist - <span className="text-lg md:text-2xl text-white">{playListHeading}</span>
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
