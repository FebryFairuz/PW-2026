import React from "react";
import Image from "next/image";
import { Cards } from "@/components/_ui/cards";

export default function Header() {
  return (
    <Cards>
      <Cards.Body className={`bg-primary rounded bg-gradient`}>
        <div className="d-flex align-items-center justify-content-between">
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
        </div>
      </Cards.Body>
    </Cards>
  );
}
