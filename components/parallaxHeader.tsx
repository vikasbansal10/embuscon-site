"use client";

import Image from "next/image";
import clsx from "clsx";

interface ParallaxHeaderProps  {
  title: string;
  subtitle?: string;
  imageSrc: string;
  heightClass?: string;
  className?: string;
};

export default function ParallaxHeader({
  title,
  subtitle,
  imageSrc,
  heightClass = "min-h-[260px] h-[38vh] md:h-[42vh] lg:h-[50vh]",
  className,
}: ParallaxHeaderProps) {
  return (
    <section
      className={clsx(
        "relative overflow-hidden rounded-3xl border border-brand-border",
        heightClass,
        className
      )}
    >
      <Image
        src={imageSrc}
        alt={title}
        fill
        priority
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 1100px"
      />

      {/* Overlay for contrast */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/20" />

      {/* Content: center on mobile (less empty top), bottom on md+ */}
      <div className="relative z-10 h-full flex items-center md:items-end">
        <div className="w-full px-4 sm:px-6 md:px-10 py-6 md:pb-10">
          <div className="max-w-3xl">
            <h1 className="font-extrabold tracking-tight text-white leading-[1.05] text-[clamp(1.8rem,6vw,4rem)]">
              {title}
            </h1>

            {subtitle ? (
              <p className="mt-3 text-white/90 leading-relaxed text-[clamp(0.95rem,2.8vw,1.25rem)] max-w-2xl">
                {subtitle}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
