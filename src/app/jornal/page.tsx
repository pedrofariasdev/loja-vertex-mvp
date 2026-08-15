import Image from "next/image";
import Link from "next/link";
import { journalPosts } from "@/lib/journal";

export default function JornalPage() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-16 md:py-24">
      <h1 className="font-serif text-3xl font-bold uppercase tracking-tight text-vertex-black md:text-4xl">
        Jornal
      </h1>
      <p className="mt-4 max-w-lg text-sm text-vertex-gray">
        Bastidores, decisões e histórias por trás da VERTEX — à medida que a
        marca vai sendo construída.
      </p>

      <div className="mt-14 flex flex-col divide-y divide-vertex-black/10">
        {journalPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/jornal/${post.slug}`}
            className="group flex flex-col gap-6 py-8 first:pt-0 sm:flex-row sm:items-center"
          >
            <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-black/5 sm:w-56">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-vertex-gray">
                {post.date}
              </p>
              <h2 className="mt-2 font-serif text-xl font-bold text-vertex-black md:text-2xl">
                {post.title}
              </h2>
              <p className="mt-2 max-w-md text-sm text-vertex-black/70">
                {post.excerpt}
              </p>
              <span className="mt-3 inline-block text-xs font-medium uppercase tracking-widest text-vertex-black underline decoration-vertex-gray underline-offset-4">
                Ler mais
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
