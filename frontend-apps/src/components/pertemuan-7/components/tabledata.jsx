"use client";

import React, { useState, useMemo } from "react";
import { Cards } from "@/components/_ui/cards";
import { Button } from "@/components/_ui/atoms/buttons";
import { NoRecordFound } from "@/components/_ui/datatables";
import { ModalResponse, openModal } from "@/components/_ui/modals";
import { Spinners } from "@/components/_ui/loading";
import { Alert } from "@/components/_ui/alerts";
import {
  HeaderDatatables,
  SearchInput,
  PaginationComponent,
} from "@/components/_ui/datatables";
import Form from "./form";
import { DELETE_BOOK } from "@/components/apis/book-services";

export default function Tabledata({ data, ReloadData }) {
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState({ field: "", order: "" });
  const [totalitems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  const table_headers = [
    { name: "No", field: "id", sortable: false },
    { name: "Title", field: "title", sortable: true },
    { name: "Author", field: "author", sortable: true },
    { name: "Language", field: "language", sortable: true },
    { name: "Rate/View", field: "rate", sortable: false },
    { name: "Subscribe", field: "is_free", sortable: true },
    { name: "", field: "id", sortable: false },
  ];

  const ResultData = useMemo(() => {
    let computedData = data;

    if (search) {
      computedData = computedData.filter((listData) => {
        return Object.keys(listData).some((key) => {
          try {
            const value = listData[key];
            return (
              value != null &&
              String(value).toLowerCase().includes(search.toLowerCase())
            );
          } catch (error) {
            console.error(`Error processing key "${key}":`, error);
            return false;
          }
        });
      });
    }

    setTotalItems(computedData.length);

    if (sorting.field) {
      const reversed = sorting.order === "asc" ? 1 : -1;
      computedData = computedData.sort(
        (a, b) => reversed * a[sorting.field].localeCompare(b[sorting.field]),
      );
    }

    if (computedData.length > 0) {
      return computedData.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE,
      );
    } else {
      return [];
    }
  }, [data, search, sorting, currentPage]);

  const [selectedIds, setSelectedIds] = useState(0);
  const handleDelete = async (book_id) => {
    try {
      setSelectedIds(book_id);
      const results = await DELETE_BOOK(book_id);
      if (results.message) {
        openModal({
          message: (
            <ModalResponse
              title={`Failed Remove`}
              message={results.message}
              variant="error"
            />
          ),
        });
      } else {
        openModal({
          message: (
            <ModalResponse title={`Successfully Removed`} variant="success" />
          ),
        });
        ReloadData();
      }
      setSelectedIds(0);
    } catch (error) {
      openModal({
        message: (
          <ModalResponse
            title={`Failed Remove`}
            message={error.message}
            variant="error"
          />
        ),
      });
    }
  };

  try {
    return (
      <Cards>
        <Cards.Header>
          <div className="w-50">
            <SearchInput
              keyword={search}
              onAction={(event) => setSearch(event.target.value)}
            />
          </div>
          <div>
            <span className="fw-bold">Total 0</span>
          </div>
        </Cards.Header>
        <Cards.Body className={`px-0 pb-0`}>
          <div className="table-responsive">
            <table className="table table-hover">
              <HeaderDatatables
                headers={table_headers}
                onSorting={(field, order) => setSorting({ field, order })}
              />
              <tbody>
                {ResultData.length > 0 ? (
                  ResultData.map((book, index) => (
                    <tr key={book.id}>
                      <td className="text-center">
                        {(currentPage - 1) * ITEMS_PER_PAGE + index + 1}
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <img
                            src={getBookImage(book)}
                            alt={book?.title || "Book cover"}
                            style={{
                              width: 50,
                              height: 50,
                              objectFit: "cover",
                              borderRadius: "4px",
                            }}
                            onError={(e) => {
                              e.target.src = "/assets/books/image_icon.png";
                            }}
                          />
                          <div className="ms-1">
                            <span className="fw-bold d-block">
                              {book?.title || ""}
                            </span>
                            <span className="ms-1 fs-6">
                              {book?.sinopsis.slice(0, 30)}...
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>{book.author}</td>
                      <td>{book.language}</td>
                      <td>
                        <div className="d-flex">
                          <div className="me-3">
                            <i className="bi bi-star-fill text-warning"></i>
                            <span className="text-dark ms-1">
                              {book.rating}
                            </span>
                          </div>
                          <div className="me-3">
                            <i className="bi bi-eye text-info"></i>
                            <span className="text-dark ms-1">{book.views}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="badge bg-secondary">
                          {book.is_free ? "Yes" : "No"}
                        </span>
                      </td>
                      <td className="text-end">
                        {selectedIds === book?.id ? (
                          <Spinners />
                        ) : (
                          <>
                            <Button
                              variant="warning"
                              outline
                              className="btn-sm me-2"
                              onClick={() =>
                                openModal({
                                  message: <Form book_id={book?.id} ReloadBook={ReloadData} />,
                                  size: "xl",
                                })
                              }
                              title="Edit"
                            >
                              <i className="bi bi-pencil"></i>
                            </Button>
                            <Button
                              variant="danger"
                              outline
                              className="btn-sm me-2"
                              onClick={() => handleDelete(book.id)}
                              title="Delete"
                            >
                              <i className="bi bi-trash"></i>
                            </Button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7">
                      <NoRecordFound />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {totalitems > 0 && (
              <div className="d-flex align-items-center justify-content-center">
                <PaginationComponent
                  total={totalitems}
                  itemsPerPage={ITEMS_PER_PAGE}
                  currentPage={currentPage}
                  onPageChange={(page) => setCurrentPage(page)}
                />
              </div>
            )}
          </div>
        </Cards.Body>
      </Cards>
    );
  } catch (error) {
    return <Alert message={error.message} />;
  }
}

const getBookImage = (book) => {
  if (book?.image) {
    return `${process.env.NEXT_PUBLIC_BACKEND_URI}${book.image}`;
  }
  return "/assets/books/image_icon.png";
};
