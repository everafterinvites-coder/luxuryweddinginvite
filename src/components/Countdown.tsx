import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface CountdownProps {
  targetDate: string;
}

export default function Countdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
    isOver: false,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      if (difference <= 0) {
        setTimeLeft({ days: "00", hours: "00", minutes: "00", seconds: "00", isOver: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({
        days: days.toString().padStart(2, "0"),
        hours: hours.toString().padStart(2, "0"),
        minutes: minutes.toString().padStart(2, "0"),
        seconds: seconds.toString().padStart(2, "0"),
        isOver: false,
      });
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const timeUnits = [
    { label: "DAYS", value: timeLeft.days },
    { label: "HOURS", value: timeLeft.hours },
    { label: "MINS", value: timeLeft.minutes },
    { label: "SECS", value: timeLeft.seconds },
  ];

  return (
    <div className="flex flex-col items-center justify-center p-4">
      {timeLeft.isOver ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <span className="font-serif-luxury text-2xl tracking-[0.2em] text-[#C5A059] uppercase animate-pulse">
            Today is the Day
          </span>
        </motion.div>
      ) : (
        <div className="flex justify-center items-center gap-1.5 sm:gap-4 select-none">
          {timeUnits.map((unit, index) => (
            <div key={unit.label} className="flex items-center">
              <div className="flex flex-col items-center">
                {/* Digit Cards */}
                <div 
                  id={`countdown-card-${unit.label.toLowerCase()}`}
                  className="relative w-14 sm:w-20 h-16 sm:h-22 rounded-md bg-white border border-[#F3EBDD] flex items-center justify-center shadow-xs overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-[#FAF6EE]/20 to-transparent pointer-events-none" />
                  
                  {/* Elegant Thin Gold Border line at Center */}
                  <div className="absolute w-full h-[1px] bg-[#FAF6EE] top-1/2 left-0 z-10" />

                  <AnimatePresence mode="popLayout">
                    <motion.span
                      key={unit.value}
                      initial={{ y: 15, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -15, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="font-serif-luxury text-2xl sm:text-4xl text-[#C5A059] font-light tracking-widest z-0"
                    >
                      {unit.value}
                    </motion.span>
                  </AnimatePresence>
                </div>

                {/* Subtitle */}
                <span className="text-[9px] sm:text-[10px] tracking-[0.25em] text-[#2C261F]/60 mt-2 font-medium">
                  {unit.label}
                </span>
              </div>

              {index < timeUnits.length - 1 && (
                <div className="font-serif-luxury text-lg sm:text-2xl text-[#C5A059]/40 px-0.5 sm:px-1 self-start pt-4">
                  :
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
