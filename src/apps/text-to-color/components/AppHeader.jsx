import React from "react";
import { Box, Text, Separator } from "@chakra-ui/react";

/**
 * AppHeader Component
 * 
 * Static header component rendering application title with decorative separators.
 * No state management or user interactions.
 * 
 * Implementation:
 * - Fixed layout with centered text alignment
 * - Uses Chakra UI Text and Separator components
 * - Static content with no props or dynamic behavior
 */
export function AppHeader() {
  return (
    <>
      <Separator my={4} />

      <Box textAlign="center">
        <Text fontSize="3xl" fontWeight="bold" color="white">
          Texto a Color
        </Text>
      </Box>

      <Separator my={4} />
    </>
  );
}
