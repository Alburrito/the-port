import React from "react";
import { Box, Text } from "@chakra-ui/react";

/**
 * Primary word renderer with text processing
 * 
 * Displays current word with automatic capitalization and theme integration.
 * String manipulation capitalizes first character while preserving remainder.
 * 
 * @param {Object} currentWord - Word object with word and definitions properties
 * @param {Object} colorScheme - Color theme with bg/text properties
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
