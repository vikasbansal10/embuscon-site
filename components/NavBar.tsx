"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import NavLink from "@/components/NavLink";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // Lock/unlock scroll on <html>
  useEffect(() => {
    document.documentElement.classList.toggle("overflow-hidden", open);
    return () => document.documentElement.classList.remove("overflow-hidden");
  }, [open]);

  return (
    <header className="sticky top-0 z-50 bg-brand-card/80 backdrop-blur border-b border-brand-border">
      <div className="max-w-6xl mx-auto container-px h-16 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Embuscon"
            width={100}
            height={100}
            priority
            className="h-200 w-200"
          />
          <span className="font-semibold">Embuscon</span>
        </Link>

        {/* Desktop nav */}
        <div className="ml-auto hidden md:flex items-center gap-3">
          <nav className="flex items-center gap-2">
            <NavLink href="/about">About</NavLink>
            <NavLink href="/services">Services</NavLink>

            {/* ⭐ New Blog link */}
            <NavLink href="/blog">Blog</NavLink>

            <NavLink href="/contact">Contact</NavLink>
          </nav>
          <ThemeToggle />
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl border border-brand-border"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-controls="mobile-menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg
            className="hamburger"
            viewBox="0 0 24 24"
            width="22"
            height="22"
            aria-hidden="true"
          >
            <path className={`line line1 ${open ? "x1" : ""}`} d="M4 7h16" />
            <path className={`line line2 ${open ? "x2" : ""}`} d="M4 12h16" />
            <path className={`line line3 ${open ? "x3" : ""}`} d="M4 17h16" />
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`md:hidden ${
          open ? "" : "hidden"
        } border-t border-brand-border bg-brand-card`}
        onClick={(e) => {
          const target = e.target as HTMLElement;
          if (target.tagName === "A") setOpen(false);
        }}
      >
        <nav className="px-4 py-3 grid gap-2">
          <NavLink href="/about" className="block rounded-lg px-3 py-2 text-base">
            About
          </NavLink>
          <NavLink
            href="/services"
            className="block rounded-lg px-3 py-2 text-base"
          >
            Services
          </NavLink>

          {/* ⭐ New Blog link (mobile) */}
          <NavLink href="/blog" className="block rounded-lg px-3 py-2 text-base">
            Blog
          </NavLink>

          <NavLink
            href="/contact"
            className="block rounded-lg px-3 py-2 text-base"
          >
            Contact
          </NavLink>
          <div className="pt-2 border-t border-brand-border flex items-center justify-between px-3">
            <span className="text-sm opacity-80">Theme</span>
            <ThemeToggle />
          </div>
        </nav>
      </div>

      <style jsx>{`
        .hamburger .line {
          stroke: currentColor;
          stroke-width: 2;
          stroke-linecap: round;
          transition: transform 0.2s, opacity 0.2s;
        }
        .x1 {
          transform: translateY(5px) rotate(45deg);
        }
        .x2 {
          opacity: 0;
        }
        .x3 {
          transform: translateY(-5px) rotate(-45deg);
        }
      `}</style>
    </header>
  );
}
