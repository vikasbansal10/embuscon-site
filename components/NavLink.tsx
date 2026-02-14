"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

interface NavLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

/**
 * NavLink
 * - Highlights when current path matches the link
 * - `startsWith` so `/blog` is also active on `/blog/some-post`
 * - Allows extra classes (e.g. mobile: block, px-3, py-2)
 */
export default function NavLink({ href, children, className = "" }: NavLinkProps) {
  const pathname = usePathname();

  const isActive =
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(href + "/");

  // ✅ Slightly larger by default. Mobile overrides (text-base) still win.
  const baseClasses = "text-[15.5px] md:text-base transition-colors";

  const activeClasses = "text-emerald-400 font-medium";
  const inactiveClasses = "opacity-80 hover:opacity-100";

  const combined =
    `${baseClasses} ${isActive ? activeClasses : inactiveClasses} ${className}`.trim();

  return (
    <Link href={href} className={combined}>
      {children}
    </Link>
  );
}
