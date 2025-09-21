import React from "react";

import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import { MdSupervisorAccount, MdComputer } from "react-icons/md";

import { GameModeButton } from "./GameModeButton";

/**
 * Mode Selection Screen
 *
 * Displays the different game modes available through interactive buttons.
 * Allows the user to choose between playing against the AI or another player.
 *
 * @param {Object} props - Component properties
 * @param {Function} props.onModeSelect - Callback for selecting the game mode
 */
export function ModeSelectionScreen({ onModeSelect }) {
  return (
    <Box 
      textAlign="center" 
      flex="1" 
      display="flex" 
      flexDirection="column" 
      justifyContent="flex-start"
      pt={8}
      minH="0"
    >
      <VStack gap={8}>
        <Text fontSize="2xl" fontWeight="bold" color="white">
          Escoge modo de juego
        </Text>
        
        <HStack gap={8}>
          <GameModeButton
            icon={MdComputer}
            title="Un Jugador"
            onClick={() => onModeSelect("ai")}
          />

          <GameModeButton
            icon={MdSupervisorAccount}
            title="Dos Jugadores"
            onClick={() => onModeSelect("player")}
          />            
        </HStack>
      </VStack>
    </Box>
  );
}
