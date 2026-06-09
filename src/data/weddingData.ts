import { TimelineEvent, ProgramItem, GalleryImage } from "../types";

export const WEDDING_DATE = "2027-06-26T16:00:00Z"; // Celebrated on June 26, 2027 at 4:00 PM

export const COUPLE_INFO = {
  brideName: "Alexandra",
  brideNick: "Alex",
  groomName: "Dylan",
  groomNick: "Dylan",
  combined: "Alexandra & Dylan",
  initials: "A & D",
  venueName: "Villa d'Este",
  venueLocation: "Lake Como, Italy",
  fullAddress: "Via Regina 40, 22012 Cernobbio, Como, Italy",
  mapsUrl: "https://maps.google.com/?q=Villa+d'Este+Lake+Como+Cernobbio",
  dressCodeTitle: "Black Tie Optional",
  dressCodeDesc: "We invite you to dress in elegant formal attire. Gowns, tuxedoes, or dark suits are welcome. Let ourselves blend into the timeless romance of Lake Como.",
  dressCodePalette: [
    { name: "Cream & Champagne", class: "bg-[#F3EBDD] border border-gray-200" },
    { name: "Soft Sage", class: "bg-[#5F6F5E] text-white" },
    { name: "Smoky Gold", class: "bg-[#C5A059] text-white" },
    { name: "Dusk Slate", class: "bg-[#2C261F] text-white" }
  ],
  quote: "Two lives, two hearts, joined in one love, beneath the eternal skies of Lago di Como.",
  // --- CUSTOMIZABLE ALBUM URL (COMMITTED TO GITHUB) ---
  // Replace this link with your own Google Photos, Joy, Wedbox, or shared digital album link!
  photoUploadUrl: "https://photos.app.goo.gl/8e3Dev6sPi5qRLpw9",
};

export const STORY_TIMELINE: TimelineEvent[] = [
  {
    id: "story-1",
    year: "2020",
    title: "How We Met",
    description: "Our paths crossed serendipitously on a rainy afternoon in Paris. A shared umbrella, a missed train, and a three-hour conversation over warm espresso set a beautiful journey in motion."
  },
  {
    id: "story-2",
    year: "2022",
    title: "First Big Adventure",
    description: "We traveled to the quiet shores of Lake Como. Falling in love with the calm waters and historic terraces, we looked at each other and agreed: if we ever marrry, it must be right here."
  },
  {
    id: "story-3",
    year: "2024",
    title: "Moving Forward",
    description: "From renovating our first cozy apartment to adopting a mischievous golden retriever named Como, we grew together, learning that home is not a place, but a person."
  },
  {
    id: "story-4",
    year: "2026",
    title: "The Proposal",
    description: "On a crisp autumn morning under a canopy of golden leaves, Dylan knelt down, offering a vintage gold band, and asked the easiest question Alexandra would ever have to answer."
  }
];

export const PROGRAM_TIMELINE: ProgramItem[] = [
  {
    id: "prog-1",
    time: "4:00 PM",
    title: "The Welcome",
    description: "Guests arrive at the Lakeside Mosaic Court. Classical harpist accompaniment with ice-cold champagne.",
    iconName: "Smile"
  },
  {
    id: "prog-2",
    time: "4:30 PM",
    title: "The Vows Ceremony",
    description: "Overlooking the water, Alexandra and Dylan will exchange their vows under the canopy of ancient cypress trees.",
    iconName: "Heart"
  },
  {
    id: "prog-3",
    time: "5:30 PM",
    title: "Cocktails & Aperitivos",
    description: "Sip custom botanical cocktails and enjoy traditional Italian snacks on the floating lake pool deck.",
    iconName: "CupSoda"
  },
  {
    id: "prog-4",
    time: "7:00 PM",
    title: "The Celebration Dinner",
    description: "An elegant, candlelit four-course seasonal gourmet dinner inside the historic Grand Hall garden tent.",
    iconName: "Utensils"
  },
  {
    id: "prog-5",
    time: "9:00 PM",
    title: "First Dance & Sparklers",
    description: "Alexandra and Dylan's inaugural waltz as husband and wife, followed by champagne toasts and sparkler lights.",
    iconName: "Sparkles"
  },
  {
    id: "prog-6",
    time: "10:30 PM",
    title: "Late Night Dancing",
    description: "Let's dance under the stars. Live classical-jazz band morphs into upbeat sets.",
    iconName: "Music"
  }
];

export const GALLERY_PHOTOS = (weddingHero: string, weddingCouple: string, weddingDetail: string): GalleryImage[] => [
  {
    id: "gal-1",
    src: weddingHero,
    alt: "The Grand Courtyard Venue",
    caption: "Forever begins with this promise.",
    aspectRatio: "3:4"
  },
  {
    id: "gal-2",
    src: weddingCouple,
    alt: "Love in the Garden",
    caption: "Under the stars, our story unfolds",
    aspectRatio: "3:4"
  },
  {
    id: "gal-3",
    src: weddingDetail,
    alt: "The Elegant Dining Settings",
    caption: "An intimate romantic candlelit setting for our friends and family",
    aspectRatio: "4:3"
  },
  {
    id: "gal-4",
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=600",
    alt: "Foliage and White Peonies",
    caption: "The curated luxury flora and gold palette details",
    aspectRatio: "4:3"
  },
  {
    id: "gal-5",
    src: new URL("../assets/images/getting ready.jfif", import.meta.url).href,
    alt: "Sparkler Exit",
    caption: "Getting ready for our forever",
    aspectRatio: "16:9"
  },
  {
    id: "gal-6",
    src: new URL("../assets/images/flowers.jfif", import.meta.url).href,
    alt: "Elegant Flowers in Bloom",
    caption: "Walking hand in hand toward our forever.",
    aspectRatio: "1:1"
  }
];

export const FAQ_ITEMS = [
  {
    question: "When should I RSVP by?",
    answer: "Please kindly submit your RSVP by September 15, 2026, using the RSVP form below so we can finalize our dining and seating arrangements."
  },
  {
    question: "Can I bring a plus one?",
    answer: "Due to space constraints at the historic villa venue, we are only able to accommodate guests explicitly listed in your digital invite or invitation card."
  },
  {
    question: "Is there a registries or gift wishing well?",
    answer: "Your warm presence on our special day is the greatest present we could ask for. If you wish to bless us with a gift, a contribution button to our luxury honeymoon wishing well is available under the registry tab."
  },
  {
    question: "How do I get to Villa d'Este from Milan airport?",
    answer: "Milan Malpensa (MXP) is the closest major airport. From there, it is a scenic 45-minute drive via the A8/A9 highway, or you can take the Malpensa Express train into Como Town, where we will provide a private shuttle service."
  }
];
