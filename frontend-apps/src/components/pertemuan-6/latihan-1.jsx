"use client"

import React, { useState } from "react";
import { Heading } from "@/components/_ui/atoms/texts";
import TempLayout from "@/components/_ui/temp";

export default function RestAPI() {
  const baseURL = `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/user`;

  const apiEndpoints = [
    {
      id: 1,
      method: "GET",
      endpoint: "/users",
      description: "Retrieve data",
      color: "success",
    },
    {
      id: 2,
      method: "GET",
      endpoint: "/users/:id",
      description: "Retrieve data by ID",
      color: "success",
    },
    {
      id: 3,
      method: "POST",
      endpoint: "/users",
      description: "Create new data",
      color: "primary",
    },
    {
      id: 4,
      method: "PUT",
      endpoint: "/users/:id",
      description: "Update existing data",
      color: "warning",
    },
    {
      id: 5,
      method: "DELETE",
      endpoint: "/users/:id",
      description: "Delete/Remove data",
      color: "danger",
    },
  ];
  return (
    <div className="container">
      <TempLayout>
        <Heading level={3} className="text-start my-4">
          Membuat Rest API dengan next.js
        </Heading>

        <div className="border rounded p-3">
          <div className="mb-3">
            <h5 className="mb-2">Base URL</h5>
            <code className="bg-light p-2 rounded d-block">{baseURL}</code>
          </div>

          <h5 className="mb-3">API Endpoints</h5>

          <div className="table-responsive">
            <table className="table table-bordered">
              <thead className="table-light">
                <tr>
                  <th style={{ width: "15%" }}>Method</th>
                  <th style={{ width: "35%" }}>Endpoint</th>
                  <th style={{ width: "50%" }}>Fungsi</th>
                </tr>
              </thead>
              <tbody>
                {apiEndpoints.map((api) => (
                  <tr key={api.id}>
                    <td>
                      <span className={`badge bg-${api.color} fw-bold`}>
                        {api.method}
                      </span>
                    </td>
                    <td>
                      <code>{api.endpoint}</code>
                    </td>
                    <td>{api.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Accordion untuk detail setiap endpoint */}
          <div className="accordion mt-4" id="apiAccordion">
            {apiEndpoints.map((api, index) => (
              <EndpointDetail
                key={api.id}
                api={api}
                index={index}
                baseURL={baseURL}
              />
            ))}
          </div>
        </div>
      </TempLayout>
    </div>
  );
}

const EndpointDetail = ({ api, index, baseURL }) => {
  const [isOpen, setIsOpen] = useState(false);

  const getExampleRequest = () => {
    switch (api.method) {
      case "POST":
        return {
          body: {
            name: "John Doe",
            email: "john@example.com",
            password: "password123",
          },
        };
      case "PUT":
        return {
          body: {
            name: "John Doe Updated",
            email: "john.updated@example.com",
          },
        };
      default:
        return null;
    }
  };

  const getExampleResponse = () => {
    switch (api.method) {
      case "GET":
        if (api.endpoint.includes(":id")) {
          return {
            success: true,
            data: {
              id: 1,
              name: "John Doe",
              email: "john@example.com",
              createdAt: "2024-01-15T10:30:00Z",
            },
          };
        }
        return {
          success: true,
          data: [
            {
              id: 1,
              name: "John Doe",
              email: "john@example.com",
            },
            {
              id: 2,
              name: "Jane Smith",
              email: "jane@example.com",
            },
          ],
          total: 2,
        };
      case "POST":
        return {
          success: true,
          message: "User created successfully",
          data: {
            id: 3,
            name: "John Doe",
            email: "john@example.com",
          },
        };
      case "PUT":
        return {
          success: true,
          message: "User updated successfully",
          data: {
            id: 1,
            name: "John Doe Updated",
            email: "john.updated@example.com",
          },
        };
      case "DELETE":
        return {
          success: true,
          message: "User deleted successfully",
        };
      default:
        return {};
    }
  };

  const exampleRequest = getExampleRequest();
  const exampleResponse = getExampleResponse();

  return (
    <div className="accordion-item">
      <h2 className="accordion-header">
        <button
          className={`accordion-button ${isOpen ? "" : "collapsed"}`}
          type="button"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className={`badge bg-${api.color} me-2`}>{api.method}</span>
          <code className="me-2">{api.endpoint}</code>
          <span className="text-muted">- {api.description}</span>
        </button>
      </h2>
      <div className={`accordion-collapse collapse ${isOpen ? "show" : ""}`}>
        <div className="accordion-body">
          <div className="mb-3">
            <h6 className="fw-bold">Full URL:</h6>
            <code className="bg-light p-2 rounded d-block">
              {baseURL}
              {api.endpoint}
            </code>
          </div>

          {exampleRequest && (
            <div className="mb-3">
              <h6 className="fw-bold">Request Body:</h6>
              <pre className="bg-light p-3 rounded">
                <code>{JSON.stringify(exampleRequest.body, null, 2)}</code>
              </pre>
            </div>
          )}

          <div className="mb-3">
            <h6 className="fw-bold">Response Example:</h6>
            <pre className="bg-light p-3 rounded">
              <code>{JSON.stringify(exampleResponse, null, 2)}</code>
            </pre>
          </div>

          {api.endpoint.includes(":id") && (
            <div className="alert alert-info mb-0">
              <i className="bi bi-info-circle me-2"></i>
              <strong>Note:</strong> Replace <code>:id</code> with actual user
              ID (e.g., <code>/users/1</code>)
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
