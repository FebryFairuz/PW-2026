"use client";

import React from "react";
import Image from "next/image";
import { Cards } from "@/components/_ui/cards";
import { useAuth } from "@/contexts/auth-context";

export default function Header() {
  const { user, logout } = useAuth();
  
  return (
    <Cards>
      <Cards.Body className={`bg-primary rounded bg-gradient`}>
        <div className="d-lg-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-3">
            <Image
              src="/assets/images/LOGO_IBIK.png"
              alt="Pem website"
              className="rounded-circle border border-4 border-white shadow bg-light p-1"
              width={120}
              height={120}
            />
            <div>
              <h1 className="text-white mb-0 text-uppercase">
                Pemograman Website
              </h1>
              <h3 className="mb-0 fs-5 text-white">
                IBI Kesatuan Bogor | Teknologi Informasi
              </h3>
            </div>
          </div>
          {user && (
            <div className="d-flex align-items-center gap-2">
              <div className="d-flex align-items-center bg-light bg-opacity-50 rounded-pill p-1 px-3">
                <span className="me-2">👋</span>
                <span>{user?.username}</span>
              </div>
              <div className="w-100">
                <button
                  className="w-100 btn btn-sm btn-light rounded-pill px-3"
                  onClick={logout}
                >
                  <span className="me-2">Logout</span>
                  <i className="bi bi-box-arrow-right"></i>
                </button>
              </div>
            </div>
          )}
        </div>
      </Cards.Body>
    </Cards>
  );
}