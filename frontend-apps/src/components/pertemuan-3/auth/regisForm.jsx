import React from "react";
import { FormField } from "@/components/_ui/molecules/formFields";
import { Button } from "@/components/_ui/atoms/buttons";
import AuthTemp from "./temp";

export default function RegisForm() {
  return (
    <AuthTemp
      title={`Registration`}
      description={`Please fill out the form below to create an account`}
    >
      <form>
        <FormField
          label="Fullname:"
          name="fullname"
          type="text"
          placeholder="Enter your firstname and lastname"
        />
        <FormField
          label="Email:"
          name="email"
          type="mail"
          placeholder="Enter your mail address"
        />
        <FormField
          label="Phone Number:"
          name="phone"
          type="tel"
          placeholder="Enter your phone number"
        />
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
        <FormField
          label="Retype Password:"
          name="repassword"
          type="password"
          placeholder="Enter retype your password"
        />
        <div className="d-grid my-3">
          <Button type="button" className={`btn-lg btn-primary`}>
            Registration
          </Button>
        </div>
      </form>
    </AuthTemp>
  );
}
