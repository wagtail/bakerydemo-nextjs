import type { blocks } from '@/models/blocks/base';

export default function RichTextBlock({
  block,
}: { block: blocks.RichTextBlock }) {
  return <div dangerouslySetInnerHTML={{ __html: block.value }} />;
}
