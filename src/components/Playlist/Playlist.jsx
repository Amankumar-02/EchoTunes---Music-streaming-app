import React, { useContext } from "react";
import "remixicon/fonts/remixicon.css";
import { useSelector, useDispatch } from "react-redux";
import {
  setMenuToggle,
  setIsPlaying,
  setCurrentIndex,
  setCurrentSong,
  setPlayIcon,
  setMediaInfo,
} from "../../features/customStates/customStates";
import { Header, SongCard, AlbumCard, Footer } from "../index";
import { AudioContext } from '../../context/audioContext';

function Playlist() {
  const dispatch = useDispatch();
  const audioRef = useContext(AudioContext);
  const songs = useSelector((state) => state.test.songs);
  const albums = useSelector((state) => state.test.albums);
  const menuToggle = useSelector(state=>state.customState.menuToggle);
  const currentSong = useSelector((state) => state.customState.currentSong);

  const playBtn = (title, index = 0) => {
    const song = songs.find((item) => item.title === title);
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

  const menuToggleHandler = () => {
    dispatch(setMenuToggle(!menuToggle));
  };

  return (
    <div className="w-full md:w-[75vw] h-[77vh] overflow-hidden m-2 md:ms-0 bg-[#1C1C1C] rounded-lg">
      <Header menuToggleHandler={menuToggleHandler} />
      <div className="scroll h-[92%] md:h-[86%] overflow-scroll overflow-x-hidden">
        {songs.length <= 0 ? null : (
          <div id="section1">
            <div className="title bg-[#1C1C1C] px-6 py-2 md:py-4">
              <h1 className="text-xl md:text-2xl font-bold mt-2 md:mt-4">
                EchoTunes Musics
              </h1>
            </div>
            <div className="list cards flex flex-wrap bg-[#1C1C1C]">
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
        )}
        {albums.length <= 0 ? null : (
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
        <Footer />
      </div>
    </div>
  );
}

export default Playlist;
