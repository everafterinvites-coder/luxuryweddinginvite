import React from "react";

interface DecorProps {
  className?: string;
  color?: string;
}

// Beautiful vector laurel branches/leaves flowing outwards from the center
export function FloralFlourish({ className = "", color = "text-[#C5A059]" }: DecorProps) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#C5A059]" />
      <svg
        className={`w-10 h-10 ${color} opacity-80`}
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Intricate center botanical rosette with curving leaves */}
        <path d="M50 20 C50 35, 45 45, 30 50 C45 55, 50 65, 50 80 C50 65, 55 55, 70 50 C55 45, 50 35, 50 20 Z" />
        <path d="M50 35 C42 45, 42 55, 50 65" />
        <path d="M50 35 C58 45, 58 55, 50 65" />
        {/* Small decorative seeds/dots */}
        <circle cx="50" cy="50" r="2" fill="currentColor" />
        <circle cx="34" cy="50" r="1.5" fill="currentColor" />
        <circle cx="66" cy="50" r="1.5" fill="currentColor" />
        <circle cx="50" cy="30" r="1.5" fill="currentColor" />
        <circle cx="50" cy="70" r="1.5" fill="currentColor" />
      </svg>
      <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#C5A059]" />
    </div>
  );
}

// Gorgeous detailed center divider representing high-end physical stationery
export function OrnamentalDivider({ className = "", color = "stroke-[#C5A059]" }: DecorProps) {
  return (
    <div className={`relative flex items-center justify-center w-full py-6 select-none ${className}`}>
      <div className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C5A059]/40 to-transparent" />
      <div className="relative bg-[#FAF6EE] px-4">
        <svg
          className="w-20 h-6"
          viewBox="0 0 160 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Symmetrical fine filigree line art with a central diamond core */}
          <path
            d="M10 15 H55 C65 15, 70 8, 80 15 C90 8, 95 15, 105 15 H150"
            className={color}
            strokeWidth="1"
          />
          <path
            d="M60 15 C65 10, 75 10, 80 15 C85 10, 95 10, 100 15"
            className={color}
            strokeWidth="0.75"
            strokeDasharray="2 1"
          />
          <path
            d="M60 15 C65 20, 75 20, 80 15 C85 20, 95 20, 100 15"
            className={color}
            strokeWidth="0.75"
            strokeDasharray="2 1"
          />
          {/* Central diamond */}
          <rect
            x="76"
            y="11"
            width="8"
            height="8"
            transform="rotate(45 80 15)"
            fill="#FAF6EE"
            className={color}
            strokeWidth="1.2"
          />
          <circle cx="80" cy="15" r="1.5" fill="#C5A059" />
          <circle cx="68" cy="15" r="1.5" fill="#C5A059" />
          <circle cx="92" cy="15" r="1.5" fill="#C5A059" />
        </svg>
      </div>
    </div>
  );
}

// Botanical Leaf overlay corner corner decorations
export function FloralCorner({ className = "", side = "top-left" }: { className?: string; side?: "top-left" | "top-right" | "bottom-left" | "bottom-right" }) {
  const getRotation = () => {
    switch (side) {
      case "top-right":
        return "rotate-90";
      case "bottom-left":
        return "-rotate-90";
      case "bottom-right":
        return "rotate-180";
      default:
        return "";
    }
  };

  return (
    <div className={`absolute w-16 h-16 pointer-events-none opacity-45 text-[#C5A059]/40 ${getRotation()} ${className}`}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-full h-full"
      >
        {/* Curving branch with beautifully drawn botanical leaflets */}
        <path d="M10 10 C10 40, 40 10, 90 10" />
        <path d="M10 10 C40 10, 10 40, 10 90" />
        {/* Leaflets */}
        <path d="M30 10 C32 5, 38 5, 40 10 C38 15, 32 15, 30 10 Z" fill="currentColor" className="opacity-20" />
        <path d="M10 30 C5 32, 5 38, 10 40 C15 38, 15 32, 10 30 Z" fill="currentColor" className="opacity-20" />
        
        <path d="M50 10 C52 4, 60 4, 62 10 C60 16, 52 16, 50 10 Z" fill="currentColor" className="opacity-20" />
        <path d="M10 50 C4 52, 4 60, 10 62 C16 60, 16 52, 10 50 Z" fill="currentColor" className="opacity-20" />
        
        <path d="M70 10 C72 3, 80 3, 82 10 C80 17, 72 17, 70 10 Z" fill="currentColor" className="opacity-20" />
        <path d="M10 70 C3 72, 3 80, 10 82 C17 80, 17 72, 10 70 Z" fill="currentColor" className="opacity-20" />

        {/* Delicate tiny scrolling vines */}
        <path d="M25 25 C20 40, 40 20, 50 25" />
        <circle cx="10" cy="10" r="3" className="fill-[#C5A059]/50" stroke="none" />
      </svg>
    </div>
  );
}

// Elegant stationary double inset border with tiny corner highlights
export function StationeryFrame({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative p-5 sm:p-7 ${className}`}>
      {/* Outer border */}
      <div className="absolute inset-2 border border-[#C5A059]/15 rounded-xl pointer-events-none" />
      {/* Inner fine border */}
      <div className="absolute inset-3 border border-[#C5A059]/35 rounded-lg pointer-events-none" />
      {/* Corner corner anchors */}
      <div className="absolute top-3.5 left-3.5 w-1.5 h-1.5 border-t border-l border-[#C5A059]" />
      <div className="absolute top-3.5 right-3.5 w-1.5 h-1.5 border-t border-r border-[#C5A059]" />
      <div className="absolute bottom-3.5 left-3.5 w-1.5 h-1.5 border-b border-l border-[#C5A059]" />
      <div className="absolute bottom-3.5 right-3.5 w-1.5 h-1.5 border-b border-r border-[#C5A059]" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
