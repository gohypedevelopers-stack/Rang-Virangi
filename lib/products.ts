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
];
