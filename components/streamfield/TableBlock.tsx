import type { recipeBlocks } from '@/models/blocks/recipes';

export default function TableBlock({
  block: { value },
}: {
  block: recipeBlocks.Table;
}) {
  const { first_row_is_table_header, data } = value;

  return (
    <table>
      {first_row_is_table_header && (
        <thead>
          <tr>
            {data[0].map((cell, i) => (
              <th key={i}>{cell}</th>
            ))}
          </tr>
        </thead>
      )}
      <tbody>
        {data.slice(first_row_is_table_header ? 1 : 0).map((row, i) => (
          <tr key={i}>
            {row.map((cell, j) => (
              <td key={j}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
