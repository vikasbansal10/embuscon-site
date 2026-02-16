import "./globals.css";
import type { ReactNode } from "react";
import Script from "next/script";
import Navbar from "@/components/NavBar";   // ✅ now from components folder


export const metadata = {
  title: "Embuscon — Empowering Business thru Consulting",
  description: "Data Platform Modernization • Agentic AI • Delivery • Legal",
  other: { "color-scheme": "dark light" },
  icons: { icon: "/favicon.ico"}
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col">
        <Script id="theme-init" strategy="beforeInteractive">{`(function(){try{
          var s = localStorage.getItem('theme');
          if (s === 'light') document.documentElement.classList.remove('dark');
          else document.documentElement.classList.add('dark');
        }catch(e){document.documentElement.classList.add('dark');}})();`}</Script>

        <Navbar />

      <main className="flex-1 pt-16">{children}</main>

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
