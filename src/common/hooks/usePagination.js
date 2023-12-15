import { useState } from 'react';

const usePagination = (items, itemsPerPage) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const renderPageNumbers = () => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li
          key={i}
          className={`page-item ${currentPage === i ? 'disabled' : ''}`}
        >
          <a
            onClick={e => {
              e.preventDefault();
              paginate(i);
              window.scrollTo(0, 0);
            }}
            href="!#"
            className="page-link"
          >
            {i}
          </a>
        </li>,
      );
    }

    return <ul className="pagination justify-content-center">{pageNumbers}</ul>;
  };

  return { currentItems, renderPageNumbers, setCurrentPage };
};

export default usePagination;
