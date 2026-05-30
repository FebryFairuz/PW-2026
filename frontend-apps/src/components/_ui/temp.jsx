"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Header from "@/components/_ui/header";

export default function TempLayout({ children }) {
  const pathname = usePathname();
  const current_path = pathname.split("/").filter((item) => item);

  return (
    <div className="container mt-3">
      <Header />
      <div style={{ marginTop: "-10px",position:'inherit' }}>
        {current_path.length > 0 && (
          <div className="bg-light p-2 rounded mb-3 shadow-sm">
            <Breadcrumb listProps={{ className: "mb-0" }}>
              <Breadcrumb.Item href="/">
                <span className="text-decoration-none text-dark">
                  <i className="bi bi-house-fill fs-6"></i>
                </span>
              </Breadcrumb.Item>
              {current_path.map((path, index) => (
                <Breadcrumb.Item
                  key={index}
                  href={`/${path}`}
                  linkProps={{ className: "text-decoration-none text-dark" }}
                >
                  <span className="text-decoration-none text-dark">{path}</span>
                </Breadcrumb.Item>
              ))}
            </Breadcrumb>
          </div>
        )}
      </div>
      {children}
    </div>
  );
}
