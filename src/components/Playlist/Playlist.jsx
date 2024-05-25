import React, { useEffect, useState } from "react";
import { arr, links } from "../../utils";
import "remixicon/fonts/remixicon.css";

function Playlist() {
  const [songs, setSongs] = useState([]);

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
        setSongs(songs);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const playBtn = (e)=>{
    const filteredSong = songs.filter(item=>item.title === e);
    let audio = new Audio(filteredSong[0].media);
      audio.play();
  }

  return (
    <div className="w-[75vw] h-[77vh] overflow-hidden m-2 ms-0 bg-[#1C1C1C] rounded-lg">
      <div className="px-6 py-4 flex justify-between items-center bg-[#121212]">
        <div className="flex items-center gap-2">
          <div className="bg-black rounded-full px-1 cursor-pointer">
            <i className="ri-arrow-left-s-line text-2xl"></i>
          </div>
          <div className="bg-black rounded-full px-1 cursor-pointer">
            <i className="ri-arrow-right-s-line text-2xl"></i>
          </div>
        </div>
        <div className="flex gap-4">
          <button className="font-bold text-gray-400 py-2 px-6 hover:scale-[1.06]">
            Sign up
          </button>
          <button className="rounded-3xl font-bold bg-white text-black py-2 px-6 hover:scale-[1.06]">
            Login
          </button>
        </div>
      </div>
      <div className="scroll h-[86%] overflow-scroll overflow-x-hidden">
        {songs.length <= 0? null : (
          <div id="section1">
          <div className="title bg-[#1C1C1C] px-6 py-4">
            <h1 className="text-2xl font-bold mt-4">EchoTunes Musics</h1>
          </div>
          <div className="list cards flex flex-wrap bg-[#1C1C1C]">
            {songs.map((item, index) => (
              <div
                key={index}
                className="card p-4 hover:bg-[#181818] rounded-lg"
              >
                <div className="w-[164px]">
                  <div className="relative h-[164px] rounded-lg overflow-hidden">
                    <img
                      src={item.img}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                    <div className="playBtn absolute right-2 bottom-2 rounded-full bg-green-500 px-3 py-2 cursor-pointer" onClick={()=>{playBtn(item.title)}}>
                      <i className="ri-play-fill text-3xl text-black"></i>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 my-2 px-1">
                    <h2>{item.title}</h2>
                    <p className="max-h-[40px] overflow-hidden text-sm text-gray-400">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        )}
        <div id="section2">
          <div className="title bg-[#1C1C1C] px-6 py-4">
            <h1 className="text-2xl font-bold mt-4">EchoTunes Playlists</h1>
          </div>
          <div className="list cards flex flex-wrap bg-[#1C1C1C]">
            {arr.map((item, index) => (
              <div
                key={index}
                className="card p-4 hover:bg-[#181818] rounded-lg"
              >
                <div className="w-[164px]">
                  <div className="relative h-[164px] rounded-lg overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1493612276216-ee3925520721?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tfGVufDB8fDB8fHww"
                      alt=""
                      className="h-full w-full object-cover"
                    />
                    <div className="playBtn absolute right-2 bottom-2 rounded-full bg-green-500 px-3 py-2">
                      <i className="ri-play-fill text-3xl text-black"></i>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 my-2 px-1">
                    <h2>New Music Friday</h2>
                    <p className="max-h-[40px] overflow-hidden text-sm text-gray-400">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Nostrum odit quasi ipsum laborum voluptate repudiandae
                      necessitatibus consectetur dolor animi nulla repellat,
                      labore, laboriosam dolorem quisquam.
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="footer bg-[#1C1C1C] px-8 py-16">
          <div className="flex justify-between pb-16">
            {links.map((item1, index1) => (
              <div key={index1}>
                <h3 className="font-semibold mb-2">{item1.title}</h3>
                <ul>
                  {item1.more.map((item2, index2) => (
                    <li key={index2} className="text-sm mb-1">
                      {item2}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <ul className="flex gap-4">
                <li className="bg-[#242424] hover:bg-[#727272] px-3 py-2 rounded-full">
                  <i className="ri-instagram-line text-xl"></i>
                </li>
                <li className="bg-[#242424] hover:bg-[#727272] px-3 py-2 rounded-full">
                  <i className="ri-twitter-fill text-xl"></i>
                </li>
                <li className="bg-[#242424] hover:bg-[#727272] px-3 py-2 rounded-full">
                  <i className="ri-facebook-circle-fill text-xl"></i>
                </li>
              </ul>
            </div>
          </div>
          <hr />
          <div className="pt-16 text-xs">© 2024 EchoTunes</div>
        </div>
      </div>
    </div>
  );
}

export default Playlist;
