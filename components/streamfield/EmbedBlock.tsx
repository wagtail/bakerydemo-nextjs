import type { blocks } from '@/models/blocks/base';

export default function EmbedBlock({
  block: { value },
}: { block: blocks.EmbedBlock }) {
  console.warn(value, "------");

  // case 1: value is just a string (URL)
  if (typeof value === "string") {
    return (
      <iframe
        width="560"
        height="315"
        src={value.replace("watch?v=", "embed/")} // turn watch link into embed
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }

  // case 2: value is object with { url, html }
  if (value && typeof value === "object" && "html" in value) {
    return <div dangerouslySetInnerHTML={{ __html: value.html }} />;
  }

  // fallback
  return null;
}
