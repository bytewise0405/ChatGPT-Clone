"use client";

// React's Hook Imports
import { useRef, useState, useEffect } from "react";

// App's External Imports
import Image from "next/image";
import { Tooltip } from "react-tooltip";
import { FaRegCopy } from "react-icons/fa";
import Typewriter from "typewriter-effect";
import "react-tooltip/dist/react-tooltip.css";

const ChatGPT = ({ content, is_loading }) => {
  const typewriter_ref = useRef(null);
  const [tooltip_text, set_tooltip_text] = useState("Copy");

  const handle_copy = () => {
    navigator.clipboard.writeText(content).then(() => {
      set_tooltip_text("Copied!");
      setTimeout(() => set_tooltip_text("Copy"), 2000);
    });
  };

  const handle_typing_complete = () => {
    if (typewriter_ref.current) {
      const cursor_element = typewriter_ref.current.querySelector(
        ".Typewriter__cursor"
      );

      if (cursor_element) {
        cursor_element.style.display = "none";
      }
    }
  };

  useEffect(() => {
    if (!is_loading && typewriter_ref.current) {
      const observer = new MutationObserver(() => {
        handle_typing_complete();
      });

      observer.observe(typewriter_ref.current, {
        childList: true,
        subtree: true,
      });

      return () => observer.disconnect();
    }
  }, [content, is_loading]);

  return (
    <div className="flex gap-3 items-start">
      <div className="relative w-7 h-7 rounded-full overflow-hidden flex-shrink-0">
        <Image
          width={28}
          height={28}
          alt="User Profile"
          unoptimized={true}
          src="/images/logo_green.png"
          className="rounded-full"
        />
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-white font-semibold select-none text-sm">
          ChatGPT
        </span>

        <div
          ref={typewriter_ref}
          className="text-[#ececf1] text-sm tracking-wider leading-8 chat_content"
        >
          {is_loading ? (
            content
          ) : (
            <Typewriter
              options={{
                delay: 10,
                cursor: "_",
              }}
              onInit={(typewriter) => {
                typewriter
                  .typeString(content)
                  .callFunction(handle_typing_complete)
                  .start();
              }}
            />
          )}
        </div>

        {!is_loading && (
          <span
            aria-label="Copy"
            onClick={handle_copy}
            data-tooltip-id="copy-tooltip"
            data-tooltip-content={tooltip_text}
            className="cursor-pointer hover:text-gray-200 mt-1 h-[2rem] text-base text-gray-400"
          >
            <FaRegCopy />

            <Tooltip
              id="copy-tooltip"
              place="top-start"
              effect="solid"
              className="!bg-black !text-white"
            />
          </span>
        )}
      </div>
    </div>
  );
};

export default ChatGPT;
