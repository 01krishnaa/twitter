import React from "react";
import Image from "next/image";
import { FaRegComment } from "react-icons/fa";
import { FaRetweet } from "react-icons/fa";
import { MdOutlineFileUpload } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa6";

const FeedCard: React.FC = () => {
  return (
    <>
      <div className="flex gap-2 px-10 pb-8 pt-4 border-t-2 border-gray-700">
        <Image
          src={"https://avatars.githubusercontent.com/u/98023963?v=4"}
          alt="avatar"
          height={25}
          width={25}
          className="rounded-full w-fit h-fit"
        ></Image>
        <div>
          <h1>Krishna Singh</h1>
          <p className="text-sm font-light">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora
            harum, cons soluta sequi nihil commodi vero. Amet delectus et
            fugiat. Lorem ipsum dolor sit amet, consAmet delectus et fugiat.
          </p>
          <div className=" flex justify-between pt-4 px-6 cursor-pointer">
            <FaRegComment />
            <FaRetweet />
            <FaRegHeart />
            <MdOutlineFileUpload />
          </div>
        </div>
      </div>
    </>
  );
};

export default FeedCard;
