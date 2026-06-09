import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { RSVPResponse } from "../types";
import { Heart, Sparkles, Check, CheckCircle2, AlertCircle } from "lucide-react";
import { FloralFlourish, FloralCorner, StationeryFrame } from "./FloralDecor";

interface RSVPFormProps {
  onRSVPSubmitted?: () => void;
}

export default function RSVPForm({ onRSVPSubmitted }: RSVPFormProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [attending, setAttending] = useState<"yes" | "no">("yes");
  const [guestsCount, setGuestsCount] = useState(1);
  const [dietaryNotes, setDietaryNotes] = useState("");
  const [wellWishes, setWellWishes] = useState("");
  
  const [status, setStatus] = useState<"idle" | "error" | "success">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [submittedName, setSubmittedName] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setErrorMsg("Please enter your full name.");
      setStatus("error");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setErrorMsg("Please enter a valid email address.");
      setStatus("error");
      return;
    }

    try {
      let rsvpData: RSVPResponse;
      
      try {
        const res = await fetch("/api/rsvps", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fullName: fullName.trim(),
            email: email.trim(),
            attending,
            guestsCount: attending === "yes" ? guestsCount : 0,
            dietaryNotes: dietaryNotes.trim() || undefined,
            wellWishes: wellWishes.trim() || undefined
          })
        });
        
        if (res.ok) {
          rsvpData = await res.json();
          // Also sync to local storage
          const stored = localStorage.getItem("wedding_rsvps");
          const rsvps: RSVPResponse[] = stored ? JSON.parse(stored) : [];
          rsvps.push(rsvpData);
          localStorage.setItem("wedding_rsvps", JSON.stringify(rsvps));
        } else {
          throw new Error("API post failed");
        }
      } catch (e) {
        // Fallback to offline localstorage persistence
        rsvpData = {
          id: "rsvp-" + Date.now(),
          fullName: fullName.trim(),
          email: email.trim(),
          attending,
          guestsCount: attending === "yes" ? guestsCount : 0,
          dietaryNotes: dietaryNotes.trim() || undefined,
          wellWishes: wellWishes.trim() || undefined,
          submittedAt: new Date().toISOString()
        };
        const stored = localStorage.getItem("wedding_rsvps");
        const rsvps: RSVPResponse[] = stored ? JSON.parse(stored) : [];
        rsvps.push(rsvpData);
        localStorage.setItem("wedding_rsvps", JSON.stringify(rsvps));
      }

      // Trigger callback if defined
      if (onRSVPSubmitted) {
        onRSVPSubmitted();
      }

      setSubmittedName(fullName.trim());
      setStatus("success");
      
      // Clean up fields
      setFullName("");
      setEmail("");
      setGuestsCount(1);
      setDietaryNotes("");
      setWellWishes("");
    } catch (err: any) {
      setErrorMsg("Failed to submit RSVP. Please try again.");
      setStatus("error");
    }
  };

  return (
    <section id="rsvp-section" className="bg-stationery py-20 px-6 sm:px-8 border-b border-[#F3EBDD]/70 relative overflow-hidden">
      {/* Decorative backdrop flowers */}
      <div className="absolute right-[-15%] top-[-10%] w-96 h-96 rounded-full bg-[#C5A059]/5 blur-3xl pointer-events-none" />
      <div className="absolute left-[-15%] bottom-[-10%] w-96 h-96 rounded-full bg-[#5F6F5E]/5 blur-3xl pointer-events-none" />

      {/* Handcrafted floral corner engravings */}
      <FloralCorner className="top-4 left-4" side="top-left" />
      <FloralCorner className="bottom-4 right-4" side="bottom-right" />

      <div className="max-w-2xl mx-auto text-center mb-14 relative z-10">
        <span className="font-script text-4xl sm:text-5xl text-[#AF853E] block mb-1">Be Our Guest</span>
        <h2 className="font-serif-luxury text-3xl sm:text-5xl text-letterpress font-medium tracking-wide mb-3">Kindly Reply</h2>
        <FloralFlourish className="my-5" />
        <p className="text-sm text-[#2C261F]/80 max-w-sm mx-auto font-light leading-relaxed bg-[#FCFAF6]/40 p-3 rounded-lg border border-[#F3EBDD]/20 backdrop-blur-xs">
          Please respond by September 15, 2026. We are excited to raise a champagne toast with you!
        </p>
      </div>

      <div className="max-w-xl mx-auto relative z-10">
        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#FCFAF6] rounded-2xl p-8 sm:p-10 border border-[#C5A059] border-double-inset shadow-md text-center space-y-6 relative overflow-hidden"
            >
              {/* Gold light burst animation behind wax seal */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#C5A059] via-[#FAF6EE] to-[#AF853E]" />
              
              <div className="w-16 h-16 rounded-full bg-[#EBF0EA] border-2 border-[#5F6F5E] flex items-center justify-center mx-auto shadow-2xs">
                <Check className="w-8 h-8 text-[#5F6F5E]" />
              </div>

              <div className="space-y-2">
                <h3 className="font-serif-luxury text-2xl text-[#2C261F] tracking-wide">
                  Thank You, {submittedName}!
                </h3>
                <p className="text-xs text-[#5F6F5E] bg-[#EBF0EA] py-1.5 px-3 rounded-full inline-block font-medium">
                  {attending === "yes" ? "ACCEPTED WITH JOY" : "DECLINED WITH REGRET"}
                </p>
                <p className="text-xs text-[#2C261F]/70 font-light leading-relaxed pt-2">
                  {attending === "yes" 
                    ? "Your seat overlooking Lake Como has been warmly secured. We will keep you updated on shuttle transportation and dress guides."
                    : "We are truly sorry that you cannot celebrate alongside us. Your warm wishes stay etched in our hearts."
                  }
                </p>
              </div>

              <button
                onClick={() => setStatus("idle")}
                className="w-full py-2.5 rounded-lg border border-[#F3EBDD] bg-white hover:bg-[#FAF6EE] text-xs text-[#2C261F]/80 font-medium transition-colors cursor-pointer"
              >
                Submit another RSVP
              </button>
            </motion.div>
          ) : (
            <motion.form
              layout
              onSubmit={handleSubmit}
              className="bg-[#FCFAF6] rounded-2xl p-8 sm:p-10 border border-[#F3EBDD] border-double-inset shadow-md space-y-6"
            >
              {status === "error" && (
                <div className="p-3 bg-red-50 border border-red-100 rounded-lg flex items-start gap-2 text-red-700">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span className="text-xs font-light">{errorMsg}</span>
                </div>
              )}

              {/* Attendance Selection */}
              <div className="space-y-2">
                <label className="text-[10px] tracking-[0.15em] text-[#C5A059] block font-bold uppercase text-center mb-3">
                  ATTENDANCE STATUS
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setAttending("yes")}
                    className={`py-3.5 px-4 rounded-xl border text-xs font-semibold cursor-pointer transition-all flex flex-col items-center justify-center gap-2 ${
                      attending === "yes"
                        ? "border-[#C5A059] bg-[#FAF6EE] text-[#AF853E] shadow-3xs"
                        : "border-[#F3EBDD] bg-white hover:bg-[#FCFAF6] text-[#2C261F]/60"
                     }`}
                  >
                    <Heart className={`w-4 h-4 ${attending === "yes" ? "fill-[#C5A059]" : ""}`} />
                    <span>Joyfully Accept</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAttending("no")}
                    className={`py-3.5 px-4 rounded-xl border text-xs font-semibold cursor-pointer transition-all flex flex-col items-center justify-center gap-2 ${
                      attending === "no"
                        ? "border-[#C5A059] bg-[#FAF6EE] text-[#AF853E] shadow-3xs"
                        : "border-[#F3EBDD] bg-white hover:bg-[#FCFAF6] text-[#2C261F]/60"
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-current" />
                    <span>Regretfully Decline</span>
                  </button>
                </div>
              </div>

              {/* Full Name */}
              <div className="space-y-1">
                <label className="text-[10px] tracking-widest text-[#2C261F]/50 block font-semibold uppercase">
                  FULL NAME
                </label>
                <input
                  type="text"
                  placeholder="e.g. Mr. Gerald Vance"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#F3EBDD] focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]/20 bg-white placeholder-gray-400 outline-none transition-all"
                />
              </div>

              {/* Email Address */}
              <div className="space-y-1">
                <label className="text-[10px] tracking-widest text-[#2C261F]/50 block font-semibold uppercase">
                  EMAIL ADDRESS
                </label>
                <input
                  type="email"
                  placeholder="e.g. gerald.vance@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#F3EBDD] focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]/20 bg-white placeholder-gray-400 outline-none transition-all"
                />
              </div>

              {/* Guest Counts (Conditional) */}
              {attending === "yes" && (
                <div className="space-y-2">
                  <label className="text-[10px] tracking-widest text-[#2C261F]/50 block font-semibold uppercase">
                    GUESTS IN YOUR PARTY
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setGuestsCount((c) => Math.max(1, c - 1))}
                      className="w-10 h-10 rounded-full border border-[#F3EBDD] hover:bg-[#FAF6EE] flex items-center justify-center text-sm font-medium cursor-pointer"
                    >
                      -
                    </button>
                    <span className="font-serif-luxury text-lg text-[#2C261F] font-bold w-6 text-center">
                      {guestsCount}
                    </span>
                    <button
                      type="button"
                      onClick={() => setGuestsCount((c) => Math.min(6, c + 1))}
                      className="w-10 h-10 rounded-full border border-[#F3EBDD] hover:bg-[#FAF6EE] flex items-center justify-center text-sm font-medium cursor-pointer"
                    >
                      +
                    </button>
                    <span className="text-[11px] text-[#2C261F]/50 italic font-light ml-2">
                      (Includes yourself, Max 6)
                    </span>
                  </div>
                </div>
              )}

              {/* Dietary Requirements (Conditional) */}
              {attending === "yes" && (
                <div className="space-y-1">
                  <label className="text-[10px] tracking-widest text-[#2C261F]/50 block font-semibold uppercase">
                    DIETARY PREFERENCES / NOTES
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Vegan, Gluten-Free, Nut Allergies, None"
                    value={dietaryNotes}
                    onChange={(e) => setDietaryNotes(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#F3EBDD] focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]/20 bg-white placeholder-gray-400 outline-none transition-all"
                  />
                </div>
              )}

              {/* Well Wishes */}
              <div className="space-y-1">
                <label className="text-[10px] tracking-widest text-[#2C261F]/50 block font-semibold uppercase">
                  WELL WISHES FOR THE COUPLE
                </label>
                <textarea
                  rows={3}
                  placeholder="Write a warm note for Alexandra & Dylan..."
                  value={wellWishes}
                  onChange={(e) => setWellWishes(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#F3EBDD] focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]/20 bg-white placeholder-gray-400 outline-none transition-all resize-none"
                />
              </div>

              {/* Action Submit */}
              <button
                type="submit"
                id="btn-rsvp-submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#C5A059] to-[#AF853E] hover:from-[#AF853E] hover:to-[#C5A059] text-white text-xs tracking-widest font-semibold uppercase shadow-xs transition-all cursor-pointer hover:shadow-md active:scale-[0.99]"
              >
                Send Invitation Reply
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
