import React from "react";
import { Box, Textarea } from "@chakra-ui/react";

/**
 * TextInput Component
 * 
 * Auto-resizing textarea for text input with real-time color generation trigger.
 * Handles text input changes and forwards them to parent component.
 * 
 * Technical Features:
 * - autoresize property handles dynamic height adjustment
 * - maxH="30vh" prevents excessive vertical growth
 * - Centered layout with constrained maximum width (500px)
 * - Dark theme integration with semi-transparent background
 * 
 * State Management:
 * - Controlled component receiving value and onChange from parent
 * - No local state, forwards all changes immediately
 * 
 * @param {string} inputText - Current text input value
 * @param {Function} onInputChange - Callback for text changes
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
