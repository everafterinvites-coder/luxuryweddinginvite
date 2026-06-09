import { motion } from "motion/react";
import { STORY_TIMELINE, COUPLE_INFO } from "../data/weddingData";
import { Heart } from "lucide-react";
import { FloralFlourish, FloralCorner } from "./FloralDecor";

export default function OurStory() {
  return (
    <section id="our-story-section" className="bg-stationery py-20 px-6 sm:px-8 relative overflow-hidden border-b border-[#F3EBDD]/70">
      {/* Decorative floral watermark background hint */}
      <div className="absolute right-[-10%] top-10 w-96 h-96 rounded-full bg-[#EBF0EA]/30 blur-3xl pointer-events-none" />
      <div className="absolute left-[-10%] bottom-10 w-96 h-96 rounded-full bg-[#F3EBDD]/30 blur-3xl pointer-events-none" />

      {/* Exquisite Corner flourishes inside the section boundary */}
      <FloralCorner className="top-4 left-4" side="top-left" />
      <FloralCorner className="bottom-4 right-4" side="bottom-right" />

      <div className="max-w-2xl mx-auto text-center mb-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-2"
        >
          <span className="font-script text-4xl sm:text-5xl text-[#C5A059] block mb-1">Our Journey</span>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl text-letterpress font-medium tracking-wide mb-4">Our Love Story</h2>
          
          <FloralFlourish className="my-6" />
          
          <p className="font-serif-luxury italic text-lg sm:text-xl text-[#2C261F]/90 leading-relaxed max-w-lg mx-auto bg-white/40 backdrop-blur-xs py-3 px-4 rounded-xl border border-[#F3EBDD]/35">
            "{COUPLE_INFO.quote}"
          </p>
        </motion.div>
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Dynamic Timeline Vertical Line capped with delicate diamonds */}
        <div className="absolute left-4 sm:left-1/2 top-4 bottom-4 w-[1px] bg-gradient-to-b from-[#C5A059]/60 via-[#C5A059]/25 to-[#C5A059]/60 transform -translate-x-[0.5px]">
          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 rotate-45 border border-[#C5A059] bg-[#FAF6EE]" />
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 rotate-45 border border-[#C5A059] bg-[#FAF6EE]" />
        </div>

        <div className="space-y-16 relative">
          {STORY_TIMELINE.map((event, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={event.id}
                id={`timeline-item-${event.year}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
                className={`flex flex-col sm:flex-row relative items-stretch ${
                  isEven ? "sm:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline Node Hub (Sophisticated Pearl Ring) */}
                <div className="absolute left-4 sm:left-1/2 transform -translate-x-1/2 top-8 w-5 h-5 rounded-full bg-white border-2 border-[#C5A059] flex items-center justify-center z-20 shadow-xs">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-tr from-[#AF853E] to-[#E2CA7F]" />
                </div>

                {/* Left/Right Label (Year and Title card) */}
                <div className="w-full sm:w-1/2 pl-12 pr-4 sm:px-10 text-left sm:text-right flex flex-col justify-center">
                  <motion.div 
                    whileHover={{ scale: 1.01 }}
                    className={`flex flex-col ${isEven ? "sm:items-start text-left" : "sm:items-end text-right"}`}
                  >
                    <span className="font-serif-luxury text-3xl sm:text-4xl font-semibold text-gold-leaf tracking-wide mb-1 block">
                      {event.year}
                    </span>
                    <h3 className="font-serif-luxury font-bold text-[#2C261F] text-lg sm:text-xl tracking-wide mb-2 uppercase">
                      {event.title}
                    </h3>
                  </motion.div>
                </div>

                {/* Content card (Tactile luxury paper block with subtle inset shadow) */}
                <div className="w-full sm:w-1/2 pl-12 sm:pl-10 pr-4 text-left flex items-center">
                  <div className="bg-[#FCFAF6] border border-[#F3EBDD] border-double-inset rounded-2xl p-6 shadow-3xs hover:shadow-2xs transition-all duration-300 relative group w-full">
                    {/* Tiny floral corner accent */}
                    <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-[#C5A059]/30" />
                    <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-[#C5A059]/30" />
                    
                    <p className="text-sm font-sans text-[#2C261F]/80 leading-relaxed font-light relative z-10">
                      {event.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
