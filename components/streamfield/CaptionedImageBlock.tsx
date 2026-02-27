import Image from 'next/image';
import type { blocks } from '@/models/blocks/base';

export default function CaptionedImageBlock({
  block: { value },
}: {
  block: blocks.CaptionedImageBlock;
}) {
  const { meta } = value.image;

  return (
    <figure>
      <Image
        src={meta.download_url}
        alt={value.image.title}
        width={640}
        height={480}
        loading="lazy"
      />
      <figcaption>
        {value.caption} - {value.attribution}
      </figcaption>
    </figure>
  );
}
