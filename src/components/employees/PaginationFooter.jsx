import React from "react";

const PaginationFooter = ({
  page,
  totalPages,
  setPage,
  totalItems,
  itemsPerPage,
}) => {
  const from = totalItems > 0 ? (page - 1) * itemsPerPage + 1 : 0;
  const to = totalItems > 0 ? Math.min(page * itemsPerPage, totalItems) : 0;

  return (
    <div className="flex flex-wrap justify-between items-center mt-6 text-sm text-gray-700 gap-4">
      <div>
        Showing <span className="font-medium">{from}</span>–<span className="font-medium">{to}</span> of{" "}
        <span className="font-medium">{totalItems ?? 0}</span>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          aria-label="Previous page"
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className={`px-3 py-1 border rounded transition ${
            page === 1
              ? "border-gray-300 text-gray-400 bg-gray-100 cursor-not-allowed"
              : "border-red-600 text-red-600 bg-white hover:bg-red-600 hover:text-white"
          }`}
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            aria-label={`Go to page ${i + 1}`}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 border rounded transition ${
              page === i + 1
                ? "bg-red-600 text-white border-red-600"
                : "border-red-600 text-red-600 bg-white hover:bg-red-600 hover:text-white"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          aria-label="Next page"
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
          className={`px-3 py-1 border rounded transition ${
            page === totalPages
              ? "border-gray-300 text-gray-400 bg-gray-100 cursor-not-allowed"
              : "border-red-600 text-red-600 bg-white hover:bg-red-600 hover:text-white"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginationFooter;
