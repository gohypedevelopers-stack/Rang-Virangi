export type Product = {
  id: number;
  name: string;
  variant: string;
  price: number;
  originalPrice: number | null;
  image: string;
  isSale: boolean;
};

export const products: Product[] = [
  {
    id: 1,
    name: "Ash-Fall Sweatpants",
    variant: "ACID WASHED",
    price: 1399,
    originalPrice: null,
    image:
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=600&auto=format&fit=crop",
    isSale: false,
  },
  {
    id: 2,
    name: "VAULT-XII Cargo",
    variant: "",
    price: 2199,
    originalPrice: null,
    image:
      "https://images.unsplash.com/photo-1512400930990-e0bc0bd809df?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isSale: false,
  },
  {
    id: 3,
    name: "Pride Blood Sweatpants",
    variant: "BLACK ASH",
    price: 1599,
    originalPrice: null,
    image:
      "https://images.unsplash.com/photo-1622567893612-a5345baa5c9a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aG9vZHl8ZW58MHx8MHx8fDA%3D",
    isSale: false,
  },
  {
    id: 4,
    name: "Malignant Prophecy Hoodie",
    variant: "BLACK ASH COLORWAY",
    price: 1699,
    originalPrice: 1999,
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=600&auto=format&fit=crop",
    isSale: true,
  },
  {
    id: 5,
    name: "Crypted Glyph Hoodie",
    variant: "BLOODSTONE",
    price: 1699,
    originalPrice: 1999,
    image:
      "https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?q=80&w=600&auto=format&fit=crop",
    isSale: true,
  },
  {
    id: 6,
    name: "Crypted Glyph Hoodie",
    variant: "BLACK ASH",
    price: 1699,
    originalPrice: 1999,
    image:
      "https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?q=80&w=600&auto=format&fit=crop",
    isSale: true,
  },
  {
    id: 7,
    name: "Fragmented Species Hoodie",
    variant: "BLOODSTONE",
    price: 1699,
    originalPrice: 1999,
    image:
      "https://images.unsplash.com/photo-1559563458-527698bf5295?q=80&w=600&auto=format&fit=crop",
    isSale: true,
  },
  {
    id: 8,
    name: "Inferno Protocol",
    variant: "OFF-WHITE",
    price: 2288,
    originalPrice: null,
    image:
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=600&auto=format&fit=crop",
    isSale: false,
  },
];
