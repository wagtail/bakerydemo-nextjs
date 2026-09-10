import Image from 'next/image';
import type { blocks } from '@/models/blocks/base';

export default function CaptionedImageBlock({
  block: { value },
}: {
  block: blocks.CaptionedImageBlock;
}) {
  const { rendition } = value.image.meta;

  return (
    <figure>
      <Image
        src={rendition.full_url}
        alt={rendition.alt}
        width={rendition.width}
        height={rendition.height}
        loading="lazy"
      />
      <figcaption>
        {value.caption} - {value.attribution}
      </figcaption>
    </figure>
  );
}
