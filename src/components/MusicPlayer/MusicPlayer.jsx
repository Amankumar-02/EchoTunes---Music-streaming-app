import React, { useState, useContext } from "react";
import "remixicon/fonts/remixicon.css";
import { useSelector, useDispatch } from "react-redux";
import {
  setIsPlaying,
  setCurrentIndex,
  setCurrentSong,
  setPlayIcon,
  setMediaInfo,
  setSeekBar,
  setVolumeBar,
  setCurrentPlayingSong,
} from "../../features/customStates/customStates";
import { AudioContext } from "../../context/audioContext";

function MusicPlayer() {
  const dispatch = useDispatch();
  // main audio ref
  const audioRef = useContext(AudioContext);
  // state with copy of songs
  const { playerSongs } = useSelector((state) => state.test);
  // custom states
  const { currentIndex, currentSong, isPlaying, playIcon, mediaInfo, mediaStart, mediaEnd, seekBar, volumeBar, currentPlayingSong } = useSelector((state) => state.customState);
  const [volIcon, setVolIcon] = useState(false);

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

  // footer play trigger main audio playBtn handler 
  // or toggle audio play / pause
  const play = () => {
    if (!currentSong && playerSongs.length > 0) {
      playBtn(playerSongs[0].title, 0);
    } else {
      // play / pause toggler
      if (isPlaying) {
        audioRef.current.pause();
        dispatch(setIsPlaying(false));
        dispatch(setPlayIcon(false));
      } else {
        audioRef.current.play();
        dispatch(setIsPlaying(true));
        dispatch(setPlayIcon(true));
      }
    }
  };

  // seekBar eventHandler
  const onSeekBarChange = (e) => {
    if (audioRef.current.src) {
      dispatch(setSeekBar(e.target.value));
      audioRef.current.currentTime =
        (audioRef.current.duration * e.target.value) / 100;
    } else {
      dispatch(setSeekBar(0));
    }
  };

  // volumeBtn eventHandler
  const volumeBtn = () => {
    setVolIcon((prev) => !prev);
  };

  // volumeBar eventHandler
  const onVolumeChange = (e) => {
    dispatch(setVolumeBar(e.target.value));
    audioRef.current.volume = e.target.value / 100;
  };

  // prevBtn eventHandler
  const previous = () => {
    if (currentIndex > 0) {
      playBtn(playerSongs[currentIndex - 1].title, currentIndex - 1);
    }
  };
  
  // nextBtn eventHandler
  const next = () => {
    if (playerSongs[currentIndex + 1]?.title) {
      playBtn(playerSongs[currentIndex + 1].title, currentIndex + 1);
    }
  };

  const downloadMediaEventHandler = ()=>{
    if(currentPlayingSong.length <= 0){ return null}; 
    const link = document.createElement('a');
    link.href = currentPlayingSong;
    link.download = mediaInfo;
    link.target = "_blank"
    document.body.appendChild(link);
    audioRef.current.pause();
    dispatch(setIsPlaying(false));
    dispatch(setPlayIcon(false));
    link.click();
    document.body.removeChild(link);
  }
  return (
    <>
      <div className="m-2 bg-[#1FDD63] rounded-lg px-4 md:px-10 py-2">
        <div className="text-center text-black text-lg font-semibold w-full md:w-2/3 h-[30px] overflow-hidden m-auto">
          {mediaInfo}
        </div>
        <div className="flex justify-center items-center gap-4">
          <i
            className="ri-skip-back-line text-3xl text-black cursor-pointer hover:scale-[1.2]"
            onClick={previous}
          ></i>
          <i
            className={`${
              playIcon ? "ri-pause-circle-line" : "ri-play-circle-line"
            } text-3xl text-black cursor-pointer hover:scale-[1.2]`}
            onClick={play}
          ></i>
          <i
            className="ri-skip-forward-line text-3xl text-black cursor-pointer hover:scale-[1.2]"
            onClick={next}
          ></i>
          <i
            className="ri-volume-up-line text-2xl text-black cursor-pointer hover:scale-[1.2]"
            onClick={volumeBtn}
          ></i>
          <input
            value={volumeBar}
            onChange={onVolumeChange}
            type="range"
            // defaultValue="50"
            className={volIcon ? "inline-block" : "hidden"}
          />
          <i className="ri-download-2-line text-2xl text-black cursor-pointer hover:scale-[1.2]" onClick={downloadMediaEventHandler}></i>
        </div>
        <div className="flex justify-between items-center gap-4">
          <div className="text-black font-semibold">{mediaStart}</div>
          <input
            // value={seekBar}
            value={isNaN(seekBar) ? 0 : seekBar}
            onChange={onSeekBarChange}
            type="range"
            // defaultValue="0"
            className="w-full"
          />
          <div className="text-black font-semibold">{mediaEnd}</div>
        </div>
      </div>
    </>
  );
}

export default MusicPlayer;
