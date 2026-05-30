import React from "react";
import { Heading } from "@/components/_ui/atoms/texts";
import TempLayout from "@/components/_ui/temp";
import { Cards } from "@/components/_ui/cards";

export default function Layout({ children }) {
  return (
    <TempLayout>
      <Heading level={3} className="text-center my-4">
        Integrasi Rest API : Auth and CRUD Operations
      </Heading>
      <hr />
      {children}
    </TempLayout>
  );
}
