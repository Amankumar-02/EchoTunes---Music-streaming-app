import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { SongCard, AlbumCard, UserPlaylistCard } from "../index";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsPlaying,
  setCurrentIndex,
  setCurrentSong,
  setPlayIcon,
  setMediaInfo,
} from "../../features/customStates/customStates";
import { AudioContext } from "../../context/audioContext";
import { setPlayerSongs } from "../../features/test/test";

function SearchedMediaFile() {
  const { searchName } = useParams();
  const [songs, setSongs] = useState(null);
  const [albums, setAlbums] = useState(null);
  const [playlists, setPlaylists] = useState(null);
  const dispatch = useDispatch();
  const audioRef = useContext(AudioContext);
  const { playerSongs } = useSelector((state) => state.test);
  const { currentSong, loginStatus } = useSelector(
    (state) => state.customState
  );
  const [updates, setUpdates] = useState(false);
  useEffect(() => {
    const searchedData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/media/findSong",
          { songName: searchName },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        setSongs(response.data.data.songs);
        setAlbums(response.data.data.albums);
        setPlaylists(response.data.data.playlists);
        dispatch(setPlayerSongs(response.data.data.songs || []));
        dispatch(setCurrentIndex(0));
      } catch (error) {
        console.log("Error:", error?.response?.data?.message);
      }
    };
    searchedData();
  }, [searchName, updates]);

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
  // useEffect(()=>{
  //   document.getElementById("scrollComponent").scrollTo(0,0)
  // })

  return (
    <>
      {!songs && !albums && !playlists ? (
        <div className="flex items-center justify-center pt-20">
          Nothing Found
        </div>
      ) : (
        <div className="">
          {!songs ? null : (
            <>
              <div id="section11">
                <div className="title bg-[#1C1C1C] px-6 py-2 md:py-4">
                  <h1 className="font-bold mt-2 md:mt-4">
                    Search &gt; Songs &gt;{" "}
                    <span className="underline">{searchName}</span>
                  </h1>
                </div>
                <div className="md:ps-2 list cards flex flex-wrap bg-[#1C1C1C]">
                  {songs.map((item, index) => (
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
            </>
          )}
          {!albums ? null : (
            <>
              <div id="section12">
                <div className="title bg-[#1C1C1C] px-6 py-2 md:py-4">
                  <h1 className="font-bold mt-2 md:mt-4">
                    Search &gt; Albums &gt;{" "}
                    <span className="underline">{searchName}</span>
                  </h1>
                </div>
                <div className="md:ps-2 list cards flex flex-wrap bg-[#1C1C1C]">
                  {albums.map((item, index) => (
                    <AlbumCard key={index} item={item} />
                  ))}
                </div>
              </div>
            </>
          )}
          {loginStatus === false || !playlists ? null : (
            <>
              <div id="section13">
                <div className="title bg-[#1C1C1C] px-6 py-2 md:py-4">
                  <h1 className="font-bold mt-2 md:mt-4">
                    Search &gt; User Playlist &gt;{" "}
                    <span className="underline">{searchName}</span>
                  </h1>
                </div>
                <div className="md:ps-2 list cards flex flex-wrap bg-[#1C1C1C]">
                  {playlists.map((item, index) => (
                    <UserPlaylistCard key={index} item={item} setUpdates={setUpdates}/>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}

export default SearchedMediaFile;
