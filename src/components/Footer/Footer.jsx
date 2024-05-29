import React from 'react'
import { links } from "../../utils";
import "remixicon/fonts/remixicon.css";

function Footer() {
  return (
    <div className="footer bg-[#1C1C1C] px-4 md:px-8 py-6 md:py-16">
          <hr />
          <div className="flex flex-wrap lg:flex-nowrap gap-6 md:gap-2 md:justify-between py-6 md:py-16">
            {links.map((item1, index1) => (
              <div key={index1}>
                <h3 className="text-sm md:text-base font-semibold mb-2">{item1.title}</h3>
                <ul>
                  {item1.more.map((item2, index2) => (
                    <li key={index2} className="text-xs md:text-sm mb-1">
                      {item2}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <ul className="flex gap-2 md:gap-4">
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
          <div className="pt-6 md:pt-16 text-xs">© 2024 EchoTunes</div>
        </div>
  )
}

export default Footer