import React, { useState, useMemo } from "react";
import { Cards } from "@/components/_ui/cards";
import { Button } from "@/components/_ui/atoms/buttons";
import { SearchInput } from "@/components/_ui/datatables";
import { NoRecordFound } from "@/components/_ui/datatables";
import { ModalResponse, openModal } from "@/components/_ui/modals";
import { Spinners } from "@/components/_ui/loading";
import Form from "./form";

export default function Tabledata({ books}) {
  const [search, setSearch] = useState("");
  const resultBooks = useMemo(() => {
    let data = books;
    if (search) {
      data = data.filter((book) => {
        return Object.keys(book).some((key) => {
          try {
            const value = book[key];
            return (
              value != null &&
              String(value).toLowerCase().includes(search.toLowerCase())
            );
          } catch (error) {
            return false;
          }
        });
      });
    }
    return data;
  });
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
            <thead>
              <tr className="text-start fw-bold text-uppercase gs-0">
                <th className="text-secondary fs-6 false">No</th>
                <th className="text-secondary fs-6 cursor-pointer">Title</th>
                <th className="text-secondary fs-6 cursor-pointer">Author</th>
                <th className="text-secondary fs-6 false">Rate/View</th>
                <th className="text-secondary fs-6 cursor-pointer">
                  Subscribe
                </th>
                <th className="text-secondary fs-6 false"></th>
              </tr>
            </thead>
            <tbody>
              {resultBooks.map((book, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="d-flex align-items-center">
                      <img
                        src={`/assets/books/${book?.images || `/image_icon.png`}`}
                        alt={book?.title || ""}
                        style={{ width: 50, height: 50 }}
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
                  <td>{book?.author || ""}</td>
                  <td>
                    <div className="d-flex">
                      <div className="me-3">
                        <i className="bi bi-star-fill text-warning"></i>
                        <span className="text-dark ms-1">
                          {book?.rating || 0}
                        </span>
                      </div>
                      <div className="me-3">
                        <i className="bi bi-eye text-info"></i>
                        <span className="text-dark ms-1">
                          {book?.views || 0}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="badge bg-secondary">
                      {book?.is_free ? "Yes" : "No"}
                    </span>
                  </td>
                  <td>
                    <Button
                      outline
                      className="btn-sm me-2 btn-warning"
                      title="Edit"
                    >
                      <i className="bi bi-pencil"></i>
                    </Button>
                    <Button
                      outline
                      className="btn-sm me-2 btn-danger"
                      title="Delete"
                    >
                      <i className="bi bi-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Cards.Body>
    </Cards>
  );
}
