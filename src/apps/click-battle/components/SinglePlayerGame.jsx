import React, { useState } from "react";

import { Box, Text, Button, VStack, HStack } from "@chakra-ui/react";

import { useGameLogic } from "../hooks/useGameLogic";
import { getPerformanceMessage, formatCPS } from "../utils/gameUtils";

/**
 * SinglePlayerGame Component
 * 
 * Game screen for single player mode with countdown, click counter and results.
 * Manages the game flow: countdown -> game -> results
 */
export default function SinglePlayerGame({
  duration,
  showCounter,
  onBackToSettings,
  onPlayAgain,
}) {
  const { gamePhase, countdown, timeLeft, resetGame } = useGameLogic(duration);
  const [clickCount, setClickCount] = useState(0);

  /**
   * Handle user clicks during the game
   * Increments the click counter only when the game is in active playing phase
   */
  const handleClick = () => {
    if (gamePhase === "playing") {
      setClickCount(clickCount + 1);
    }
  };

  /**
   * Restarts the game for a new round
   * Resets the timer and click counter, and notifies the parent component
   */
  const handlePlayAgain = () => {
    resetGame();
    setClickCount(0);
    onPlayAgain();
  };

  /**
   * Handles the back to settings action
   * Resets the game state and notifies the parent component
   */
  const handleBackToSettings = () => {
    resetGame();
    setClickCount(0);
    onBackToSettings();
  };

  const performanceData = getPerformanceMessage(clickCount, duration);

  return (
    <Box
      minH="100vh"
      maxH="100vh"
      w="100%"
      bg="blue.600"
      color="white"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      px={4}
      onClick={handleClick}
      cursor={gamePhase === "playing" ? "pointer" : "default"}
      position="absolute"
      top="0"
      left="0"
      zIndex="10"
    >
      {/* Countdown Phase */}
      {gamePhase === "countdown" && (
        <VStack gap={4}>
          <Text fontSize="2xl" fontWeight="bold">
            ¡Prepárate!
          </Text>
          <Text fontSize="8xl" fontWeight="black" color="yellow.300">
            {countdown}
          </Text>
        </VStack>
      )}

      {/* Playing Phase */}
      {gamePhase === "playing" && (
        <VStack gap={8} textAlign="center">
          <Text fontSize="3xl" fontWeight="bold">
            ¡HAZ CLICK!
          </Text>
          
          {showCounter && (
            <Text fontSize="8xl" fontWeight="black" color="yellow.300">
              {clickCount}
            </Text>
          )}
          
          <Text fontSize="2xl" fontWeight="bold" color="yellow.200">
            Tiempo: {timeLeft}s
          </Text>
          
          <Text fontSize="lg" color="blue.200">
            Haz click en cualquier parte de la pantalla
          </Text>
        </VStack>
      )}

      {/* Results Phase */}
      {gamePhase === "finished" && (
        <VStack gap={6}>
          <Text fontSize="3xl" fontWeight="bold" color={performanceData.color}>
            {performanceData.title}
          </Text>
          
          <Text fontSize="8xl" fontWeight="black" color="white">
            {clickCount}
          </Text>
          
          <VStack gap={2}>
            <Text fontSize="xl" color="blue.200">
              clicks en {duration} segundos
            </Text>
            <Text fontSize="lg" color="blue.300">
              ({formatCPS(clickCount, duration)} clicks/seg)
            </Text>
          </VStack>
          
          <Text fontSize="lg" color={performanceData.color} fontWeight="bold">
            {performanceData.message}
          </Text>
          
          <HStack gap={4} mt={8}>
            <Button
              colorPalette="gray"
              size="lg"
              onClick={handleBackToSettings}
              px={8}
            >
              Volver
            </Button>
            <Button
              colorPalette="yellow"
              size="lg"
              onClick={handlePlayAgain}
              px={8}
              fontWeight="bold"
            >
              Otra vez
            </Button>
          </HStack>
        </VStack>
      )}
    </Box>
  );
}
