import React from "react";
import path from "path";
import Link from "next/link";
import { GetDirectoryStructure } from "@/hooks/directory";
import { Cards } from "@/components/_ui/cards";

export function Modules() {
  const appPath = path.join(process.cwd(), "src", "app");
  const directoryStructure = GetDirectoryStructure(appPath, "app");
  return (
    <div>
      <h3>Module Pembelajaran</h3>
      <span className="text-muted fs-6">Materi yang code kelas teori</span>
      <div className="mt-3 row">
        {directoryStructure.map((item, index) => (
          <div className="col-lg-4" key={index}>
            <DirectoryItem item={item} />
          </div>
        ))}
      </div>
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
      const filteredChildren = item.children?.filter(
        (child) =>
          !child.name.includes("layout.jsx") &&
          !child.name.includes("page.jsx"),
      );

      return (
        <Cards>
          <Cards.Body>
            <Link href={href} className="text-decoration-none">
            <div className="d-flex align-items-center justify-content-start">
              <i className="bi bi-bookmark-fill fs-4 me-2 text-warning"></i>
              <span className="text-dark fs-5 text-capitalize">
                {item.name}
              </span>
            </div>
            </Link>
            {/* {filteredChildren && filteredChildren.length > 0 && (
              <div className="mt-2 d-flex align-items-center">
                {filteredChildren.map((child, index) => (
                  <ChildItem key={index} child={child} />
                ))}
              </div>
            )} */}
            {/* <Link href={href} className="text-primary text-decoration-none">
              📁 
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
            </Link> */}
          </Cards.Body>
        </Cards>
      );
    }
  }
};

const ChildItem = ({ child }) => {
  const BadgeItem = ({ name }) => {
    return (
      <div className="d-flex align-items-center">
        <i className="bi bi-folder fs-6 me-2 text-white"></i>
        <span className="">{name}</span>
      </div>
    );
  };
  if (
    child.type === "file" &&
    (child.name.includes("layout.jsx") || child.name.includes("page.jsx"))
  ) {
    return null;
  }

  if (child.type === "directory") {
    const filteredChildren = child.children?.filter(
      (item) =>
        !item.name.includes("layout.jsx") && !item.name.includes("page.jsx"),
    );

    return (
      <div className="ms-3 badge text-bg-secondary">
        <BadgeItem name={child?.name} />
        {filteredChildren && filteredChildren.length > 0 && (
          <div className="ms-3">
            {filteredChildren.map((subChild, index) => (
              <ChildItem key={index} child={subChild} />
            ))}
          </div>
        )}
      </div>
    );
  }

  return <BadgeItem name={child?.name} />;
};
