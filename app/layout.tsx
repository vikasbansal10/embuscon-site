import "./globals.css";
import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import NavLink from "@/components/NavLink";
import { ThemeToggle } from "@/components/ThemeToggle";

export const metadata = {
  title: "Embuscon — Empowering Business thru Consulting",
  description: "Data Platform Modernization • Agentic AI • Delivery • Legal",
  other: { "color-scheme": "dark light" }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col">
        {/* set persisted theme before paint; default dark */}
        <Script id="theme-init" strategy="beforeInteractive">{`(function(){try{
          var s = localStorage.getItem('theme');
          if (s === 'light') document.documentElement.classList.remove('dark');
          else document.documentElement.classList.add('dark');
        }catch(e){document.documentElement.classList.add('dark');}})();`}</Script>

        <header className="sticky top-0 z-50 bg-brand-card/80 backdrop-blur border-b border-brand-border">
          <div className="max-w-6xl mx-auto container-px h-16 flex items-center justify-between">
            {/* Step 7: Embuscon click -> home */}
            <Link href="/" className="flex items-center gap-3">
              <Image src="/logo.png" alt="Embuscon" width={100} height={100} priority className="h-200 w-200" />
              <span className="font-semibold">Embuscon</span>
            </Link>

            {/* Step 4,5,6: theme toggle */}
            <div className="ml-auto flex items-center gap-3">
              <nav className="flex items-center gap-2">
                <NavLink href="/about">About</NavLink>
                <NavLink href="/services">Services</NavLink>
                <NavLink href="/contact">Contact</NavLink>
              </nav>
              <ThemeToggle />
            </div>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="border-t border-brand-border">
          <div className="max-w-6xl mx-auto container-px py-8 text-sm flex flex-col sm:flex-row items-center justify-between gap-3">
            <p>© {new Date().getFullYear()} Embuscon. All rights reserved.</p>
            <p className="opacity-80">“Empowering Business thru Consulting”</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
