"use client";

import Image from "next/image";

const previewItems = [
  "/images/imagewall/prismaflame.png",
  "/images/imagewall/silvanvi.png",
  "/images/imagewall/prismabellow.png",
  "/images/imagewall/goldtong.png",
  "/images/imagewall/silverhammer.png",
];

export default function ImageWall() {
  return (
    <div className="flex flex-col items-center">
      {/* Featured GIF */}
      <div className="relative w-full aspect-square mb-6 rounded-lg overflow-hidden border border-white/20">
        <img
          src="/kttys.gif"
          alt="Animated KTTYs"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Infinite Scrolling Preview Strip */}
      <div className="w-full overflow-hidden">
        <div className="flex w-max animate-scroll">
          {[...previewItems, ...previewItems, ...previewItems].map((src, i) => (
            <div key={i} className="relative w-24 h-24 flex-shrink-0 mx-3">
              <Image
                src={src}
                alt={`Preview ${i}`}
                fill
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        .animate-scroll {
          display: inline-flex;
          animation: scroll 20s linear infinite;
        }
      `}</style>
    </div>
  );
}
