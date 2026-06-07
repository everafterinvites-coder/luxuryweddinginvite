import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Heart, 
  MapPin, 
  Calendar, 
  Clock, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  ChevronRight, 
  ChevronDown, 
  Gift, 
  Info,
  Maximize2,
  Minimize2,
  Home,
  BookOpen,
  Map,
  Image,
  FileCheck
} from "lucide-react";

// Imports
import { WEDDING_DATE, COUPLE_INFO, FAQ_ITEMS } from "./data/weddingData";
import Countdown from "./components/Countdown";
import OurStory from "./components/OurStory";
import Itinerary from "./components/Itinerary";
import EventDetails from "./components/EventDetails";
import PhotoGallery from "./components/PhotoGallery";
import PhotoSharing from "./components/PhotoSharing";
import RSVPForm from "./components/RSVPForm";
import OrganizerDashboard from "./components/OrganizerDashboard";
// Beautiful imagery and cinematic backdrop for the invitation
const weddingVideo = new URL("./assets/images/beach video.mp4", import.meta.url).href;
const weddingHeroImg = new URL("./assets/images/couplehands.jfif", import.meta.url).href;
const weddingCoupleImg = new URL("./assets/images/couple.jfif", import.meta.url).href;
const weddingDetailImg = new URL("./assets/images/wedding_detail_1780773800394.png", import.meta.url).href;

