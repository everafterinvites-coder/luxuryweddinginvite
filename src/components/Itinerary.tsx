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
    <section id="itinerary-section" className="bg-[#FAF6EE] py-16 px-6 sm:px-8 relative border-b border-[#F3EBDD]/70 overflow-hidden">
      {/* Soft warm gradients for romantic look */}
      <div className="absolute right-[-20%] bottom-[-10%] w-96 h-96 rounded-full bg-[#FAF6EE]/50 blur-3xl pointer-events-none border border-[#F3EBDD]/30" />
      <div className="absolute left-[-20%] top-[-10%] w-96 h-96 rounded-full bg-[#EBF0EA]/50 blur-3xl pointer-events-none" />

      <div className="max-w-2xl mx-auto text-center mb-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-script text-4xl sm:text-5xl text-[#C5A059] block mb-1">Day Program</span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#2C261F] tracking-wide mb-3">Our Wedding Itinerary</h2>
          <div className="w-12 h-[1px] bg-[#C5A059] mx-auto mb-4" />
          <p className="text-sm text-[#2C261F]/60 max-w-sm mx-auto font-light">
            We can’t wait to celebrate every precious second of this magical day beside you. Here is what we have lovingly prepared.
          </p>
        </motion.div>
      </div>

      <div className="max-w-2xl mx-auto space-y-8 relative">
        {/* Fine background vertical connection line path */}
        <div className="absolute left-[20px] top-4 bottom-4 w-[1px] bg-[#C5A059]/25" />

        {PROGRAM_TIMELINE.map((item, index) => {
          return (
            <motion.div
              key={item.id}
              id={`itinerary-item-${index}`}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="flex items-start gap-5 relative pl-2 group"
            >
              {/* Left Column: Hand-made premium hour-dot indicator */}
              <div className="flex flex-col items-center shrink-0 relative z-10">
                <div className="w-9 h-9 rounded-full bg-white border border-[#C5A059]/60 flex items-center justify-center transition-all duration-300 shadow-3xs group-hover:border-[#C5A059] group-hover:bg-[#FCFAF6]">
                  <span className="font-serif-luxury text-[10px] font-medium text-[#C5A059]">
                    0{index + 1}
                  </span>
                </div>
              </div>

              {/* Right Column: Timeline Content details */}
              <div className="flex-1 pt-1.5 pb-2">
                <div className="flex items-baseline justify-between gap-2 border-b border-[#F3EBDD]/50 pb-1.5">
                  <h4 className="font-serif-luxury text-base font-medium text-[#2C261F] group-hover:text-[#C5A059] transition-colors duration-300">
                    {item.title}
                  </h4>
                  <span className="text-[10px] tracking-widest font-mono text-[#C5A059] uppercase font-light">
                    {item.time}
                  </span>
                </div>
                <p className="text-xs text-[#2C261F]/70 leading-relaxed font-light mt-1.5">
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
