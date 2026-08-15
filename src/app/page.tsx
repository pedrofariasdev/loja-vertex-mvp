import Image from "next/image";
import Link from "next/link";
import { createPublicServerClient } from "@/lib/supabase/public";

type ProductVariant = {
  id: string;
  price_cents: number;
  currency: string;
  image_url: string | null;
  size: string | null;
  color: string | null;
};

type Product = {
  id: string;
  name: string;
  slug: string;
  image_url: string | null;
  product_variants: ProductVariant[];
};

async function getProducts(): Promise<Product[]> {
  const supabase = createPublicServerClient();
  const { data, error } = await supabase
    .from("products")
    .select(
      "id, name, slug, image_url, product_variants(id, price_cents, currency, image_url, size, color)"
    )
    .eq("active", true)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Erro ao carregar produtos:", error.message);
    return [];
  }
  return (data ?? []) as Product[];
}

function formatPrice(cents: number, currency: string) {
  return new Intl.NumberFormat("pt-PT", {
    style: "currency",
    currency,
  }).format(cents / 100);
}

export default async function Home() {
  const products = await getProducts();

  const featuredProduct =
    products.find((p) => p.slug.includes("discipline-hoodie")) ?? products[2];

  return (
    <div>
      {/* 1. Hero cinematográfico */}
      <section className="relative flex h-[85vh] min-h-[520px] w-full items-end overflow-hidden bg-vertex-black">
        <Image
          src="/images/brand/campaign-gym-red.jpg"
          alt="VERTEX"
          fill
          priority
          className="object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
        <div className="relative z-10 w-full px-6 pb-16 md:px-12">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-white/70">
            Vertex
          </p>
          <h1 className="max-w-3xl font-serif text-5xl font-bold uppercase leading-[1.05] tracking-tight text-white md:text-7xl">
            Built by Discipline.
          </h1>
          <Link
            href="#colecao"
            className="mt-8 inline-block border border-white px-6 py-3 text-xs font-medium uppercase tracking-widest text-white transition hover:bg-white hover:text-vertex-black"
          >
            Shop Drop 001
          </Link>
        </div>
      </section>

      {/* 2. Manifesto */}
      <section className="mx-auto max-w-2xl px-6 py-24 text-center md:py-32">
        <p className="font-serif text-2xl font-semibold leading-relaxed text-vertex-black md:text-3xl">
          Discipline isn&apos;t what you show.
          <br />
          It&apos;s what you repeat.
        </p>
        <p className="mt-6 text-sm text-vertex-gray">
          VERTEX não é um produto. É uma ideia que se repete todos os dias.
        </p>
      </section>

      {/* 3. Coleção */}
      <section id="colecao" className="mx-auto max-w-6xl px-6 pb-24">
        <p className="mb-10 text-xs uppercase tracking-[0.3em] text-vertex-gray">
          Drop 001
        </p>

        {products.length === 0 ? (
          <p className="text-sm text-vertex-gray">
            Ainda não há produtos sincronizados. Corre a sincronização em{" "}
            <code className="font-mono">/api/admin/sync-products?secret=...</code>
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => {
              const variants = product.product_variants ?? [];
              const prices = variants.map((v) => v.price_cents);
              const minPrice = prices.length ? Math.min(...prices) : null;
              const maxPrice = prices.length ? Math.max(...prices) : null;
              const currency = variants[0]?.currency ?? "EUR";
              const image = product.image_url ?? variants[0]?.image_url ?? null;

              return (
                <Link
                  key={product.id}
                  href={`/produto/${product.slug}`}
                  className="group block"
                >
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-black/5">
                    {image ? (
                      <Image
                        src={image}
                        alt={product.name}
                        fill
                        unoptimized
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : null}
                  </div>
                  <h2 className="mt-4 text-sm text-vertex-black">
                    {product.name}
                  </h2>
                  <p className="mt-1 text-sm text-vertex-gray">
                    {minPrice !== null
                      ? minPrice === maxPrice
                        ? formatPrice(minPrice, currency)
                        : `Desde ${formatPrice(minPrice, currency)}`
                      : "Preço a definir"}
                  </p>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      {/* 4. Lifestyle / Campanha */}
      <section className="relative flex h-[70vh] min-h-[420px] w-full items-center overflow-hidden bg-vertex-black">
        <Image
          src="/images/brand/campaign-runners-bridge.jpg"
          alt="VERTEX — Built by Discipline"
          fill
          className="object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 mx-auto max-w-2xl px-6 text-center">
          <p className="font-serif text-3xl font-bold leading-snug text-white md:text-4xl">
            Every rep. Every mile.
            <br />
            Every rise before dawn.
          </p>
        </div>
      </section>

      {/* 5. Produto em destaque */}
      {featuredProduct ? (
        <section className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 py-24 md:grid-cols-2 md:gap-16">
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-black/5">
            {featuredProduct.image_url ? (
              <Image
                src={featuredProduct.image_url}
                alt={featuredProduct.name}
                fill
                unoptimized
                className="object-cover"
              />
            ) : null}
          </div>
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-vertex-gray">
              Peça em destaque
            </p>
            <h2 className="font-serif text-3xl font-bold uppercase leading-tight text-vertex-black md:text-4xl">
              {featuredProduct.name}
            </h2>
            <p className="mt-4 max-w-sm text-sm text-vertex-gray">
              Algodão pesado, corte estruturado, feitio que aguenta o treino e
              a cidade. Construída para se repetir todos os dias.
            </p>
            <Link
              href={`/produto/${featuredProduct.slug}`}
              className="mt-8 inline-block border border-vertex-black px-6 py-3 text-xs font-medium uppercase tracking-widest text-vertex-black transition hover:bg-vertex-black hover:text-white"
            >
              Ver Produto
            </Link>
          </div>
        </section>
      ) : null}

      {/* 6. Filosofia — faixa compacta, não é mais um bloco-manifesto completo */}
      <section className="border-y border-black/10 bg-vertex-offwhite px-6 py-8 text-center">
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-vertex-gray md:text-sm">
          Minimal by design <span className="text-vertex-black/30">—</span> Built with purpose
        </p>
      </section>
    </div>
  );
}
