import { motion } from "motion/react";
import { PROGRAM_TIMELINE } from "../data/weddingData";
import { 
  Heart, 
  Sparkles, 
  CupSoda, 
  Utensils, 
  Music, 
  Smile,
  Clock
} from "lucide-react";
import { FloralFlourish, FloralCorner } from "./FloralDecor";

const iconMap = {
  Heart,
  Sparkles,
  CupSoda,
  Utensils,
  Music,
  Smile,
};

export default function Itinerary() {
  return (
    <section id="itinerary-section" className="bg-stationery py-20 px-6 sm:px-8 relative border-b border-[#F3EBDD]/70 overflow-hidden">
      {/* Soft warm gradients for romantic look */}
      <div className="absolute right-[-20%] bottom-[-10%] w-96 h-96 rounded-full bg-[#FAF6EE]/50 blur-3xl pointer-events-none border border-[#F3EBDD]/30" />
      <div className="absolute left-[-20%] top-[-10%] w-96 h-96 rounded-full bg-[#EBF0EA]/50 blur-3xl pointer-events-none" />

      {/* Elegant stationary corner ornaments */}
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
          <span className="font-script text-4xl sm:text-5xl text-[#C5A059] block mb-1">Day Program</span>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl text-letterpress font-medium tracking-wide mb-3">Our Wedding Itinerary</h2>
          <FloralFlourish className="my-5" />
          <p className="text-sm text-[#2C261F]/80 max-w-sm mx-auto font-light leading-relaxed">
            We can’t wait to celebrate every precious second of this magical day beside you. Here is what we have lovingly prepared.
          </p>
        </motion.div>
      </div>

      <div className="max-w-2xl mx-auto space-y-10 relative z-10">
        {/* Fine background vertical connection line path with diamond endpoints */}
        <div className="absolute left-[20px] sm:left-[28px] top-4 bottom-4 w-[1px] bg-gradient-to-b from-[#C5A059]/10 via-[#C5A059]/40 to-[#C5A059]/10" />

        {PROGRAM_TIMELINE.map((item, index) => {
          return (
            <motion.div
              key={item.id}
              id={`itinerary-item-${index}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              className="flex items-start gap-6 relative pl-1 group"
            >
              {/* Left Column: Hand-made premium hour-dot indicator */}
              <div className="flex flex-col items-center shrink-0 relative z-10 pt-1">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white border border-[#C5A059]/60 flex items-center justify-center transition-all duration-300 shadow-3xs group-hover:border-[#C5A059] group-hover:scale-105 group-hover:bg-[#FCFAF6]">
                  <span className="font-serif-luxury text-[11px] font-bold text-[#C5A059] tracking-wider">
                    0{index + 1}
                  </span>
                </div>
              </div>

              {/* Right Column: Timeline Content details styled as stationary notes */}
              <div className="flex-1 bg-white/60 hover:bg-[#FCFAF6] border border-[#F3EBDD]/40 hover:border-[#C5A059]/30 rounded-2xl p-5 sm:p-6 transition-all duration-300 shadow-3xs hover:shadow-2xs">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 border-b border-[#F3EBDD]/40 pb-2 mb-2 group-hover:border-[#C5A059]/30 transition-colors">
                  <h4 className="font-serif-luxury text-base sm:text-lg font-bold text-[#2C261F] group-hover:text-gold-leaf transition-all duration-300 uppercase tracking-wide">
                    {item.title}
                  </h4>
                  <span className="text-[10px] sm:text-xs tracking-widest font-mono text-[#C5A059] uppercase font-bold">
                    {item.time}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#2C261F]/80 leading-relaxed font-light">
                  {item.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
