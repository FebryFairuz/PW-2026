import React, { useEffect, useMemo, useState } from 'react'
import { Pagination } from 'react-bootstrap';

const HeaderDatatables = ({ headers, onSorting, ...others }) => {
  const [sortingField, setSortingField] = useState("");
  const [sortingOrder, setSortingOrder] = useState("asc");

  const onSortingChange = (field) => {
    const order =
      field === sortingField && sortingOrder === "asc" ? "desc" : "asc";
    setSortingField(field);
    setSortingOrder(order);
    onSorting(field, order);
  };

  return (
    <thead>
      <tr className="text-start fw-bold text-uppercase gs-0" {...others}>
        {headers.map(({ name, field, sortable }) => (
          <th
            className={"text-secondary fs-6 " + (sortable === true && "cursor-pointer")}
            key={name}
            onClick={() => (sortable ? onSortingChange(field) : null)}
          >
            {name}
            {sortingField && sortingField === field && (
              <i
                className={
                  (sortingOrder === "asc"
                    ? "bi bi-sort-up"
                    : "bi bi-sort-down") + " fs-6 ms-1 text-secondary"
                }
              />
            )}
          </th>
        ))}
      </tr>
    </thead>
  );
};

const SearchInput = ({ keyword, onAction }) => {
  return (
    <div className="input-group">
      <span className="input-group-text bg-white border-end-0">
        <i className="bi bi-search"></i>
      </span>
      <input
        type="text"
        className="form-control border-start-0"
        placeholder="Search here..."
        value={keyword}
        onChange={onAction}
      />
    </div>
  )
};

const PaginationComponent = ({
  total = 0,
  itemsPerPage = 10,
  currentPage = 1,
  onPageChange,
  maxPageItems = 10, // Maksimal page items yang ditampilkan
}) => {
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (total > 0 && itemsPerPage > 0)
      setTotalPages(Math.ceil(total / itemsPerPage));
  }, [total, itemsPerPage]);

  const paginationItems = useMemo(() => {
    const pages = [];

    if (totalPages <= maxPageItems) {
      // Jika total pages kurang dari atau sama dengan maxPageItems, tampilkan semua
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <Pagination.Item
            key={i}
            active={i === currentPage}
            onClick={() => onPageChange(i)}
          >
            {i}
          </Pagination.Item>
        );
      }
    } else {
      // Logika sliding window untuk banyak pages
      let startPage = Math.max(1, currentPage - Math.floor(maxPageItems / 2));
      let endPage = Math.min(totalPages, startPage + maxPageItems - 1);

      // Adjust startPage jika endPage sudah mentok di akhir
      if (endPage === totalPages) {
        startPage = Math.max(1, endPage - maxPageItems + 1);
      }

      // Tampilkan halaman pertama jika tidak termasuk dalam range
      if (startPage > 1) {
        pages.push(
          <Pagination.Item
            key={1}
            active={1 === currentPage}
            onClick={() => onPageChange(1)}
          >
            1
          </Pagination.Item>
        );

        // Tambahkan ellipsis jika ada gap
        if (startPage > 2) {
          pages.push(
            <Pagination.Ellipsis key="ellipsis-start" disabled />
          );
        }
      }

      // Tampilkan range pages
      for (let i = startPage; i <= endPage; i++) {
        pages.push(
          <Pagination.Item
            key={i}
            active={i === currentPage}
            onClick={() => onPageChange(i)}
          >
            {i}
          </Pagination.Item>
        );
      }

      // Tampilkan halaman terakhir jika tidak termasuk dalam range
      if (endPage < totalPages) {
        // Tambahkan ellipsis jika ada gap
        if (endPage < totalPages - 1) {
          pages.push(
            <Pagination.Ellipsis key="ellipsis-end" disabled />
          );
        }

        pages.push(
          <Pagination.Item
            key={totalPages}
            active={totalPages === currentPage}
            onClick={() => onPageChange(totalPages)}
          >
            {totalPages}
          </Pagination.Item>
        );
      }
    }

    return pages;
    // eslint-disable-next-line
  }, [totalPages, currentPage, maxPageItems]);

  if (totalPages === 0) return null;

  return (
    <Pagination>
      <Pagination.First
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
      />
      <Pagination.Prev
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      />
      {paginationItems}
      <Pagination.Next
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
      <Pagination.Last
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
      />
    </Pagination>
  );
};

const NoRecordFound = ({ message }) => {
  return (
    <div className="text-center py-5">
      <i className="bi bi-inbox fs-1 text-muted d-block mb-3"></i>
      <p className="text-muted mb-0">{message || `No record found`}</p>
    </div>
  )
}

export { HeaderDatatables, SearchInput, PaginationComponent, NoRecordFound }