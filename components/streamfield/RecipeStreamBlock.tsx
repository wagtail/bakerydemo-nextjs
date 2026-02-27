import type { recipeBlocks } from '@/models/blocks/recipes';
import BlockQuote from './BlockQuote';
import CaptionedImageBlock from './CaptionedImageBlock';
import EmbedBlock from './EmbedBlock';
import HeadingBlock from './HeadingBlock';
import IngredientsListBlock from './IngredientsListBlock';
import RichTextBlock from './RichTextBlock';
import StepsListBlock from './StepsListBlock';
import TableBlock from './TableBlock';
import TypedTableBlock from './TypedTableBlock';

const blockComponents = {
  // Base blocks
  heading_block: HeadingBlock,
  paragraph_block: RichTextBlock,
  image_block: CaptionedImageBlock,
  block_quote: BlockQuote,
  embed_block: EmbedBlock,
  // Recipe blocks
  table_block: TableBlock,
  typed_table_block: TypedTableBlock,
  ingredients_list: IngredientsListBlock,
  steps_list: StepsListBlock,
} as const;

type BlockComponent = React.ComponentType<{
  block: recipeBlocks.RecipeStreamBlock[number];
}>;

interface RecipeStreamBlockProps {
  blocks: recipeBlocks.RecipeStreamBlock;
}

export default function RecipeStreamBlock({ blocks }: RecipeStreamBlockProps) {
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
