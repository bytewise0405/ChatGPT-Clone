"use client";

// Reacts's Hook Imports
import { useState, useEffect } from "react";

// App's External Imports
import Link from "next/link";
import Image from "next/image";
import { TbEdit } from "react-icons/tb";
import { RiBardFill } from "react-icons/ri";
import { IoMdLogOut } from "react-icons/io";
import { MdChevronLeft } from "react-icons/md";

const Sidebar = ({
  is_sidebar_visible,
  set_is_sidebar_visible,
  user: { id, picture, nickname },
}) => {
  const [history, set_history] = useState([]);
  const [is_sidebar_tag_visible, set_is_sidebar_tag_visible] = useState(false);

  const handle_sidebar_tag = (type) => {
    set_is_sidebar_tag_visible(type === "mouse_enter");
  };

  const handle_mouse_click = () => {
    set_is_sidebar_visible(!is_sidebar_visible);
  };

  useEffect(() => {
    const fetch_history = async () => {
      const api_url = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/ai/generatedHistory/${id}`;

      const options = {
        method: "GET",
        cache: "no-store",
        headers: {
          "Cache-Control": "no-cache",
          "Content-Type": "application/json",
        },
      };

      try {
        const response = await fetch(api_url, options);
        if (response.status === 204) {
          set_history([]);
        } else {
          const data = await response.json();
          set_history(data.reverse());
        }
      } catch (error) {
        console.error("Error fetching history:", error);
        set_history([]);
      }
    };

    fetch_history();
  }, [id]);

  return (
    <div className="flex justify-center items-center overflow-hidden">
      <aside
        className={`h-screen bg-[#171717] flex justify-between flex-col relative transition-all ${
          is_sidebar_visible ? "w-[300px] px-2" : "w-0 px-0"
        }`}
      >
        <div className={!is_sidebar_visible ? "hidden" : ""}>
          <div className="pt-5">
            <Link
              href="/"
              className="hover:bg-[#202123] rounded-lg flex justify-between items-center cursor-pointer h-10 px-2"
            >
              <div className="flex items-center">
                <Image
                  width={0}
                  height={0}
                  alt="Header Icon"
                  unoptimized={true}
                  src="/images/header_icon.jpg"
                  className="w-7 h-7 rounded-full"
                />

                <span className="text-white text-sm pl-2">New Chat</span>
              </div>

              <span className="text-white text-xl">
                <TbEdit />
              </span>
            </Link>
          </div>

          {history.length > 0 ? (
            <div className="flex flex-col mt-5 gap-10 px-2 overflow-y-auto max-h-[70vh]">
              <div className="flex flex-col gap-2">
                <span className="text-gray-500 font-medium text-base">
                  Search History
                </span>
                {history.map((element, index) => (
                  <span
                    key={index}
                    title={element}
                    className="text-white text-sm hover:bg-[#202123] max-w-[14vw] rounded-lg cursor-pointer p-2 overflow-hidden whitespace-nowrap text-ellipsis"
                  >
                    {element}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center mt-10">
              <div className="text-center bg-[#171717] text-gray-300 p-4 rounded-lg shadow-md">
                <span className="block text-lg font-semibold">
                  No History Found
                </span>
                <span className="text-sm">
                  It looks like you haven&apos;t performed any actions yet.
                </span>
              </div>
            </div>
          )}
        </div>

        <div
          className={`flex flex-col gap-2.5 pb-5 z-10 absolute bottom-0 ${
            !is_sidebar_visible && "hidden"
          }`}
        >
          <div className="flex gap-2.5 items-center hover:bg-[#202123] rounded-lg cursor-pointer p-2">
            <span className="w-7 h-7 rounded-full bg-black p-1.5 text-white border-[0.25px] border-gray-700">
              <RiBardFill />
            </span>
            <div className="flex flex-col">
              <span className="text-white font-semibold text-sm">
                Upgrade plan
              </span>
              <span className="text-gray-300 text-xs mt-0.5">
                Get GPT-4, DALL·E, and more
              </span>
            </div>
          </div>
          <div className="flex gap-2.5 items-center justify-between hover:bg-[#202123] rounded-lg p-2">
            <div className="flex items-center gap-3">
              <Image
                width={0}
                height={0}
                src={picture}
                alt="User Profile"
                unoptimized={true}
                className="w-7 h-7 rounded-full"
              />
              <span className="text-white font-semibold text-sm">
                {nickname}
              </span>
            </div>
            <a href="/api/auth/logout">
              <IoMdLogOut className="mr-2.5 text-white text-lg" />
            </a>
          </div>
        </div>
      </aside>

      <div
        className={`bg-transparent flex gap-2 justify-center items-center text-[#62636d] text-[1.75rem] cursor-pointer absolute transition-all top-[50%] z-10 hover:text-white w-[10rem] ${
          is_sidebar_visible ? "ml-[27rem]" : "ml-[12rem]"
        }`}
        onClick={() => {
          handle_mouse_click();
        }}
      >
        <span
          className={is_sidebar_visible ? "rotate-0" : "rotate-180"}
          onMouseEnter={() => {
            handle_sidebar_tag("mouse_enter");
          }}
          onMouseLeave={() => {
            handle_sidebar_tag("mouse_leave");
          }}
        >
          <MdChevronLeft />
        </span>

        <span
          className={`text-white bg-black p-2.5 text-xs font-medium rounded-md transition ease-in delay-300 ${
            is_sidebar_tag_visible ? "visible" : "invisible"
          }`}
        >
          ◂ {is_sidebar_visible ? "Close sidebar" : "Open sidebar"}
        </span>
      </div>
    </div>
  );
};

export default Sidebar;
