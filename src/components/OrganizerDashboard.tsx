import { useState, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { RSVPResponse } from "../types";
import { 
  Users, 
  Heart, 
  Sparkles, 
  ShieldCheck, 
  Trash2, 
  Smile, 
  UtensilsCrossed 
} from "lucide-react";

interface OrganizerDashboardProps {
  tick: number; // Increment this to force status reload
  onReset: () => void;
}

export default function OrganizerDashboard({ tick, onReset }: OrganizerDashboardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [submss, setSubmss] = useState<RSVPResponse[]>([]);
  const [passcode, setPasscode] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [authError, setAuthError] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("wedding_rsvps");
      if (stored) {
        setSubmss(JSON.parse(stored));
      } else {
        setSubmss([]);
      }
    } catch (e) {
      setSubmss([]);
    }
  }, [tick, isOpen]);

  // Seed with standard mock initial guests if empty, to look incredible out of the box!
  const handleSeedMockReplies = () => {
    const mockData: RSVPResponse[] = [
      {
        id: "mock-1",
        fullName: "Lady Eleanor Sterling",
        email: "eleanor@sterlingmanor.co.uk",
        attending: "yes",
        guestsCount: 2,
        dietaryNotes: "Gluten-Free, Vegetarian preferred",
        wellWishes: "Wishing you both a lifetime of love as beautiful as the shorelines of Como, congratulations darling!",
        submittedAt: new Date(Date.now() - 3600000 * 5).toISOString(),
      },
      {
        id: "mock-2",
        fullName: "Sir Charles Vance III",
        email: "charles.vance@vanceholdings.com",
        attending: "yes",
        guestsCount: 1,
        dietaryNotes: "None",
        wellWishes: "Tapping a champagne flute to you. So proud of you both, can't wait for Lake Como!",
        submittedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
      },
      {
        id: "mock-3",
        fullName: "Julian & Clara Thorne",
        email: "clara.thorne@gmail.com",
        attending: "no",
        guestsCount: 0,
        wellWishes: "Regretfully sending our love from Kyoto. We shall toast to you under the cherry trees!",
        submittedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
      }
    ];

    localStorage.setItem("wedding_rsvps", JSON.stringify(mockData));
    setSubmss(mockData);
    onReset();
  };

  const handleClearAll = () => {
    if (confirm("Are you sure you want to clear all submitted RSVPs?")) {
      localStorage.removeItem("wedding_rsvps");
      setSubmss([]);
      onReset();
    }
  };

  const handleUnlock = (e: FormEvent) => {
    e.preventDefault();
    // Simple wedding host bypass passcode "villa2027" 
    if (passcode.toLowerCase() === "villa2027" || passcode === "1234") {
      setIsUnlocked(true);
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  // Calculations
  const accepts = submss.filter((s) => s.attending === "yes");
  const declines = submss.filter((s) => s.attending === "no");
  const totalAttendingGuests = accepts.reduce((acc, curr) => acc + curr.guestsCount, 0);

  return (
    <section id="organizer-dashboard-section" className="bg-[#FAF6EE] py-12 px-6 sm:px-8 border-t border-[#F3EBDD]/60 max-w-md mx-auto">
      <div className="border border-[#C5A059]/40 rounded-xl bg-white/70 backdrop-blur-xs p-4 shadow-3xs">
        <button
          onClick={() => setIsOpen(!isOpen)}
          id="btn-organizer-toggle"
          className="w-full flex items-center justify-between text-left cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#C5A059]" />
            <div>
              <h4 className="font-sans font-semibold text-xs text-[#2C261F] uppercase tracking-wider">
                Organizer Portal
              </h4>
              <p className="text-[10px] text-[#2C261F]/50 font-light">
                Monitor live RSVP replies, count guests, and see well-wishes.
              </p>
            </div>
          </div>
          <span className="text-xs text-[#C5A059] font-semibold">
            {isOpen ? "Collapse" : "Access"}
          </span>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="pt-4 mt-3 border-t border-[#F3EBDD] space-y-4">
                
                {/* Step 1: Unlock Page */}
                {!isUnlocked ? (
                  <form onSubmit={handleUnlock} className="space-y-3">
                    <p className="text-[10px] text-[#2C261F]/70 leading-relaxed font-light">
                      Please enter the wedding organizer bypass code. 
                      <code className="bg-[#FAF6EE] text-[#5F6F5E] px-1.5 py-0.5 rounded ml-1 font-mono text-[9px]">villa2027</code>
                    </p>
                    <div className="flex gap-2">
                      <input
                        type="password"
                        placeholder="Passcode"
                        value={passcode}
                        onChange={(e) => setPasscode(e.target.value)}
                        className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-[#F3EBDD] bg-white outline-none focus:border-[#C5A059]"
                      />
                      <button
                        type="submit"
                        className="px-4 py-1.5 bg-[#C5A059] hover:bg-[#AF853E] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                      >
                        Unlock
                      </button>
                    </div>
                    {authError && (
                      <p className="text-[10px] text-red-600 font-medium select-none">
                        * Invalid passcode. Try <code className="font-mono">villa2027</code>
                      </p>
                    )}
                  </form>
                ) : (
                  <div className="space-y-4">
                    
                    {/* Summary Counters */}
                    <div className="grid grid-cols-3 gap-2">
                      <div className="bg-[#EBF0EA] rounded-lg p-2.5 text-center">
                        <Users className="w-4 h-4 text-[#5F6F5E] mx-auto mb-1" />
                        <span className="text-xs font-bold text-[#5F6F5E] block">
                          {totalAttendingGuests}
                        </span>
                        <span className="text-[9px] text-[#5F6F5E]/80 tracking-wide block uppercase">
                          ATTENDING
                        </span>
                      </div>
                      
                      <div className="bg-[#FDFBF7] border border-[#F3EBDD] rounded-lg p-2.5 text-center">
                        <Heart className="w-4 h-4 text-[#C5A059] mx-auto mb-1" />
                        <span className="text-xs font-bold text-[#C5A059] block">
                          {accepts.length}
                        </span>
                        <span className="text-[9px] text-[#C5A059]/80 tracking-wide block uppercase">
                          REPLIES (YES)
                        </span>
                      </div>

                      <div className="bg-red-50/50 rounded-lg p-2.5 text-center">
                        <Sparkles className="w-4 h-4 text-[#2C261F]/50 mx-auto mb-1" />
                        <span className="text-xs font-bold text-[#2C261F]/60 block">
                          {declines.length}
                        </span>
                        <span className="text-[9px] text-[#2C261F]/40 tracking-wide block uppercase">
                          DECLINES
                        </span>
                      </div>
                    </div>

                    {/* Guest Table/List */}
                    <div className="space-y-2">
                      <h5 className="text-[10px] tracking-widest text-[#2C261F]/55 block font-semibold uppercase">
                        GUEST RESPONSES ({submss.length})
                      </h5>
                      
                      {submss.length === 0 ? (
                        <div className="text-center p-6 border border-dashed border-[#F3EBDD] rounded-lg">
                          <Smile className="w-6 h-6 text-gray-300 mx-auto mb-1.5 animate-bounce" />
                          <p className="text-[11px] text-gray-400 font-light">
                            No RSVPs yet. Submit one using the form or seed mock replies.
                          </p>
                          <button
                            onClick={handleSeedMockReplies}
                            className="mt-3 inline-block px-3 py-1 bg-[#FAF6EE] text-[#C5A059] hover:bg-[#F3EBDD] text-[10px] font-semibold rounded-md border border-[#F3EBDD] transition-colors cursor-pointer"
                          >
                            Seed Mock Guests
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                          {submss.map((item) => (
                            <div 
                              key={item.id} 
                              className="p-2.5 rounded-lg border border-[#F3EBDD] bg-white space-y-1.5"
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-sans font-semibold text-xs text-[#2C261F]">
                                  {item.fullName}
                                </span>
                                <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-semibold ${
                                  item.attending === "yes" 
                                    ? "bg-green-50 text-green-700 border border-green-100" 
                                    : "bg-gray-100 text-gray-500"
                                }`}>
                                  {item.attending === "yes" ? `Attending (${item.guestsCount})` : "Decline"}
                                </span>
                              </div>
                              
                              <p className="text-[9px] text-gray-400 font-mono truncate">{item.email}</p>

                              {item.dietaryNotes && (
                                <div className="flex items-center gap-1 text-[10px] text-[#AF853E] bg-[#FDFBF7] p-1 rounded border border-yellow-105/50">
                                  <UtensilsCrossed className="w-3 h-3 shrink-0" />
                                  <span>Dietary: {item.dietaryNotes}</span>
                                </div>
                              )}

                              {item.wellWishes && (
                                <p className="text-[10px] text-gray-600 font-light italic leading-relaxed bg-[#FAF6EE]/55 p-1.5 rounded">
                                  "{item.wellWishes}"
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Developer / Tester Buttons */}
                    <div className="flex gap-2 pt-2 border-t border-[#F3EBDD]/50 justify-between items-center">
                      <button
                        onClick={handleClearAll}
                        className="flex items-center gap-1 text-[10px] text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer font-medium"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Clear All</span>
                      </button>

                      {submss.length > 0 && (
                        <button
                          onClick={handleSeedMockReplies}
                          className="text-[10px] text-[#C5A059] hover:text-[#AF853E] px-2.5 py-1.5 rounded-lg border border-[#F3EBDD] bg-white transition-colors cursor-pointer"
                        >
                          Refresh/Seed Mock
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
