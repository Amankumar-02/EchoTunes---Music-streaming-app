import React, { useEffect, useState } from "react";
import axios from "axios";
import { UserPlaylistCard } from "../index";
import { useDispatch, useSelector } from "react-redux";

function AllUserPlayLists() {
    const [playlists, setPlaylists] = useState(null);
    const { loginStatus } = useSelector(
        (state) => state.customState
      );
      const [updates, setUpdates] = useState(false);

    useEffect(()=>{
        const fetch = async ()=>{
            try {
                const response = await axios.get("http://localhost:3000/savedPlaylist/allPlaylists", {
                  headers: {
                    "Content-Type": "application/json",
                  },
                  withCredentials: true,
                });
                setPlaylists(response.data.data);
              } catch (error) {
                console.log("Error:", error);
              }
        };
        fetch();
    }, [updates]);

  return (
    <>
    {loginStatus === false || !playlists ? (
        <>
        <div className="flex pt-20 items-center justify-center">
            Please Login First
          </div>
        </>
    ) : (
            <>
              <div id="section13">
                <div className="title bg-[#1C1C1C] px-6 py-2 md:py-4">
                  <h1 className="text-xl md:text-2xl font-bold mt-2 md:mt-4">
                    All User Playlists
                  </h1>
                </div>
                {playlists.length <= 0 ? (<>
                  <div className="text-center pt-10">No playlist added yet</div>
                </>) : (<>
                <div className="md:ps-2 list cards flex flex-wrap bg-[#1C1C1C]">
                  {playlists.map((item, index) => (
                    <UserPlaylistCard key={index} item={item} setUpdates={setUpdates} />
                  ))}
                </div>
                </>)}
              </div>
            </>
          )}
    </>
  )
}

export default AllUserPlayLists