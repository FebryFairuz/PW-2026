"use client";

import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { Heading } from "@/components/_ui/atoms/texts";
import TempLayout from "@/components/_ui/temp";
import Latihan1 from "./latihan-1";
import Latihan2 from "./latihan-2";
import Latihan3 from "./latihan-3";

export default function Latihan5() {
  const navigations = [
    { id: 1, title: "State Management", component: <Latihan1 /> },
    { id: 2, title: "Hooks", component: <Latihan2 /> },
    { id: 3, title: "Sample CRUD", component: <Latihan3 /> },
  ];

  return (
    <div className="container">
      <TempLayout>
        <Heading level={3} className="text-start my-4">
          Belajar Hooks Lifecycle
        </Heading>

        <Tabs defaultActiveKey="navigation-1" id="uncontrolled-tab-example">
          {navigations.map((nav) => (
            <Tab
              key={nav.id}
              eventKey={`navigation-${nav.id}`}
              title={nav.title}
            >
              <div className="border rounded-bottom-1 p-3 border-top-0">
                {nav.component}
              </div>
            </Tab>
          ))}
        </Tabs>
      </TempLayout>
    </div>
  );
}
