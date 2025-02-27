import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  baseUrl,
}: PaginationProps) {
  return (
    <nav aria-label="Pagination">
      {currentPage > 1 && (
        <Link href={`${baseUrl}?page=${currentPage - 1}`}>Previous</Link>
      )}

      <span>
        {' '}
        Page {currentPage} of {totalPages}{' '}
      </span>

      {currentPage < totalPages && (
        <Link href={`${baseUrl}?page=${currentPage + 1}`}>Next</Link>
      )}
    </nav>
  );
}
