export interface EventDetails {
  title: string;
  subTitle: string;
  institution: string;
  baseLocation: string;
  dateMalay: string;
  dateGregorian: string;
  dateISO: string;
  timeMalay: string;
  venueName: string;
  hallName: string;
  address: string;
  organizer: string;
  contactEmail: string;
}

export interface ProgrammeItem {
  time: string;
  title: string;
  description: string;
  speaker?: string;
  category: 'ketibaan' | 'protokol' | 'penyampaian' | 'persembahan' | 'penutup';
}

export interface AwardRecipient {
  id: string;
  name: string;
  category: 'pra_a' | 'pra_b' | 'tahun6_a' | 'tahun6_b' | 'psr_cemerlang' | 'cemerlang_tahunan';
  categoryLabel: string;
  subCategory?: string;
  achievement: string;
  citation: string;
  class: string;
  seatNumber?: number;
  rank?: number;
  isPlaceholder?: boolean;
}
