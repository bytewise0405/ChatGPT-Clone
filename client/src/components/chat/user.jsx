// App's External Imports
import Image from "next/image";

const User = ({ content, picture }) => {
  return (
    <div className="flex gap-3">
      <Image
        width={0}
        height={0}
        src={picture}
        alt="User Profile"
        unoptimized={true}
        className="w-7 h-7 rounded-full"
      />

      <div className="flex flex-col gap-1">
        <span className="text-white font-semibold select-none text-sm">
          You
        </span>

        <span className="text-[#ececf1] text-sm tracking-wider leading-8">
          {content}
        </span>
      </div>
    </div>
  );
};

export default User;
