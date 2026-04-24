import React from "react";
import { FormField, PasswordField } from "@/components/_ui/molecules/formFields";
import { Button } from "@/components/_ui/atoms/buttons";
import AuthTemp from "./temp";

export default function LoginForm() {
  return (
    <AuthTemp title={`Welcome Back`} description={`Please login using the same username and password as your account`}>
      <form>
        <FormField
          label="Username:"
          name="username"
          type="text"
          placeholder="Enter your username"
        />
        <FormField
          label="Password:"
          name="password"
          type="password"
          placeholder="Enter your password"
        />
        <div className="text-end mb-3">
          <span className="text-primary">Forgot Password ?</span>
        </div>
        <div className="d-grid my-3">
          <Button type="button" className={`btn-lg btn-primary`}>
            Continue
          </Button>
        </div>
      </form>
    </AuthTemp>
  );
}
