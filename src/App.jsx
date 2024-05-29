import React, { useEffect } from "react";
import {Outlet} from 'react-router-dom'
import {fetchData} from './customHooks';
import { setSongs, setAlbums } from "./features/test/test";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch()

  // get data from server
  useEffect(()=>{
    const fetch = async()=>{
      const songs = await fetchData("http://localhost:3000/songs/");
      if(songs){
        dispatch(setSongs(songs))
      }
      const albums = await fetchData("http://localhost:3000/albums/");
      if(albums){
        dispatch(setAlbums(albums))
      }
    }
    fetch()
  }, [])

  return (
    <>
      <Outlet/>
    </>
  );
}

export default App;
