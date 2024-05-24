import {Nav, Menu, Playlist} from './components/index';

function App() {

  return (
    <>
      {/* <Nav/> */}
      <div className='w-full flex'>
        <Menu/>
        <Playlist/>
      </div>
    </>
  )
}

export default App
