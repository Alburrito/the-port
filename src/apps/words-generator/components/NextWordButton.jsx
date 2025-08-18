import React from "react";
import { Box, Button } from "@chakra-ui/react";

/**
 * Word generation trigger button
 * 
 * Primary action button for generating new word with color scheme changes.
 * Implements theme-consistent styling with alpha-based hover effects.
 * 
 * @param {Function} onNextWord - Callback for word generation and theme update
 * @param {Object} colorScheme - Color theme with bg/text properties
 */
export function NextWordButton({ onNextWord, colorScheme }) {
  return (
    <Box textAlign="center" px={4} pb={10}>
      {/* Primary action button with theme-aware styling */}
      <Button 
        onClick={onNextWord} 
        colorScheme="whiteAlpha" 
        size="lg"
        bg="whiteAlpha.200"
        _hover={{ bg: "whiteAlpha.300" }}
        color={colorScheme.text}
        fontWeight="bold"
      >
        Siguiente
      </Button>
    </Box>
  );
}
