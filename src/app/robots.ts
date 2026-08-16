import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

/**
 * Gera /robots.txt automaticamente. Bloqueamos páginas que não fazem
 * sentido no Google (carrinho é sempre vazio para o Googlebot, pesquisa
 * gera páginas infinitas com querystrings, influencer é uma área privada).
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/carrinho", "/pesquisa", "/influencer", "/api/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
