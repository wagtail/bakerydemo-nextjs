import type { recipeBlocks } from '@/models/blocks/recipes';

export default function IngredientsListBlock({
  block: { value },
}: {
  block: recipeBlocks.IngredientsList;
}) {
  return (
    <div>
      <h3>Ingredients</h3>
      <ul>
        {value.map((ingredient, i) => (
          <li key={i} dangerouslySetInnerHTML={{ __html: ingredient }} />
        ))}
      </ul>
    </div>
  );
}
