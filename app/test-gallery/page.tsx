import fs from "fs";
import path from "path";
import Image from "next/image";

export default async function TestGallery() {
  const dirPath = path.join(process.cwd(), "public", "products");
  const files = fs
    .readdirSync(dirPath)
    .filter((f) => f.startsWith("WhatsApp Image"));

  return (
    <div className="p-8 bg-white min-h-screen">
      <h1 className="text-3xl font-bold text-black mb-8">WhatsApp Images</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {files.map((file) => (
          <div key={file} className="border border-neutral-200 p-2">
            <div className="relative aspect-[3/4] w-full bg-neutral-100">
              <Image
                src={`/products/${file}`}
                alt={file}
                fill
                className="object-contain"
              />
            </div>
            <p className="text-[10px] text-black mt-2 break-words">{file}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
