// App's Internal Imports
import "../../public/styles/index.css";
import { meta_data } from "@/constants";

// App's External Imports
import { Poppins } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { Analytics } from "@vercel/analytics/react";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata = meta_data;

const poppins = Poppins({
  display: "swap",
  style: ["normal"],
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const RootLayout = ({ children }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, user-scalable=no"
        />
      </head>

      <UserProvider>
        <body className={poppins.className}>
          <NextTopLoader color="#FFC107" />
          {children}
          <Analytics />
          <SpeedInsights />
        </body>
      </UserProvider>
    </html>
  );
};

export default RootLayout;
