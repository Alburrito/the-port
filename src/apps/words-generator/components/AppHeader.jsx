import React from "react";
import { Box, Text, Separator } from "@chakra-ui/react";

/**
 * Application header with title and separators
 * 
 * Centered layout header component with decorative separator elements.
 * Implements responsive typography with color scheme integration.
 * 
 * @param {Object} colorScheme - Color theme with bg/text properties
 */
export function AppHeader({ colorScheme }) {
  return (
    <Box px={4} pt={4}>
      <Separator my={4} />

      {/* Main application title with centered alignment */}
      <Box textAlign="center">
        <Text fontSize="3xl" fontWeight="bold" color={colorScheme.text}>
          Generador de Palabras
        </Text>
      </Box>
      
      <Separator my={4} />
    </Box>
  );
}
