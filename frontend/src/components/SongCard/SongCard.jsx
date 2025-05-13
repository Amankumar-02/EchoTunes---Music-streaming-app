import React, { useEffect, useState } from "react";
import "remixicon/fonts/remixicon.css";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { serverURL } from "../../utils";
import { useSelector } from "react-redux";

function SongCard({
  item,
  index,
  playBtn,
  currentSong,
  setSongEditStatus = null,
}) {
  const [saveMore, setSaveMore] = useState(false);
  const [playlistValue, setPlaylistValue] = useState("");
  const [userData, setUserData] = useState([]);
  const [songRemoved, setSongRemoved] = useState(false);
  const { loginStatus } = useSelector((state) => state.customState);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${serverURL}auth/checkUserLoginOrNot`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        setUserData(response.data?.data?.resource?.songs);
      } catch (error) {
        console.log("Error:", error.response.data.message);
      }
    };
    fetchUserData();
  }, [saveMore, playlistValue, songRemoved]);

  const songSaveTimeOutFunc = () => {
    setTimeout(() => {
      setSaveMore(false);
    }, 20000);
  };

  const songSaveEventHandler = async (e, id) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const playlistName = formData.get("playlistName");

    const data = {
      songId: id,
      playlistName: playlistName,
    };

    try {
      const response = await axios.post(
        `${serverURL}savedPlaylist/createPlaylist`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(response.data.message);
      toast.success(response.data.message);
    } catch (error) {
      console.log("Error:", error.response.data.message);
      toast.warning(error.response.data.message);
    }
    setPlaylistValue("");
    setSaveMore(false);
    clearTimeout(songSaveTimeOutFunc);
  };

  const removePlaylistSongEventHandler = async (songIdd) => {
    try {
      const response = await axios.post(
        `${serverURL}savedPlaylist/removeSong`,
        { songId: songIdd },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(response.data.message);
      toast.success(response.data.message);
      setSongRemoved((prev) => !prev);
      if (setSongEditStatus) {
        setSongEditStatus((prev) => !prev);
      }
    } catch (error) {
      console.log("Error:", error.response.data.message);
      toast.warning(error.response.data.message);
    }
  };

  return (
    <div
      className="card p-2 sm:p-3 md:p-4 lg:p-5 hover:bg-[#181818] rounded-lg cursor-pointer"
      onMouseLeave={() => {
        songSaveTimeOutFunc();
      }}
      onMouseOver={() => {
        clearTimeout(songSaveTimeOutFunc);
      }}
    >
      <div className="w-[140px] sm:w-[160px] md:w-[180px]">
        <div className="relative h-[140px] sm:h-[160px] md:h-[180px] rounded-lg overflow-hidden">
          <img src={item.img} alt="" className="h-full w-full object-cover" />
          <div
            className={`playBtn absolute right-2 bottom-2 rounded-full ${
              currentSong?.title === item.title
                ? "bg-black text-green-500"
                : "bg-green-500 text-black"
            } px-2 sm:px-3 py-1 sm:py-2 cursor-pointer`}
            onClick={() => {
              playBtn(item.title, index);
            }}
          >
            <i className="ri-play-fill text-2xl sm:text-3xl"></i>
          </div>
          {!loginStatus ? null : (
            <>
              {userData?.includes(item._id) ? (
                <div
                  className="playBtn absolute right-2 top-2 rounded-full text-red-500 bg-white px-1 cursor-pointer"
                  onClick={() => {
                    removePlaylistSongEventHandler(item._id);
                    clearTimeout(songSaveTimeOutFunc);
                  }}
                >
                  <i className="ri-heart-fill text-lg sm:text-xl hover:text-red-700"></i>
                </div>
              ) : (
                <div
                  className="playBtn absolute right-2 top-2 rounded-full text-red-500 bg-white px-1 cursor-pointer"
                  onClick={() => {
                    setSaveMore((prev) => !prev);
                  }}
                >
                  <i className="ri-heart-3-line text-lg sm:text-xl hover:text-red-700"></i>
                </div>
              )}
            </>
          )}
          <div
            className={`playBtn absolute top-10 right-1 w-[130px] sm:w-[150px] md:w-[170px] ${
              saveMore ? "inline-block" : "hidden"
            }`}
          >
            <form
              onSubmit={(e) => songSaveEventHandler(e, item._id)}
              className="flex"
            >
              <input
                type="text"
                placeholder="Playlist Name"
                name="playlistName"
                value={playlistValue}
                onChange={(e) => setPlaylistValue(e.target.value)}
                className="w-full px-1 text-xs sm:text-sm border border-black border-e-0 rounded-lg rounded-e-none text-black outline-none"
                autoComplete="off"
                required
              />
              <input
                type="submit"
                value="Save"
                className="text-xs px-1 bg-white text-black border border-black rounded-lg rounded-s hover:bg-[#1FDD63] hover:font-semibold active:scale-[0.96]"
              />
            </form>
          </div>
        </div>
        <div className="flex flex-col md:gap-1 my-2 px-1">
          <h2
            className="text-sm sm:text-base"
            style={{ overflowWrap: "anywhere" }}
          >
            {item.title}
          </h2>
          <p
            className="text-gray-400 text-xs sm:text-sm block"
            style={{ overflowWrap: "anywhere" }}
          >
            ({item.desc})
          </p>
        </div>
      </div>
    </div>
  );
}

export default SongCard;
