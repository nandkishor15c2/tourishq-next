export interface SideTitleCarouselData {
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  products: {
    id: number;
    name: string;
    destination: string;
    days: number;
    nights: number;
    tags: string[];
    price: number;
    image: { url: string; alt: string };
  }[];
}