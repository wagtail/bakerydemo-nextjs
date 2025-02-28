import type { recipes } from '@/models';
import type { PageComponentProps } from './types';
import { formatDate } from '@/lib/format';
import Image from 'next/image';
import RecipeStreamBlock from '../streamfield/RecipeStreamBlock';

export default async function RecipePage({
  page,
}: PageComponentProps<recipes.RecipePage>) {
  return (
    <>
      <section>
        <h1>{page.title}</h1>
        {page.subtitle && <p>{page.subtitle}</p>}
        {page.introduction && <p>{page.introduction}</p>}
        {page.date_published && <div>{formatDate(page.date_published)}</div>}
        {page.recipe_person_relationship.length > 0 && (
          <div>
            {page.recipe_person_relationship.map(({ person }) => (
              <div key={person.id}>
                {person.image && (
                  <Image
                    src={person.image.meta.download_url}
                    alt={person.image.title}
                    width={50}
                    height={50}
                  />
                )}
                <span>
                  {person.first_name} {person.last_name}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <RecipeStreamBlock blocks={page.body} />
      </section>
    </>
  );
}
