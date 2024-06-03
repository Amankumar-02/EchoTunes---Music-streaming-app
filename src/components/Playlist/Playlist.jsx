import React, { useContext, useEffect } from "react";
import "remixicon/fonts/remixicon.css";
import { useSelector, useDispatch } from "react-redux";
import {
  setIsPlaying,
  setCurrentIndex,
  setCurrentSong,
  setPlayIcon,
  setMediaInfo,
} from "../../features/customStates/customStates";
import { SongCard, AlbumCard, Shimmer } from "../index";
import { AudioContext } from "../../context/audioContext";
import { setPlayerSongs } from "../../features/test/test";

function Playlist() {
  const dispatch = useDispatch();
  // main audio ref
  const audioRef = useContext(AudioContext);
  // state with fetched songs / albums / copy of songs
  const { songs, albums, playerSongs } = useSelector((state) => state.test);
  // custom states
  const currentSong = useSelector((state) => state.customState.currentSong);

  // setPlayerSongs with fetched songs
  useEffect(()=>{
    dispatch(setPlayerSongs(songs));
    dispatch(setCurrentIndex(0));
  }, [])
  
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
  // useEffect(()=>{
  //   document.getElementById("scrollComponent").scrollTo(0,0)
  // })

  return (
    <>
      {playerSongs.length <= 0 ? (
        <>
        <Shimmer/>
        </>
      ) : (
        <div id="section1">
          <div className="title bg-[#1C1C1C] px-6 py-2 md:py-4">
            <h1 className="text-xl md:text-2xl font-bold mt-2 md:mt-4">
              EchoTunes Musics
            </h1>
          </div>
          <div className="list cards flex flex-wrap bg-[#1C1C1C]">
            {playerSongs.slice(0, 9).map((item, index) => (
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
      {albums.length <= 0 ? (
        <>
        <Shimmer/>
        </>
      ) : (
        <div id="section2">
          <div className="title bg-[#1C1C1C] px-6 py-2 md:py-4">
            <h1 className="text-xl md:text-2xl font-bold mt-2 md:mt-4">
              EchoTunes Playlists
            </h1>
          </div>
          <div className="list cards flex flex-wrap bg-[#1C1C1C]">
            {albums.map((item, index) => (
              <AlbumCard key={index} item={item} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default Playlist;
