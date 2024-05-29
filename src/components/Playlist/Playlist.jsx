import React, { useEffect, useContext } from "react";
import "remixicon/fonts/remixicon.css";
import { formatTime } from "../../customHooks";
import { useSelector, useDispatch } from "react-redux";
import {
  setMenuToggle,
  setIsPlaying,
  setCurrentIndex,
  setCurrentSong,
  setPlayIcon,
  setMediaInfo,
  setMediaStart,
  setMediaEnd,
  setSeekBar,
  // setVolumeBar,
} from "../../features/customStates/customStates";
import { Header, SongCard, AlbumCard, Footer } from "../index";
import { AudioContext } from '../../context/audioContext';

function Playlist() {
  const dispatch = useDispatch();
  const audioRef = useContext(AudioContext);
  const songs = useSelector((state) => state.test.songs);
  const albums = useSelector((state) => state.test.albums);
  const menuToggle = useSelector(state=>state.customState.menuToggle);
  // const currentIndex = useSelector((state) => state.customState.currentIndex);
  const currentSong = useSelector((state) => state.customState.currentSong);
  // const isPlaying = useSelector((state) => state.customState.isPlaying);
  // const playIcon = useSelector((state) => state.customState.playIcon);
  // const mediaInfo = useSelector((state) => state.customState.mediaInfo);
  // const mediaStart = useSelector((state) => state.customState.mediaStart);
  // const mediaEnd = useSelector((state) => state.customState.mediaEnd);
  // const seekBar = useSelector((state) => state.customState.seekBar);

  useEffect(() => {
    const audio = audioRef.current;
    const updateTime = () => {
      // dispatch(setSeekBar((audio.currentTime / audio.duration) * 100));
      dispatch(
        setSeekBar(
          isNaN((audio.currentTime / audio.duration) * 100)
            ? 0
            : (audio.currentTime / audio.duration) * 100
        )
      );
      dispatch(setMediaStart(formatTime(audio.currentTime)));
      dispatch(setMediaEnd(formatTime(audio.duration)));
    };
    const resetPlayer = () => {
      dispatch(setSeekBar(0));
      dispatch(setMediaStart(formatTime(0)));
      dispatch(setIsPlaying(false));
      dispatch(setPlayIcon(false));
    };
    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("ended", resetPlayer);
    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("ended", resetPlayer);
    };
  }, []);

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
