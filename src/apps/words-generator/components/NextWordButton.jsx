import React from "react";

import { Box, Button } from "@chakra-ui/react";

/**
 * NextWordButton - Next Word Generation Button
 *
 * Primary action button for generating a new word with color scheme changes.
 * Implements consistent theming with transparency-based hover effects.
 *
 * @param {Object} props - Component properties
 * @param {Function} props.onNextWord - Callback for word generation and theme update
 * @param {Object} props.colorScheme - Object containing the current color theme with bg/text properties
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
