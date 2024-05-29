import React from "react";
import { Menu, Playlist, MusicPlayer } from "../index";
import "remixicon/fonts/remixicon.css";

function App() {

  return (
    <>
      <div className="w-full flex">
        <Menu/>
        <Playlist/>
      </div>
      <MusicPlayer/>
    </>
  );
}

export default App;
