import React from "react";
import { Box, Text, Separator } from "@chakra-ui/react";

/**
 * AppHeader Component - Reusable Header for Applications
 * 
 * Centralized header component that can be used across different apps.
 * Provides consistent layout with decorative separators and customizable content.
 * 
 * Features:
 * - Dynamic title support via props
 * - Optional color scheme customization
 * - Consistent spacing and typography
 * - Responsive design with centered layout
 * 
 * @param {string} title - The application title to display
 * @param {Object} colorScheme - Optional color theme with text property
 * @param {string} colorScheme.text - Text color (defaults to "white")
 */
export function AppHeader({ title, colorScheme = { text: "white" } }) {
  return (
    <Box px={4} pt={4}>
      <Separator my={4} />

      {/* Main application title with centered alignment */}
      <Box textAlign="center">
        <Text fontSize="3xl" fontWeight="bold" color={colorScheme.text}>
          {title}
        </Text>
      </Box>
      
      <Separator my={4} />
    </Box>
  );
}
