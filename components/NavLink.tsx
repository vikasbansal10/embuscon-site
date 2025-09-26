'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import type { Route } from "next";
import clsx from "clsx";

interface Props {
  href: Route;               // ✅ typed route
  children: ReactNode;
  className?: string;
  exact?: boolean;
};

export default function NavLink({ href, children, className, exact }: Props) {
  const pathname = usePathname() || "/";
  const target = (href as string).replace(/\/$/, "");
  const current = (pathname.replace(/\/$/, "") || "/");
  const isActive = exact ? current === target : (target === "/" ? current === "/" : current.startsWith(target));

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={clsx("nav-link", isActive && "nav-link-active", className)}
    >
      {children}
    </Link>
  );
}
