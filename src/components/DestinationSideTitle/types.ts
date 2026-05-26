export interface DestinationSideTitleData {
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  destinations: {
    id: number;
    name: string;
    tagline: string;
    tag: string;
    image: { url: string; alt: string };
  }[];
}