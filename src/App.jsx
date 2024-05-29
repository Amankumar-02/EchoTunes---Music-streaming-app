import React from "react";
import {Outlet} from 'react-router-dom'
// import { Header, Footer} from './components';
import { Header, Menu, MusicPlayer } from "./components/index";

function App() {
  return (
    <>
      <Outlet/>
    </>
  );
}

export default App;
