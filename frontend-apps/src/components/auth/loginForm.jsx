"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  FormField,
  PasswordField,
} from "@/components/_ui/molecules/formFields";
import { Button } from "@/components/_ui/atoms/buttons";
import AuthTemp from "./temp";
import { useAuth } from "@/contexts/auth-context";
import { Alert } from "@/components/_ui/alerts";
import { LOG_IN } from "@/components/apis/user-services";
import { withAuthRedirect } from "./with-auth-redirect";

function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "febrid@ibik.ac.id",
    password: "Dosen@kesatuan",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("Email and password are required");
      return;
    }

    setLoading(true);

    try {
      const param = { email: formData.email, password: formData.password };
      const results = await LOG_IN(param);
      console.log("Login response:", results);
      if (results.success) {
        console.log("Login response:", results);
        await login(
          results.data.data,
          results.data.accessToken,
          results.data.expiresIn,
        );

        await new Promise((resolve) => setTimeout(resolve, 100));
        router.push("/pertemuan-7");
      } else {
        setError(results.message);
        return;
      }
    } catch (error) {
      console.error("Error during login:", error);

      if (error.response) {
        setError(error.response.data.message || "Login failed");
      } else if (error.request) {
        setError("No response from server. Please try again.");
      } else {
        setError("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <AuthTemp
      title={`Welcome Back`}
      description={`Please login using the same username and password as your account`}
    >
      <form onSubmit={handleSubmit}>
        <FormField
          label={`Email`}
          required={true}
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
        />
        <PasswordField
          required={true}
          label={"Password"}
          id="password"
          name="password"
          showPassword={showPassword}
          onPasswordToggle={togglePasswordVisibility}
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
        />
        <div className="text-end mb-3">
          <span className="text-primary">Forgot Password ?</span>
        </div>

        {error && <Alert variant={"danger"} message={error} />}

        <div className="d-grid my-3">
          <Button
            type="submit"
            className={`btn-lg btn-primary`}
            disabled={loading}
          >
            {loading ? "Processing..." : "Continue"}
          </Button>
        </div>
      </form>
    </AuthTemp>
  );
}

export default withAuthRedirect(LoginForm);
