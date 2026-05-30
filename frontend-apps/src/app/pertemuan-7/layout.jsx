import React from "react";
import BootstrapClient from "@/components/_ui/BootstrapClient";
import Modals from "@/components/_ui/modals";
import ProtectedRoute from "@/components/auth/protected-route";


export default function Layout({ children }) {
  return (
    <>
      <ProtectedRoute>
        <BootstrapClient>
          {children}
        </BootstrapClient>
        <Modals />
      </ProtectedRoute>
    </>
  );
}
