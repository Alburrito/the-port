import React from "react";
import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

// Fixed height for the back button (in vh units)
export const BACK_BUTTON_HEIGHT_VH = 8;

// Reusable button component to return to the main port page
export function BackToPortButton({ size = "lg", variant = "solid", ...props }) {
  return (
    <Button 
      as={Link} 
      to="/" 
      colorPalette="gray" 
      size={size}
      fontWeight="bold"
      variant={variant}
      h={`${BACK_BUTTON_HEIGHT_VH}vh`}
      minH={`${BACK_BUTTON_HEIGHT_VH}vh`}
      maxH={`${BACK_BUTTON_HEIGHT_VH}vh`}
      display="flex"
      alignItems="center"
      justifyContent="center"
      {...props}
    >
      {"<< Volver al Puerto"}
    </Button>
  );
}
