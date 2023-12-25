"use client";

// React's Hook Imports
import { useState } from "react";

// App's Internal Imports
import { Home, Sidebar } from "@/components";

const Root = () => {
  const [is_sidebar_visible, set_is_sidebar_visible] = useState(false);

  return (
    <main className="flex">
      <Sidebar
        is_sidebar_visible={is_sidebar_visible}
        set_is_sidebar_visible={set_is_sidebar_visible}
      />
      <Home is_sidebar_visible={is_sidebar_visible} />
    </main>
  );
};

export default Root;
