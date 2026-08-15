"use client";

import { useState, type ReactNode } from "react";

export type AccordionItemData = {
  title: string;
  content: ReactNode;
};

function ArrowIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className={`h-4 w-4 shrink-0 transition-transform duration-300 ${
        open ? "rotate-90" : ""
      }`}
    >
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Accordion({ items }: { items: AccordionItemData[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="border-t border-vertex-black/10">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={item.title} className="border-b border-vertex-black/10">
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className={`flex w-full items-center justify-between gap-4 px-4 py-4 text-left text-xs font-medium uppercase tracking-widest text-vertex-black transition ${
                isOpen ? "bg-black/[0.03]" : "hover:bg-black/[0.02]"
              }`}
              aria-expanded={isOpen}
            >
              <span>{item.title}</span>
              <ArrowIcon open={isOpen} />
            </button>
            <div
              className={`grid transition-all duration-300 ease-in-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="px-4 pb-5 text-sm leading-relaxed text-vertex-black/80">
                  {item.content}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
