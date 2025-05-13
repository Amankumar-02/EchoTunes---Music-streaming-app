import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { serverURL } from "../../utils";
import { useParams } from "react-router-dom";
import { SongCard, AlbumCard, UserPlaylistCard } from "../index";
import { useDispatch, useSelector } from "react-redux";
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
          `${serverURL}media/findSong`,
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
  // useEffect(()=>{
  //   document.getElementById("scrollComponent").scrollTo(0,0)
  // })

  return (
    <>
      {!songs && !albums && !playlists ? (
        <div className="flex flex-col gap-4 pt-20 h-[60vh] items-center justify-center">
        <img src="https://thumbs.dreamstime.com/b/no-found-symbol-unsuccessful-search-vecotr-upset-magnifying-glass-cute-not-zoom-icon-suitable-results-oops-page-failure-122786031.jpg" alt="" className="w-[160px] md:w-[180px] lg:w-[200px] h-[160px] md:h-[180px] lg:h-[200px] object-cover rounded-lg"/>
        <h1 className="text-base md:text-lg">Nothing Found</h1>
      </div>
      ) : (
        <div className="">
          {!songs ? null : (
            <>
              <div id="section11">
                <div className="title bg-[#1C1C1C] px-4 py-2 md:px-6 md:py-4">
                  <h1 className="font-bold mt-2 md:mt-4">
                    Search &gt; Songs &gt;{" "}
                    <span className="underline">{searchName}</span>
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
                    />
                  ))}
                </div>
              </div>
            </>
          )}
          {!albums ? null : (
            <>
              <div id="section12">
                <div className="title bg-[#1C1C1C] px-4 py-2 md:px-6 md:py-4">
                  <h1 className="font-bold mt-2 md:mt-4">
                    Search &gt; Albums &gt;{" "}
                    <span className="underline">{searchName}</span>
                  </h1>
                </div>
                <div className="list cards flex flex-wrap bg-[#1C1C1C] gap-4 px-4 py-4 md:px-6">
                  {albums.map((item, index) => (
                    <AlbumCard key={index} item={item} />
                  ))}
                </div>
              </div>
            </>
          )}
          {loginStatus === false || !playlists ? 
          (<>{songs || albums ? null : (<>
            <div className="flex flex-col gap-4 pt-20 h-[60vh] items-center justify-center">
            <img src="https://www.londonappbrewery.com/wp-content/uploads/2016/05/no-Login-min.png" alt="" className="w-[160px] md:w-[180px] lg:w-[200px] h-[160px] md:h-[180px] lg:h-[200px] object-cover rounded-lg"/>
            <h1 className="text-base md:text-lg">Please Login First</h1>
          </div>
          </>)}</>)
           : (
            <>
              <div id="section13">
                <div className="title bg-[#1C1C1C] px-4 py-2 md:px-6 md:py-4">
                  <h1 className="font-bold mt-2 md:mt-4">
                    Search &gt; User Playlist &gt;{" "}
                    <span className="underline">{searchName}</span>
                  </h1>
                </div>
                <div className="list cards flex flex-wrap bg-[#1C1C1C] gap-4 px-4 py-4 md:px-6">
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
