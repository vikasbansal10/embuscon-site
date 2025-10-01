"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";

interface Props {
  title: string;
  subtitle?: string;
  imageSrc: string;             // e.g. "/images/about-hero.jpg"
  heightClass?: string;         // e.g. "h-[42vh] md:h-[56vh]"
  className?: string;
};

export default function ParallaxHeader({
  title,
  subtitle,
  imageSrc,
  heightClass = "h-[36vh] md:h-[44vh] lg:h-[52vh]",
  className = "",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Track scroll relative to this section
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"], // 0 when top hits top, 1 when bottom hits top
  });

  // Parallax transforms
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const scaleBg = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  return (
    <div
      ref={ref}
      className={`relative w-full overflow-hidden rounded-2xl border border-brand-border ${heightClass} ${className}`}
    >
      {/* Background image */}
      <motion.div
        className="absolute inset-0"
        style={prefersReducedMotion ? undefined : { y: yBg, scale: scaleBg }}
      >
        <Image
          src={imageSrc}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      {/* Overlay gradient for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-transparent dark:from-black/60" />

      {/* Foreground copy */}
      <motion.div
        className="relative z-10 h-full flex items-center justify-center text-center px-6"
        style={prefersReducedMotion ? undefined : { y: yText }}
      >
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold text-white">{title}</h1>
          {subtitle ? (
            <p className="mt-3 text-neutral-100/90 text-lg">{subtitle}</p>
          ) : null}
        </div>
      </motion.div>
    </div>
  );
}
