import React from "react";
import { Box, Text } from "@chakra-ui/react";

/**
 * WordDisplay Component
 * 
 * Renders the current word with proper capitalization and styling.
 * This component serves as the primary content focus, displaying the word.
 * 
 * Text Processing:
 * - Capitalizes first letter while preserving original casing
 * - Uses prominent typography to ensure readability
 * - Applies current color scheme for theme consistency
 * 
 * @param {Object} currentWord - Word object containing word and definitions
 * @param {Object} colorScheme - Current color theme object with bg/text properties
 */
export function WordDisplay({ currentWord, colorScheme }) {
  return (
    <Box textAlign="center" mb={4}>
      {/* Primary word display with capitalize formatting */}
      <Text fontSize="3xl" color={colorScheme.text} fontWeight="bold">
        {currentWord.word.charAt(0).toUpperCase() + currentWord.word.slice(1)}
      </Text>
    </Box>
  );
}