export default function App() {
  // Navigation states
  const [activeTab, setActiveTab] = useState("home");
  const [customGuest, setCustomGuest] = useState<string | null>(null);
  
  // Custom Photo sharing target link live synchronizer
  const [photoUploadUrl, setPhotoUploadUrl] = useState(() => {
    return localStorage.getItem("wedding_photo_upload_url") || "https://photos.app.goo.gl/AlexandraAndDylan2027";
  });

  const handleUpdateUploadUrl = (newUrl: string) => {
    localStorage.setItem("wedding_photo_upload_url", newUrl);
    setPhotoUploadUrl(newUrl);
  };
  
  // Immersive layout config
  const [hasEntered, setHasEntered] = useState(true); // Default to true to remove the envelope/splash at the start
  const [isMuted, setIsMuted] = useState(true);
  const [rsvpTick, setRsvpTick] = useState(0); // Trigger reload of stats on dashboard
  
  const [showGiftModal, setShowGiftModal] = useState(false);
  const [showFaq, setShowFaq] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Dynamic Personalized Greetings via Query Parameters (e.g. ?guest=The+Vance+Family)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const guestParam = params.get("guest") || params.get("to");
    if (guestParam) {
      setCustomGuest(decodeURIComponent(guestParam));
    }
  }, []);

  // Set up audio play
  useEffect(() => {
    // Elegant royalty-free ambient piano track for refined wedding vibe
    audioRef.current = new Audio("https://assets.mixkit.co/music/preview/mixkit-beautiful-dream-reverie-ambient-610.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const handleEnterInvitation = () => {
    setHasEntered(true);
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => setIsMuted(false))
        .catch(() => setIsMuted(true)); // Handle autoplay blocks safely
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    if (isMuted) {
      audioRef.current.play();
      audioRef.current.volume = 0.4;
      setIsMuted(false);
    } else {
      audioRef.current.pause();
      setIsMuted(true);
    }
  };

  const handleScrollTo = (elementId: string, tabName: string) => {
    setActiveTab(tabName);
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#FAF6EE] text-[#2C261F] relative select-none">
      
      {/* EXQUISITE BLURRED DECORATIVE DESKTOP CANVAS BACKGROUND */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-25 filter blur-2xl scale-110 pointer-events-none hidden lg:block"
        style={{ backgroundImage: `url(${weddingHeroImg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[#FAF6EE]/90 via-[#FAF6EE]/50 to-[#F3EBDD]/90 pointer-events-none hidden lg:block" />

      {/* FLOATING TOP BRAND HEADER (Desktop view only) */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-[#F3EBDD]/50 items-center justify-between px-8 z-30 hidden lg:flex">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full border border-[#C5A059] flex items-center justify-center font-serif-luxury text-xs text-[#C5A059]">
            {COUPLE_INFO.initials}
          </div>
          <span className="font-serif-luxury text-sm tracking-widest text-[#2C261F]">
            {COUPLE_INFO.combined.toUpperCase()}
          </span>
        </div>

        <nav className="flex items-center gap-6 text-[10px] sm:text-xs uppercase tracking-widest font-semibold text-[#2C261F]/75">
          <button
            onClick={() => handleScrollTo("home", "home")}
            className={`transition-colors cursor-pointer hover:text-[#C5A059] py-2 ${activeTab === "home" ? "text-[#C5A059] border-b border-[#C5A059]" : ""}`}
          >
            Invite
          </button>
          <button
            onClick={() => handleScrollTo("our-story-section", "journey")}
            className={`transition-colors cursor-pointer hover:text-[#C5A059] py-2 ${activeTab === "journey" ? "text-[#C5A059] border-b border-[#C5A059]" : ""}`}
          >
            Story
          </button>
          <button
            onClick={() => handleScrollTo("event-details-section", "details")}
            className={`transition-colors cursor-pointer hover:text-[#C5A059] py-2 ${activeTab === "details" ? "text-[#C5A059] border-b border-[#C5A059]" : ""}`}
          >
            Venue
          </button>
          <button
            onClick={() => handleScrollTo("photo-gallery-section", "gallery")}
            className={`transition-colors cursor-pointer hover:text-[#C5A059] py-2 ${activeTab === "gallery" ? "text-[#C5A059] border-b border-[#C5A059]" : ""}`}
          >
            Gallery
          </button>
          <button
            onClick={() => handleScrollTo("photo-sharing-section", "photos")}
            className={`transition-colors cursor-pointer hover:text-[#C5A059] py-2 ${activeTab === "photos" ? "text-[#C5A059] border-b border-[#C5A059]" : ""}`}
          >
            Guest Photos
          </button>
          <button
            onClick={() => handleScrollTo("rsvp-section-form", "rsvp")}
            className={`transition-colors cursor-pointer hover:text-[#C5A059] py-2 ${activeTab === "rsvp" ? "text-[#C5A059] border-b border-[#C5A059]" : ""}`}
          >
            RSVP
          </button>
        </nav>
      </header>

      {/* FLOATING MUSIC INDICATOR TOOL */}
      {hasEntered && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={toggleMute}
          id="btn-music-toggle"
          className="fixed bottom-24 right-6 lg:bottom-8 lg:right-8 w-11 h-11 rounded-full bg-white border border-[#C5A059]/40 shadow-md flex items-center justify-center z-40 text-[#C5A059] cursor-pointer hover:bg-[#FAF6EE] transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4" />
          ) : (
            <div className="relative flex items-center justify-center">
              <Volume2 className="w-4 h-4 text-[#5F6F5E]" />
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#5F6F5E] animate-ping" />
            </div>
          )}
        </motion.button>
      )}

      {/* AUDIO PLAY WRAPPER CONTAINER */}
      <AnimatePresence>
        {!hasEntered && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.6 } }}
            className="fixed inset-0 bg-[#FAF6EE] flex flex-col items-center justify-center p-6 z-50 overflow-hidden"
          >
            {/* Elegant invitation cover background card */}
            <div className="max-w-xs w-full bg-white border border-[#F3EBDD] rounded-2xl p-8 shadow-xl text-center flex flex-col items-center justify-center space-y-8 relative">
              <div className="absolute inset-2 border border-[#C5A059]/20 rounded-xl" />
              
              <div className="space-y-3 relative z-10 pt-4">
                <span className="font-script text-[#C5A059] text-2xl">The Wedding of</span>
                <h1 className="font-serif-luxury text-3xl text-[#2C261F] tracking-wide leading-tight">
                  Alexandra <br />& Dylan
                </h1>
                <div className="w-8 h-[1px] bg-[#C5A059] mx-auto my-3" />
                <p className="text-[10px] tracking-widest text-[#2C261F]/55 uppercase">
                  LAKE COMO, ITALY
                </p>
              </div>

              {/* Gold styled wax seal opening design */}
              <motion.button
                onClick={handleEnterInvitation}
                id="btn-enter-invite"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#AF853E] to-[#E2CA7F] hover:from-[#C5A059] hover:to-[#FAF6EE] text-white flex flex-col items-center justify-center shadow-lg cursor-pointer border-4 border-white relative z-10"
              >
                <div className="flex flex-col items-center justify-center">
                  <span className="font-serif-luxury text-lg font-bold tracking-widest text-[#FAF6EE] drop-shadow-xs">
                    {COUPLE_INFO.initials}
                  </span>
                  <span className="text-[8px] tracking-widest text-[#FAF6EE]/80">OPEN</span>
                </div>
              </motion.button>

              <div className="space-y-1 relative z-10">
                <p className="text-[11px] text-[#2C261F]/60 font-light max-w-2xs">
                  We invite you to share our joy under the warm Italian sun.
                </p>
                {customGuest && (
                  <p className="text-xs text-[#5F6F5E] font-medium mt-4">
                    Exclusively Prepared For: <br />
                    <span className="font-sans font-semibold border-b border-[#EBF0EA] pb-0.5">{customGuest}</span>
                  </p>
                )}
              </div>
            </div>
            <p className="text-[10px] text-gray-400 font-mono tracking-wider mt-6 select-none uppercase">
              • Tap code: <code className="bg-white/40 p-1 rounded">VILLA2027</code> for organizer entry •
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CORE PORTAL SCROLLER CANVAS (Optimized as premium responsive layout native to desktop and mobile) */}
      <main 
        id="invite-scroller-frame"
        className={`w-full min-h-screen bg-[#FAF6EE] transition-all duration-500 relative outline-none flex flex-col ${
          hasEntered ? "animate-soft-blur" : ""
        }`}
      >
        <div className="flex-1 pb-32">
          
          {/* SECTION 1: ELEGANT INVITE COVER/HERO COVER */}
          <section id="home" className="relative h-screen min-h-[550px] w-full overflow-hidden flex flex-col justify-between">
            {/* Real Full Screen Background looping video */}
            <div className="absolute inset-0 z-0 bg-black">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover scale-100 transition-transform duration-1000"
              >
                <source src={weddingVideo} type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/10 to-black/60" />
            </div>

            {/* Top Bar inside the invite card */}
            <div className="relative z-10 w-full py-6 px-6 flex justify-between items-center bg-gradient-to-b from-black/40 to-transparent">
              <div className="w-10 h-10 rounded-full border border-white/60 bg-white/10 backdrop-blur-xs flex items-center justify-center">
                <span className="font-serif-luxury text-sm font-semibold text-[#FAF6EE]">{COUPLE_INFO.initials}</span>
              </div>
              <span className="text-[10px] tracking-[0.25em] text-[#FAF6EE] font-mono">
                JUNE 26. 2027
              </span>
            </div>

            {/* Middle Title Details */}
            <div className="relative z-10 text-center px-6 space-y-4 mb-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={hasEntered ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1.0, delay: 0.2 }}
                className="space-y-2"
              >
                <span className="text-white/80 font-mono text-[10px] tracking-[0.3em] uppercase block">
                  THE WEDDING OF
                </span>
                
                <h1 className="font-serif-luxury text-4xl sm:text-5xl text-white tracking-wide leading-tight drop-shadow-md font-light">
                  Alexandra
                  <span className="font-script text-[#E5C384] text-5xl block my-1 lowercase">&</span>
                  Dylan
                </h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={hasEntered ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="w-16 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent mx-auto"
              />

              {/* Personalized Guest Welcome overlay */}
              {customGuest && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={hasEntered ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="bg-white/10 backdrop-blur-md border border-white/15 rounded-xl py-2 px-4 max-w-xs mx-auto text-center"
                >
                  <span className="text-[9px] tracking-widest text-[#FAF6EE]/80 uppercase block">
                    KINDLY INVITED
                  </span>
                  <p className="font-sans font-medium text-xs text-[#FAF6EE] truncate">
                    {customGuest}
                  </p>
                </motion.div>
              )}
            </div>

            {/* Bottom Section Hero overlay: Countdown and Date details */}
            <div className="relative z-10 w-full bg-gradient-to-t from-black/80 to-transparent pt-12 pb-8 px-6 text-center space-y-4">
              <div className="space-y-1">
                <p className="font-serif-luxury text-xs text-white/90 tracking-widest uppercase">
                  {COUPLE_INFO.venueName}
                </p>
                <p className="font-sans text-[11px] text-white/70 font-light">
                  {COUPLE_INFO.venueLocation}
                </p>
              </div>

              {/* Countdown Live Element */}
              <div className="bg-white/5 backdrop-blur-sm rounded-xl py-4 border border-white/10 max-w-sm mx-auto">
                <Countdown targetDate={WEDDING_DATE} />
              </div>

              {/* Scroll prompt anchor */}
              <div className="pt-2 animate-bounce flex flex-col items-center cursor-pointer" onClick={() => handleScrollTo("our-story-section", "journey")}>
                <span className="text-[9px] tracking-widest text-white/50 block font-light">
                  SCROLL TO EXPLORE
                </span>
                <ChevronDown className="w-4 h-4 text-white/60 mt-0.5" />
              </div>
            </div>
          </section>

          {/* SECTION 2: OUR STORY STORY TIME LINE */}
          <OurStory />

          {/* SECTION 3: VENUE EVENT DETAILS (With Interactive palette map links) */}
          <EventDetails detailPhotoUrl={weddingDetailImg} />

          {/* SECTION 4: DAY PROGRAM ITINERARY */}
          <Itinerary />

          {/* SECTION 5: PHOTO GALLERY OF MEMORIES */}
          <PhotoGallery 
            weddingHero={weddingHeroImg} 
            weddingCouple={weddingCoupleImg} 
            weddingDetail={weddingDetailImg} 
          />

          {/* SECTION 5.5: PHOTO SHARING GUEST QR CODE */}
          <PhotoSharing uploadUrl={photoUploadUrl} />

          {/* SECTION 6: THE GIFT REGISTRY PREVIEW & FAQS */}
          <section id="registry-section" className="bg-[#FAF6EE] py-14 px-6 border-b border-[#F3EBDD]/70 space-y-10 text-center">
            
            {/* Gift Registry Card block */}
            <div className="max-w-md mx-auto bg-white border border-[#F3EBDD] rounded-2xl p-6 shadow-3xs space-y-4">
              <div className="w-10 h-10 rounded-full bg-[#FAF6EE] flex items-center justify-center mx-auto text-[#C5A059]">
                <Gift className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif-luxury text-xl text-[#2C261F] tracking-wide mb-1.5">
                  The Honeymoon Wish
                </h3>
                <p className="text-xs text-[#2C261F]/70 font-light leading-relaxed max-w-sm mx-auto">
                  Your laughter, joy, and shared memories are the only gifts we search for. However, should you wish to bless our future house or honeymoon trip, contributions can be made here.
                </p>
              </div>

              <button
                onClick={() => setShowGiftModal(true)}
                id="btn-show-wish"
                className="w-full py-2.5 rounded-lg bg-[#5F6F5E] hover:bg-[#4E5C4D] text-white text-xs tracking-wider transition-colors cursor-pointer font-medium"
              >
                View Registry details
              </button>
            </div>

            {/* Quick Accordion for FAQs */}
            <div className="max-w-md mx-auto pt-4 text-left">
              <button
                onClick={() => setShowFaq(!showFaq)}
                id="btn-toggle-faq"
                className="w-full flex justify-between items-center py-2.5 border-b border-[#F3EBDD]/80 text-[#2C261F]/80 font-sans hover:text-[#2C261F] transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Info className="w-4 h-4 text-[#C5A059]" />
                  <span className="text-xs font-semibold uppercase tracking-wider">Helpful FAQs & Lodging Info</span>
                </div>
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showFaq ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {showFaq && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden bg-white/40 rounded-xl px-1.5 mt-2 divide-y divide-[#F3EBDD]/40"
                  >
                    {FAQ_ITEMS.map((faq, i) => (
                      <div key={i} className="py-3 text-left space-y-1">
                        <h4 className="font-sans font-semibold text-xs text-[#2C261F]">
                          {faq.question}
                        </h4>
                        <p className="text-[11px] text-[#2C261F]/70 leading-relaxed font-light">
                          {faq.answer}
                        </p>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </section>

          {/* SECTION 7: RSVP FORM ACTION CARD */}
          <div id="rsvp-section-form">
            <RSVPForm onRSVPSubmitted={() => setRsvpTick((t) => t + 1)} />
          </div>

          {/* SECTION 8: ORGANIZER PORTAL */}
          <OrganizerDashboard 
            tick={rsvpTick} 
            onReset={() => setRsvpTick((t) => t + 1)} 
            uploadUrl={photoUploadUrl}
            onUpdateUploadUrl={handleUpdateUploadUrl}
          />

        </div>

        {/* BRASS ACCENT FLOATING CORE MENU (Fixed to screen bottom on mobile only, hidden on desktop) */}
        <nav 
          id="brass-menu-navigation"
          className="fixed bottom-0 left-0 right-0 h-16 bg-white/95 backdrop-blur-md border-t border-[#F3EBDD]/60 grid grid-cols-5 py-2 z-40 select-none shadow-[0_-4px_12px_rgba(0,0,0,0.05)] lg:hidden"
        >
          <button
            onClick={() => handleScrollTo("home", "home")}
            className={`flex flex-col items-center justify-center gap-0.5 transition-colors cursor-pointer ${
              activeTab === "home" ? "text-[#C5A059]" : "text-[#2C261F]/50"
            }`}
          >
            <Home className="w-[18px] h-[18px]" />
            <span className="text-[10px] font-semibold tracking-wide">Invite</span>
          </button>

          <button
            onClick={() => handleScrollTo("our-story-section", "journey")}
            className={`flex flex-col items-center justify-center gap-0.5 transition-colors cursor-pointer ${
              activeTab === "journey" ? "text-[#C5A059]" : "text-[#2C261F]/50"
            }`}
          >
            <BookOpen className="w-[18px] h-[18px]" />
            <span className="text-[10px] font-semibold tracking-wide">Story</span>
          </button>

          <button
            onClick={() => handleScrollTo("event-details-section", "details")}
            className={`flex flex-col items-center justify-center gap-1 transition-colors cursor-pointer relative ${
              activeTab === "details" ? "text-[#C5A059]" : "text-[#2C261F]/50"
            }`}
          >
            <div className={`absolute top-[-10px] w-8 h-8 rounded-full flex items-center justify-center text-white shadow-md transition-colors border-2 border-white ${
              activeTab === "details" ? "bg-[#C5A059]" : "bg-[#2C261F]/40"
            }`}>
              <Map className="w-3.5 h-3.5" />
            </div>
            <span className="text-[10px] font-semibold tracking-wide mt-4.5">Venue</span>
          </button>

          <button
            onClick={() => handleScrollTo("photo-gallery-section", "gallery")}
            className={`flex flex-col items-center justify-center gap-0.5 transition-colors cursor-pointer ${
              activeTab === "gallery" ? "text-[#C5A059]" : "text-[#2C261F]/50"
            }`}
          >
            <Image className="w-[18px] h-[18px]" />
            <span className="text-[10px] font-semibold tracking-wide">Gallery</span>
          </button>

          <button
            onClick={() => handleScrollTo("rsvp-section-form", "rsvp")}
            className={`flex flex-col items-center justify-center gap-0.5 transition-colors cursor-pointer ${
              activeTab === "rsvp" ? "text-[#C5A059]" : "text-[#2C261F]/50"
            }`}
          >
            <FileCheck className="w-[18px] h-[18px]" />
            <span className="text-[10px] font-semibold tracking-wide">RSVP</span>
          </button>
        </nav>
      </main>

      {/* GIFT REGISTRY DETAILS REGISTRY BOX OVERLAY DIALOG */}
      <AnimatePresence>
        {showGiftModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowGiftModal(false)}
            className="fixed inset-0 bg-black/75 flex items-center justify-center p-6 z-50 select-none backdrop-blur-xs"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-6 max-w-sm w-full border border-[#F3EBDD] shadow-xl text-center space-y-5 relative"
            >
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#C5A059]" />

              <div className="space-y-1">
                <h3 className="font-serif-luxury text-xl text-[#2C261F] tracking-wide">
                  The Honeymoon Wish
                </h3>
                <p className="text-xs text-[#2C261F]/50 italic font-light pt-0.5">
                  Alexandra & Dylan's Honeymoon Fund
                </p>
              </div>

              <div className="bg-[#FAF6EE] rounded-xl p-4 text-left space-y-3.5 border border-[#F3EBDD]/60">
                <div className="space-y-0.5">
                  <span className="text-[9px] tracking-widest text-[#2C261F]/45 block font-semibold">
                    BENEFICIARY BANK
                  </span>
                  <p className="text-xs font-semibold text-[#2C261F]">
                    Banca Popolare di Sondrio (Como Branch)
                  </p>
                </div>

                <div className="space-y-0.5">
                  <span className="text-[9px] tracking-widest text-[#2C261F]/45 block font-semibold">
                    IBAN (EUROPEAN ACCOUNTS)
                  </span>
                  <p className="font-mono text-xs text-[#2C261F] bg-white p-1.5 rounded border border-gray-100 select-all break-all tracking-tight">
                    IT91 B056 9401 6000 0001 2345 6789
                  </p>
                </div>

                <div className="space-y-0.5">
                  <span className="text-[9px] tracking-widest text-[#2C261F]/45 block font-semibold">
                    BIC / SWIFT CODE
                  </span>
                  <p className="font-mono text-xs text-[#2C261F] bg-white p-1.5 rounded border border-gray-100 select-all tracking-widest">
                    POSOIT21XXX
                  </p>
                </div>
              </div>

              <p className="text-[11px] text-gray-500 font-light leading-relaxed">
                If convenient, contributions may also be brought to the reception desk at Villa d'Este, where a physical champagne box will be secure.
              </p>

              <button
                onClick={() => setShowGiftModal(false)}
                className="w-full py-2.5 rounded-lg bg-[#C5A059] hover:bg-[#AF853E] text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                Close details
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}