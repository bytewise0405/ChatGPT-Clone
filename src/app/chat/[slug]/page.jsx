"use client";

// React's Hook Imports
import { useEffect, useState } from "react";

// App's Internal Imports
import { chats } from "@/constants";
import { User, ChatGPT, Sidebar } from "@/components";

// App's External Imports
import { FiShare } from "react-icons/fi";
import { RiBardLine } from "react-icons/ri";
import { FaArrowDown } from "react-icons/fa6";
import { HiChevronDown } from "react-icons/hi";
import { TbEdit, TbBolt } from "react-icons/tb";
import { MdOutlineRadioButtonUnchecked } from "react-icons/md";
import { IoMdArrowUp, IoIosCheckmarkCircle } from "react-icons/io";

const Chat = ({ params }) => {
  const [chat, set_chat] = useState([]);
  const [loading, set_loading] = useState(true);
  const [is_visible, set_is_visible] = useState(false);
  const [is_sidebar_visible, set_is_sidebar_visible] = useState(false);

  const handle_mouse_click = () => {
    set_is_visible(is_visible ? false : true);
  };

  useEffect(() => {
    if (params.slug) {
      if (
        chats.filter((element) => {
          if (element.slug === params.slug) {
            return true;
          } else {
            return false;
          }
        }).length !== 0
      ) {
        set_chat(
          chats.filter((element) => {
            return element.slug === params.slug;
          })
        );

        set_loading(false);
      }
    }

    return () => {
      set_chat();
      set_loading(true);
    };
  }, [params.slug]);

  return (
    <main className="flex">
      <Sidebar
        is_sidebar_visible={is_sidebar_visible}
        set_is_sidebar_visible={set_is_sidebar_visible}
      />

      <div className="bg-[#343541] w-full flex flex-col h-screen pb-[5rem] px-5">
        <div className="font-medium text-white text-lg py-4 flex items-center justify-between">
          <div className="flex items-center">
            <span
              className={`text-xl bg-[#343541] p-2 h-10 rounded-lg border-[#445869] border-2 font-medium hover:bg-[#40414F] cursor-pointer ${
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
                className={`bg-[#202123] absolute p-2.5 rounded-lg flex flex-col gap-3 w-80 mt-2 z-10 max-[639px]:left-5 ${
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

          <span className="text-xl bg-[#343541] p-2 rounded-lg border-[#445869] border-2 font-medium hover:bg-[#40414F] cursor-pointer">
            <FiShare />
          </span>
        </div>

        <div
          className={`flex flex-col items-center py-3 h-full ${
            loading ? "justify-center" : "justify-between"
          }`}
        >
          {loading ? (
            <div role="status">
              <svg
                aria-hidden="true"
                className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <>
              <div className="max-w-[45rem] overflow-scroll overflow-x-hidden pr-10 relative">
                <div className="flex flex-col gap-10">
                  {chat.length !== 0 &&
                    chat[0].chats.map((element, key) => {
                      if (element.role === "user") {
                        return <User key={key} content={element.content} />;
                      } else {
                        return <ChatGPT key={key} content={element.content} />;
                      }
                    })}
                </div>
              </div>

              <div className="bg-[#494a54] rounded-full p-2 bottom-28 z-10 absolute opacity-95 text-white cursor-pointer">
                <FaArrowDown />
              </div>

              <div className="flex mt-5 relative items-center flex-col gap-3">
                <div>
                  <input
                    type="text"
                    id="search_query"
                    name="search_query"
                    placeholder="Message ChatGPT..."
                    className="bg-[#343541] rounded-xl border-[#445869] border-2 p-2 font-medium text-[#787985] text-sm pl-4 py-3.5 lg:w-[49rem] sm:w-[30rem] w-[20rem] focus:text-white"
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
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default Chat;
