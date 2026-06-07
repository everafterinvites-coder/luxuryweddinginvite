import { motion } from "motion/react";
import { STORY_TIMELINE, COUPLE_INFO } from "../data/weddingData";
import { Heart } from "lucide-react";

export default function OurStory() {
  return (
    <section id="our-story-section" className="bg-[#FAF6EE] py-16 px-6 sm:px-8 relative overflow-hidden border-b border-[#F3EBDD]/70">
      {/* Decorative floral watermark background hint */}
      <div className="absolute right-[-10%] top-10 w-96 h-96 rounded-full bg-[#EBF0EA]/40 blur-3xl pointer-events-none" />
      <div className="absolute left-[-10%] bottom-10 w-96 h-96 rounded-full bg-[#F3EBDD]/40 blur-3xl pointer-events-none" />

      <div className="max-w-2xl mx-auto text-center mb-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-script text-4xl sm:text-5xl text-[#C5A059] block mb-1">Our Journey</span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#2C261F] tracking-wide mb-4">Our Love Story</h2>
          <div className="w-12 h-[1px] bg-[#C5A059] mx-auto mb-6" />
          <p className="font-serif-luxury italic text-base text-[#2C261F]/80 leading-relaxed max-w-lg mx-auto">
            "{COUPLE_INFO.quote}"
          </p>
        </motion.div>
      </div>

      <div className="max-w-xl mx-auto relative z-10">
        {/* Dynamic Timeline Vertical Line */}
        <div className="absolute left-4 sm:left-1/2 top-2 bottom-2 w-[1px] bg-[#C5A059]/30 transform -translate-x-[0.5px]" />

        <div className="space-y-12 relative">
          {STORY_TIMELINE.map((event, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={event.id}
                id={`timeline-item-${event.year}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: index * 0.1, ease: "easeOut" }}
                className={`flex flex-col sm:flex-row relative items-start ${
                  isEven ? "sm:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline Node Hub (Sophisticated Pearl/Gold Pin) */}
                <div className="absolute left-4 sm:left-1/2 transform -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-white border border-[#C5A059] flex items-center justify-center z-10 shadow-2xs">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
                </div>

                {/* Left/Right Container */}
                <div className="w-full sm:w-1/2 pl-12 pr-4 sm:px-8 text-left sm:text-right">
                  <div className={`flex flex-col ${isEven ? "sm:items-start" : "sm:items-end"}`}>
                    <span className="font-serif-luxury text-2xl font-light text-[#C5A059] tracking-wide mb-1 block">
                      {event.year}
                    </span>
                    <h3 className="font-sans font-semibold text-[#2C261F] text-base tracking-wide mb-2">
                      {event.title}
                    </h3>
                  </div>
                </div>

                {/* Empty Spacer for Desktop Grid alignment */}
                <div className="w-full sm:w-1/2 pl-12 sm:pl-8 pr-4 text-left">
                  <p className="text-sm text-[#2C261F]/70 leading-relaxed font-light mt-1 sm:mt-8">
                    {event.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
