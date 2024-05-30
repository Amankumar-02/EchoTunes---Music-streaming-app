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
} from "../../features/customStates/customStates";
import { AudioContext } from '../../context/audioContext';

function MusicPlayer() {
  const dispatch = useDispatch();
  const audioRef = useContext(AudioContext);
  const songs = useSelector((state) => state.test.songs);
  const currentIndex = useSelector((state) => state.customState.currentIndex);
  const currentSong = useSelector((state) => state.customState.currentSong);
  const isPlaying = useSelector((state) => state.customState.isPlaying);
  const playIcon = useSelector((state) => state.customState.playIcon);
  const mediaInfo = useSelector((state) => state.customState.mediaInfo);
  const mediaStart = useSelector((state) => state.customState.mediaStart);
  const mediaEnd = useSelector((state) => state.customState.mediaEnd);
  const seekBar = useSelector((state) => state.customState.seekBar);
  const volumeBar = useSelector((state) => state.customState.volumeBar);
  const [volIcon, setVolIcon] = useState(false);

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

  // footer playBtn handler
  const play = () => {
    if (!currentSong && songs.length > 0) {
      playBtn(songs[0].title, 0);
    } else {
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

  // seekBar event
  const onSeekBarChange = (e) => {
    if (audioRef.current.src) {
      dispatch(setSeekBar(e.target.value));
      audioRef.current.currentTime =
        (audioRef.current.duration * e.target.value) / 100;
    } else {
      dispatch(setSeekBar(0));
    }
  };

  const volumeBtn = () => {
    setVolIcon((prev) => !prev);
  };

  // volume event
  const onVolumeChange = (e) => {
    dispatch(setVolumeBar(e.target.value));
    audioRef.current.volume = e.target.value / 100;
  };

  const previous = () => {
    if (currentIndex > 0) {
      playBtn(songs[currentIndex - 1].title, currentIndex - 1);
    }
  };

  const next = () => {
    if (songs[currentIndex + 1]?.title) {
      playBtn(songs[currentIndex + 1].title, currentIndex + 1);
    }
  };

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
