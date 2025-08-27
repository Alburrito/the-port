import React from "react";
import { VStack, HStack, Button, Text, Box } from "@chakra-ui/react";

/**
 * GameSettings Component
 * 
 * Main settings screen for click battle game configuration.
 * Allows users to select game mode, duration, and display options.
 */
export default function GameSettings({
  playerMode,
  setPlayerMode,
  duration,
  setDuration,
  showCounter,
  setShowCounter,
  onStartGame
}) {
  return (
    <VStack gap={0} width="100%" maxW="400px">
      {/* Player Mode Selection */}
      <Box width="100%" mb={6}>
        <Text fontSize="lg" fontWeight="bold" mb={3} textAlign="center" color="gray.300">
          Modo de Juego
        </Text>
        <HStack gap={4} width="100%" justifyContent="center">
          <Button
            colorPalette={playerMode === 1 ? "blue" : "gray"}
            variant={playerMode === 1 ? "solid" : "outline"}
            color={playerMode === 1 ? "white" : "white"}
            onClick={() => setPlayerMode(1)}
            flex={1}
          >
            Un Jugador
          </Button>
          <Button
            colorPalette={playerMode === 2 ? "blue" : "gray"}
            variant={playerMode === 2 ? "solid" : "outline"}
            color={playerMode === 2 ? "white" : "white"}
            onClick={() => setPlayerMode(2)}
            flex={1}
          >
            Dos Jugadores
          </Button>
        </HStack>
      </Box>

      {/* Duration Selection */}
      <Box width="100%" mb={6}>
        <Text fontSize="lg" fontWeight="bold" mb={3} textAlign="center" color="gray.300">
          Duración
        </Text>
        <HStack gap={4} width="100%" justifyContent="center">
          <Button
            colorPalette={duration === 5 ? "blue" : "gray"}
            variant={duration === 5 ? "solid" : "outline"}
            color={duration === 5 ? "white" : "white"}
            onClick={() => setDuration(5)}
            flex={1}
          >
            5s
          </Button>
          <Button
            colorPalette={duration === 10 ? "blue" : "gray"}
            variant={duration === 10 ? "solid" : "outline"}
            color={duration === 10 ? "white" : "white"}
            onClick={() => setDuration(10)}
            flex={1}
          >
            10s
          </Button>
          <Button
            colorPalette={duration === 30 ? "blue" : "gray"}
            variant={duration === 30 ? "solid" : "outline"}
            color={duration === 30 ? "white" : "white"}
            onClick={() => setDuration(30)}
            flex={1}
          >
            30s
          </Button>
        </HStack>
      </Box>

      {/* Show Counter Toggle */}
      <Box width="100%" mb={10}>
        <Text fontSize="lg" fontWeight="bold" mb={3} textAlign="center" color="gray.300">
          Mostrar Contador
        </Text>
        <Button
          colorPalette={showCounter ? "blue" : "gray"}
          variant={showCounter ? "solid" : "outline"}
          color="white"
          onClick={() => setShowCounter(!showCounter)}
          width="100%"
        >
          {showCounter ? "✅ Se mostrará el contador" : "❌ Se ocultará el contador"}
        </Button>
      </Box>

      {/* Play Button */}
      <Button
        colorPalette="red"
        variant="solid"
        size="xl"
        onClick={onStartGame}
        width="100%"
        py={8}
        fontSize="2xl"
        fontWeight="black"
        textTransform="uppercase"
        boxShadow="0 8px 25px rgba(220, 38, 38, 0.4)"
        _hover={{
          transform: "translateY(-2px)",
          boxShadow: "0 12px 30px rgba(220, 38, 38, 0.5)"
        }}
        transition="all 0.3s ease"
      >
        🚀 ¡JUGAR!
      </Button>
    </VStack>
  );
}
