import React from "react";

import { Box, Text, Separator } from "@chakra-ui/react";

/**
 * AppHeader - Reusable Header Component for Applications
 * 
 * Centralized header component that can be used across different apps.
 * Provides a consistent layout with decorative separators and customizable content.
 * 
 * Features:
 * - Dynamic title support via props
 * - Optional color scheme customization
 * - Consistent spacing and typography
 * - Responsive design with centered alignment
 *
 * @param {Object} props - Component properties
 * @param {string} props.title - The title of the application to display
 * @param {Object} [props.colorScheme] - Optional color theme with text property (defaults to { text: "white" })
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
