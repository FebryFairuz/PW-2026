"use client";

import React, { useEffect, useState } from "react";
import { ListBooks } from "@/const/bookList";
import { Button } from "@/components/_ui/atoms/buttons";
import { Alert } from "@/components/_ui/alerts";
import { Skeleton } from "@/components/_ui/loading";
import Tabledata from "./components/tabledata";
import Form from "./components/form";
import { openModal } from "@/components/_ui/modals";
import Layout from "./layout";
import { GET_ALL_BOOK } from "@/components/apis/book-services";

export default function Latihan3() {
  const [books, setBooks] = useState({ loading: false, data: [], message: "" });
  const ReloadBook = async () => {
    setBooks({ loading: true, data: [], message: "" });
    const results = await GET_ALL_BOOK();
    setBooks(results);
  };
  useEffect(() => {
    ReloadBook();
  }, []);

  try {
    return (
      <Layout>
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h3>
            <i className="bi bi-book"></i>
            <span className="fw-bold ms-1">List of Books</span>
          </h3>
          <Button
            className="d-flex align-items-center gap-2 btn-primary btn-sm px-3"
            onClick={() =>
              openModal({
                message: <Form ReloadBook={ReloadBook} />,
                size: "xl",
              })
            }
          >
            <i className="bi bi-plus-circle"></i>
            Add New Book
          </Button>
        </div>
        {books.loading ? (
          <Skeleton />
        ) : books.message ? (
          <Alert message={books.message} variant="danger" />
        ) : books.data && books.data.length > 0 ? (
          <Tabledata data={books.data} ReloadData={ReloadBook} />
        ) : (
          ""
        )}
      </Layout>
    );
  } catch (error) {
    return <Alert message={error.message} variant="danger" />;
  }
}
