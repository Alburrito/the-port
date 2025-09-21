import React from "react";

import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

// Altura fija para el botón de regreso (en unidades vh)
export const BACK_BUTTON_HEIGHT_VH = 8;

/**
 * BackToPortButton - Reusable Back to Port Button
 *
 * Consistent navigation component that provides a clear path
 * to return to the main page from any application.
 * Utilizes fixed height to maintain visual consistency across the application.
 *
 * @param {Object} props - Component properties
 * @param {string} [props.size="lg"] - Button size according to Chakra UI
 * @param {string} [props.variant="solid"] - Button variant according to Chakra UI
 * @param {Object} props.props - Additional props passed to the Button component
 */
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
