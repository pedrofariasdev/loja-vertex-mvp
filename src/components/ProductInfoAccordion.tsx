"use client";

import Link from "next/link";
import { Accordion } from "@/components/Accordion";
import { useLanguage } from "@/lib/language-context";

function CompositionContent({ text }: { text: string }) {
  const lines = text.split("\n").filter((line) => line.trim().length > 0);
  const intro = lines.filter((line) => !line.trim().startsWith("•"));
  const bullets = lines
    .filter((line) => line.trim().startsWith("•"))
    .map((line) => line.trim().replace(/^•\s*/, ""));

  return (
    <div className="space-y-3">
      {intro.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      {bullets.length > 0 ? (
        <ul className="list-disc space-y-1 pl-5 marker:text-vertex-gray">
          {bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export function ProductInfoAccordion({
  composition,
}: {
  composition?: string | null;
}) {
  const { t } = useLanguage();
  const p = t.product;

  return (
    <Accordion
      items={[
        {
          title: p.compositionTitle,
          content: composition ? (
            <CompositionContent text={composition} />
          ) : (
            <p>{p.compositionBody}</p>
          ),
        },
        {
          title: p.shippingTitle,
          content: (
            <div>
              <p>{p.shippingBody}</p>
              <div className="mt-3 flex flex-col gap-1">
                <Link
                  href="/envios"
                  className="w-fit text-vertex-black underline decoration-vertex-gray underline-offset-4"
                >
                  {p.shippingLink}
                </Link>
                <Link
                  href="/devolucoes"
                  className="w-fit text-vertex-black underline decoration-vertex-gray underline-offset-4"
                >
                  {p.returnsLink}
                </Link>
              </div>
            </div>
          ),
        },
      ]}
    />
  );
}
