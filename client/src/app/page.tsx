"use client";

import React, { useCallback } from "react";
import { BiHomeAlt, BiBell, BiEnvelope, BiBookmark } from "react-icons/bi";
import { BsTwitterX } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import { FaHashtag } from "react-icons/fa6";
import FeedCard from "@/components/FeedCard/Page";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import toast, { Toaster } from "react-hot-toast";
import { graphqlClient } from "@/clients/api";
import { verifyUserGoogleTokenQuery } from "@/graphql/query/user";

interface TwitterSidebarButton {
  title: string;
  icon: React.ReactNode;
}

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
export default function Home() {
  const handleLoginWithGoogle = useCallback(
    async (cred: CredentialResponse) => {
      const googleToken = cred.credential;
      if (!googleToken) return toast.error("Google token not found");

      const { verifyGoogleToken } = await graphqlClient.request(
        verifyUserGoogleTokenQuery,
        {
          token: googleToken,
        }
      );

      toast.success("verified success");
      console.log(verifyGoogleToken);

      if (verifyGoogleToken)
        window.localStorage.setItem("twitter_token", verifyGoogleToken);
    },
    []
  );

  return (
    <>
      <Toaster />
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
            <button className="bg-[#1D9BF0] rounded-full w-full py-2 hover:bg-[#1A8CD8]">
              Tweet
            </button>
          </div>
        </div>
        <div
          className="ml-4 col-span-6 border-r border-l border-gray-700 overflow-scroll h-screen"
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
        <div className="col-span-3">
          <GoogleLogin onSuccess={handleLoginWithGoogle} />
        </div>
      </div>
    </>
  );
}
