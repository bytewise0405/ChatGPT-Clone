// App's Internal Imports
import "../../public/styles/index.css";
import { meta_data } from "@/constants";

// App's External Imports
import { Poppins } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
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
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, user-scalable=no"
        />
      </head>
      <body className={poppins.className}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
};

export default RootLayout;
