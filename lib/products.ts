export type Product = {
  id: number;
  name: string;
  variant: string;
  price: number;
  originalPrice: number | null;
  image: string;
  backImage?: string;
  isSale: boolean;
  inStock?: boolean;
  brand?: string;
  tagline?: string;
};

export const products: Product[] = [
  // Row 1 — all visually distinct designs
  {
    id: 1,
    name: "Sugar Daddy Tee",
    variant: "BLUE & RED",
    price: 1499,
    originalPrice: 1999,
    image: "/products/sugar-daddy-navy-tee-back.jpeg",
    isSale: true,
    inStock: true,
    tagline: "Puff Screen Print",
  },
  {
    id: 2,
    name: "Tiger Design Tee",
    variant: "BLACK",
    price: 1699,
    originalPrice: 2199,
    image: "/products/tiger-tshirt.jpeg",
    isSale: true,
    inStock: true,
    tagline: "Hand Embroidery & Puff Print",
  },
  {
    id: 3,
    name: "Bombay Sapphire Tee",
    variant: "TEAL",
    price: 1699,
    originalPrice: 2199,
    image: "/products/bombay-sapphire-sage-tee-front.jpeg",
    backImage: "/products/rage-tiger-black-tee-back.jpeg",
    isSale: true,
    inStock: true,
    tagline: "Oversized Fit",
  },
  {
    id: 4,
    name: "Love Simulation Tee",
    variant: "WHITE & RED",
    price: 1699,
    originalPrice: 2199,
    image: "/products/bombay-sapphire-sage-tee-back.jpeg",
    isSale: true,
    inStock: true,
    tagline: "Fully Digital & HD Print",
  },
  // Row 2 — more unique designs
  {
    id: 5,
    name: "Apsara Aura Tee",
    variant: "BLACK",
    price: 1699,
    originalPrice: 2199,
    image: "/products/rangvirangi-pink-logo-black-tee-front-alt.jpeg",
    isSale: true,
    inStock: true,
    tagline: "Oversized Fit",
  },
  {
    id: 6,
    name: "Rage Tiger Tee",
    variant: "BLACK",
    price: 1599,
    originalPrice: 2099,
    image: "/products/blue-lips-navy-tee-back.jpeg",
    isSale: true,
    inStock: true,
    tagline: "260 GSM",
  },
  {
    id: 7,
    name: "Lips Tee",
    variant: "NAVY BLUE",
    price: 1499,
    originalPrice: 1999,
    image: "/products/WhatsApp Image 2026-02-25 at 6.07.43 PM (2).jpeg",
    isSale: true,
    inStock: true,
    tagline: "Oversized Fit",
  },
  {
    id: 8,
    name: "Legends Tee",
    variant: "WHITE",
    price: 1499,
    originalPrice: 1999,
    image: "/products/apsara-aura-black-tee-back.jpeg",
    isSale: true,
    inStock: true,
    tagline: "Oversized Fit",
  },
  {
    id: 9,
    name: "Slim Shady Tee",
    variant: "Blace",
    price: 1499,
    originalPrice: 1999,
    image: "/products/slim-shady-navy-tee-back.jpeg",
    isSale: true,
    inStock: true,
    tagline: "Oversized Fit",
  },
  {
    id: 10,
    name: "Apsara Aura Tee",
    variant: "WHITE",
    price: 1699,
    originalPrice: 2199,
    image: "/products/rangvirangi-pink-logo-black-tee-front.jpeg",
    isSale: true,
    inStock: true,
    tagline: "Oversized Fit",
  },
  {
    id: 11,
    name: "Logo Tee",
    variant: "BLACK",
    price: 1299,
    originalPrice: 1699,
    image: "/products/love-simulation-yellow-poster-alt.jpeg",
    isSale: true,
    inStock: true,
    tagline: "Oversized Fit",
  },
  {
    id: 12,
    name: "Slim Shady Tee",
    variant: "WHITE",
    price: 1299,
    originalPrice: 1699,
    image: "/products/slim-shady-navy-tee-back-alt.jpeg",
    isSale: true,
    inStock: true,
    tagline: "Oversized Fit",
  },
];
