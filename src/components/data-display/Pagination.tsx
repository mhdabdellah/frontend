
const Pagination = ({ page, count, onPageChange }: { page: number; count: number; onPageChange: (p: number) => void }) => {
  const totalPages = Math.ceil(count / 13);

  return (
    <div className="flex text-gray-500 justify-end mt-4">
      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
       {"Previous"}
      </button>
      <span className="px-3 py-1">{page} / {totalPages}</span>
      <button
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        {"Next"}
      </button>
    </div>
  );
};

export default Pagination;
