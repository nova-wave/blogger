"use client";
import "aos/dist/aos.css";
import "./globals.css";
import "./markdown.css";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
const inter = Inter({ subsets: ["latin"] });
import { motion } from "framer-motion";
// import NProgress from "nprogress";
// import Router from "next/router";

// Router.onRouteChangeStart = url => {
//   NProgress.start()
// }

// Router.onRouteChangeComplete = () => NProgress.done()

// Router.onRouteChangeError = () => NProgress.done();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <motion.div
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 300, opacity: 0 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
      >
        <body className={`bg-[#000000] ${inter.className} main-bg-full`}>
          {children}
          <Analytics />
        </body>
      </motion.div>
    </html>
  );
}
