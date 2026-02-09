import Image from "next/image";
import Link from "next/link";

const products = [
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

export function NewArrivals() {
  return (
    <section className="w-full bg-black py-16 px-4 md:px-8 border-t border-neutral-800">
      <div className="w-full">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 tracking-wider uppercase">
          New Arrivals
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((product) => (
            <Link
              href={`/product/${product.id}`}
              key={product.id}
              className="group"
            >
              {/* Image Container */}
              <div className="relative aspect-3/4 overflow-hidden bg-neutral-900 mb-3">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {product.isSale && (
                  <span className="absolute top-2 left-2 bg-white text-black text-[10px] font-bold px-2 py-1 uppercase">
                    Sale
                  </span>
                )}
              </div>

              {/* Product Details */}
              <div className="space-y-1">
                <h3 className="text-white text-xs md:text-sm font-medium uppercase tracking-wide leading-tight">
                  {product.name}
                </h3>
                {product.variant && (
                  <p className="text-neutral-500 text-[10px] uppercase tracking-wide">
                    {product.variant}
                  </p>
                )}
                <div className="flex items-center gap-2 pt-1">
                  {product.originalPrice && (
                    <span className="text-neutral-500 text-xs line-through">
                      ₹{product.originalPrice.toLocaleString()}
                    </span>
                  )}
                  <span className="text-white text-xs font-medium">
                    ₹{product.price.toLocaleString()}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Link
            href="/shop"
            className="px-10 py-3 border border-neutral-600 text-white text-xs uppercase font-bold tracking-widest hover:bg-white hover:text-black transition-all duration-300"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
