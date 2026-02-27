import type { blocks } from '@/models/blocks/base';
import BlockQuote from './BlockQuote';
import CaptionedImageBlock from './CaptionedImageBlock';
import EmbedBlock from './EmbedBlock';
import HeadingBlock from './HeadingBlock';
import RichTextBlock from './RichTextBlock';

const blockComponents = {
  heading_block: HeadingBlock,
  paragraph_block: RichTextBlock,
  image_block: CaptionedImageBlock,
  block_quote: BlockQuote,
  embed_block: EmbedBlock,
} as const;

type BlockComponent = React.ComponentType<{
  block: blocks.BaseStreamBlock[number];
}>;

interface BaseStreamBlockProps {
  blocks: blocks.BaseStreamBlock;
}

export default function BaseStreamBlock({ blocks }: BaseStreamBlockProps) {
  return (
    <div>
      {blocks.map((block) => {
        const Block = blockComponents[block.type] as BlockComponent;
        return Block ? (
          <Block key={block.id} block={block} />
        ) : (
          <pre key={block.id}>{JSON.stringify(block, null, 2)}</pre>
        );
      })}
    </div>
  );
}
