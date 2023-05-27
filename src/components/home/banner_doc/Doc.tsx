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
    <motion.div transition={{ duration: 1, ease: [0, 0.71, 1, 1.5] }}   whileHover={{ scale: 1.1 }} className="bg-slate-950    p-4 border-2 border-slate-600 rounded-md hover:">
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
        <h2 className=" text-3xl text-white">{doc?.title}</h2>
        <p className="text-white">{doc?.desc}</p>
      </div>
    </motion.div>
  )
}