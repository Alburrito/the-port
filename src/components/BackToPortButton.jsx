import React from "react";
import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

// Reusable button component to return to the main port page
export function BackToPortButton({ size = "lg", variant = "solid", ...props }) {
  return (
    <Button 
      as={Link} 
      to="/" 
      colorPalette="gray" 
      size={size}
      variant={variant}
      {...props}
    >
      {"<< Volver al Puerto"}
    </Button>
  );
}
