export interface HeroImage {
  id: number;
  url: string;
  alt: string;
  location?: string;
}

export interface SliderConfig {
  autoPlayInterval: number;
  transitionDuration: number;
}

export interface HeroContent {
  title: string;
  subtitle: string;
  images: HeroImage[];
  slider: SliderConfig;
}

export interface HeroData {
  hero: HeroContent;
}