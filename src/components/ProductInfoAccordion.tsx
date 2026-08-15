"use client";

import Link from "next/link";
import { Accordion } from "@/components/Accordion";
import { useLanguage } from "@/lib/language-context";

export function ProductInfoAccordion() {
  const { t } = useLanguage();
  const p = t.product;

  return (
    <Accordion
      items={[
        {
          title: p.compositionTitle,
          content: <p>{p.compositionBody}</p>,
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
