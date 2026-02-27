import type { blocks } from '@/models/blocks/base';

export default function EmbedBlock({
  block: { value },
}: {
  block: blocks.EmbedBlock;
}) {
  return <div dangerouslySetInnerHTML={{ __html: value.html }} />;
}
