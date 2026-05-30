import React from "react";
import Link from "next/link";
import Header from "@/components/_ui/header";
import {Modules} from "./components"


export default function Welcome() {
  return (
    <div className="container mt-5">
      <Header />
      <Modules />
      <footer>
        <p className="mb-0 text-center fs-6 text-muted">
          Copyright &copy; {new Date().getFullYear() } · Febry Damatraseta Fairuz. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

const DirectoryItem = ({ item }) => {
  if (item.type === "directory") {
    if (!item.name.includes("auth")) {
      const cleanPath = item.path
        ? item.path.replace(/^app\/?/, "")
        : item.name;
      const href = `/${cleanPath}`;

      return (
        <li>
          <Link href={href} className="text-primary text-decoration-none">
            📁 {item.name}
          </Link>
          {item.children && item.children.length > 0 && (
            <ul
              style={{
                listStyle: "none",
                marginLeft: "20px",
                marginTop: "5px",
              }}
            >
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
