// Next.Js Component Imports
import Image from "next/image";

// App's External Imports
import { FaRegClipboard } from "react-icons/fa";
import { MdOutlineThumbUp, MdOutlineThumbDown } from "react-icons/md";

const ChatGPT = ({ content }) => {
  return (
    <div className="flex gap-3">
      <Image
        width={0}
        height={0}
        alt="User Profile"
        unoptimized={true}
        src="/images/logo_green.png/"
        className="w-7 h-7 rounded-full"
      />

      <div className="flex flex-col gap-1">
        <span className="text-white font-semibold select-none text-sm">
          ChatGPT
        </span>
        <span className="text-[#ececf1] text-sm tracking-wider leading-8">
          {content}
        </span>
        <div className="flex text-gray-400 text-base gap-3">
          <span className="cursor-pointer hover:text-gray-200">
            <FaRegClipboard />
          </span>
          <span className="cursor-pointer hover:text-gray-200">
            <MdOutlineThumbUp />
          </span>
          <span className="cursor-pointer hover:text-gray-200">
            <MdOutlineThumbDown />
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChatGPT;
