import VertexAgentChat from "@/components/vertex-agent-chat";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto_Serif } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import { LanguageProvider } from "@/lib/language-context";
import { SiteHeader } from "@/components/SiteHeader";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { CookieConsent } from "@/components/CookieConsent";
import { SiteFooter } from "@/components/SiteFooter";
import {
  SITE_URL,
  SITE_NAME,
  DEFAULT_TITLE,
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
} from "@/lib/seo";

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
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  openGraph: {
    type: "website",
    locale: "pt_PT",
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: "/",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
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
        <VertexAgentChat />
      </body>
    </html>
  );
}
