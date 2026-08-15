import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto_Serif } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import { LanguageProvider } from "@/lib/language-context";
import { SiteHeader } from "@/components/SiteHeader";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { CookieConsent } from "@/components/CookieConsent";
import { SiteFooter } from "@/components/SiteFooter";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const robotoSerif = Roboto_Serif({
  variable: "--font-roboto-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "VERTEX — Built by Discipline",
  description: "VERTEX. Built by Discipline.",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "VERTEX — Built by Discipline",
    description: "VERTEX. Built by Discipline.",
    images: ["/images/brand/lockup-fabric.jpg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt"
      className={`${geistSans.variable} ${geistMono.variable} ${robotoSerif.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-vertex-offwhite text-vertex-black">
        <LanguageProvider>
          <CartProvider>
            <AnnouncementBar />
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
            <CookieConsent />
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
