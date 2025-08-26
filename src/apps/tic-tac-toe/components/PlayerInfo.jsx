import React from "react";
import { VStack, HStack, Text, Box } from "@chakra-ui/react";

export function PlayerInfo({ player1Symbol, player2Symbol, player1Name, player2Name, player1Wins, player2Wins }) {
  // Truncate names to prevent layout breaking on long inputs
  const truncatedName1 = player1Name.length > 10 ? player1Name.substring(0, 10) + "..." : player1Name;
  const truncatedName2 = player2Name.length > 10 ? player2Name.substring(0, 10) + "..." : player2Name;

  return (
    <HStack justify="space-between" w="100%" maxW="450px" mx="auto" align="center">
      <HStack gap={2} w="150px" justify="flex-start">
        <Text fontSize="md" color="white" fontWeight="medium" isTruncated>
          {truncatedName1}
        </Text>
        <Box
          bg="gray.600"
          border="1px solid"
          borderColor="gray.500"
          borderRadius="sm"
          w="30px"
          h="30px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          fontSize="lg"
          fontWeight="bold"
          color="white"
          flexShrink={0}
        >
          {player1Symbol}
        </Box>
      </HStack>

      <HStack gap={2} w="100px" align="center" justify="center">
        <Text fontSize="xl" fontWeight="bold" color="teal.400">
          {player1Wins}
        </Text>
        <Text fontSize="md" color="gray.400">
          -
        </Text>
        <Text fontSize="xl" fontWeight="bold" color="teal.400">
          {player2Wins}
        </Text>
      </HStack>

      <HStack gap={2} w="150px" justify="flex-end">
        <Text fontSize="md" color="white" fontWeight="medium" isTruncated>
          {truncatedName2}
        </Text>
        <Box
          bg="gray.600"
          border="1px solid"
          borderColor="gray.500"
          borderRadius="sm"
          w="30px"
          h="30px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          fontSize="lg"
          fontWeight="bold"
          color="white"
          flexShrink={0}
        >
          {player2Symbol}
        </Box>
      </HStack>
    </HStack>
  );
}
