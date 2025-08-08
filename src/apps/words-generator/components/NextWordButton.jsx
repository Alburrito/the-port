import React from "react";
import { Box, Button } from "@chakra-ui/react";

/**
 * NextWordButton Component
 * 
 * Provides the primary interaction mechanism for word generation.
 * This component triggers the core functionality of fetching new words
 * with accompanying color scheme changes for enhanced visual variety.
 * 
 * Interaction Design:
 * - Prominent placement at bottom of interface
 * - Clear action labeling ("Siguiente") 
 * - Hover states provide immediate feedback
 * - Theme-consistent styling maintains visual harmony
 * 
 * Styling Strategy:
 * - Semi-transparent background integrates with any color scheme
 * - Alpha-based hover effects work across all themes
 * - Bold typography emphasizes primary action
 * - Large size ensures accessibility and ease of use
 * 
 * @param {Function} onNextWord - Callback function to generate new word and theme
 * @param {Object} colorScheme - Current color theme object with bg/text properties
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
