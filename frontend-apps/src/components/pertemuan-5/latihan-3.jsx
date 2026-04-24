"use client";

import React, { useState } from "react";
import Layout from "./layout";
import { ListBooks } from "@/const/bookList";
import { Button } from "@/components/_ui/atoms/buttons";
import Tabledata from "./components/tabledata";
import Form from "./components/form";
import { openModal } from "@/components/_ui/modals";

export default function Latihan3() {
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
              message: <Form />,
              size: "xl",
            })
          }
        >
          <i className="bi bi-plus-circle"></i>
          Add New Book
        </Button>
      </div>
      <div className="d-none d-lg-block">
        <Tabledata />
      </div>
    </Layout>
  );
}
