import React, { useEffect, useState } from "react";
import axios from "axios";
import { UserPlaylistCard } from "../index";
import { useDispatch, useSelector } from "react-redux";

function AllUserPlayLists() {
  const [playlists, setPlaylists] = useState(null);
  const { loginStatus } = useSelector((state) => state.customState);
  const [updates, setUpdates] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_SERVER_URL}savedPlaylist/allPlaylists`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        setPlaylists(response?.data?.data);
      } catch (error) {
        console.log("Error:", error?.response?.data?.message);
        setPlaylists(null);
      }
    };
    fetch();
  }, [updates]);

  return (
    <>
      {loginStatus === false ? (
        <>
          <div className="flex flex-col gap-4 pt-20 h-[60vh] items-center justify-center">
            <img
              src="https://www.londonappbrewery.com/wp-content/uploads/2016/05/no-Login-min.png"
              alt=""
              className="w-[160px] md:w-[180px] lg:w-[200px] h-[160px] md:h-[180px] lg:h-[200px] object-cover rounded-lg"
            />
            <h1 className="text-base md:text-lg">Please Login First</h1>
          </div>
        </>
      ) : (
        <>
          {!playlists ? (
            <>
              <div className="flex flex-col gap-4 pt-20 h-[60vh] items-center justify-center">
                <img
                  src="https://cdni.iconscout.com/illustration/premium/thumb/error-404-illustration-download-in-svg-png-gif-file-formats--no-results-service-landing-page-security-empty-state-pack-design-development-illustrations-3613889.png?f=webp"
                  alt=""
                  className="w-[160px] md:w-[180px] lg:w-[200px] h-[160px] md:h-[180px] lg:h-[200px] object-cover rounded-lg"
                />
                <h1 className="text-base md:text-lg">No playlist added yet</h1>
              </div>
            </>
          ) : (
            <>
              <div id="section13">
                <div className="title bg-[#1C1C1C] px-4 py-2 sm:px-6 md:py-4">
                  <h1 className="text-lg md:text-2xl font-bold mt-2 md:mt-4">
                    All User Playlists
                  </h1>
                </div>

                {playlists.length <= 0 ? (
                  <div className="flex flex-col gap-4 pt-20 h-[60vh] items-center justify-center">
                  <img
                    src="https://cdni.iconscout.com/illustration/premium/thumb/error-404-illustration-download-in-svg-png-gif-file-formats--no-results-service-landing-page-security-empty-state-pack-design-development-illustrations-3613889.png?f=webp"
                    alt=""
                    className="w-[160px] md:w-[180px] lg:w-[200px] h-[160px] md:h-[180px] lg:h-[200px] object-cover rounded-lg"
                  />
                  <h1 className="text-base md:text-lg">No playlist added yet</h1>
                </div>
                ) : (
                  <div className="list cards flex flex-wrap bg-[#1C1C1C] gap-4 px-4 py-4 md:px-6">
                    {playlists.map((item, index) => (
                      <UserPlaylistCard
                        key={index}
                        item={item}
                        setUpdates={setUpdates}
                      />
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}

export default AllUserPlayLists;
