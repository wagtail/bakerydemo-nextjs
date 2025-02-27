import type { recipes } from '@/models';
import type { PageComponentProps } from './types';
import BlogCard from '@/components/BlogCard';
import api from '@/lib/api';

export interface RecipeIndexPageProps {
  page: recipes.RecipeIndexPage;
}

export default async function RecipeIndexPage({
  page,
}: PageComponentProps<recipes.RecipeIndexPage>) {
  // Get recipe pages that are children of the recipe index page
  const { items: recipes } = await api.getPages('recipes.RecipePage', {
    child_of: page.id.toString(),
  });

  return (
    <>
      <section>
        <h1>{page.title}</h1>
        <p>{page.introduction}</p>
      </section>

      <section>
        {recipes.length > 0 ? (
          recipes.map((recipe) => <BlogCard key={recipe.id} page={recipe} />)
        ) : (
          <p>
            Oh, snap. Looks like we were too busy baking to write any recipes.
            Sorry.
          </p>
        )}
      </section>
    </>
  );
}
