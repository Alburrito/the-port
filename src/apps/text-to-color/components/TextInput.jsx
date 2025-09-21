import React from "react";

import { Box, Textarea } from "@chakra-ui/react";

/**
 * Text input area with auto-resizing for real-time color generation.
 * 
 * Handles text input changes and forwards them to parent component.
 * 
 *
 * Technical Features:
 * - The autoresize property handles dynamic height adjustment
 * - maxH="30vh" prevents excessive vertical growth
 * - Centered layout with max width limit (500px)
 * - Dark theme integration with semi-transparent background
 *
 * State Management:
 * - Controlled component that receives value and onChange from parent
 * - No local state, immediately forwards all changes
 *
 * @param {Object} props - Component properties
 * @param {string} props.inputText - Current value of the input text
 * @param {Function} props.onInputChange - Callback for text changes
 */
export function TextInput({ inputText, onInputChange }) {
  return (
    <Box>
      {/* Auto-resizing textarea with theme styling */}
      <Textarea
        value={inputText}
        onChange={onInputChange}
        placeholder="Escribe tu texto aquí..."
        size="lg"
        textAlign="center"
        bg="whiteAlpha.200"
        border="none"
        color="white"
        _placeholder={{ color: "whiteAlpha.700" }}
        _focus={{ bg: "whiteAlpha.300" }}
        maxW="500px"
        mx="auto"
        maxH="30vh" // Prevent excessive height on long texts
        autoresize
        overflow="auto"
      />
    </Box>
  );
}
