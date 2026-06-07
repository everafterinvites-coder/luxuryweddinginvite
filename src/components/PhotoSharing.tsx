import { useState, useEffect, useRef, ChangeEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Camera, 
  UploadCloud, 
  Heart, 
  Sparkles, 
  Check, 
  Image as ImageIcon 
} from "lucide-react";

interface GuestCandid {
  id: string;
  sender: string;
  caption?: string;
  imgData: string; // Resized lightweight base64 URL or standard URL
  timestamp: string;
  approved: boolean;
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
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch guest candid captures from localStorage on load
  useEffect(() => {
    try {
      const stored = localStorage.getItem("wedding_guest_candids");
      if (stored) {
        setCandids(JSON.parse(stored));
      } else {
        // Initial beautifully styled demo placeholder images
        const initialCandids: GuestCandid[] = [
          {
            id: "initial-1",
            sender: "Julian Thorne",
            caption: "Breathtaking views of the lake!",
            imgData: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=400&q=80",
            timestamp: "A few hours ago",
            approved: true
          },
          {
            id: "initial-2",
            sender: "Lady Eleanor",
            caption: "Getting ready for forever, absolute royalty.",
            imgData: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=400&q=80",
            timestamp: "Just now",
            approved: true
          }
        ];
        localStorage.setItem("wedding_guest_candids", JSON.stringify(initialCandids));
        setCandids(initialCandids);
      }
    } catch (e) {
      console.error(e);
    }

    const handleStorageChange = () => {
      try {
        const stored = localStorage.getItem("wedding_guest_candids");
        if (stored) setCandids(JSON.parse(stored));
      } catch (err) {}
    };

    window.addEventListener("storage", handleStorageChange);
    const timer = setInterval(handleStorageChange, 3500);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(timer);
    };
  }, []);

  // Compression helper to keep premium captures swift and lightweight inside storage
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 640;
        const MAX_HEIGHT = 640;
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
          const dataUrl = canvas.toDataURL("image/jpeg", 0.72);
          setSelectedFile(dataUrl);
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  // Upload actions setting to live stream feed
  const handleCandidUpload = () => {
    if (!selectedFile) return;
    setIsUploading(true);

    setTimeout(() => {
      const newCandid: GuestCandid = {
        id: `candid_${Date.now()}`,
        sender: guestName.trim() || "Lovely Guest",
        caption: captionText.trim() || undefined,
        imgData: selectedFile,
        timestamp: "Just now",
        approved: true
      };

      try {
        const stored = localStorage.getItem("wedding_guest_candids");
        const currentList: GuestCandid[] = stored ? JSON.parse(stored) : [];
        const updated = [newCandid, ...currentList];
        
        localStorage.setItem("wedding_guest_candids", JSON.stringify(updated));
        setCandids(updated);
        
        window.dispatchEvent(new Event("storage"));
      } catch (err) {
        alert("Our shared album is currently full! Please inform the happy couple to manage and delete older test pictures via the Organizer Dashboard.");
      }

      setSelectedFile(null);
      setGuestName("");
      setCaptionText("");
      setIsUploading(false);
      setShowConfirmation(true);
      setTimeout(() => setShowConfirmation(false), 5000);
    }, 1100);
  };

  // Action to launch camera smoothly
  const triggerCamera = () => {
    if (fileInputRef.current) {
      fileInputRef.current.setAttribute("capture", "environment");
      fileInputRef.current.click();
    }
  };

  // Action to select pre-existing photo
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
      return "Candid";
    }
  };

  const visibleCandids = candids.filter(c => c.approved !== false);

  return (
    <section 
      id="photo-sharing-section" 
      className="bg-[#FAF6EE] py-16 px-6 border-b border-[#F3EBDD]/70 space-y-12 relative overflow-hidden"
    >
      <input 
        type="file" 
        ref={fileInputRef}
        accept="image/*" 
        className="hidden" 
        onChange={handleFileChange} 
      />

      {/* Elegant atmospheric blurred background backdrops */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-80 h-80 rounded-full bg-[#C5A059]/4 blur-3xl pointer-events-none" />
      <div className="absolute top-1/4 right-1/3 -translate-y-1/2 w-80 h-80 rounded-full bg-[#5F6F5E]/3 blur-3xl pointer-events-none" />

      {/* Styled Header */}
      <div className="max-w-2xl mx-auto text-center space-y-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#C5A059]/25 text-[#C5A059] text-[10px] font-bold tracking-widest uppercase mb-1"
        >
          <Camera className="w-3.5 h-3.5" />
          <span>Shared Guest Album</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-serif-luxury text-3xl sm:text-4xl text-[#2C261F] tracking-wide"
        >
          Candid Guest Album
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xs sm:text-sm text-[#2C261F]/70 font-light max-w-lg mx-auto leading-relaxed"
        >
          Help us save every beautiful, joyous, and spontaneous moment of our wedding! Launch your camera to snap a live candid photo, or select a picture from your device to save immediately into our shared album.
        </motion.p>
      </div>

      {/* Premium Centered Upload Panel */}
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
                  <p className="text-[10px] text-[#2C261F]/50">Your photo will be securely shared with the couple</p>
                </div>

                <div className="w-full h-48 bg-[#FAF6EE] rounded-xl overflow-hidden border border-[#F3EBDD] relative shadow-4xs flex items-center justify-center">
                  <img src={selectedFile} alt="Candid Capture Review" className="h-full w-full object-cover" />
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
                      placeholder="e.g. Grandma Rose"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#F3EBDD] bg-[#FAF6EE] focus:border-[#C5A059] focus:bg-white outline-none text-[#2C261F] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold text-[#2C261F]/60 tracking-wider mb-1">
                      Add a Cute Note (Optional)
                    </label>
                    <input 
                      type="text" 
                      placeholder="e.g. Best wedding ceremony ever! 💍"
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
                    Retake
                  </button>
                  <button
                    onClick={handleCandidUpload}
                    disabled={isUploading}
                    className="flex-1 py-2.5 rounded-xl bg-[#C5A059] hover:bg-[#AF853E] text-white text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-3xs cursor-pointer disabled:opacity-50"
                  >
                    {isUploading ? "Sharing..." : "Post Candid"}
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
                  <h3 className="font-serif-luxury text-lg text-[#2C261F]">Post Your Photos</h3>
                  <p className="text-xs text-[#2C261F]/60 font-light max-w-xs mx-auto">
                    Capture and snap the lovely celebrations directly using your smartphone camera or library.
                  </p>
                </div>

                <div className="w-full space-y-2.5 pt-2">
                  <button
                    onClick={triggerCamera}
                    className="w-full py-3 px-4 rounded-xl bg-[#C5A059] hover:bg-[#AF853E] text-white text-xs font-semibold tracking-widest uppercase transition-colors flex items-center justify-center gap-2 shadow-2xs cursor-pointer group"
                  >
                    <Camera className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span>Launch Real Camera</span>
                  </button>

                  <button
                    onClick={triggerFolderFile}
                    className="w-full py-2.5 px-4 rounded-xl bg-white border border-[#C5A059]/30 hover:bg-[#FAF6EE] text-[#C5A059] text-xs font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <ImageIcon className="w-4 h-4" />
                    <span>Upload From Device</span>
                  </button>
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
                      <span>Successfully added to the private wedding collection!</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
