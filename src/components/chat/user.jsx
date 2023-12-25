// Next.Js Component Imports
import Image from "next/image";

// App's External Imports
import { SlPencil } from "react-icons/sl";

const User = ({ content }) => {
  return (
    <div className="flex gap-3">
      <Image
        width={0}
        height={0}
        alt="User Profile"
        unoptimized={true}
        src="/images/user_profile.png"
        className="w-7 h-7 rounded-full"
      />

      <div className="flex flex-col gap-1">
        <span className="text-white font-semibold select-none text-sm">
          You
        </span>
        <span className="text-[#ececf1] text-sm tracking-wider leading-8">
          {content}
        </span>
        <span className="text-gray-400 text-base cursor-pointer hover:text-gray-200 w-5">
          <SlPencil />
        </span>
      </div>
    </div>
  );
};

export default User;
