import { useState, useEffect, useRef, ChangeEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Camera, 
  UploadCloud, 
  Heart, 
  Sparkles, 
  Check, 
  Image as ImageIcon,
  MessageSquareHeart,
  CalendarCheck
} from "lucide-react";
import { FloralFlourish, FloralCorner, StationeryFrame } from "./FloralDecor";

interface GuestCandid {
  id: string;
  sender: string;
  caption?: string;
  imgData: string; // Resized lightweight base64 URL
  timestamp: string;
  approved: boolean;
  likes?: number;
}

interface PhotoSharingProps {
  uploadUrl: string; // Kept for compatibility / fallbacks if necessary
}

export default function PhotoSharing({ uploadUrl }: PhotoSharingProps) {
  const [candids, setCandids] = useState<GuestCandid[]>([]);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [guestName, setGuestName] = useState("");
  const [captionText, setCaptionText] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [likedIds, setLikedIds] = useState<string[]>([]);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch guest captures from API / localStorage on load
  const loadCandids = async () => {
    try {
      const res = await fetch("/api/candids");
      if (res.ok) {
        const data = await res.json();
        setCandids(data);
        localStorage.setItem("wedding_guest_candids", JSON.stringify(data));
      } else {
        throw new Error("API failed");
      }
    } catch (e) {
      // Fallback to localStorage
      try {
        const stored = localStorage.getItem("wedding_guest_candids");
        if (stored) {
          setCandids(JSON.parse(stored));
        }
      } catch (err) {}
    }
  };

  useEffect(() => {
    loadCandids();

    const handleStorageChange = () => {
      loadCandids();
    };

    window.addEventListener("storage", handleStorageChange);
    const timer = setInterval(loadCandids, 4000);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(timer);
    };
  }, []);

  // Compression helper to keep captures swift and lightweight
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 720;
        const MAX_HEIGHT = 720;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL("image/jpeg", 0.75);
          setSelectedFile(dataUrl);
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  // Upload actions setting to live stream feed
  const handleCandidUpload = async () => {
    if (!selectedFile) return;
    setIsUploading(true);

    try {
      const res = await fetch("/api/candids", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sender: guestName.trim() || "Lovely Guest",
          caption: captionText.trim() || undefined,
          imgData: selectedFile,
        }),
      });

      if (res.ok) {
        const newCandid = await res.json();
        setCandids((prev) => [newCandid, ...prev]);
        try {
          const stored = localStorage.getItem("wedding_guest_candids");
          const currentList = stored ? JSON.parse(stored) : [];
          localStorage.setItem("wedding_guest_candids", JSON.stringify([newCandid, ...currentList]));
        } catch (e) {}
      } else {
        throw new Error("Upload API failed");
      }
    } catch (err) {
      // Offline fallback
      const newCandid: GuestCandid = {
        id: `candid_${Date.now()}`,
        sender: guestName.trim() || "Lovely Guest",
        caption: captionText.trim() || undefined,
        imgData: selectedFile,
        timestamp: "Just now",
        approved: true, // Auto-approved on upload; can be moderated from Organizer Dashboard
        likes: 0
      };

      try {
        const stored = localStorage.getItem("wedding_guest_candids");
        const currentList: GuestCandid[] = stored ? JSON.parse(stored) : [];
        const updated = [newCandid, ...currentList];
        
        localStorage.setItem("wedding_guest_candids", JSON.stringify(updated));
        setCandids(updated);
        
        window.dispatchEvent(new Event("storage"));
      } catch (err) {
        alert("The shared album is full! Please manage and delete older images via the Organizer Dashboard.");
      }
    }

    setSelectedFile(null);
    setGuestName("");
    setCaptionText("");
    setIsUploading(false);
    setShowConfirmation(true);
    setTimeout(() => setShowConfirmation(false), 5000);
  };

  // Handle heart like action on pictures
  const handleLikePhoto = async (id: string) => {
    if (likedIds.includes(id)) return; // Only allow one like per session
    setLikedIds(prev => [...prev, id]);
    
    try {
      const res = await fetch(`/api/candids/${id}/like`, { method: "POST" });
      if (res.ok) {
        loadCandids();
      } else {
        throw new Error("Like API failed");
      }
    } catch (err) {
      try {
        const stored = localStorage.getItem("wedding_guest_candids");
        const currentList: GuestCandid[] = stored ? JSON.parse(stored) : [];
        const updated = currentList.map(c => {
          if (c.id === id) {
            return { ...c, likes: (c.likes || 0) + 1 };
          }
          return c;
        });
        localStorage.setItem("wedding_guest_candids", JSON.stringify(updated));
        setCandids(updated);
        window.dispatchEvent(new Event("storage"));
      } catch (e) {}
    }
  };

  // Launch camera
  const triggerCamera = () => {
    if (fileInputRef.current) {
      fileInputRef.current.setAttribute("capture", "environment");
      fileInputRef.current.click();
    }
  };

  // Upload file from device storage
  const triggerFolderFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.removeAttribute("capture");
      fileInputRef.current.click();
    }
  };

  const getDisplayTime = (c: GuestCandid) => {
    if (c.timestamp.includes("now") || c.timestamp.includes("hours")) return c.timestamp;
    try {
      const diff = Date.now() - parseInt(c.id.split("_")[1]);
      if (isNaN(diff)) return "Just now";
      const mins = Math.floor(diff / 60000);
      if (mins < 1) return "Just now";
      if (mins < 60) return `${mins}m ago`;
      const hrs = Math.floor(mins / 60);
      return `${hrs}h ago`;
    } catch (e) {
      return "Just now";
    }
  };

  const visibleCandids = candids.filter(c => c.approved !== false);

  return (
    <section 
      id="photo-sharing-section" 
      className="bg-stationery py-20 px-6 sm:px-8 border-b border-[#F3EBDD]/70 space-y-12 relative overflow-hidden"
    >
      {/* Delicate botanical corners */}
      <FloralCorner className="top-4 left-4" side="top-left" />
      <FloralCorner className="bottom-4 right-4" side="bottom-right" />

      <input 
        type="file" 
        ref={fileInputRef}
        accept="image/*" 
        className="hidden" 
        onChange={handleFileChange} 
      />

      {/* Atmospheric backgrounds */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-80 h-80 rounded-full bg-[#C5A059]/4 blur-3xl pointer-events-none" />
      <div className="absolute top-1/4 right-1/3 -translate-y-1/2 w-80 h-80 rounded-full bg-[#5F6F5E]/3 blur-3xl pointer-events-none" />

      {/* Styled Header */}
      <div className="max-w-2xl mx-auto text-center space-y-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white border border-[#C5A059]/25 text-[#C5A059] text-[10px] font-bold tracking-widest uppercase mb-1 shadow-xs"
        >
          <Camera className="w-3.5 h-3.5" />
          <span>Candids & captures</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-serif-luxury text-3xl sm:text-5xl text-letterpress font-medium tracking-wide"
        >
          Shared Wedding Album
        </motion.h2>

        <FloralFlourish className="my-5" />

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xs sm:text-sm text-[#2C261F]/80 font-light max-w-lg mx-auto leading-relaxed"
        >
          Help us document our special day! Capture your favorite moments, laughs, and angles using your phone's camera, or upload existing pictures to our live digital album.
        </motion.p>
      </div>

      {/* Centered Upload Panel */}
      <div className="max-w-md mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white border border-[#F3EBDD] rounded-3xl p-6 sm:p-8 flex flex-col justify-center space-y-6 shadow-3xs"
        >
          <AnimatePresence mode="wait">
            {selectedFile ? (
              /* Verification preview mode */
              <motion.div
                key="preview-upload"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                className="space-y-4"
              >
                <div className="text-center">
                  <h4 className="font-serif-luxury text-base text-[#2C261F] tracking-wide">
                    Verify Your Upload
                  </h4>
                  <p className="text-[10px] text-[#2C261F]/50">Your photo will be shared in our guest memories album</p>
                </div>

                <div className="w-full h-48 bg-[#FAF6EE] rounded-xl overflow-hidden border border-[#F3EBDD] relative shadow-4xs flex items-center justify-center">
                  <img src={selectedFile} alt="Capture Review" className="h-full w-full object-cover" />
                  <button 
                    onClick={() => setSelectedFile(null)}
                    type="button"
                    className="absolute top-2 right-2 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#2C261F] text-[10px] font-semibold hover:bg-white shadow-xs cursor-pointer"
                  >
                    Change Picture
                  </button>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-[#2C261F]/60 tracking-wider mb-1">
                      Your Name
                    </label>
                    <input 
                      type="text" 
                      placeholder="e.g. Cousin Sarah"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#F3EBDD] bg-[#FAF6EE] focus:border-[#C5A059] focus:bg-white outline-none text-[#2C261F] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold text-[#2C261F]/60 tracking-wider mb-1">
                      Add a Caption (Optional)
                    </label>
                    <input 
                      type="text" 
                      placeholder="e.g. Stunning ceremony! 💖"
                      value={captionText}
                      onChange={(e) => setCaptionText(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#F3EBDD] bg-[#FAF6EE] focus:border-[#C5A059] focus:bg-white outline-none text-[#2C261F] transition-all"
                    />
                  </div>
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    onClick={() => setSelectedFile(null)}
                    className="flex-1 py-2.5 rounded-xl border border-[#F3EBDD] hover:bg-[#FAF6EE] text-[#2C261F]/70 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCandidUpload}
                    disabled={isUploading}
                    className="flex-1 py-2.5 rounded-xl bg-[#C5A059] hover:bg-[#AF853E] text-white text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-3xs cursor-pointer disabled:opacity-50"
                  >
                    {isUploading ? "Uploading..." : "Upload Photo"}
                  </button>
                </div>
              </motion.div>
            ) : (
              /* Action selection buttons state */
              <motion.div
                key="launcher-buttons"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-5 text-center flex flex-col justify-center items-center py-2"
              >
                <div className="w-14 h-14 rounded-full bg-[#FAF6EE] border border-[#C5A059]/20 flex items-center justify-center text-[#C5A059] mb-1">
                  <Camera className="w-7 h-7" />
                </div>

                <div className="space-y-1.5">
                  <h3 className="font-serif-luxury text-lg text-[#2C261F]">Share Memories</h3>
                  <p className="text-xs text-[#2C261F]/60 font-light max-w-xs mx-auto">
                    Take a live photo at the wedding reception or choose high-quality snaps from your photo library.
                  </p>
                </div>

                <div className="w-full space-y-2.5 pt-2">
                  <button
                    onClick={triggerCamera}
                    className="w-full py-3 px-4 rounded-xl bg-[#C5A059] hover:bg-[#AF853E] text-white text-xs font-semibold tracking-widest uppercase transition-colors flex items-center justify-center gap-2 shadow-2xs cursor-pointer group"
                  >
                    <Camera className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span>Take Live Picture</span>
                  </button>

                  <button
                    onClick={triggerFolderFile}
                    className="w-full py-2.5 px-4 rounded-xl bg-white border border-[#C5A059]/30 hover:bg-[#FAF6EE] text-[#C5A059] text-xs font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <ImageIcon className="w-4 h-4" />
                    <span>Choose From Library</span>
                  </button>

                  {uploadUrl && (
                    <a
                      href={uploadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-4 rounded-xl bg-gray-50 border border-dashed border-[#C5A059]/40 hover:bg-[#FAF6EE] text-[#C5A059] text-xs font-semibold tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4 text-[#C5A059]/80" />
                      <span>Open Shared Album Link</span>
                    </a>
                  )}
                </div>

                <AnimatePresence>
                  {showConfirmation && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-xs text-green-700 font-semibold flex items-center justify-center gap-1.5 mt-2"
                    >
                      <Check className="w-4 h-4" />
                      <span>Successfully added to the shared wedding album!</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Guest Upload Gallery Grid (Dynamic and loads real-time uploaded images) */}
      <div className="max-w-4xl mx-auto space-y-6 pt-10 border-t border-[#F3EBDD]/60 relative z-10">
        <div className="text-center space-y-1">
          <h4 className="font-serif-luxury text-xl sm:text-2xl text-[#2C261F] tracking-wide">Guest Shared Album</h4>
          <p className="text-[10px] text-[#C5A059] font-mono tracking-widest uppercase">Live Moments Captured By Loved Ones</p>
        </div>

        {visibleCandids.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 px-6 bg-white border border-[#F3EBDD]/70 rounded-3xl max-w-md mx-auto space-y-3"
          >
            <div className="w-12 h-12 rounded-full bg-[#FAF6EE] border border-[#C5A059]/25 flex items-center justify-center mx-auto text-[#C5A059]/80">
              <CalendarCheck className="w-5 h-5" />
            </div>
            <p className="text-xs text-[#2C261F]/60 font-light leading-relaxed max-w-xs mx-auto">
              Our shared album is empty at the moment. High-quality snaps and lovely moments uploaded by you and other wedding guests will populate here instantly!
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <AnimatePresence>
              {visibleCandids.map((candid) => (
                <motion.div
                  key={candid.id}
                  layoutId={`guest-photo-${candid.id}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white border border-[#F3EBDD] rounded-2xl overflow-hidden p-2.5 shadow-4xs hover:shadow-3xs transition-shadow flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    {/* Picture Display */}
                    <div className="aspect-square w-full rounded-xl overflow-hidden bg-[#FAF6EE] relative border border-[#F3EBDD]/40">
                      <img 
                        src={candid.imgData} 
                        alt={`Shared by ${candid.sender}`}
                        className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500" 
                      />
                      <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-white/80 backdrop-blur-xs text-[9px] font-mono font-medium text-[#2C261F]/70">
                        {getDisplayTime(candid)}
                      </div>
                    </div>

                    {/* Metadata & Message Info */}
                    <div className="px-1.5 space-y-1.5">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[11px] font-bold text-[#2C261F] truncate" title={candid.sender}>
                          By {candid.sender}
                        </span>

                        {/* Interactive Client-Side Hearts */}
                        <button
                          onClick={() => handleLikePhoto(candid.id)}
                          disabled={likedIds.includes(candid.id)}
                          className={`flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded-full transition-colors cursor-pointer ${
                            likedIds.includes(candid.id) 
                              ? "bg-red-50 text-red-600 font-semibold" 
                              : "bg-gray-50 hover:bg-red-50 text-gray-500 hover:text-red-500"
                          }`}
                        >
                          <Heart className={`w-3 h-3 ${likedIds.includes(candid.id) ? "fill-red-600 scale-110" : ""} transition-transform`} />
                          <span>{candid.likes || 0}</span>
                        </button>
                      </div>

                      {candid.caption && (
                        <p className="text-[10px] text-[#2C261F]/75 italic leading-snug line-clamp-3 pl-1.5 border-l border-[#C5A059]/30">
                          "{candid.caption}"
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
}
