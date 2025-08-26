import React from "react";
import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import { MdSupervisorAccount, MdComputer } from "react-icons/md";
import { GameModeButton } from "./GameModeButton";

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
            onClick={() => onModeSelect('ai')}
          />

          <GameModeButton
            icon={MdSupervisorAccount}
            title="Dos Jugadores"
            onClick={() => onModeSelect('player')}
          />            
        </HStack>
      </VStack>
    </Box>
  );
}
