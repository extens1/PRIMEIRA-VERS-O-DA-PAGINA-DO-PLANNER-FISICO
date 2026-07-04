export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface Testimonial {
  id: string;
  name: string;
  childrenInfo: string;
  avatarUrl: string;
  text: string;
  rating: number;
}

export interface PlannerTab {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  badge: string;
  contentLines: string[];
}

export interface KitOption {
  id: string;
  name: string;
  tagline: string;
  originalPrice: number;
  salePrice: number;
  installments: number;
  installmentValue: number;
  isPopular: boolean;
  savings: number;
  benefits: string[];
}
