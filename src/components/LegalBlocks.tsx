export type LegalBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] };

export function LegalBlocks({ blocks }: { blocks: LegalBlock[] }) {
  return (
    <>
      {blocks.map((block, i) => {
        if (block.type === "h2") {
          return (
            <h2
              key={i}
              className="mt-10 font-serif text-lg font-bold text-vertex-black"
            >
              {block.text}
            </h2>
          );
        }
        if (block.type === "ul") {
          return (
            <ul
              key={i}
              className="mt-3 list-disc space-y-1 pl-5 text-sm leading-relaxed text-vertex-black/80"
            >
              {block.items.map((item, j) => (
                <li key={j}>{item}</li>
              ))}
            </ul>
          );
        }
        return (
          <p key={i} className="mt-3 text-sm leading-relaxed text-vertex-black/80">
            {block.text}
          </p>
        );
      })}
    </>
  );
}
