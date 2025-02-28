import type { blocks } from '@/models/blocks/base';

export default function BlockQuote({
  block: { value },
}: { block: blocks.BlockQuote }) {
  return (
    <blockquote>
      <p>{value.text}</p>
      <p>{value.attribute_name}</p>
    </blockquote>
  );
}
