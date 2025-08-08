import React from "react";
import { Box, Text, Separator } from "@chakra-ui/react";

/**
 * AppHeader Component
 * 
 * Renders the application title with decorative separators.
 * 
 * Design Principles:
 * - Centered layout for balanced visual weight
 * - Separator elements create clear content boundaries
 * - Responsive typography scales appropriately
 * - Clean, minimal design focuses attention on functionality
 * 
 * @param {Object} colorScheme - Current color theme object with bg/text properties
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
