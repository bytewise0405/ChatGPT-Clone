// React's Hook Imports
import { useState } from "react";

// Next.Js Component Imports
import Image from "next/image";

// App's External Imports
import { RiBardLine } from "react-icons/ri";
import { IoMdArrowUp } from "react-icons/io";
import { HiChevronDown } from "react-icons/hi";
import { TbEdit, TbBolt } from "react-icons/tb";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { MdOutlineRadioButtonUnchecked } from "react-icons/md";

const Home = ({ is_sidebar_visible }) => {
  const [is_visible, set_is_visible] = useState(false);

  const handle_mouse_click = () => {
    set_is_visible(is_visible ? false : true);
  };

  return (
    <div className="flex bg-[#343541] justify-between gap-10 flex-col w-full px-5 overflow-y-hidden">
      <div className="font-medium text-white text-lg py-4 flex items-center">
        <span
          className={`text-xl bg-[#343541] p-2 rounded-lg border-[#445869] border-2 font-medium hover:bg-[#40414F] cursor-pointer ${
            is_sidebar_visible && "hidden"
          }`}
        >
          <TbEdit />
        </span>

        <div className="pl-2">
          <div
            className="hover:bg-[#0000001a] flex items-center gap-1 w-40 p-2.5 rounded-lg cursor-pointer"
            onClick={() => {
              handle_mouse_click();
            }}
          >
            <span>
              ChatGPT <span className="text-gray-300">3.5</span>
            </span>

            <span className="text-gray-400 text-lg">
              <HiChevronDown />
            </span>
          </div>

          <div
            className={`bg-[#202123] absolute p-2.5 rounded-lg flex flex-col gap-3 w-80 mt-2 max-[639px]:left-5 ${
              is_visible ? "visible" : "invisible"
            }`}
          >
            <div className="flex justify-between items-center gap-5 rounded-lg p-2 cursor-pointer hover:bg-[#2b2c2e] hover:border-2 hover:border-white">
              <div className="flex items-center gap-5">
                <span>
                  <TbBolt />
                </span>
                <div className="flex flex-col">
                  <span className="text-sm text-white">GPT-3.5</span>
                  <span className="text-xs text-gray-400">
                    Great for everyday tasks
                  </span>
                </div>
              </div>
              <span>
                <IoIosCheckmarkCircle />
              </span>
            </div>

            <div className="flex justify-between items-center gap-5 rounded-lg p-2 cursor-pointer hover:bg-[#2b2c2e] hover:border-2 hover:border-white">
              <div className="flex items-center gap-5">
                <span>
                  <RiBardLine />
                </span>
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col">
                    <span className="text-sm text-white">GPT-4</span>
                    <span className="text-xs text-gray-400">
                      Our smartest and most capable model. Includes DALL·E,
                      browsing and more.
                    </span>
                  </div>
                  <button className="w-full bg-[#9a5ee5] rounded-lg text-sm p-2">
                    Upgrade to Plus
                  </button>
                </div>
              </div>
              <span>
                <MdOutlineRadioButtonUnchecked />
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="h-full max-[639px]:h-3/4 flex flex-col justify-between">
        <div className="flex flex-col items-center mt-10 gap-3">
          <Image
            width={0}
            height={0}
            alt="Home Icon"
            unoptimized={true}
            src="/images/header_icon.jpg"
            className="w-[72px] h-[72px] rounded-full"
          />

          <span className="text-2xl font-medium text-white">
            How can I help you today?
          </span>
        </div>

        <div className="flex flex-col items-center max-[639px]:h-1/2 pb-2">
          <div className="grid gap-2 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 place-items-center">
            <div className="bg-[#343541] rounded-lg border-[#445869] border-2 hover:bg-[#40414F] cursor-pointer flex flex-col px-4 py-3 w-[20rem] sm:w-[24rem]">
              <span className="text-[#bcbcca] text-sm font-medium">
                Compare design principles
              </span>
              <span className="text-[#787985] text-xs font-normal">
                for mobile apps and desktop software
              </span>
            </div>
            <div className="bg-[#343541] rounded-lg border-[#445869] border-2 hover:bg-[#40414F] cursor-pointer flex flex-col px-4 py-3 w-[20rem] sm:w-[24rem]">
              <span className="text-[#bcbcca] text-sm font-medium">
                Suggest some codenames
              </span>
              <span className="text-[#787985] text-xs font-normal">
                for a project introducing flexible work arrangements
              </span>
            </div>
            <div className="bg-[#343541] rounded-lg border-[#445869] border-2 hover:bg-[#40414F] cursor-pointer flex-col px-4 py-3 w-[24rem] hidden sm:flex">
              <span className="text-[#bcbcca] text-sm font-medium">
                Design a database schema
              </span>
              <span className="text-[#787985] text-xs font-normal">
                for an online merch store
              </span>
            </div>
            <div className="bg-[#343541] rounded-lg border-[#445869] border-2 hover:bg-[#40414F] cursor-pointer flex-col px-4 py-3 w-[24rem] hidden sm:flex">
              <span className="text-[#bcbcca] text-sm font-medium">
                Create a charter
              </span>
              <span className="text-[#787985] text-xs font-normal">
                to start a film club
              </span>
            </div>
          </div>

          <div className="flex mt-5 relative items-center flex-col gap-3">
            <div>
              <input
                type="text"
                id="search_query"
                name="search_query"
                placeholder="Message ChatGPT..."
                className="bg-[#343541] rounded-xl border-[#445869] border-2 p-2 font-medium text-[#787985] text-sm pl-4 py-3.5 lg:w-[49rem] sm:w-[30rem] w-[20rem]  focus:text-white"
              />
              <span className="bg-[#494a54] text-lg text-white p-1.5 rounded-lg absolute right-3 top-2.5 cursor-pointer">
                <IoMdArrowUp />
              </span>
            </div>

            <span className="text-[0.5rem] sm:text-xs text-[#bcbcca] font-normal">
              ChatGPT can make mistakes. Consider checking important
              information.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
