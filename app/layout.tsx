import type { Metadata } from "next";
import { Navbar } from "../components/navbar";
import { Footer } from "../components/ui/large-name-footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rang Virangi - Premium Streetwear",
  description:
    "Premium streetwear collection with bold designs and quality craftsmanship.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground antialiased min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
