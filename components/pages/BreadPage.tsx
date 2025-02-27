import type { breads } from '@/models';
import type { PageComponentProps } from './types';
import Image from 'next/image';

export default async function BreadPage({
  page,
}: PageComponentProps<breads.BreadPage>) {
  return (
    <>
      <section>
        {page.image && (
          <div>
            <Image
              src={page.image.meta.download_url}
              alt={page.image.title}
              width={800}
              height={650}
              priority
            />
          </div>
        )}
        <h1>{page.title}</h1>
        <p>{page.introduction}</p>
      </section>

      <section>
        <div>
          {page.body.map(({ id, value }) => (
            <div key={id} dangerouslySetInnerHTML={{ __html: value }} />
          ))}
        </div>

        <aside>
          {(page.origin || page.bread_type || page.ingredients.length > 0) && (
            <div>
              {page.origin && (
                <div>
                  <h4>Origin</h4>
                  <p>{page.origin.title}</p>
                </div>
              )}

              {page.bread_type && (
                <div>
                  <h4>Type</h4>
                  <p>{page.bread_type.title}</p>
                </div>
              )}

              {page.ingredients.length > 0 && (
                <div>
                  <h4>Ingredients</h4>
                  <ul>
                    {page.ingredients.map((ingredient) => (
                      <li key={ingredient.id}>
                        {ingredient.meta.type === 'breads.BreadIngredient' ? (
                          ingredient.name
                        ) : (
                          <span>Draft ingredient</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </aside>
      </section>
    </>
  );
}
