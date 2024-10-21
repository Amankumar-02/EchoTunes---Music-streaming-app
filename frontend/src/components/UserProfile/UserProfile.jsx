import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserPlaylistCard } from "../index";
import { useSelector, useDispatch } from "react-redux";
import { SongCard } from "../index";
import {
  setIsPlaying,
  setCurrentIndex,
  setCurrentSong,
  setPlayIcon,
  setMediaInfo,
  setCurrentPlayingSong,
} from "../../features/customStates/customStates";
import { AudioContext } from "../../context/audioContext";
import { setPlayerSongs } from "../../features/test/test";

function UserProfile() {
  const dispatch = useDispatch();
  const audioRef = useContext(AudioContext);
  const { playerSongs } = useSelector((state) => state.test);
  const [userData, setUserData] = useState([]);
  const [songs, setSongs] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [updates, setUpdates] = useState(false);
  const [refreshUserData, setRefreshUserData] = useState(false);
  const { currentSong, loginStatus } = useSelector(
    (state) => state.customState
  );
  const [newUsername, setNewUsername] = useState("");
  const [newUserFullname, setNewUserFullname] = useState("");
  const [newCoverImg, setNewCoverImg] = useState("");
  const [inputOldPassword, setInputOldPassword] = useState("");
  const [inputNewPassword, setInputNewPassword] = useState("");
  const [inputConfirmPassword, setInputConfirmPassword] = useState("");
  const [editDetsToggle, setEditDetsToggle] = useState(false);
  const [editCoverImgToggle, setEditCoverImgToggle] = useState(false);
  const [editPasswordToggle, setEditPasswordToggle] = useState(false);
  const [addMediaToggle, setAddMediaToggle] = useState(false);
  const [randomColor, setRandomColor] = useState("");

  // random color generator
  useEffect(() => {
    setRandomColor(Math.floor(Math.random() * 999999));
  }, []);

  // fetch user Data
  useEffect(() => {
    const checkUserLogin = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_SERVER_URL}auth/loginUserDets`, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        setUserData(response.data?.data?.resource);
        setSongs(response.data?.data?.resource.songs);
        setPlaylists(response.data?.data?.resource.playlists);
        setNewUsername(response.data?.data?.resource.username);
        setNewUserFullname(response.data?.data?.resource.fullname);
        dispatch(setPlayerSongs(response.data?.data?.resource.songs || []));
        dispatch(setCurrentIndex(0));
      } catch (error) {
        console.log("Error:", error.response.data.message);
      }
    };
    setTimeout(() => {
      checkUserLogin();
    }, 100);
  }, [refreshUserData, updates]);

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

  // edit dets event handler
  const editDetsEventHandler = async (e) => {
    e.preventDefault();
    try {
      const data = {
        username: newUsername,
        email: userData.email,
        fullname: newUserFullname,
      };
      const response = await axios.patch(
        `${import.meta.env.VITE_API_SERVER_URL}auth/updatedetails`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setEditDetsToggle(false);
      setRefreshUserData((prev) => !prev);
      toast.success(response.data.message);
    } catch (error) {
      console.log("Error:", error.response.data.message);
      toast.warning(error.response.data.message);
    }
  };

  // edit cover image
  const editCoverImgEventHandler = async (e) => {
    e.preventDefault();
    try {
      const data = {
        coverimage: newCoverImg,
      };
      const response = await axios.patch(
        `${import.meta.env.VITE_API_SERVER_URL}auth/updateCoverImage`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setNewCoverImg("");
      setEditCoverImgToggle(false);
      setRefreshUserData((prev) => !prev);
      toast.success(response.data.message);
    } catch (error) {
      console.log("Error:", error.response.data.message);
      toast.warning(error.response.data.message);
    }
  };

  // edit password
  const updateCurrentPasswordEventHandler = async (e) => {
    e.preventDefault();
    try {
      const data = {
        oldPassword: inputOldPassword,
        newPassword: inputNewPassword,
        confirmPassword: inputConfirmPassword,
      };
      const response = await axios.patch(
        `${import.meta.env.VITE_API_SERVER_URL}auth/changeCurrent`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setInputOldPassword("");
      setInputNewPassword("");
      setInputConfirmPassword("");
      setEditPasswordToggle(false);
      setRefreshUserData((prev) => !prev);
      toast.success(response.data.message);
    } catch (error) {
      console.log("Error:", error.response.data.message);
      toast.warning(error.response.data.message);
    }
  };

  // add media file by admin
  const addMediaEventHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_SERVER_URL}media/addMedia`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      setAddMediaToggle(false);
      setRefreshUserData((prev) => !prev);
      toast.success(response.data.message);
    } catch (error) {
      console.log("Error:", error.response.data.message);
      toast.warning(error.response.data.message);
    }
  };

  const refreshMediaEventHandler = async () => {
    // console.log("clicked");
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_SERVER_URL}media/updateSongs`, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      setRefreshUserData((prev) => !prev);
      toast.success(response.data.message);
    } catch (error) {
      console.log("Error:", error.response.data.message);
      toast.warning(error.response.data.message);
    }
  };

  return (
    <>
      {loginStatus === false ? (
        <>
          <div className="flex flex-col gap-4 pt-20 h-[60vh] items-center justify-center">
            <img
              src="https://www.londonappbrewery.com/wp-content/uploads/2016/05/no-Login-min.png"
              alt=""
              className="w-[160px] md:w-[180px] lg:w-[200px] h-[160px] md:h-[180px] lg:h-[200px] object-cover rounded-lg"
            />
            <h1 className="text-base md:text-lg">Please Login First</h1>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col md:flex-row gap-4 md:gap-10 items-center p-4 md:p-10">
            <div className="leftSection flex flex-col items-center gap-4 justify-center w-full md:w-[40%]">
              <div className="relative h-[100px] sm:h-[130px] md:h-[150px] w-[100px] sm:w-[130px] md:w-[150px] rounded-full overflow-hidden border border-gray-700">
                {userData?.coverimage ? (
                  <>
                    <img src={userData?.coverimage} alt="" />
                  </>
                ) : (
                  <>
                    <div
                      className={`h-full w-full flex items-center justify-center text-[60px] sm:text-[70px] md:text-[80px]`}
                      style={{ backgroundColor: "#" + randomColor }}
                    >
                      {userData.fullname?.slice(0, 1)}
                    </div>
                  </>
                )}
                <div
                  className="absolute bottom-0 left-0 w-full text-center bg-black opacity-50 pt-2 pb-2 text-xs sm:text-sm cursor-pointer hover:scale-[1.05] active:scale-[0.96]"
                  onClick={() => {
                    setEditDetsToggle(false);
                    setAddMediaToggle(false);
                    setEditPasswordToggle(false);
                    setEditCoverImgToggle((prev) => !prev);
                  }}
                >
                  {editCoverImgToggle ? "Cancel" : "Change"}
                </div>
              </div>
              <div className="w-[90%]">
                <h2
                  className={`${
                    editCoverImgToggle ? "block" : "hidden"
                  } mb-2 text-gray-400 text-xs sm:text-sm text-center`}
                >
                  Set Cover Img
                </h2>
                <form
                  onSubmit={editCoverImgEventHandler}
                  className={`${
                    editCoverImgToggle ? "inline-block" : "hidden"
                  } flex w-full`}
                >
                  <input
                    type="url"
                    className="w-full px-2 py-1 outline-none rounded-lg rounded-e-none placeholder:text-sm bg-transparent border border-gray-400"
                    placeholder="Add URL only"
                    value={newCoverImg}
                    onChange={(e) => {
                      setNewCoverImg(e.target.value);
                    }}
                    name="coverimage"
                  />
                  <input
                    type="submit"
                    value="Save"
                    className="text-xs sm:text-sm md:text-base text-black px-2 py-1 rounded-lg rounded-s-none bg-gray-300 hover:font-semibold"
                  />
                </form>
              </div>
            </div>

            <div
              className="rightSection flex flex-col gap-2 md:gap-8 w-full"
              // style={{ width: "calc(100% - 200px)" }}
            >
              {!editDetsToggle ? (
                <>
                  <div>
                    <h3
                      className="text-xs sm:text-sm md:text-base text-center md:text-start"
                      style={{ overflowWrap: "anywhere" }}
                    >
                      {userData.username}
                    </h3>
                    <h1
                      className="text-lg sm:text-xl md:text-3xl text-center md:text-start font-semibold -tracking-tight"
                      style={{ overflowWrap: "anywhere" }}
                    >
                      {userData.fullname}
                    </h1>
                  </div>
                  {editPasswordToggle ? null : (
                    <>
                      <div className="flex items-center justify-center md:justify-start gap-4">
                        <button
                          className="text-sm md:text-base w-fit border px-4 py-1 rounded-lg hover:scale-[1.05] active:scale-[0.96]"
                          onClick={() => {
                            setEditPasswordToggle(false);
                            setAddMediaToggle(false);
                            setEditCoverImgToggle(false);
                            setEditDetsToggle(true);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="text-xs sm:text-sm md:text-base w-fit border px-2 py-1 md:px-4 rounded-lg hover:scale-[1.05] active:scale-[0.96]"
                          onClick={() => {
                            setEditDetsToggle(false);
                            setAddMediaToggle(false);
                            setEditCoverImgToggle(false);
                            setEditPasswordToggle(true);
                          }}
                        >
                          Change Password
                        </button>
                      </div>
                    </>
                  )}
                </>
              ) : (
                <>
                  <div className="w-[90%] m-auto md:m-0 lg:w-1/2">
                    <h2 className="mb-2 text-gray-400 text-xs sm:text-sm md:text-base">
                      Set New Username & Fullname
                    </h2>
                    <form
                      className="flex flex-col w-full gap-2 cursor-pointer"
                      onSubmit={editDetsEventHandler}
                    >
                      <input
                        type="text"
                        placeholder="username"
                        value={newUsername}
                        onChange={(e) => {
                          setNewUsername(e.target.value);
                        }}
                        name="username"
                        className="outline-none rounded-lg py-1 px-2 text-xs sm:text-sm placeholder:text-xs sm:placeholder:text-sm bg-transparent border border-gray-400"
                      />
                      <input
                        type="text"
                        placeholder="fullname"
                        value={newUserFullname}
                        onChange={(e) => {
                          setNewUserFullname(e.target.value);
                        }}
                        name="fullname"
                        className="outline-none rounded-lg py-1 sm:py-2 px-2 sm:px-3 text-lg sm:text-xl placeholder:text-lg sm:placeholder:text-xl bg-transparent border border-gray-400"
                      />
                      <input type="submit" value="" className="hidden" />
                    </form>
                  </div>
                  <div className="flex items-center justify-center md:justify-start gap-2 md:gap-4">
                    <button
                      className="text-xs sm:text-sm md:text-base w-fit border px-2 py-1 md:px-4 rounded-lg hover:scale-[1.05] active:scale-[0.96]"
                      onClick={editDetsEventHandler}
                    >
                      Save
                    </button>
                    <button
                      className="text-xs sm:text-sm md:text-base w-fit border px-2 py-1 md:px-4 rounded-lg hover:scale-[1.05] active:scale-[0.96]"
                      onClick={() => {
                        setEditDetsToggle(false);
                        setNewUsername(userData.username);
                        setNewUserFullname(userData.fullname);
                      }}
                    >
                      Close
                    </button>
                  </div>
                </>
              )}
              {!editPasswordToggle ? null : (
                <>
                  <div className="w-[90%] m-auto md:m-0 md:w-full">
                    <h2 className="mb-2 text-gray-400 text-xs sm:text-sm md:text-base">
                      Set New Password
                    </h2>
                    <form
                      onSubmit={updateCurrentPasswordEventHandler}
                      className="flex flex-col gap-2 md:gap-4 md:w-[90%]"
                    >
                      <div className="flex flex-col md:flex-row gap-2 items-center">
                        <input
                          type="password"
                          placeholder="old password"
                          value={inputOldPassword}
                          onChange={(e) => {
                            setInputOldPassword(e.target.value);
                          }}
                          className="rounded-lg outline-none px-2 py-1 w-full bg-transparent border border-gray-400"
                        />
                        <input
                          type="password"
                          placeholder="new password"
                          value={inputNewPassword}
                          onChange={(e) => {
                            setInputNewPassword(e.target.value);
                          }}
                          className="rounded-lg outline-none px-2 py-1 w-full bg-transparent border border-gray-400"
                        />
                        <input
                          type="text"
                          placeholder="confirm password"
                          value={inputConfirmPassword}
                          onChange={(e) => {
                            setInputConfirmPassword(e.target.value);
                          }}
                          className="rounded-lg outline-none px-2 py-1 w-full bg-transparent border border-gray-400"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="submit"
                          value="Save Changes"
                          className="text-xs sm:text-sm md:text-base w-fit border px-2 py-1 md:px-4 rounded-lg hover:scale-[1.05] active:scale-[0.96]"
                        />
                        <button
                          className="text-xs sm:text-sm md:text-base w-fit border px-2 py-1 md:px-4 rounded-lg hover:scale-[1.05] active:scale-[0.96]"
                          onClick={() => {
                            setEditPasswordToggle(false);
                            setInputOldPassword("");
                            setInputNewPassword("");
                            setInputConfirmPassword("");
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </>
              )}
            </div>
          </div>
          {userData.username === "admin" ? (
            <>
              <div className="px-6 py-2 md:py-4">
                <h1 className="text-lg md:text-2xl font-bold mt-2 md:mt-4">
                  Admin Panel Actions
                </h1>

                {!addMediaToggle ? (
                  <>
                    <div className="flex items-center gap-4 mt-4">
                      <button
                        className="text-xs sm:text-sm md:text-base w-fit border px-2 py-1 md:px-4 rounded-lg hover:scale-[1.05] active:scale-[0.96]"
                        onClick={() => {
                          setEditDetsToggle(false);
                          setEditCoverImgToggle(false);
                          setEditPasswordToggle(false);
                          setAddMediaToggle(true);
                        }}
                      >
                        Add Media
                      </button>
                      <button
                        className="text-xs sm:text-sm md:text-base w-fit border px-2 py-1 md:px-4 rounded-lg hover:scale-[1.05] active:scale-[0.96] bg-red-700"
                        onClick={refreshMediaEventHandler}
                      >
                        Refresh Media
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="mt-4 w-full">
                      <h2 className="mb-2 text-gray-400">Add Media File</h2>
                      <form
                        onSubmit={addMediaEventHandler}
                        className="flex flex-col gap-2 md:gap-4 w-full"
                      >
                        <div className="flex flex-col md:flex-row gap-2 items-center">
                          <input
                            type="file"
                            accept=".mp3"
                            name="newSong"
                            placeholder="Add song"
                            className="rounded-lg text-white outline-none bg-transparent border border-gray-400 px-2 py-1 w-full"
                            required
                          />
                          <input
                            type="file"
                            accept=".jpg"
                            name="newSongCover"
                            placeholder="Add cover image"
                            className="rounded-lg text-white outline-none bg-transparent border border-gray-400 px-2 py-1 w-full"
                            required
                          />
                        </div>
                        <div className="flex flex-col md:flex-row gap-2 items-center">
                          <input
                            type="text"
                            name="newMediaTitle"
                            placeholder="Song title"
                            className="rounded-lg outline-none px-2 py-1 bg-transparent border border-gray-400 w-full"
                            required
                          />
                          <input
                            type="text"
                            name="newMediaTitleDesc"
                            placeholder="Song desc."
                            className="rounded-lg outline-none px-2 py-1 bg-transparent border border-gray-400 w-full"
                            required
                          />
                          <input
                            type="text"
                            name="newMediaAlbum"
                            placeholder="Album name"
                            className="rounded-lg outline-none px-2 py-1 bg-transparent border border-gray-400 w-full"
                            required
                          />
                        </div>
                        <div className="flex items-center justify-center md:justify-start gap-2">
                          <input
                            type="submit"
                            value="Save"
                            className="text-xs sm:text-sm md:text-base w-fit border px-2 py-1 md:px-4 rounded-lg hover:scale-[1.05] active:scale-[0.96]"
                          />
                          <button
                            className="text-xs sm:text-sm md:text-base w-fit border px-2 py-1 md:px-4 rounded-lg hover:scale-[1.05] active:scale-[0.96]"
                            onClick={() => {
                              setAddMediaToggle(false);
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    </div>
                  </>
                )}
              </div>
            </>
          ) : null}
          {songs.length <= 0 ? (
            <>
              <div id="sectionProfile1">
                <div className="title bg-[#1C1C1C] px-4 py-2 md:px-6 md:py-4">
                  <h1 className="text-lg md:text-2xl font-bold mt-2 md:mt-4">
                    All Saved Songs
                  </h1>
                </div>
                <div className="flex flex-col gap-4 py-20 items-center justify-center">
                  <h1 className="text-base md:text-lg">
                    No new song saved yet
                  </h1>
                </div>
              </div>
            </>
          ) : (
            <>
              <div id="sectionProfile1">
                <div className="title bg-[#1C1C1C] px-4 py-2 md:px-6 md:py-4">
                  <h1 className="text-lg md:text-2xl font-bold mt-2 md:mt-4">
                    All Saved Songs
                  </h1>
                </div>
                <div className="list cards flex flex-wrap bg-[#1C1C1C] gap-4 px-4 py-4 md:px-6">
                  {songs.map((item, index) => (
                    <SongCard
                      key={index}
                      item={item}
                      index={index}
                      playBtn={playBtn}
                      currentSong={currentSong}
                      setSongEditStatus={setUpdates}
                    />
                  ))}
                </div>
              </div>
            </>
          )}
          {playlists.length <= 0 ? (
            <>
              <div id="sectionProfile1">
                <div className="title bg-[#1C1C1C] px-4 py-2 md:px-6 md:py-4">
                  <h1 className="text-lg md:text-2xl font-bold mt-2 md:mt-4">
                    All Created Playlists
                  </h1>
                </div>
                <div className="flex flex-col gap-4 py-20 items-center justify-center">
                  <h1 className="text-base md:text-lg">
                    No new playlist created yet
                  </h1>
                </div>
              </div>
            </>
          ) : (
            <>
              <div id="sectionProfile2">
                <div className="title bg-[#1C1C1C] px-4 py-2 md:px-6 md:py-4">
                  <h1 className="text-lg md:text-2xl font-bold mt-2 md:mt-4">
                    All Created Playlists
                  </h1>
                </div>
                <div className="list cards flex flex-wrap bg-[#1C1C1C] gap-4 px-4 py-4 md:px-6">
                  {playlists.map((item, index) => (
                    <UserPlaylistCard
                      key={index}
                      item={item}
                      setUpdates={setUpdates}
                    />
                  ))}
                </div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}

export default UserProfile;
