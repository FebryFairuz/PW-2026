import React from 'react'
import { Cards } from '../../components/_ui/cards';

export default function AuthLayout({children}) {
  return (
      <div className="container">
        <div className="row justify-content-center align-items-center min-vh-100">
          <div className="col-md-6 col-lg-5">
            <Cards>
              <Cards.Body>
                {children}
              </Cards.Body>
            </Cards>
          </div>
        </div>
      </div>
    );
}
