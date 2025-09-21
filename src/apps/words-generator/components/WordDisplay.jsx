import React from "react";

import { Box, Text } from "@chakra-ui/react";

/**
 * WordDisplay - Main Word Renderer with Text Processing
 * 
 * Displays the current word with automatic capitalization and theme integration.
 * String manipulation capitalizes the first character while preserving the rest.
 *
 * @param {Object} props - Component properties
 * @param {Object} props.currentWord - Word object with word and definitions properties
 * @param {Object} props.colorScheme - Color theme with bg/text properties
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
