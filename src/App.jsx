import React, {useState, useEffect, useRef} from 'react';
import {Nav, Menu, Playlist, Footer} from './components/index';

function App() {
  const [songs, setSongs] = useState([]);
  // const [volVal, setVolVal] = useState([]);
  let playIcon = document.getElementById("playIcon");
  let mediaInfo = document.getElementById("mediaInfo");
  let mediaStart = document.getElementById("mediaStart");
  let mediaEnd = document.getElementById("mediaEnd");
  let seekBar = document.getElementById("seekBar");
  // let volumeBar = document.getElementById("volumeBar");
  let volumeBar = useRef(null)
  let currentSong = new Audio();

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  function timeToPercentage(currentTime, duration) {
    // Calculate the percentage
    const percentage = (currentTime / duration) * 100;

    return percentage;
}

  const shuffleArray = (array) => {
    let shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  // get data from server
  // useEffect(()=>{
  //   const fetchData = async () => {
  //     try {
  //       const data = await fetch("http://localhost:3000/songs/");
  //       const response = await data.json();
  //       setSongs(response)
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };
  //     fetchData();
  // }, [])

  // get data from local
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch("http://localhost:5173/songs/songs.html");
        const response = await data.text();
        let div = document.createElement("div");
        div.innerHTML = response;
        let as = div.getElementsByTagName("a");
        let images = div.getElementsByTagName("img");
        let songs = [];
        for (let i = 0; i < as.length; i++) {
          const anchor = as[i];
          const source = images[i];
          if (anchor.href.endsWith(".mp3") && source.src) {
            let song = {
              media: anchor.href,
              img: source.src,
              title: anchor.innerHTML.split(" - ")[0],
              desc: anchor.innerHTML.split(" - ")[1],
            }
            songs.push(song);
          }
        }
        const shuffledSongs = shuffleArray(songs);
        setSongs(shuffledSongs);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const playBtn = (e)=>{
    const filteredSong = songs.filter(item=>item.title === e)[0].media;
    currentSong.src = filteredSong;
    currentSong.play();
    mediaInfo.innerHTML = e;
    currentSong.addEventListener("timeupdate", ()=>{
      seekBar.value = timeToPercentage(currentSong.currentTime, currentSong.duration);
      mediaStart.innerHTML = formatTime(currentSong.currentTime); 
      mediaEnd.innerHTML = formatTime(currentSong.duration); 
    })
    currentSong.addEventListener("ended", () => {
      seekBar.value = 0;
      mediaStart.innerHTML = formatTime(0);
      playIcon.setAttribute("class", "ri-play-circle-line text-3xl text-black cursor-pointer hover:scale-[1.2]");
    });
    playIcon.setAttribute("class", "ri-pause-circle-line text-3xl text-black cursor-pointer hover:scale-[1.2]")
  }

  const play = ()=>{
    if(!currentSong.src){
      currentSong.src = songs[0].media
      mediaInfo.innerHTML = songs[0].title;
      currentSong.addEventListener("timeupdate", ()=>{
        seekBar.value = timeToPercentage(currentSong.currentTime, currentSong.duration);
        mediaStart.innerHTML = formatTime(currentSong.currentTime); 
        mediaEnd.innerHTML = formatTime(currentSong.duration); 
      })
      currentSong.addEventListener("ended", () => {
        seekBar.value = 0;
        mediaStart.innerHTML = formatTime(0);
        playIcon.setAttribute("class", "ri-play-circle-line text-3xl text-black cursor-pointer hover:scale-[1.2]");
      });
    }
    if(currentSong.paused){
      currentSong.play()
      playIcon.setAttribute("class", "ri-pause-circle-line text-3xl text-black cursor-pointer hover:scale-[1.2]")
    }else{
      currentSong.pause()
      playIcon.setAttribute("class", "ri-play-circle-line text-3xl text-black cursor-pointer hover:scale-[1.2]")
    }
  };

  const onChange = (e)=>{
    if(currentSong.src){
      seekBar.value = e.target.value
      currentSong.currentTime = ((currentSong.duration)*e.target.value)/100;
    }
  }

  const onVolumeChange = (e2)=>{
    // if(currentSong.src){
      volumeBar.value = e2.target.value
      console.log(volumeBar.value)
      currentSong.volume = e2.target.value/100;
    // }
  }

  const previous = ()=>{
    
  };

  const next = ()=>{
    
  };

  return (
    <>
      {/* <Nav/> */}
      <div className='w-full flex'>
        <Menu/>
        <Playlist songs={songs} playBtn={playBtn} playIcon={playIcon}/>
      </div>
      <Footer play={play} previous={previous} next={next} onVolumeChange={onVolumeChange} onChange={onChange} volumeBar={volumeBar}/>
    </>
  )
}

export default App
