import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getJournalPost, journalPosts } from "@/lib/journal";

export default async function JournalPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getJournalPost(slug);
  if (!post) notFound();

  const otherPosts = journalPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <article>
      <div className="relative h-[50vh] min-h-[320px] w-full overflow-hidden bg-vertex-black">
        <Image
          src={post.image}
          alt={post.title}
          fill
          priority
          className="object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 px-6 pb-10 md:px-12">
          <p className="mb-2 text-xs uppercase tracking-[0.3em] text-white/70">
            {post.date}
          </p>
          <h1 className="max-w-2xl font-serif text-3xl font-bold uppercase leading-tight tracking-tight text-white md:text-5xl">
            {post.title}
          </h1>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-6 py-16 md:py-24">
        <div className="flex flex-col gap-5">
          {post.content.map((paragraph, i) => (
            <p key={i} className="text-base leading-relaxed text-vertex-black/80">
              {paragraph}
            </p>
          ))}
        </div>

        <Link
          href="/jornal"
          className="mt-12 inline-block text-xs font-medium uppercase tracking-widest text-vertex-black underline decoration-vertex-gray underline-offset-4"
        >
          ← Voltar ao Jornal
        </Link>
      </div>

      {otherPosts.length > 0 ? (
        <div className="mx-auto max-w-4xl border-t border-vertex-black/10 px-6 py-16">
          <p className="mb-8 text-xs uppercase tracking-[0.3em] text-vertex-gray">
            Continua a ler
          </p>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {otherPosts.map((p) => (
              <Link key={p.slug} href={`/jornal/${p.slug}`} className="group block">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/5">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="mt-3 font-serif text-lg font-bold text-vertex-black">
                  {p.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </article>
  );
}
