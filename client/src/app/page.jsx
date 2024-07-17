"use client";

// React's Hook Imports
import { useState } from "react";

// App's Internal Imports
import { Home, Sidebar } from "@/components";

// App's External Imports
import { useRouter } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0/client";

const Root = () => {
  const router = useRouter();
  const { user, isLoading } = useUser();
  const [is_sidebar_visible, set_is_sidebar_visible] = useState(true);

  const fetch_profile_image = (username) => {
    const identifier = username.slice(0, 1);
    return `https://cdn.auth0.com/avatars/${identifier}.png`;
  };

  if (isLoading) {
    return (
      <div className="flex bg-[#212121] w-full h-screen justify-center items-center">
        <div className="loader" />
      </div>
    );
  } else if (!user) {
    router.push("/api/auth/login");
  }

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

        <Home is_sidebar_visible={is_sidebar_visible} />
      </main>
    )
  );
};

export default Root;
