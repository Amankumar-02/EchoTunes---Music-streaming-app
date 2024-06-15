import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Playlist, SongList, UserSongList, Login, SignUp, SearchedMediaFile, AllUserPlayLists } from './components/index.js';
import {RouterProvider, createBrowserRouter, createRoutesFromElements, Route} from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store.js';
import { AudioProvider } from './context/audioContext.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path='/' element={<Playlist/>}/>
      <Route path='/find/:songName' element={<SongList/>}/>
      <Route path='/findPlaylist/:songName' element={<UserSongList/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/search/:searchName' element={<SearchedMediaFile/>}/>
      <Route path='/allUserPlaylists' element={<AllUserPlayLists/>}/>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <Provider store={store}>
      <AudioProvider>
        <RouterProvider router={router} />
      </AudioProvider>
    </Provider>
  // </React.StrictMode>
)
