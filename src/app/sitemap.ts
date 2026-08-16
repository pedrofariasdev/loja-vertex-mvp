import type { MetadataRoute } from "next";
import { createPublicServerClient } from "@/lib/supabase/public";
import { journalPosts } from "@/lib/journal";
import { SITE_URL } from "@/lib/seo";

/**
 * Gera /sitemap.xml automaticamente a partir de:
 * 1. Páginas estáticas institucionais (prioridade baixa/média).
 * 2. Produtos ativos, lidos diretamente da base de dados — assim, quando
 *    ativamos um produto novo, ele aparece aqui sem precisarmos de mexer
 *    em código nenhum.
 * 3. Posts do Jornal.
 */

const STATIC_PAGES: Array<{
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
}> = [
  { path: "/", priority: 1, changeFrequency: "daily" },
  { path: "/sobre", priority: 0.6, changeFrequency: "monthly" },
  { path: "/contacto", priority: 0.4, changeFrequency: "yearly" },
  { path: "/jornal", priority: 0.5, changeFrequency: "weekly" },
  { path: "/guia-tamanhos", priority: 0.5, changeFrequency: "yearly" },
  { path: "/envios", priority: 0.3, changeFrequency: "yearly" },
  { path: "/devolucoes", priority: 0.3, changeFrequency: "yearly" },
  { path: "/termos", priority: 0.2, changeFrequency: "yearly" },
  { path: "/privacidade", priority: 0.2, changeFrequency: "yearly" },
  { path: "/cookies", priority: 0.2, changeFrequency: "yearly" },
];

async function getProductSitemapEntries(): Promise<MetadataRoute.Sitemap> {
  const supabase = createPublicServerClient();
  const { data, error } = await supabase
    .from("products")
    .select("slug, updated_at")
    .eq("active", true);

  if (error || !data) return [];

  return data.map((product) => ({
    url: `${SITE_URL}/produto/${product.slug}`,
    lastModified: product.updated_at ? new Date(product.updated_at) : undefined,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = STATIC_PAGES.map((page) => ({
    url: `${SITE_URL}${page.path}`,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  const journalEntries: MetadataRoute.Sitemap = journalPosts.map((post) => ({
    url: `${SITE_URL}/jornal/${post.slug}`,
    changeFrequency: "monthly",
    priority: 0.4,
  }));

  const productEntries = await getProductSitemapEntries();

  return [...staticEntries, ...productEntries, ...journalEntries];
}
