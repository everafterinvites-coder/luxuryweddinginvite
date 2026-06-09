import { motion } from "motion/react";
import { COUPLE_INFO } from "../data/weddingData";
import { MapPin, Calendar, Compass, ArrowUpRight } from "lucide-react";
import { FloralFlourish, FloralCorner, StationeryFrame } from "./FloralDecor";

interface EventDetailsProps {
  detailPhotoUrl: string;
}

export default function EventDetails({ detailPhotoUrl }: EventDetailsProps) {
  // Real functional calendar dynamic URL
  const calendarUrl = "https://calendar.google.com/calendar/render?action=TEMPLATE" +
    `&text=${encodeURIComponent("Alexandra & Dylan's Royal Wedding")}` +
    `&dates=20270626T160000Z/20270627T020000Z` +
    `&details=${encodeURIComponent("Join us in celebrating our union on the lush banks of Lake Como at Villa d'Este. Please arrive 30 mins early.")}` +
    `&location=${encodeURIComponent(COUPLE_INFO.fullAddress)}` +
    "&sf=true&output=xml";

  return (
    <section id="event-details-section" className="bg-stationery py-20 px-6 sm:px-8 border-b border-[#F3EBDD]/70 relative overflow-hidden">
      {/* Delicate floral corners */}
      <FloralCorner className="top-4 right-4" side="top-right" />
      <FloralCorner className="bottom-4 left-4" side="bottom-left" />

      <div className="max-w-2xl mx-auto text-center mb-14 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-2"
        >
          <span className="font-script text-4xl sm:text-5xl text-[#C5A059] block mb-1">The Gathering</span>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl text-letterpress font-medium tracking-wide mb-3">When & Where</h2>
          <FloralFlourish className="my-5" />
        </motion.div>
      </div>

      {/* Layered, overlapping asymmetrical editorial layout instead of simple symmetrical grids */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch relative z-10 pb-6">
        
        {/* Left Column: Venue Details Card (Wider: occupies 7/12 grid with offset on desktop) */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="md:col-span-7 bg-[#FCFAF6] rounded-2xl overflow-hidden border border-[#F3EBDD] shadow-3xs hover:shadow-2xs transition-all duration-300 border-double-inset flex flex-col justify-between"
        >
          {/* Detail Photo Integration with an elegant inside shadow frame */}
          <div className="h-56 w-full overflow-hidden relative border-b border-[#F3EBDD]">
            <img 
              src={detailPhotoUrl} 
              alt="Villa Dinner Reception Setting" 
              className="w-full h-full object-cover transition-transform duration-1000 ease-out hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-end p-6">
              <span className="font-serif-luxury text-white text-xl sm:text-2xl tracking-widest uppercase font-medium drop-shadow-sm">
                {COUPLE_INFO.venueName}
              </span>
            </div>
            {/* Elegant double gold fine ribbon lines */}
            <div className="absolute top-3 left-3 right-3 bottom-3 border border-white/20 pointer-events-none rounded-lg" />
          </div>

          <div className="p-7 space-y-6 relative">
            {/* Location block */}
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-[#FAF6EE] border border-[#C5A059]/20 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-[#C5A059]" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif-luxury font-bold text-[#2C261F] text-base">Wedding Venue</h3>
                <p className="text-sm text-[#2C261F]/80 leading-relaxed font-light">
                  {COUPLE_INFO.fullAddress}
                </p>
                <p className="text-xs text-[#5F6F5E] font-medium italic mt-0.5">
                  Cernobbio, Lago di Como, Italy
                </p>
              </div>
            </div>

            {/* Date block */}
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-[#FAF6EE] border border-[#C5A059]/20 flex items-center justify-center shrink-0">
                <Calendar className="w-5 h-5 text-[#C5A059]" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif-luxury font-bold text-[#2C261F] text-base">Date & Time</h3>
                <p className="text-sm text-[#2C261F]/80 leading-relaxed font-light">
                  Saturday, June 26, 2027
                </p>
                <p className="text-xs text-[#2C261F]/60 font-medium">
                  Welcome drinks served at 4:00 PM CET
                </p>
              </div>
            </div>

            {/* Quick Actions (Gold-embossed & stationery white) */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#F3EBDD]/60">
              <a
                href={COUPLE_INFO.mapsUrl}
                target="_blank"
                rel="noreferrer"
                id="btn-open-maps"
                className="flex items-center justify-center gap-1.5 py-3 rounded-xl border border-[#C5A059]/30 bg-white text-xs hover:bg-[#FAF6EE] text-[#2C261F] font-semibold tracking-wider uppercase transition-colors"
              >
                <Compass className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Open in Maps</span>
                <ArrowUpRight className="w-3 h-3 text-gray-400" />
              </a>

              <a
                href={calendarUrl}
                target="_blank"
                rel="noreferrer"
                id="btn-add-calendar"
                className="flex items-center justify-center gap-1.5 py-3 rounded-xl bg-gradient-to-r from-[#C5A059] to-[#AF853E] hover:from-[#AF853E] hover:to-[#C5A059] text-xs text-white font-semibold tracking-wider uppercase transition-all shadow-3xs cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Add to Calendar</span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Dress Code Card card (Occupies 5/12, custom overlapping offset on desktop) */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="md:col-span-5 md:mt-10 bg-white rounded-2xl border border-[#F3EBDD] shadow-3xs hover:shadow-2xs transition-all duration-300 relative overflow-hidden"
        >
          {/* Decorative subtle botanical line overlay */}
          <div className="absolute top-0 right-0 w-32 h-32 opacity-10 pointer-events-none">
            <svg viewBox="0 0 100 100" fill="currentColor" className="text-[#C5A059]">
              <path d="M10 10 C10 40, 40 10, 90 10" />
              <path d="M10 10 C40 10, 10 40, 10 90" />
            </svg>
          </div>

          <StationeryFrame className="h-full flex flex-col justify-between">
            <div className="text-center py-4">
              <span className="font-script text-3xl sm:text-4xl text-[#C5A059] block mb-1">
                Dress Code
              </span>
              <h3 className="font-serif-luxury text-xl text-letterpress font-bold tracking-wide mb-3">
                {COUPLE_INFO.dressCodeTitle}
              </h3>
              <p className="text-xs sm:text-sm text-[#2C261F]/80 font-light leading-relaxed max-w-sm mx-auto px-1">
                {COUPLE_INFO.dressCodeDesc}
              </p>
            </div>

            <div className="pt-6 border-t border-[#F3EBDD]/50 bg-[#FCFAF6]/80 p-4 rounded-xl relative">
              <span className="text-[10px] tracking-[0.2em] text-[#C5A059] font-bold block text-center mb-4 uppercase">
                SUGGESTED COLOR PALETTE
              </span>
              <div className="grid grid-cols-4 gap-3">
                {COUPLE_INFO.dressCodePalette.map((color) => (
                  <div key={color.name} className="flex flex-col items-center gap-2">
                    <div className={`w-11 h-11 rounded-full ${color.class} shadow-xs border-2 border-white transform transition-transform duration-300 hover:scale-110`} />
                    <span className="text-[9px] text-[#2C261F]/70 text-center font-medium leading-tight">
                      {color.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </StationeryFrame>
        </motion.div>
      </div>
    </section>
  );
}
