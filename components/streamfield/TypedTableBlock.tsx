import Image from 'next/image';
import type { recipeBlocks } from '@/models/blocks/recipes';

export default function TypedTableBlock({
  block: { value },
}: {
  block: recipeBlocks.TypedTable;
}) {
  const { caption, columns, rows } = value;

  const renderCell = (
    cell: recipeBlocks.TypedTable['value']['rows'][number]['values'][number],
  ) => {
    switch (typeof cell) {
      case 'string':
        return <div dangerouslySetInnerHTML={{ __html: cell }} />;
      case 'number':
        return cell.toString();
      case 'object':
        if ('id' in cell) {
          return (
            <Image
              src={cell.meta.download_url}
              alt={cell.title}
              width={100}
              height={100}
            />
          );
        }
        return <pre>{JSON.stringify(cell, null, 2)}</pre>;
    }
  };

  return (
    <figure>
      <table>
        <thead>
          <tr>
            {columns.map((column, i) => (
              <th key={i}>{column.heading}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.values.map((cell, j) => (
                <td key={j}>{renderCell(cell)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
