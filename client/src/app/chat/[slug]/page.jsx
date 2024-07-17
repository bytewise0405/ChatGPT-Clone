"use client";

// React's Hook Imports
import { useRef, useState, useEffect } from "react";

// App's Internal Imports
import { User, ChatGPT, Sidebar } from "@/components";

// App's External Imports
import Link from "next/link";
import { useRouter } from "next/navigation";
import { RiBardLine } from "react-icons/ri";
import { FaArrowDown } from "react-icons/fa6";
import { HiChevronDown } from "react-icons/hi";
import { TbEdit, TbBolt } from "react-icons/tb";
import { useUser } from "@auth0/nextjs-auth0/client";
import { MdOutlineRadioButtonUnchecked } from "react-icons/md";
import { IoMdArrowUp, IoIosCheckmarkCircle } from "react-icons/io";

const Chat = ({ params: { slug } }) => {
  const router = useRouter();
  const { user, isLoading } = useUser();
  const chat_container_ref = useRef(null);
  const has_created_chat_ref = useRef(false);

  const [chats, set_chats] = useState([]);
  const [prompt, set_prompt] = useState("");
  const [model, set_model] = useState(false);
  const [loading, set_loading] = useState(false);
  const [is_visible, set_is_visible] = useState(false);
  const [is_sidebar_visible, set_is_sidebar_visible] = useState(true);

  const deslugify = (input) => {
    return input
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const handle_mouse_click = () => {
    set_model((prev_is_visible) => !prev_is_visible);
  };

  const fetch_profile_image = (username) => {
    const identifier = username.slice(0, 1);
    return `https://cdn.auth0.com/avatars/${identifier}.png`;
  };

  const generate_title = async (prompt) => {
    try {
      const response = await fetch(
        "https://api.ai21.com/studio/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_AI21_API_KEY}`,
          },
          body: JSON.stringify({
            n: 1,
            top_p: 1,
            stop: ["\n"],
            max_tokens: 10,
            temperature: 0.7,
            model: "jamba-instruct-preview",
            messages: [
              {
                role: "user",
                content: `Generate a suitable title for the following prompt: ${prompt}`,
              },
            ],
          }),
        }
      );

      const data = await response.json();
      return data.choices[0].message.content.replace(/[".<]/g, "").trim();
    } catch (error) {
      console.error("Error generating title:", error);
      return "Default Title";
    }
  };

  const create_chat = async (content) => {
    const chat = {
      role: "user",
      content: content,
    };

    set_chats((prev_chats) => [...prev_chats, chat]);
    set_loading(true);

    try {
      const title = await generate_title(content);
      const api_url = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/ai/generateStream/${user.sub}/${title}`;

      const options = {
        method: "POST",
        cache: "no-store",
        body: JSON.stringify({
          message: `prompt: ${content}`,
        }),
        headers: {
          "Cache-Control": "no-cache",
          "Content-Type": "application/json",
        },
      };

      const response = await fetch(api_url, options);
      const data = await response.text();

      const result = {
        content: data,
        role: "chat_gpt",
      };

      set_chats((prev_chats) => [...prev_chats, result]);
    } catch (error) {
      console.error("Error fetching chat:", error);
    } finally {
      set_loading(false);
    }
  };

  useEffect(() => {
    if (chats.length > 0 && chats[chats.length - 1].role === "user") {
      handle_scroll_to_bottom();
    }
  }, [chats]);

  useEffect(() => {
    if (slug && !has_created_chat_ref.current) {
      create_chat(deslugify(slug));
      has_created_chat_ref.current = true;
    }
  }, [slug]);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/api/auth/login");
    }
  }, [isLoading, user, router]);

  useEffect(() => {
    const check_overflow = () => {
      if (chat_container_ref.current) {
        const { scrollHeight, clientHeight } = chat_container_ref.current;
        return scrollHeight > clientHeight;
      }
      return false;
    };

    const handle_visibility = () => {
      if (check_overflow()) {
        const { scrollTop, scrollHeight, clientHeight } =
          chat_container_ref.current;
        if (scrollHeight - scrollTop <= clientHeight + 10) {
          set_is_visible(false);
        } else {
          set_is_visible(true);
        }
      } else {
        set_is_visible(false);
      }
    };

    handle_visibility();

    if (chat_container_ref.current) {
      chat_container_ref.current.addEventListener("scroll", handle_visibility);
    }

    window.addEventListener("resize", handle_visibility);

    return () => {
      if (chat_container_ref.current) {
        chat_container_ref.current.removeEventListener(
          "scroll",
          handle_visibility
        );
      }
      window.removeEventListener("resize", handle_visibility);
    };
  }, [chats]);

  const handle_scroll_to_bottom = () => {
    if (chat_container_ref.current) {
      chat_container_ref.current.scrollTop =
        chat_container_ref.current.scrollHeight;
    }
  };

  const handle_submit = (event) => {
    event.preventDefault();

    if (prompt.length > 0) {
      create_chat(prompt);
      set_prompt("");
    }
  };

  return (
    user && (
      <main className="flex">
        <Sidebar
          is_sidebar_visible={is_sidebar_visible}
          set_is_sidebar_visible={set_is_sidebar_visible}
          user={{
            id: user.sub,
            picture: user.picture || fetch_profile_image(user.nickname),
            nickname: user.name == user.email ? user.nickname : user.name,
          }}
        />

        <div className="bg-[#212121] w-full flex flex-col h-screen pb-[5rem] px-5">
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
                    model ? "rotate-180" : "rotate-0"
                  }`}
                >
                  <HiChevronDown />
                </span>
              </div>

              <div
                className={`bg-[#2f2f2f] border-[#383838] border-2 absolute p-2.5 rounded-lg flex flex-col gap-3 w-80 mt-2 max-[639px]:left-5 ${
                  model ? "visible" : "invisible"
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

          <div className="flex flex-col items-center py-3 h-full justify-between">
            <div
              ref={chat_container_ref}
              className="w-[45rem] max-h-[80%] overflow-y-auto overflow-x-hidden pr-10 relative"
            >
              <div className="flex flex-col gap-10">
                {chats.length > 0 &&
                  chats.map(({ role, content }, key) =>
                    role === "user" ? (
                      <User
                        key={key}
                        content={content}
                        picture={
                          user.picture || fetch_profile_image(user.nickname)
                        }
                      />
                    ) : (
                      <ChatGPT key={key} content={content} is_loading={false} />
                    )
                  )}

                {loading && <ChatGPT content="Loading..." is_loading={true} />}
              </div>
            </div>

            <div
              onClick={handle_scroll_to_bottom}
              className={`text-white bg-[#212121] border-[#383838] border-2 p-1.5 rounded-full cursor-pointer absolute transition-all ease-in bottom-36 shadow-[0px_0px_20px_rgba(0,0,0,0.15)] ${
                is_visible ? "visible" : "invisible"
              }`}
            >
              <FaArrowDown />
            </div>

            <div className="flex mt-5 absolute bottom-2 items-center flex-col gap-3">
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

                <button
                  type="submit"
                  disabled={prompt.length == 0}
                  className={`bg-[#676767] text-lg text-[#2f2f2f] p-1.5 rounded-full transition-colors absolute right-3 top-2.5 cursor-pointer ${
                    prompt.length > 0
                      ? "hover:bg-white hover:text-black"
                      : "cursor-not-allowed"
                  }`}
                >
                  <IoMdArrowUp />
                </button>
              </form>

              <span className="text-[0.5rem] sm:text-xs text-[#bcbcca] font-normal">
                ChatGPT can make mistakes. Consider checking important
                information.
              </span>
            </div>
          </div>
        </div>
      </main>
    )
  );
};

export default Chat;
