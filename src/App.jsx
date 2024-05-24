import {Nav, Menu, Playlist, Footer} from './components/index';

function App() {

  return (
    <>
      {/* <Nav/> */}
      <div className='w-full flex'>
        <Menu/>
        <Playlist/>
      </div>
      <Footer/>
    </>
  )
}

export default App
