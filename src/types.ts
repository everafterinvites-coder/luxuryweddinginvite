export interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  description: string;
}

export interface ProgramItem {
  id: string;
  time: string;
  title: string;
  description: string;
  iconName: "Heart" | "Sparkles" | "CupSoda" | "Utensils" | "Music" | "Smile";
}

export interface RSVPResponse {
  id: string;
  fullName: string;
  email: string;
  attending: "yes" | "no";
  guestsCount: number;
  dietaryNotes?: string;
  wellWishes?: string;
  submittedAt: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  caption: string;
  aspectRatio: "1:1" | "3:4" | "4:3" | "16:9";
}
