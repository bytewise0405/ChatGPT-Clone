// React's Hook Imports
import { useRef, useState } from "react";

// App's External Imports
import Link from "next/link";
import Image from "next/image";
import { RiBardLine } from "react-icons/ri";
import { IoMdArrowUp } from "react-icons/io";
import { HiChevronDown } from "react-icons/hi";
import { TbEdit, TbBolt } from "react-icons/tb";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { MdOutlineRadioButtonUnchecked } from "react-icons/md";

const Home = ({ is_sidebar_visible }) => {
  const submit_btn = useRef(null);

  const [prompt, set_prompt] = useState("");
  const [is_visible, set_is_visible] = useState(false);

  const activities = [
    {
      type: "recreational",
      activity: "Go for a hike in a nearby nature reserve",
    },
    { type: "charity", activity: "Volunteer at a local charity" },
    { type: "cooking", activity: "Try a new recipe and cook dinner" },
    { type: "education", activity: "Learn to play a musical instrument" },
  ];

  const handle_mouse_click = () => {
    set_is_visible(is_visible ? false : true);
  };

  const slugify = (input) => {
    return input.trim().toLowerCase().replace(/\s+/g, "-");
  };

  const handle_submit = (event) => {
    event.preventDefault();

    if (submit_btn.current && prompt.length > 0) {
      submit_btn.current.click();
    }
  };

  return (
    <div className="flex bg-[#212121] justify-between gap-10 flex-col w-full px-5 overflow-y-hidden">
      <div className="font-medium text-white text-lg py-4 flex items-center">
        <Link
          href="/"
          className={`text-xl bg-[#212121] p-2 rounded-lg border-[#383838] border-2 font-medium hover:bg-[#2f2f2f] cursor-pointer ${
            is_sidebar_visible && "hidden"
          }`}
        >
          <TbEdit />
        </Link>

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

            <span
              className={`text-gray-400 text-lg transition-all ${
                is_visible ? "rotate-180" : "rotate-0"
              }`}
            >
              <HiChevronDown />
            </span>
          </div>

          <div
            className={`bg-[#2f2f2f] border-[#383838] border-2 absolute p-2.5 rounded-lg flex flex-col gap-3 w-80 mt-2 max-[639px]:left-5 ${
              is_visible ? "visible" : "invisible"
            }`}
          >
            <div className="flex justify-between items-center gap-5 rounded-lg p-2 cursor-pointer hover:bg-[#424242]">
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

            <div className="flex justify-between items-center gap-5 rounded-lg p-2 cursor-pointer hover:bg-[#424242]">
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

          <span className="text-2xl font-medium text-white mt-2">
            How can I help you today?
          </span>
        </div>

        <div className="flex flex-col items-center max-[639px]:h-1/2 pb-2">
          <div className="grid gap-2 grid-cols-1 lg:grid-cols-2 place-items-center">
            {activities.length > 0 &&
              activities.map(({ type, activity }, index) => (
                <Link
                  key={index}
                  href={`/chat/${slugify(activity)}`}
                  className="bg-[#212121] rounded-lg border-[#383838] border-2 hover:bg-[#2f2f2f] cursor-pointer flex flex-col px-4 py-3 w-[20rem] sm:w-[24rem]"
                >
                  <span className="text-[#bcbcca] text-sm font-medium overflow-hidden whitespace-nowrap text-ellipsis">
                    {activity}
                  </span>
                  <span className="text-[#787985] text-xs font-normal">
                    Type: {type}
                  </span>
                </Link>
              ))}
          </div>

          <div className="flex mt-5 relative items-center flex-col gap-3">
            <form onSubmit={handle_submit}>
              <input
                type="text"
                value={prompt}
                autoComplete="off"
                placeholder="Message ChatGPT..."
                onChange={(event) => {
                  set_prompt(event.target.value);
                }}
                className="bg-[#2f2f2f] rounded-full outline-none p-2 font-medium text-[#787985] text-sm pl-4 py-3.5 lg:w-[49rem] sm:w-[30rem] w-[20rem]  focus:text-white"
              />

              <Link
                ref={submit_btn}
                href={prompt.length > 0 ? `/chat/${slugify(prompt)}` : "#"}
                className={`bg-[#676767] text-lg text-[#2f2f2f] p-1.5 rounded-full transition-colors absolute right-3 top-2.5 cursor-pointer ${
                  prompt.length > 0
                    ? "hover:bg-white hover:text-black"
                    : "cursor-not-allowed"
                }`}
              >
                <IoMdArrowUp />
              </Link>
            </form>

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
