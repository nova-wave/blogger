"use client"
import React, { useRef } from "react";
import { motion } from "framer-motion";

type docTypes = {
  title: string,
  desc: string,
  id: number,
  icon: string
}

export default function Doc({ doc }: { doc: docTypes }) {
  const ref = useRef(null);
  React.useEffect(() => {
    import("@lottiefiles/lottie-player");
  });

  return (
    <motion.div transition={{ duration: 1, ease: [0, 0.71, 1, 1.5] }} whileHover={{ scale: 1.1 }} className="bg-slate-950    p-6 border-2 border-slate-600 rounded-md hover:">
      <div className="text-center">
        <div className="flex justify-center" >
          <lottie-player
            id="firstLottie"
            ref={ref}
            autoplay
            loop
            mode="normal"
            src={doc?.icon}
            style={{ width: "100px", height: "100px" }}
          ></lottie-player>
        </div>
        <h2 className=" text-xl sm:text-2xl lg:text-3xl text-white ">{doc?.title}</h2>
        <p className="text-white text-start my-2">{doc?.desc}</p>
        <div className="text-end px-3 md:px-6 lg:px--8">
          <button className={`text-base rounded-md px-6 py-2 bg-slate-400   ${doc?.title === "Fundamentals Doc" ? "text-indigo-800" : doc?.title === "Market Data Doc" ? "text-orange-700" : "text-fuchsia-800"}`} >Explore &#8594;</button>
        </div>
      </div>
    </motion.div>
  )
}