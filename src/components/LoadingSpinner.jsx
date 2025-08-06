import React from "react";
import { Box, Spinner, Text } from "@chakra-ui/react";

// Reusable loading spinner component
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
