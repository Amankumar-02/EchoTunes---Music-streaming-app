import React from "react";
import { links } from "../../utils";
import "remixicon/fonts/remixicon.css";

function Footer() {
  return (
    <div className="footer bg-[#1C1C1C] px-4 md:px-8 py-6 md:pt-16">
      <hr className="border-gray-700" />
      <div className="flex flex-wrap gap-6 md:gap-12 justify-between py-6 md:py-12">
        {links.map((item1, index1) => (
          <div key={index1}>
            <h3 className="text-sm md:text-base lg:text-lg font-semibold mb-2 text-white">
              {item1.title}
            </h3>
            <ul>
              {item1.more.map((item2, index2) => (
                <li
                  key={index2}
                  className="text-xs md:text-sm lg:text-base mb-1 text-gray-400"
                >
                  {item2}
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="w-full flex justify-start">
          <ul className="flex gap-2 md:gap-4">
            <li className="bg-[#242424] hover:bg-[#727272] px-3 py-2 rounded-full">
              <i className="ri-instagram-line text-xl text-white"></i>
            </li>
            <li className="bg-[#242424] hover:bg-[#727272] px-3 py-2 rounded-full">
              <i className="ri-twitter-fill text-xl text-white"></i>
            </li>
            <li className="bg-[#242424] hover:bg-[#727272] px-3 py-2 rounded-full">
              <i className="ri-facebook-circle-fill text-xl text-white"></i>
            </li>
          </ul>
        </div>
      </div>
      <hr className="border-gray-700" />
      <div className="pt-6 md:pt-12 text-xs md:text-sm lg:text-base text-gray-500 text-center lg:text-left">
        © {new Date().getFullYear()} EchoTunes
      </div>
    </div>
  );
}

export default Footer;
