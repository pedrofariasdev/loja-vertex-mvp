import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Guia de Tamanhos",
  description:
    "Tabela de tamanhos VERTEX para t-shirts, hoodies, joggers, calções e boné — encontra o teu tamanho ideal.",
  alternates: { canonical: "/guia-tamanhos" },
};

const tshirtSizes = [
  { size: "XS", length: "68.6", width: "42" },
  { size: "S", length: "71", width: "45.7" },
  { size: "M", length: "73.7", width: "50.8" },
  { size: "L", length: "76.2", width: "56" },
  { size: "XL", length: "78.7", width: "61" },
  { size: "2XL", length: "81.3", width: "66" },
];

const hoodieSizes = [
  { size: "S", length: "71", width: "55", sleeve: "64.5" },
  { size: "M", length: "74", width: "59", sleeve: "66.5" },
  { size: "L", length: "76", width: "62", sleeve: "68.5" },
  { size: "XL", length: "78", width: "65", sleeve: "69.5" },
  { size: "2XL", length: "80", width: "69", sleeve: "69.5" },
];

function SizeTable({
  title,
  rows,
  hasSleeve,
}: {
  title: string;
  rows: { size: string; length: string; width: string; sleeve?: string }[];
  hasSleeve?: boolean;
}) {
  return (
    <div className="mt-10">
      <h2 className="font-serif text-lg font-bold text-vertex-black">{title}</h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[420px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-vertex-black/20 text-xs uppercase tracking-widest text-vertex-gray">
              <th className="py-3 pr-4 font-medium">Tamanho</th>
              <th className="py-3 pr-4 font-medium">Comprimento (cm)</th>
              <th className="py-3 pr-4 font-medium">Largura (cm)</th>
              {hasSleeve ? (
                <th className="py-3 pr-4 font-medium">Manga (cm)</th>
              ) : null}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.size} className="border-b border-vertex-black/10">
                <td className="py-3 pr-4 font-semibold text-vertex-black">
                  {row.size}
                </td>
                <td className="py-3 pr-4 text-vertex-black/80">{row.length}</td>
                <td className="py-3 pr-4 text-vertex-black/80">{row.width}</td>
                {hasSleeve ? (
                  <td className="py-3 pr-4 text-vertex-black/80">{row.sleeve}</td>
                ) : null}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function GuiaTamanhosPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <h1 className="font-serif text-3xl font-bold uppercase tracking-tight text-vertex-black md:text-4xl">
        Guia de Tamanhos
      </h1>
      <p className="mt-6 text-sm leading-relaxed text-vertex-black/80">
        Todas as medidas são da peça, não do corpo, e estão em centímetros. Para
        escolher melhor, compara estas medidas com uma peça tua que te sirva
        bem.
      </p>

      <SizeTable title="T-Shirts" rows={tshirtSizes} />
      <SizeTable title="Hoodies" rows={hoodieSizes} hasSleeve />

      <p className="mt-4 text-xs text-vertex-gray">
        Os tamanhos disponíveis variam por produto — confirma as opções na
        página de cada peça.
      </p>

      <h2 className="mt-10 font-serif text-lg font-bold text-vertex-black">
        Como medir
      </h2>
      <ul className="mt-4 space-y-4 text-sm leading-relaxed text-vertex-black/80">
        <li>
          <span className="font-semibold text-vertex-black">Comprimento</span>{" "}
          — mede desde o ponto mais alto do ombro, junto ao pescoço, até à
          bainha.
        </li>
        <li>
          <span className="font-semibold text-vertex-black">Largura</span> —
          coloca a peça esticada numa superfície plana e mede de axila a
          axila.
        </li>
        <li>
          <span className="font-semibold text-vertex-black">
            Comprimento da manga
          </span>{" "}
          — nos hoodies, mede desde a costura do ombro até à ponta do punho.
        </li>
      </ul>

      <h2 className="mt-10 font-serif text-lg font-bold text-vertex-black">
        Entre dois tamanhos?
      </h2>
      <p className="mt-4 text-sm leading-relaxed text-vertex-black/80">
        As peças VERTEX têm corte regular. Se preferes um caimento mais
        largado, escolhe o tamanho acima. Se ainda tiveres dúvidas, fala com o
        nosso apoio ao cliente antes de encomendar.
      </p>

      <p className="mt-10 text-sm text-vertex-black/80">
        Para trocas e devoluções, consulta a nossa{" "}
        <Link
          href="/devolucoes"
          className="text-vertex-black underline decoration-vertex-gray underline-offset-4"
        >
          Política de Trocas & Devoluções
        </Link>
        .
      </p>
    </section>
  );
}
