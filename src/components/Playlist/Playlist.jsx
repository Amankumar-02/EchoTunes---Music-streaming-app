import React from "react";
import "remixicon/fonts/remixicon.css";
import {Header, SongCard, AlbumCard, Footer} from '../index';

function Playlist({songs, albums, playBtn, currentSong, menuToggleHandler}) {
  return (
    <div className="w-full md:w-[75vw] h-[77vh] overflow-hidden m-2 md:ms-0 bg-[#1C1C1C] rounded-lg">
      <Header menuToggleHandler={menuToggleHandler}/>
      <div className="scroll h-[92%] md:h-[86%] overflow-scroll overflow-x-hidden">
        {songs.length <= 0? null : (
          <div id="section1">
          <div className="title bg-[#1C1C1C] px-6 py-2 md:py-4">
            <h1 className="text-xl md:text-2xl font-bold mt-2 md:mt-4">EchoTunes Musics</h1>
          </div>
          <div className="list cards flex flex-wrap bg-[#1C1C1C]">
            {songs.map((item, index) => (
              <SongCard key={index} item={item} index={index} playBtn={playBtn} currentSong={currentSong}/>
            ))}
          </div>
        </div>
        )}
        {albums.length <= 0? null : (
          <div id="section2">
          <div className="title bg-[#1C1C1C] px-6 py-2 md:py-4">
            <h1 className="text-xl md:text-2xl font-bold mt-2 md:mt-4">EchoTunes Playlists</h1>
          </div>
          <div className="list cards flex flex-wrap bg-[#1C1C1C]">
            {albums.map((item, index) => (
              <AlbumCard key={index} item={item}/>
            ))}
          </div>
        </div>
        )}
        <Footer/>
      </div>
    </div>
  );
}

export default Playlist;
