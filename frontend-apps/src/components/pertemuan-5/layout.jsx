import React from "react";
import TempLayout from "@/components/_ui/temp";
import { Cards } from "@/components/_ui/cards";

export default function Layout({ children }) {
  return (
    <TempLayout>
      <Cards>
        <Cards.Header className="bg-light">
          <span className="card-label fs-3 fw-bold">
            Belajar State Management
          </span>
        </Cards.Header>
        <Cards.Body>{children}</Cards.Body>
      </Cards>
    </TempLayout>
  );
}
