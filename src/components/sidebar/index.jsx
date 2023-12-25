// Reacts's Hook Imports
import { useState } from "react";

// Next.Js Component Imports
import Link from "next/link";
import Image from "next/image";

// App's External Imports
import { TbEdit } from "react-icons/tb";
import { RiBardFill } from "react-icons/ri";
import { MdChevronLeft } from "react-icons/md";

const Sidebar = ({ is_sidebar_visible, set_is_sidebar_visible }) => {
  const [is_visible, set_is_visible] = useState(false);
  const [is_sidebar_tag_visible, set_is_sidebar_tag_visible] = useState(false);

  const handle_mouse_event = (type) => {
    if (type === "mouse_enter") {
      set_is_visible(true);
    } else {
      set_is_visible(false);
    }
  };
  const handle_sidebar_tag = (type) => {
    if (type === "mouse_enter") {
      set_is_sidebar_tag_visible(true);
    } else {
      set_is_sidebar_tag_visible(false);
    }
  };

  const handle_mouse_click = () => {
    set_is_sidebar_visible(is_sidebar_visible ? false : true);
  };

  return (
    <div className="flex justify-center items-center">
      <aside
        className={`h-screen bg-black flex justify-between flex-col relative transition-all ${
          is_sidebar_visible ? "w-[260px] px-2" : "w-0 px-0"
        } ${
          is_sidebar_visible && is_sidebar_tag_visible
            ? "opacity-90"
            : "opacity-100"
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

              <span
                className="text-white text-xl"
                onMouseEnter={() => {
                  handle_mouse_event("mouse_enter");
                }}
                onMouseLeave={() => {
                  handle_mouse_event("mouse_leave");
                }}
              >
                <TbEdit />
              </span>

              <span
                className={`text-white bg-black p-2.5 text-xs font-medium absolute -right-24 rounded-md transition ease-in delay-300 ${
                  is_visible ? "visible" : "invisible"
                }`}
              >
                ◂ New Chat
              </span>
            </Link>
          </div>

          <div className="flex flex-col mt-10 gap-10 px-2">
            <div className="flex flex-col gap-2">
              <span className="text-gray-500 font-medium text-xs">Today</span>
              <Link
                href="/chat/XUM0TNW4SRJ9S8GQDPGI"
                className="text-white text-sm hover:bg-[#202123] rounded-lg cursor-pointer p-2"
              >
                Merch Store DB Schema
              </Link>
              <Link
                href="/chat/S0QMZXDS9DAIKV9AHOK5"
                className="text-white text-sm hover:bg-[#202123] rounded-lg cursor-pointer p-2"
              >
                Film Club Charter
              </Link>
              <Link
                href="/chat/FS6KG8U1103TOTENMY02"
                className="text-white text-sm hover:bg-[#202123] rounded-lg cursor-pointer p-2"
              >
                NYC 3-Day Itinerary
              </Link>
              <Link
                href="/chat/WEOJ8VXBVY8FU3UL3JI1"
                className="text-white text-sm hover:bg-[#202123] rounded-lg cursor-pointer p-2"
              >
                Popcorn Popping Science
              </Link>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-gray-500 font-medium text-xs">
                Previous 30 Days
              </span>
              <Link
                href="/chat/XUM0TNW4SRJ9S8GQDPGI"
                className="text-white text-sm hover:bg-[#202123] rounded-lg cursor-pointer p-2"
              >
                Merch Store DB Schema
              </Link>
              <Link
                href="/chat/S0QMZXDS9DAIKV9AHOK5"
                className="text-white text-sm hover:bg-[#202123] rounded-lg cursor-pointer p-2"
              >
                Film Club Charter
              </Link>
              <Link
                href="/chat/FS6KG8U1103TOTENMY02"
                className="text-white text-sm hover:bg-[#202123] rounded-lg cursor-pointer p-2"
              >
                NYC 3-Day Itinerary
              </Link>
              <Link
                href="/chat/WEOJ8VXBVY8FU3UL3JI1"
                className="text-white text-sm hover:bg-[#202123] rounded-lg cursor-pointer p-2"
              >
                Popcorn Popping Science
              </Link>
            </div>
          </div>
        </div>

        <div
          className={`flex flex-col gap-2.5 pb-5 ${
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

          <div className="flex gap-2.5 items-center hover:bg-[#202123] rounded-lg cursor-pointer p-2">
            <Image
              width={0}
              height={0}
              alt="User Profile"
              unoptimized={true}
              src="/images/user_profile.png"
              className="w-7 h-7 rounded-full"
            />

            <span className="text-white font-semibold text-sm">ByteWise</span>
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
