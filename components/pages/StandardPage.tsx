import type { base } from '@/models';
import type { PageComponentProps } from './types';
import BaseStreamBlock from '../streamfield/BaseStreamBlock';

export default async function StandardPage({
  page,
}: PageComponentProps<base.StandardPage>) {
  return (
    <>
      <section>
        <h1>{page.title}</h1>
        <p>{page.introduction}</p>
      </section>
      <section>
        <BaseStreamBlock blocks={page.body} />
      </section>
    </>
  );
}
