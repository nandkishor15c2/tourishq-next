export interface DestinationImage {
  id: number;
  url: string;
  alt: string;
}

export interface CardContent {
  name: string;
  tagline: string;
  tag: string;
  image: DestinationImage;
}

export interface DestinationCardData {
  card: CardContent;
}