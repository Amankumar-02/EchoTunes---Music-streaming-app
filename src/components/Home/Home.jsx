import React, { useState, useEffect, useRef } from "react";
import { Menu, Playlist, Footer } from "../index";

function App() {
  const [songs, setSongs] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [menuToggle, setMenuToggle] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const playIcon = useRef(null);
  const mediaInfo = useRef(null);
  const mediaStart = useRef(null);
  const mediaEnd = useRef(null);
  const seekBar = useRef(null);
  const volumeBar = useRef(null);
  const audioRef = useRef(new Audio());

  // format the media time
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // shuffle the library
  const shuffleArray = (array) => {
    let shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  // get data from server
  useEffect(()=>{
    const fetchData = async () => {
      try {
        const data = await fetch("http://localhost:3000/songs/");
        const response = await data.json();
        const shuffledSongs = shuffleArray(response);
        setSongs(shuffledSongs);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
    const fetchData2 = async () => {
      try {
        const data = await fetch("http://localhost:3000/albums/");
        const response = await data.json();
        const shuffledSongs = shuffleArray(response);
        setAlbums(shuffledSongs);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData2();
  }, [])

  // Fetch data from local
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const data = await fetch("http://localhost:5173/songs/songs.html");
  //       const response = await data.text();
  //       let div = document.createElement("div");
  //       div.innerHTML = response;
  //       let as = div.getElementsByTagName("a");
  //       let images = div.getElementsByTagName("img");
  //       let fetchedSongs = [];
  //       for (let i = 0; i < as.length; i++) {
  //         const anchor = as[i];
  //         const source = images[i];
  //         if (anchor.href.endsWith(".mp3") && source.src) {
  //           let song = {
  //             media: anchor.href,
  //             img: source.src,
  //             title: anchor.innerHTML.split(" - ")[0],
  //             desc: anchor.innerHTML.split(" - ")[1],
  //           };
  //           fetchedSongs.push(song);
  //         }
  //       }
  //       const shuffledSongs = shuffleArray(fetchedSongs);
  //       setSongs(shuffledSongs);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  // this func trigger everytime when ui rerender
  useEffect(() => {
    const audio = audioRef.current;
    const updateTime = () => {
      seekBar.current.value = (audio.currentTime / audio.duration) * 100;
      mediaStart.current.innerHTML = formatTime(audio.currentTime);
      mediaEnd.current.innerHTML = formatTime(audio.duration);
    };
    const resetPlayer = () => {
      seekBar.current.value = 0;
      mediaStart.current.innerHTML = formatTime(0);
      setIsPlaying(false);
      playIcon.current.className =
        "ri-play-circle-line text-3xl text-black cursor-pointer hover:scale-[1.2]";
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("ended", resetPlayer);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("ended", resetPlayer);
    };
  }, []);

  // Main Media playButton
  const playBtn = (title, index=0) => {
    const song = songs.find((item) => item.title === title);
    console.log(index)
    setCurrentIndex(index);
    if (song) {
      audioRef.current.src = song.media;
      audioRef.current.play();
      setCurrentSong(song);
      setIsPlaying(true);
      mediaInfo.current.innerHTML = song.title;
      playIcon.current.className =
        "ri-pause-circle-line text-3xl text-black cursor-pointer hover:scale-[1.2]";
    }
  };

  // footer playBtn handler
  const play = () => {
    if (!currentSong && songs.length > 0) {
      playBtn(songs[0].title, 0);
      // setCurrentIndex(0);
    } else {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
        playIcon.current.className =
          "ri-play-circle-line text-3xl text-black cursor-pointer hover:scale-[1.2]";
      } else {
        audioRef.current.play();
        setIsPlaying(true);
        playIcon.current.className =
          "ri-pause-circle-line text-3xl text-black cursor-pointer hover:scale-[1.2]";
      }
    }
  };

  // seekBar event
  const onSeekBarChange = (e) => {
    if (audioRef.current.src) {
      seekBar.current.value = e.target.value;
      audioRef.current.currentTime =
        (audioRef.current.duration * e.target.value) / 100;
    }
  };

  // volume event
  const onVolumeChange = (e) => {
    volumeBar.current.value = e.target.value;
    audioRef.current.volume = e.target.value / 100;
  };

  const previous = () => {
    if(currentIndex > 0){
      playBtn(songs[currentIndex-1].title, currentIndex-1);
    }
  };

  const next = () => {
    if(songs[currentIndex+1]?.title){
      playBtn(songs[currentIndex+1].title, currentIndex+1);
    }
  };

  const menuToggleHandler = ()=>{
    setMenuToggle(prev=>!prev)
  }

  return (
    <>
      <div className="w-full flex">
        <Menu menuToggle={menuToggle} menuToggleHandler={menuToggleHandler}/>
        <Playlist songs={songs} albums={albums} playBtn={playBtn} playIcon={playIcon} currentSong={currentSong} menuToggleHandler={menuToggleHandler}/>
      </div>
      <Footer
        play={play}
        previous={previous}
        next={next}
        onVolumeChange={onVolumeChange}
        onSeekBarChange={onSeekBarChange}
        mediaInfo={mediaInfo}
        mediaStart={mediaStart}
        playIcon={playIcon}
        mediaEnd={mediaEnd}
        seekBar={seekBar}
        volumeBar={volumeBar}
      />
    </>
  );
}

export default App;
