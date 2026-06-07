import { useState, MouseEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { GALLERY_PHOTOS } from "../data/weddingData";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";

interface PhotoGalleryProps {
  weddingHero: string;
  weddingCouple: string;
  weddingDetail: string;
}

export default function PhotoGallery({ weddingHero, weddingCouple, weddingDetail }: PhotoGalleryProps) {
  const photos = GALLERY_PHOTOS(weddingHero, weddingCouple, weddingDetail);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const handlePrev = (e: MouseEvent) => {
    e.stopPropagation();
    if (activeIdx === null) return;
    setActiveIdx((prev) => (prev === 0 ? photos.length - 1 : (prev as number) - 1));
  };

  const handleNext = (e: MouseEvent) => {
    e.stopPropagation();
    if (activeIdx === null) return;
    setActiveIdx((prev) => (prev === photos.length - 1 ? 0 : (prev as number) + 1));
  };

  return (
    <section id="photo-gallery-section" className="bg-[#FAF6EE] py-16 px-6 sm:px-8 border-b border-[#F3EBDD]/70 overflow-hidden">
      <div className="max-w-2xl mx-auto text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-script text-4xl sm:text-5xl text-[#C5A059] block mb-1">Our Moments</span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#2C261F] tracking-wide mb-3">Our Photo Gallery</h2>
          <div className="w-12 h-[1px] bg-[#C5A059] mx-auto mb-4" />
          <p className="text-xs text-[#2C261F]/60 max-w-sm mx-auto font-light leading-relaxed">
            A small glimpse into our quietest smiles, adventures, and the golden trail that brought us to this dream wedding.
          </p>
        </motion.div>
      </div>

      {/* Styled Grid */}
      <div className="max-w-md mx-auto grid grid-cols-2 gap-3">
        {photos.map((photo, index) => {
          // Adjust specific heights to make it look randomized and beautiful
          const isWide = photo.aspectRatio === "16:9";
          const hClass = isWide ? "col-span-2 h-44" : "h-52";

          return (
            <motion.div
              key={photo.id}
              id={`gallery-photo-card-${index}`}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              onClick={() => setActiveIdx(index)}
              className={`group relative overflow-hidden rounded-xl border border-[#F3EBDD]/80 bg-white cursor-pointer shadow-3xs ${hClass}`}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              
              {/* Blur Hover Vignette screen */}
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="p-2 rounded-full bg-white/20 backdrop-blur-xs text-white">
                  <ZoomIn className="w-4 h-4" />
                </div>
              </div>

              {/* Minimal caption label */}
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-[10px] text-white/90 font-light truncate">{photo.caption}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Immersive Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {activeIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveIdx(null)}
            className="fixed inset-0 bg-black/95 flex flex-col justify-between p-4 z-50 select-none"
          >
            {/* Top Bar inside Lightbox */}
            <div className="flex justify-between items-center w-full max-w-lg mx-auto py-2">
              <span className="text-[10px] sm:text-xs tracking-widest text-[#FAF6EE]/50 font-mono">
                {activeIdx + 1} / {photos.length}
              </span>
              <button 
                onClick={() => setActiveIdx(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Main Image Slider View */}
            <div className="w-full max-w-lg mx-auto flex-1 flex items-center justify-between relative px-2">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer transition-all shrink-0 active:scale-95"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="relative flex-1 h-[60vh] flex items-center justify-center px-4 overflow-hidden">
                <AnimatePresence mode="popLayout">
                  <motion.img
                    key={activeIdx}
                    src={photos[activeIdx].src}
                    alt={photos[activeIdx].alt}
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.3 }}
                    className="max-h-full max-w-full rounded-lg object-contain shadow-2xl"
                    referrerPolicy="no-referrer"
                  />
                </AnimatePresence>
              </div>

              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer transition-all shrink-0 active:scale-95"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Bottom Caption Overlay */}
            <div className="text-center w-full max-w-md mx-auto py-4">
              <p className="font-serif-luxury text-[#FAF6EE] text-base tracking-wide">
                {photos[activeIdx].alt}
              </p>
              <p className="text-xs text-[#FAF6EE]/60 italic font-light mt-1.5">
                {photos[activeIdx].caption}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
