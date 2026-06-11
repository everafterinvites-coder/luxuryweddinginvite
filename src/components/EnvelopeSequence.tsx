// @ts-ignore
import envelope from "../assets/images/closed envelope.png";

import { motion } from "motion/react";
import { useState } from "react";
import { FloralCorner } from "./FloralDecor";

interface EnvelopeSequenceProps {
onEnter: () => void;
customGuest?: string;
}

export default function EnvelopeSequence({
  onEnter,
}: EnvelopeSequenceProps) {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpenSequence = () => {
    if (isOpening) return;

    setIsOpening(true);

    setTimeout(() => {
      onEnter();
    }, 1200);
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{
        opacity: isOpening ? 0 : 1,
      }}
      transition={{
        duration: 1,
        ease: "easeInOut",
      }}
      className="fixed inset-0 z-[9999] bg-[#FAF6EE] flex items-center justify-center overflow-hidden"
    >
      {/* Corners */}
      <FloralCorner
        className="top-4 left-4 opacity-20"
        side="top-left"
      />
      <FloralCorner
        className="top-4 right-4 opacity-20"
        side="top-right"
      />
      <FloralCorner
        className="bottom-4 left-4 opacity-20"
        side="bottom-left"
      />
      <FloralCorner
        className="bottom-4 right-4 opacity-20"
        side="bottom-right"
      />

      {/* Center Container */}
      <div className="relative w-full h-full flex flex-col items-center justify-center">

        {/* Names */}
        <motion.div
          animate={{
            opacity: isOpening ? 0 : 1,
            y: isOpening ? -20 : 0,
          }}
          transition={{
            duration: 0.6,
          }}
          className="absolute top-8 left-1/2 -translate-x-1/2 text-center z-20"
        >
          <h1 className="font-script text-5xl text-[#C5A059] leading-none">
            Alexandra
            <span className="block my-1">&</span>
            Dylan
          </h1>

          <p className="mt-4 text-[11px] tracking-[0.35em] uppercase text-[#2C261F]/55">
            Lake Como, Italy • September 18, 2026
          </p>
        </motion.div>

        {/* Envelope */}
        <motion.img
          src={envelope}
          alt="Wedding Invitation Envelope"
          onClick={handleOpenSequence}
          draggable={false}
          animate={{
            scale: isOpening ? 1.18 : 1,
            opacity: isOpening ? 0 : 1,
            y: isOpening ? -25 : 0,
          }}
          transition={{
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            cursor-pointer
            select-none
            w-[95vw]
            max-w-[650px]
            h-auto
            z-10
            drop-shadow-[0_25px_50px_rgba(0,0,0,0.18)]
          "
        />

        {/* Footer */}
        <motion.div
          animate={{
            opacity: isOpening ? 0 : 1,
          }}
          transition={{
            duration: 0.4,
          }}
          className="absolute bottom-10 text-center"
        >
          <p className="text-[11px] tracking-[0.35em] uppercase text-[#2C261F]/50">
            Tap Envelope To Open
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
