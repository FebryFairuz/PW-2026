import React from "react";
import { Heading, Text } from "../../_ui/atoms/texts";

export default function AuthTemp({ children, title, description }) {
  return (
    <>
      <div className="text-center mb-4">
        <Heading level={2} className="fw-bold text-primary">
          {title}
        </Heading>
        <Text className="text-muted">{description}</Text>
      </div>
      {children}
    </>
  );
}
