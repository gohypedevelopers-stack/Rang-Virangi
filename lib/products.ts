export type Product = {
  id: number;
  name: string;
  variant: string;
  price: number;
  originalPrice: number | null;
  image: string;
  backImage?: string;
  gallery?: string[];
  isSale: boolean;
  inStock?: boolean;
  brand?: string;
  tagline?: string;
  description?: string;
  gsm?: number | string;
  fabric?: string;
  print?: string;
  highlights?: string[];
  fit?: string;
  collection: "featured" | "shop";
  category: "Tees" | "Bottoms" | "Hoodies" | "Outerwear";
};

export const products: Product[] = [
  // --- 1. Culture Symphony (Featured #1) ---
  {
    id: 1,
    name: "Culture Symphony Tour Tee",
    variant: "WHITE",
    price: 1202,
    originalPrice: 1999,
    image: "/culture-white-front.jpg",
    backImage: "/culture-white-back.jpg",
    gallery: ["/culture-white-front.jpg", "/culture-white-back.jpg", "/culture-navy-back.jpg", "/culture-black-back.jpg"],
    isSale: true,
    inStock: true,
    brand: "RANG VIRANGI",
    tagline: "High-Density Digital Print & Heavyweight Terry",
    fabric: "310 GSM Cotton Terry",
    gsm: 310,
    print: "High-Density Full Back Digital Print",
    fit: "Oversized Streetwear Fit",
    description: "The Culture Symphony Tour Tee is custom-crafted for urban subcultures. Constructed from breathable 310 GSM luxury cotton terry, this tee merges structure with daily absolute comfort. It packs high-definition digital front displays backed by continuous seamless continuous graphic detailing rows.",
    highlights: [
      "Heavyweight 310 GSM luxury cotton terry",
      "High-definition seamless digital prints",
      "Streetwear relaxed oversized fit",
      "Durable neck-trim detailing",
      "Crafted in India"
    ],
    collection: "featured",
    category: "Tees",
  },
  {
    id: 2,
    name: "Culture Symphony Tee — Navy",
    variant: "NAVY",
    price: 1202,
    originalPrice: 1999,
    image: "/culture-navy-back.jpg",
    isSale: true,
    inStock: true,
    collection: "featured",
    category: "Tees",
  },
  {
    id: 3,
    name: "Culture Symphony Tee — Black",
    variant: "BLACK",
    price: 1202,
    originalPrice: 1999,
    image: "/culture-black-back.jpg",
    isSale: true,
    inStock: true,
    collection: "featured",
    category: "Tees",
  },

  // --- 2. Sugar Daddy (Featured #2) ---
  {
    id: 4,
    name: "Sugar Daddy Oversized T-Shirt",
    variant: "NAVY BLUE",
    price: 1505,
    originalPrice: 1999,
    image: "/sugar-daddy-tee.jpg",
    isSale: true,
    inStock: true,
    tagline: "Puff Screen Print Texture",
    fabric: "260 GSM Premium Cotton",
    gsm: 260,
    print: "3D Puff Screen Print Raised Texture",
    fit: "Oversized Streetwear Fit",
    description: "The Sugar Daddy Oversized Tee is built for bold personalities who like their fashion loud and confident. Crafted from 260 GSM heavyweight premium cotton, it gives raised text profiles outwards using pure 3D dimension puff coatings.",
    highlights: [
      "260 GSM heavyweight premium cotton",
      "Raised 3D puff screen printing",
      "Boxy oversized streetwear silhouette",
      "Unisex fit suitable for all builds"
    ],
    collection: "featured",
    category: "Tees",
  },

  // --- 3. Love Simulation (Featured #3) ---
  {
    id: 5,
    name: "Love Simulation Oversized T-Shirt",
    variant: "WHITE",
    price: 1095,
    originalPrice: 1999,
    image: "/love-tee-mock.jpg",
    isSale: true,
    inStock: true,
    tagline: "Full Back Digital Print + HD Tech details",
    fabric: "260 GSM Premium Cotton",
    gsm: 260,
    print: "Full Back Digital Print + HD Print",
    fit: "Oversized Fit",
    description: "The Love Simulation Tee blends futuristic graphics with modern streetwear aesthetics. Constructed using durable 260 GSM fibers, providing durability while maintaining daily breathability.",
    highlights: [
      "Heavyweight 260 GSM breathable cotton",
      "High detailed vector back graphics",
      "Overlaid text visual buffers",
      "Available in White bases"
    ],
    collection: "featured",
    category: "Tees",
  },

  // --- 4. Bombay Sapphire (Featured #4) ---
  {
    id: 6,
    name: "Bombay Sapphire Oversized T-Shirt",
    variant: "SAGE GREEN",
    price: 909,
    originalPrice: 1999,
    image: "/products/bombay-sapphire-sage-tee-front.jpeg",
    backImage: "/products/bombay-sapphire-sage-tee-back.jpeg",
    isSale: true,
    inStock: true,
    tagline: "Neck Embroidery + Back Digital Print",
    fabric: "260 GSM Premium Cotton",
    gsm: 260,
    print: "Neck Embroidery + Back Digital Print",
    fit: "Oversized Fit",
    description: "The Bombay Sapphire Tee blends subtle detailing with bold back art frames. A unique edge is its delicate detailed embroidery around the outer neck collars.",
    highlights: [
      "260 GSM premium cotton fiber",
      "Front-neck embroidery anchors",
      "High detailed botanical back print"
    ],
    collection: "featured",
    category: "Tees",
  },

  // --- 5. Tigers & Logo (Shop / Slider Items) ---
  {
    id: 7,
    name: "Tiger Oversized T-Shirt",
    variant: "BLACK",
    price: 1505,
    originalPrice: 2199,
    image: "/products/tiger-tshirt.jpeg",
    isSale: true,
    inStock: true,
    tagline: "Hand Embroidery & Puff Print",
    fabric: "270 GSM Premium Cotton",
    gsm: 270,
    print: "Hand Embroidery + Puff Screen Print",
    fit: "Oversized Fit",
    description: "Craftsmanship meets fierce aesthetics layout setups. This 270 GSM edition contains raw embroidery and puff textures outwards effectively.",
    collection: "featured",
    category: "Tees",
  },
  {
    id: 8,
    name: "Tiger Rage Oversized T-Shirt",
    variant: "BLACK",
    price: 1505,
    originalPrice: 2099,
    image: "/products/blue-lips-navy-tee-back.jpeg",
    isSale: true,
    inStock: true,
    collection: "featured",
    category: "Tees",
  },
  {
    id: 9,
    name: "Fangs Before Feelings T-Shirt",
    variant: "NAVY",
    price: 1505,
    originalPrice: 2099,
    image: "/products/blue-lips-navy-tee-back.jpeg",
    isSale: true,
    inStock: true,
    collection: "shop",
    category: "Tees",
  },
  {
    id: 10,
    name: "Apsara Aura T-Shirt",
    variant: "RED",
    price: 1202,
    originalPrice: 2099,
    image: "/products/apsara-aura-black-tee-back.jpeg",
    isSale: true,
    inStock: true,
    collection: "shop",
    category: "Tees",
  },
  {
    id: 11,
    name: "Slim Shady Edition",
    variant: "NAVY",
    price: 1399,
    originalPrice: 1799,
    image: "/products/slim-shady-navy-tee-back.jpeg",
    isSale: false,
    inStock: true,
    collection: "shop",
    category: "Tees",
  },
  {
    id: 12,
    name: "Aura Symphony Tee 01",
    variant: "WHITE",
    price: 1199,
    originalPrice: 1999,
    image: "https://i.postimg.cc/1X3KgdxN/pr1.jpg",
    isSale: true,
    inStock: true,
    collection: "shop",
    category: "Tees",
  },
  {
    id: 13,
    name: "Aura Symphony Tee 02",
    variant: "BLACK",
    price: 1199,
    originalPrice: 1999,
    image: "https://i.postimg.cc/7Zkn0by6/pr2.jpg",
    isSale: true,
    inStock: true,
    collection: "shop",
    category: "Tees",
  },
  {
    id: 14,
    name: "Aura Symphony Tee 03",
    variant: "WHITE / GRAPHIC",
    price: 1199,
    originalPrice: 1999,
    image: "https://i.postimg.cc/3wLXsB0j/pr3.jpg",
    isSale: true,
    inStock: true,
    collection: "shop",
    category: "Tees",
  }
];
