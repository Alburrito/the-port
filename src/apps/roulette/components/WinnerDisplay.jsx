import React from "react";
import { Box, Text } from "@chakra-ui/react";

/**
 * Winner result announcement component
 * 
 * Conditional rendering component for displaying roulette results.
 * Shows winner information with color preview and label text.
 * Only renders when winner object exists (non-null).
 */
export function WinnerDisplay({ winner }) {
  // Guard clause: Only render when winner is determined
  if (!winner) return null;

  return (
    /* Result container with success styling */
    <Box textAlign="center" mb={4} p={4} bg="green.50" borderRadius="lg" border="2px solid" borderColor="green.200">
      {/* Winner announcement heading */}
      <Text fontSize="2xl" fontWeight="bold" color="green.600" mb={2}>
        🎉 ¡Ganador! 🎉
      </Text>
      
      {/* Winner details: color indicator + label text */}
      <Box display="flex" alignItems="center" justifyContent="center" gap={3}>
        {/* Color preview circle matching winning sector */}
        <Box w="32px" h="32px" borderRadius="full" bg={winner.color} border="3px solid white" boxShadow="lg" />
        
        {/* Winner label with fallback to color value */}
        <Text fontSize="xl" fontWeight="bold" color="gray.700">
          {winner.label || winner.color}
        </Text>
      </Box>
    </Box>
  );
}
