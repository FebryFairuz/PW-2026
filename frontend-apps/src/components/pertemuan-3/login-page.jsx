import React from "react";
import './style.css'

export default function Login() {
  return (
    <div className="ade-kecap">
      <h1>Login Page</h1>
      <p>Please enter your account</p>
      <form>
        <label>Username:</label>
        <input type="text" name="username" placeholder="Enter your username" />
        <label>Password:</label>
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
        />
        <div className="form-footer">
          <button type="submit">Continue</button>
        </div>
      </form>
    </div>
  );
}
