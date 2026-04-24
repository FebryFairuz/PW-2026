import React from 'react'

export default function TempLayout({children}) {
  return (
    <div className="container">
      <div className="d-flex align-items-center justify-content-center min-vh-100">
        <div className="w-100">{children}</div>
      </div>
    </div>
  )
}
