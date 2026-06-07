import { motion } from "motion/react";
import { COUPLE_INFO } from "../data/weddingData";
import { MapPin, Calendar, Compass, ArrowUpRight } from "lucide-react";

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
    <section id="event-details-section" className="bg-[#FAF6EE] py-16 px-6 sm:px-8 border-b border-[#F3EBDD]/70 relative overflow-hidden">
      <div className="max-w-2xl mx-auto text-center mb-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-script text-4xl sm:text-5xl text-[#C5A059] block mb-1">The Gathering</span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#2C261F] tracking-wide mb-3">When & Where</h2>
          <div className="w-12 h-[1px] bg-[#C5A059] mx-auto" />
        </motion.div>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        {/* Core details Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-white rounded-2xl overflow-hidden border border-[#F3EBDD] shadow-xs flex flex-col"
        >
          {/* Detail Photo Integration */}
          <div className="h-48 w-full overflow-hidden relative">
            <img 
              src={detailPhotoUrl} 
              alt="Villa Dinner Reception Setting" 
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-4">
              <span className="font-serif-luxury text-white text-lg tracking-widest uppercase">
                {COUPLE_INFO.venueName}
              </span>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Location block */}
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-[#FAF6EE] flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-[#C5A059]" />
              </div>
              <div className="space-y-1">
                <h3 className="font-sans font-semibold text-[#2C261F] text-sm">Wedding Venue</h3>
                <p className="text-xs text-[#2C261F]/80 leading-relaxed font-light">
                  {COUPLE_INFO.fullAddress}
                </p>
                <p className="text-[11px] text-[#5F6F5E] font-medium italic">
                  Cernobbio, Lago di Como
                </p>
              </div>
            </div>

            {/* Date block */}
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-[#FAF6EE] flex items-center justify-center shrink-0">
                <Calendar className="w-5 h-5 text-[#C5A059]" />
              </div>
              <div className="space-y-1">
                <h3 className="font-sans font-semibold text-[#2C261F] text-sm">Date & Time</h3>
                <p className="text-xs text-[#2C261F]/80 leading-relaxed font-light">
                  Saturday, June 26, 2027
                </p>
                <p className="text-xs text-[#2C261F]/60 font-light">
                  Welcome drink starts at 4:00 PM CET
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-[#F3EBDD]/50">
              <a
                href={COUPLE_INFO.mapsUrl}
                target="_blank"
                rel="noreferrer"
                id="btn-open-maps"
                className="flex items-center justify-center gap-1.5 py-2.5 rounded-lg border border-[#F3EBDD] bg-white text-xs hover:bg-[#FAF6EE] text-[#2C261F]/80 font-medium transition-colors"
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
                className="flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-[#C5A059] text-xs hover:bg-[#AF853E] text-white font-medium transition-colors cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Add to Calendar</span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Dress code card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="bg-white rounded-2xl p-6 border border-[#F3EBDD] shadow-xs space-y-4"
        >
          <div className="text-center">
            <span className="font-script text-3xl sm:text-4xl text-[#C5A059] block mb-1">
              Dress Code
            </span>
            <h3 className="font-serif-luxury text-lg text-[#2C261F] tracking-wide mb-1">
              {COUPLE_INFO.dressCodeTitle}
            </h3>
            <p className="text-xs text-[#2C261F]/70 font-light leading-relaxed max-w-sm mx-auto">
              {COUPLE_INFO.dressCodeDesc}
            </p>
          </div>

          <div className="pt-2">
            <span className="text-[10px] tracking-widest text-[#2C261F]/50 block text-center mb-3 font-medium uppercase">
              SUGGESTED COLOR INSPIRATIONS
            </span>
            <div className="grid grid-cols-4 gap-2">
              {COUPLE_INFO.dressCodePalette.map((color) => (
                <div key={color.name} className="flex flex-col items-center gap-1.5">
                  <div className={`w-10 h-10 rounded-full ${color.class} shadow-2xs`} />
                  <span className="text-[9px] text-[#2C261F]/65 text-center leading-tight">
                    {color.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
