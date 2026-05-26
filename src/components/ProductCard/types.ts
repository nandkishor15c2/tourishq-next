export interface Product {
  id: number;
  name: string;
  destination: string;
  days: number;
  nights: number;
  tags: string[];
  price: number;
  image: { url: string; alt: string };
}

export interface ProductCarouselProps {
  products: Product[];
}