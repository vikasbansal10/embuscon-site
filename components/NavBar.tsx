"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import NavLink from "@/components/NavLink";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Menu, X } from "lucide-react";

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
          <Link href="/" className="flex items-center min-w-0 md:justify-self-start">
            <Image
              src="/Embuscon.png"
              alt="Embuscon"
              width={311}
              height={83}
              sizes="(max-width: 768px) 180px, 220px"
              priority
              className="h-9 w-auto md:h-10"
            />
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
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden border-t border-brand-border bg-brand-card">
            <nav className="px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.href}
                  href={item.href}
                  className="block rounded-lg px-3 py-2 text-base"
                  onClick={() => setOpen(false)}
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


      </header>
    </>
  );
}
