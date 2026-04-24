import React from "react";
import path from "path";
import { GetDirectoryStructure } from "@/hooks/directory";
import Link from "next/link";
import Image from "next/image";


export default function Welcome() {
  const appPath = path.join(process.cwd(), "src", "app");
  const directoryStructure = GetDirectoryStructure(appPath, "app");

  return (
    <div className="container my-5">
      <div className="p-5 bg-body-tertiary rounded-3">
        <div className="text-center">
          <Image
            src="/assets/images/LOGO_IBIK.png"
            alt="IBI Kesatuan"
            width={100}
            height={100}
          />
          <h1 className="text-body-emphasis text-capitalize">
            Pemograman website 2026
          </h1>
          <p className="col-lg-8 mx-auto fs-5 text-muted">
            Class of TI-24-PA & TI-24-KA
          </p>
        </div>

        <div className="my-5">
          <h3>Rootes Page</h3>
          <ol style={{ listStyle: "none" }} className="ps-0">
            <li>📁 pertemuan-2 (Root Layout) </li>
            {directoryStructure.map((item, index) => (
              <DirectoryItem key={index} item={item} />
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

const DirectoryItem = ({ item }) => {
  if (item.type === "directory") {
    if (!item.name.includes("auth")) {
      const cleanPath = item.path ? item.path.replace(/^app\/?/, "") : item.name;
      const href = `/${cleanPath}`;
      
      return (
        <li>
          <Link href={href} className="text-primary text-decoration-none">
            📁 {item.name}
          </Link>
          {item.children && item.children.length > 0 && (
            <ul style={{ listStyle: "none", marginLeft: "20px", marginTop: "5px" }}>
              {item.children.map((child, index) => (
                <DirectoryItem key={index} item={child} />
              ))}
            </ul>
          )}
        </li>
      );
    }
  }

};
