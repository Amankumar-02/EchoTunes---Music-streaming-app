import React from "react";

function Shimmer() {
  let demo = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <>
      <div>
        <div className="bg-[#1C1C1C] px-4 py-2 md:px-6 md:py-4">
          <h1 className="shimmerTitle text-lg md:text-2xl font-bold mt-2 md:mt-4 text-gray-700">
            Loading...
          </h1>
        </div>
        <div className="flex flex-wrap bg-[#1C1C1C] gap-4 px-4 py-4 md:px-6">
          {demo.map((item) => (
            <div key={item} className="ShimmerCard  p-2 sm:p-3 md:p-4 lg:p-5">
              <div className="w-[140px] sm:w-[160px] md:w-[180px] h-[140px] sm:h-[160px] md:h-[180px] bg-gray-800 rounded-lg cursor-pointer"></div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Shimmer;
