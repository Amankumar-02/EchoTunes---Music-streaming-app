import React from "react";

function Shimmer() {
  let demo = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <>
      <div>
        <div className="bg-[#1C1C1C] px-6 py-2 md:py-4">
          <h1 className="shimmerTitle text-xl md:text-2xl font-bold mt-2 md:mt-4 text-gray-700">
            Loading...
          </h1>
        </div>
        <div className="m-2 flex gap-2 flex-wrap bg-[#1C1C1C]">
          {demo.map((item) => (
            <div key={item} className="ShimmerCard p-2 md:p-4 bg-gray-800 rounded-lg">
              <div className="w-[158px] md:w-[158px] h-[158px] md:h-[158px]"></div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Shimmer;
