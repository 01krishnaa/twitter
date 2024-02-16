"use client";

import React from "react";
import { BiHomeAlt, BiBell, BiEnvelope, BiBookmark } from "react-icons/bi";
import { BsTwitterX } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import { FaHashtag } from "react-icons/fa6";
import FeedCard from "@/components/FeedCard/Page";

interface TwitterSidebarButton {
  title: string;
  icon: React.ReactNode;
}

export default function Home() {
  const sidebarMenuItems: TwitterSidebarButton[] = [
    {
      title: "Home",
      icon: <BiHomeAlt />,
    },
    {
      title: "Explore",
      icon: <FaHashtag />,
    },
    {
      title: "Notifications",
      icon: <BiBell />,
    },

    {
      title: "Messages",
      icon: <BiEnvelope />,
    },
    {
      title: "Bookmarks",
      icon: <BiBookmark />,
    },
    {
      title: "Profile",
      icon: <AiOutlineUser />,
    },
  ];

  return (
    <>
      <div className="grid grid-cols-12 h-screen w-screen px-32">
        <div className="col-span-3 pt-4 text-2xl">
          <div className="mb-5 hover:bg-slate-600 w-fit rounded-full p-2 transition-all cursor-pointer">
            <BsTwitterX />
          </div>
          <ul className="font-light">
            {sidebarMenuItems.map((item) => (
              <li
                key={item.title}
                className="flex py-3 rounded-full hover:bg-slate-600 px-2 w-fit transition-all cursor-pointer"
              >
                <span>{item.icon}</span>
                <span className="px-2">{item.title}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <button className="bg-[#1D9BF0] rounded-full px-24 py-2 hover:bg-[#1A8CD8]">
              Tweet
            </button>
          </div>
        </div>
        <div
          className="col-span-6 border-r border-l border-gray-700 overflow-scroll h-screen"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "transparent transparent",
          }}
        >
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
        </div>
        <div className="col-span-3"></div>
      </div>
    </>
  );
}
