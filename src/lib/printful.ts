/**
 * Cliente mínimo para a API da Printful (v1).
 * Docs: https://developers.printful.com/docs/
 *
 * Só deve ser usado no servidor (API routes / server actions) — nunca no browser,
 * porque usa o token privado da Printful.
 */

const PRINTFUL_BASE_URL = "https://api.printful.com";

function getToken(): string {
  const token = process.env.PRINTFUL_API_TOKEN;
  if (!token) {
    throw new Error("Falta PRINTFUL_API_TOKEN nas variáveis de ambiente.");
  }
  return token;
}

async function printfulRequest<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${PRINTFUL_BASE_URL}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
    },
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Printful API error ${res.status} em ${path}: ${body}`);
  }

  const json = await res.json();
  return json.result as T;
}

/** Resumo de um produto sincronizado, tal como devolvido pela listagem. */
export type SyncProductSummary = {
  id: number;
  external_id: string;
  name: string;
  variants: number;
  synced: number;
  thumbnail_url: string | null;
};

/** Uma variante sincronizada. `product.name` traz o nome "canónico" com cor/tamanho. */
export type SyncVariant = {
  id: number;
  sync_product_id: number;
  name: string;
  retail_price: string;
  currency: string;
  sku: string;
  product: {
    variant_id: number;
    name: string; // ex: "Unisex Organic Cotton T-Shirt | Stanley/Stella STTU169 (Black / S)"
    image: string;
  };
  files: Array<{ type: string; preview_url?: string | null }>;
};

export type SyncProductDetail = {
  sync_product: SyncProductSummary;
  sync_variants: SyncVariant[];
};

/** Lista os produtos sincronizados na loja Printful ligada a este token. */
export function listSyncProducts() {
  return printfulRequest<SyncProductSummary[]>("/store/products");
}

/** Detalhe de um produto sincronizado, incluindo variantes. */
export function getSyncProduct(id: number | string) {
  return printfulRequest<SyncProductDetail>(`/store/products/${id}`);
}

/**
 * Cria uma encomenda de produção na Printful.
 * `payload` segue o formato documentado em:
 * https://developers.printful.com/docs/#operation/createOrder
 */
export function createOrder(payload: Record<string, unknown>) {
  return printfulRequest<unknown>("/orders", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
