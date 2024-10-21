import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "remixicon/fonts/remixicon.css";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UserPlaylistCard({ item, setUpdates }) {
  // console.log(item);
  const navigate = useNavigate();
  const [editToggler, setEditToggler] = useState(false);
  const [inputValue, setInputValue] = useState(item.playlistTitle);
  const [coverImgUrl, setCoverImgUrl] = useState("");
  const [randomColor, setRandomColor] = useState("");

  // random color generator
  useEffect(() => {
    setRandomColor(Math.floor(Math.random() * 999999));
  }, []);

  const timeOutFunc = () => {
    setTimeout(() => {
      setEditToggler(false);
    }, 20000);
  };

  const editPlaylistNameEventHandler = async (playlistIdd) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_SERVER_URL}savedPlaylist/editPlaylistName`,
        {
          playlistId: playlistIdd,
          newPlaylistTitle: inputValue,
          newcoverImg: coverImgUrl,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(response.data.message);
      toast.success(response.data.message);
      setEditToggler((prev) => !prev);
      setUpdates((prev) => !prev);
      setCoverImgUrl("");
      clearTimeout(timeOutFunc);
    } catch (error) {
      console.log("Error:", error.response.data.message);
      toast.warning(error.response.data.message);
    }
  };

  const deletePlaylistNameEventHandler = async (playlistIdd) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_SERVER_URL}savedPlaylist/deletePlaylist`,
        {
          data: { playlistId: playlistIdd },
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(response.data.message);
      toast.success(response.data.message);
      setUpdates((prev) => !prev);
    } catch (error) {
      console.log("Error:", error.response.data.message);
      toast.warning(error.response.data.message);
    }
  };

  return (
    <div
      className="card p-2 sm:p-3 md:p-4 lg:p-5 hover:bg-[#181818] rounded-lg cursor-pointer"
      onClick={() => {
        navigate(`/findPlaylist/${item._id}`);
      }}
    >
      <div className="w-[140px] sm:w-[160px] md:w-[180px]">
        <div className="relative h-[140px] sm:h-[160px] md:h-[180px] rounded-lg overflow-hidden">
          {item?.coverImg !== "noImg" ? (
            <>
              <img
                src={item?.coverImg}
                alt=""
                className="h-full w-full object-cover"
              />
            </>
          ) : (
            <>
              <div
                className={`h-full w-full flex items-center justify-center text-[80px]`}
                style={{ backgroundColor: "#" + randomColor }}
              >
                {item.playlistTitle?.slice(0, 1)}
              </div>
            </>
          )}
        </div>

        {editToggler ? (
          <div
            className="editDiv flex justify-between items-center gap-2 py-2 px-1 w-full"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                editPlaylistNameEventHandler(item._id);
              }}
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                }}
                className="w-full outline-none rounded-lg px-1 text-sm bg-transparent border placeholder:text-xs"
                placeholder="Playlist Title"
                required
              />
              <input
                type="url"
                value={coverImgUrl}
                onChange={(e) => {
                  setCoverImgUrl(e.target.value);
                }}
                className="w-full outline-none rounded-lg px-1 text-sm bg-transparent border mt-2 placeholder:text-xs"
                placeholder="Cover Img - Only URL"
              />
              <input type="submit" className="hidden" />
            </form>
            <div className="flex flex-col items-center justify-center">
              <i
                className="ri-save-line cursor-pointer text-lg hover:scale-110"
                onClick={() => {
                  editPlaylistNameEventHandler(item._id);
                }}
              ></i>
              <i
                className="ri-close-line cursor-pointer text-lg hover:scale-110"
                onClick={() => {
                  setEditToggler(false);
                  clearTimeout(timeOutFunc);
                }}
              ></i>
            </div>
          </div>
        ) : (
          <div
            className="editDiv flex justify-between items-center py-2 px-1"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <h2
              style={{ overflowWrap: "anywhere" }}
              className="text-sm sm:text-base"
            >
              {item.playlistTitle}{" "}
              <span className="text-gray-400 text-xs sm:text-sm block">
                {item?.personalisedSongs.length
                  ? `(Nos. ${item?.personalisedSongs.length})`
                  : null}
              </span>
            </h2>
            <div className="flex items-center gap-3">
              <i
                className="ri-edit-2-line cursor-pointer text-lg hover:scale-110"
                onClick={() => {
                  setEditToggler((prev) => !prev);
                  setInputValue(item.playlistTitle);
                  timeOutFunc();
                }}
              ></i>
              <i
                className="ri-delete-bin-2-line cursor-pointer text-lg hover:scale-110"
                onClick={() => {
                  deletePlaylistNameEventHandler(item._id);
                }}
              ></i>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserPlaylistCard;
