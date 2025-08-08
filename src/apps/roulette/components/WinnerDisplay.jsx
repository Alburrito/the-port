import React from "react";
import { Box, Text } from "@chakra-ui/react";

export function WinnerDisplay({ winner }) {
  if (!winner) return null;

  return (
    <Box textAlign="center" mb={4} p={4} bg="green.50" borderRadius="lg" border="2px solid" borderColor="green.200">
      <Text fontSize="2xl" fontWeight="bold" color="green.600" mb={2}>
        🎉 ¡Ganador! 🎉
      </Text>
      <Box display="flex" alignItems="center" justifyContent="center" gap={3}>
        <Box w="32px" h="32px" borderRadius="full" bg={winner.color} border="3px solid white" boxShadow="lg" />
        <Text fontSize="xl" fontWeight="bold" color="gray.700">
          {winner.label || winner.color}
        </Text>
      </Box>
    </Box>
  );
}
