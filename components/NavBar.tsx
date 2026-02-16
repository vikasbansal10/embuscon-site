"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import NavLink from "@/components/NavLink";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const navItems = useMemo(
    () => [
      { href: "/about", label: "About" },
      { href: "/ai", label: "AI" },
      { href: "/networks", label: "Networks" },
      { href: "/softwares", label: "Softwares" },
      { href: "/careers", label: "Careers" },
      { href: "/contact", label: "Contact" },
      { href: "/blog", label: "Blog" },
    ],
    []
  );

  // Close menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock scroll when menu open
  useEffect(() => {
    document.documentElement.classList.toggle("overflow-hidden", open);
    return () => document.documentElement.classList.remove("overflow-hidden");
  }, [open]);

  return (
    <>

      <header className="fixed top-0 left-0 right-0 z-[200] bg-brand-card/80 backdrop-blur border-b border-brand-border">
        <div className="max-w-6xl mx-auto container-px h-16 flex items-center justify-between md:grid md:grid-cols-3 md:items-center">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-3 min-w-0 md:justify-self-start">
            <Image
              src="/logo.png"
              alt="Embuscon"
              width={100}
              height={100}
              priority
              className="h-10 w-auto"
            />
            <span className="font-semibold truncate">Embuscon</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center justify-center gap-8 md:justify-self-center">
            {navItems.map((item) => (
              <NavLink key={item.href} href={item.href}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center justify-end gap-3 md:justify-self-end">
            <ThemeToggle />
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden ml-auto flex items-center">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-brand-border"
            >
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
                <path className={`line ${open ? "rotate-45 translate-y-[5px]" : ""}`} d="M4 7h16" />
                <path className={`line ${open ? "opacity-0" : ""}`} d="M4 12h16" />
                <path className={`line ${open ? "-rotate-45 -translate-y-[5px]" : ""}`} d="M4 17h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div
            className="md:hidden border-t border-brand-border bg-brand-card"
            onClick={(e) => {
              const el = e.target as HTMLElement;
              if (el.closest("a")) setOpen(false);
            }}
          >
            <nav className="px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.href}
                  href={item.href}
                  className="block rounded-lg px-3 py-2 text-base"
                >
                  {item.label}
                </NavLink>
              ))}

              <div className="pt-3 mt-3 border-t border-brand-border flex items-center justify-between px-3">
                <span className="text-sm opacity-80">Theme</span>
                <ThemeToggle />
              </div>
            </nav>
          </div>
        )}

        <style jsx>{`
          .line {
            stroke: currentColor;
            stroke-width: 2;
            stroke-linecap: round;
            transition: transform 0.25s ease, opacity 0.2s ease;
            transform-origin: 12px 12px;
          }
        `}</style>
      </header>
    </>
  );
}
