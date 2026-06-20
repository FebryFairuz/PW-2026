import React from "react";
import BootstrapClient from "@/components/_ui/BootstrapClient";
import Modals from "@/components/_ui/modals";

export default function Layout({ children }) {
  return (
    <>
      <BootstrapClient>{children}</BootstrapClient>
      <Modals />
    </>
  );
}
