import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const displayPages = () => {
    const pages = [];
    const range = 2; // Number of pages to display around the current page

    let start = Math.max(1, currentPage - range);
    let end = Math.min(totalPages, currentPage + range);

    // Add "First" button
    if (start > 1) {
      pages.push(
        <button key={1} onClick={() => onPageChange(1)}>
          1
        </button>
      );
      if (start > 2) {
        pages.push(<span key="ellipsis1">...</span>);
      }
    }

    // Add pages in the range
    for (let i = start; i <= end; i++) {
      pages.push(
        <button key={i} onClick={() => onPageChange(i)} className={currentPage === i ? 'active' : ''}>
          {i}
        </button>
      );
    }

    // Add "Last" button
    if (end < totalPages) {
      if (end < totalPages - 1) {
        pages.push(<span key="ellipsis2">...</span>);
      }
      pages.push(
        <button key={totalPages} onClick={() => onPageChange(totalPages)}>
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  return <div className="pagination">{displayPages()}</div>;
};

export default Pagination;
