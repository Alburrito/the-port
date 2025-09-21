import React from "react";

import { Box, Spinner, Text } from "@chakra-ui/react";

/**
 * LoadingSpinner Component
 * 
 * Displays a spinning indicator with an optional message to inform
 * the user to wait during asynchronous operations.
 *
 * @param {Object} props - Component properties
 * @param {string} [props.message="Cargando..."] - Text to display below the spinner
 * @param {string} [props.size="xl"] - Spinner size according to Chakra UI
 * @param {number|string} [props.mt=20] - Top margin
 * @param {Object} props.props - Additional props passed to the Box container
 */
export function LoadingSpinner({ 
  message = "Cargando...", 
  size = "xl", 
  mt = 20,
  ...props 
}) {
  return (
    <Box textAlign="center" mt={mt} {...props}>
      <Spinner size={size} />
      <Text mt={4}>{message}</Text>
    </Box>
  );
}
