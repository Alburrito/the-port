import React from "react";
import { Box, Textarea } from "@chakra-ui/react";

/**
 * TextInput Component
 * 
 * Provides the primary input mechanism for text-to-color conversion.
 * This component handles user text input with real-time color generation,
 * featuring responsive design and accessibility considerations.
 * 
 * UX Design:
 * - Auto-resizing textarea adapts to content length
 * - Centered layout focuses attention on input
 * - Placeholder text guides user interaction
 * - Focus states provide clear visual feedback
 * 
 * Styling Strategy:
 * - Semi-transparent background integrates with dark theme
 * - White text maintains readability
 * - Smooth transitions enhance perceived responsiveness
 * - Constrained height prevents interface overflow
 * 
 * Accessibility Features:
 * - Large font size improves readability
 * - High contrast ratios meet WCAG guidelines
 * - Semantic textarea element for screen readers
 * - Keyboard navigation fully supported
 * 
 * @param {string} inputText - Current text input value
 * @param {Function} onInputChange - Callback for text changes
 */
export function TextInput({ inputText, onInputChange }) {
  return (
    <Box>
      {/* Auto-resizing textarea with theme-consistent styling */}
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
