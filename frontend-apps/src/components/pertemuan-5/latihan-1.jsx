"use client";

import React, { useState } from "react";
import Layout from "./layout";
import { Button } from "../_ui/atoms/buttons";

export default function Latihan1() {
  const [count, setCount] = useState(0);
  return (
    <Layout>
      <div className="border p-3 w-50 m-auto text-center bg-light">
        <h3>
          Hit me <span className="text-info">{count}</span>
        </h3>
        <div className="btn-group my-3">
          <Button
            type="button"
            className={`btn-primary`}
            onClick={() => setCount(count + 1)}
          >
            Click (+)
          </Button>
          <Button
            type="button"
            className={`btn-danger`}
            onClick={() => setCount(count - 1)}
          >
            Click (-)
          </Button>
          <Button
            type="button"
            className={`btn-success`}
            onClick={() => setCount(0)}
          >
            Reset
          </Button>
        </div>
      </div>
    </Layout>
  );
}
