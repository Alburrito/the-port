import React from "react";
import { Box, Text } from "@chakra-ui/react";

/**
 * WinnerDisplay Component
 * 
 * Renders celebratory announcement when a roulette winner is determined.
 * This component provides clear visual feedback with prominent styling
 * to highlight the winning result and create a satisfying conclusion
 * to the spinning experience.
 * 
 * Conditional rendering: Only displays when winner exists
 */
export function WinnerDisplay({ winner }) {
  // Guard clause: Only render when winner is determined
  if (!winner) return null;

  return (
    /* Celebratory container with green success theme */
    <Box textAlign="center" mb={4} p={4} bg="green.50" borderRadius="lg" border="2px solid" borderColor="green.200">
      {/* Prominent celebration heading */}
      <Text fontSize="2xl" fontWeight="bold" color="green.600" mb={2}>
        🎉 ¡Ganador! 🎉
      </Text>
      
      {/* Winner identification with color preview and label */}
      <Box display="flex" alignItems="center" justifyContent="center" gap={3}>
        {/* Color indicator matching the winning sector */}
        <Box w="32px" h="32px" borderRadius="full" bg={winner.color} border="3px solid white" boxShadow="lg" />
        
        {/* Winner label with fallback to color value */}
        <Text fontSize="xl" fontWeight="bold" color="gray.700">
          {winner.label || winner.color}
        </Text>
      </Box>
    </Box>
  );
}
