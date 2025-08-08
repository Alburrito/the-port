import React from "react";
import { Box, Text, Separator } from "@chakra-ui/react";

/**
 * AppHeader Component
 * 
 * Renders the application title with decorative separators for the text-to-color app.
 * This component establishes visual hierarchy and branding while maintaining
 * consistency with the app's dark theme design language.
 * 
 * Design Philosophy:
 * - Centered layout creates balanced composition
 * - Separator elements provide clear content boundaries
 * - Bold typography establishes app identity
 * - Consistent spacing maintains visual rhythm
 * 
 * Visual Strategy:
 * - White text on dark background for high contrast
 * - Large font size ensures readability and prominence
 * - Separators frame the title for emphasis
 * - Responsive design adapts to different screen sizes
 */
export function AppHeader() {
  return (
    <>
      <Separator my={4} />

      {/* Main application title with centered alignment */}
      <Box textAlign="center">
        <Text fontSize="3xl" fontWeight="bold" color="white">
          Texto a Color
        </Text>
      </Box>

      <Separator my={4} />
    </>
  );
}
