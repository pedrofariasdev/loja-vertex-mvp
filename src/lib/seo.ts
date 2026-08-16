/**
 * Configuração central de SEO. Tudo o que precisa de ser consistente em
 * várias páginas (URL do site, nome da marca, imagem de partilha por
 * omissão) vive aqui, para não repetirmos o mesmo valor em 10 ficheiros
 * diferentes e arriscarmos ficarem dessincronizados.
 *
 * SITE_URL: fixo no domínio de produção, de propósito — ficheiros de SEO
 * (sitemap, robots, canonical, JSON-LD) só interessam quando o site está
 * mesmo publicado, por isso não dependem de NEXT_PUBLIC_SITE_URL (essa
 * variável fica só em .env.local como "localhost", para outras partes do
 * código tipo o checkout da Stripe funcionarem em desenvolvimento). Assim
 * evitamos o sitemap apontar para "localhost" se a variável não estiver
 * bem configurada na Vercel.
 */

export const SITE_URL = "https://www.vertexwear.site";

export const SITE_NAME = "VERTEX";

export const DEFAULT_TITLE = "VERTEX — Built by Discipline";

export const DEFAULT_DESCRIPTION =
  "VERTEX — roupa e acessórios streetwear/performance para quem constrói algo todos os dias. T-shirts, hoodies, joggers, calções e boné em algodão orgânico e materiais técnicos. Envio para Portugal e Europa.";

export const DEFAULT_OG_IMAGE = "/images/brand/lockup-fabric.jpg";

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
