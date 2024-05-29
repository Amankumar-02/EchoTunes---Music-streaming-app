import React, { useState } from "react";
import "remixicon/fonts/remixicon.css";

function MusicPlayer({
  play,
  previous,
  next,
  onVolumeChange,
  onSeekBarChange,
  mediaInfo,
  mediaStart,
  playIcon,
  mediaEnd,
  seekBar,
  volumeBar,
}) {
  const [volIcon, setVolIcon] = useState(false);
  const volumeBtn = () => {
    setVolIcon((prev) => !prev);
  };
  return (
    <>
      <div className="m-2 bg-[#1FDD63] rounded-lg px-4 md:px-10 py-2">
        <div
          id="mediaInfo"
          ref={mediaInfo}
          className="text-center text-black text-lg font-semibold w-full md:w-2/3 h-[30px] overflow-hidden m-auto"
        ></div>
        <div className="flex justify-center items-center gap-4">
          <i
            className="ri-skip-back-line text-3xl text-black cursor-pointer hover:scale-[1.2]"
            onClick={previous}
          ></i>
          <i
            id="playIcon"
            ref={playIcon}
            className="ri-play-circle-line text-3xl text-black cursor-pointer hover:scale-[1.2]"
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
            id="volumeBar"
            ref={volumeBar}
            onChange={(e) => {
              onVolumeChange(e);
            }}
            type="range"
            defaultValue="50"
            className={volIcon ? "inline-block" : "hidden"}
          />
        </div>
        <div className="flex justify-between items-center gap-4">
          <div
            id="mediaStart"
            ref={mediaStart}
            className="text-black font-semibold"
          >
            00:00
          </div>
          <input
            id="seekBar"
            ref={seekBar}
            onChange={(e) => {
              onSeekBarChange(e);
            }}
            type="range"
            defaultValue="0"
            className="w-full"
          />
          <div
            id="mediaEnd"
            ref={mediaEnd}
            className="text-black font-semibold"
          >
            00:00
          </div>
        </div>
      </div>
    </>
  );
}

export default MusicPlayer;
