import React, { useState } from "react";
import { Box, Text, Button, VStack, HStack } from "@chakra-ui/react";
import { useGameLogic } from "../hooks/useGameLogic";
import { formatCPS } from "../utils/gameUtils";

/**
 * TwoPlayerGame Component
 * 
 * Game screen for two player mode with countdown, split screen click counters and results.
 * Player 1 gets blue side (top), Player 2 gets red side (bottom).
 * The winner's color fills the screen at the end.
 */
export default function TwoPlayerGame({
  duration,
  showCounter,
  onBackToSettings,
  onPlayAgain
}) {
  const { gamePhase, countdown, timeLeft, resetGame } = useGameLogic(duration);
  const [player1Clicks, setPlayer1Clicks] = useState(0);
  const [player2Clicks, setPlayer2Clicks] = useState(0);

  const handlePlayer1Click = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (gamePhase === "playing") {
      setPlayer1Clicks(prev => prev + 1);
    }
  };

  const handlePlayer2Click = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (gamePhase === "playing") {
      setPlayer2Clicks(prev => prev + 1);
    }
  };

  const handlePlayAgain = () => {
    resetGame();
    setPlayer1Clicks(0);
    setPlayer2Clicks(0);
    onPlayAgain();
  };

  const handleBackToSettings = () => {
    resetGame();
    setPlayer1Clicks(0);
    setPlayer2Clicks(0);
    onBackToSettings();
  };

  // Determine winner and winner color
  const getWinnerData = () => {
    if (player1Clicks > player2Clicks) {
      return { 
        winner: "Jugador 1", 
        color: "blue.600",
        emoji: "🔵",
        winnerClicks: player1Clicks,
        loserClicks: player2Clicks
      };
    } else if (player2Clicks > player1Clicks) {
      return { 
        winner: "Jugador 2", 
        color: "red.600",
        emoji: "🔴",
        winnerClicks: player2Clicks,
        loserClicks: player1Clicks
      };
    } else {
      return { 
        winner: "¡EMPATE!", 
        color: "purple.600",
        emoji: "🤝",
        winnerClicks: player1Clicks,
        loserClicks: player2Clicks
      };
    }
  };

  const winnerData = getWinnerData();

  return (
    <Box
      minH="100vh"
      maxH="100vh"
      w="100%"
      display="flex"
      flexDirection="column"
      position="absolute"
      top="0"
      left="0"
      zIndex="10"
    >
      {/* Countdown Phase */}
      {gamePhase === "countdown" && (
        <Box
          w="100%"
          h="100vh"
          bg="gray.700"
          color="white"
          display="flex"
          flexDirection="column"
          position="relative"
        >
          {/* Countdown for Player 1 (Top - Rotated) */}
          <Box
            w="100%"
            h="50vh"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            transform="rotate(180deg)"
          >
            <VStack gap={2}>
              <Text fontSize="lg" color="blue.300">🔵 Jugador 1</Text>
              <Text fontSize="sm" color="blue.200">¡Prepárate!</Text>
              <Text fontSize="6xl" fontWeight="black" color="yellow.300">
                {countdown}
              </Text>
            </VStack>
          </Box>

          {/* Middle divider */}
          <Box
            w="100%"
            h="1px"
            bg="gray.500"
            position="absolute"
            top="50%"
            left="0"
          />

          {/* Countdown for Player 2 (Bottom - Normal) */}
          <Box
            w="100%"
            h="50vh"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <VStack gap={2}>
              <Text fontSize="lg" color="red.300">🔴 Jugador 2</Text>
              <Text fontSize="sm" color="red.200">¡Prepárate!</Text>
              <Text fontSize="6xl" fontWeight="black" color="yellow.300">
                {countdown}
              </Text>
            </VStack>
          </Box>
        </Box>
      )}

      {/* Playing Phase - Split Screen (Top/Bottom) */}
      {gamePhase === "playing" && (
        <>
          {/* Player 1 Side (Blue - Top - Inverted) */}
          <Box
            w="100%"
            h="50vh"
            bg="blue.600"
            color="white"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            onPointerDown={handlePlayer1Click}
            cursor="pointer"
            userSelect="none"
            style={{ touchAction: 'manipulation' }}
            transform="rotate(180deg)"
          >
            <VStack gap={4}>
              <Text fontSize="xl" fontWeight="bold">
                🔵 Jugador 1
              </Text>
              {showCounter && (
                <Text fontSize="6xl" fontWeight="black" color="blue.100">
                  {player1Clicks}
                </Text>
              )}
              <Text fontSize="lg" color="blue.200">
                ¡HAZ CLICK!
              </Text>
            </VStack>
          </Box>

          {/* Player 2 Side (Red - Bottom) */}
          <Box
            w="100%"
            h="50vh"
            bg="red.600"
            color="white"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            onPointerDown={handlePlayer2Click}
            cursor="pointer"
            userSelect="none"
            style={{ touchAction: 'manipulation' }}
          >
            <VStack gap={4}>
              <Text fontSize="xl" fontWeight="bold">
                🔴 Jugador 2
              </Text>
              {showCounter && (
                <Text fontSize="6xl" fontWeight="black" color="red.100">
                  {player2Clicks}
                </Text>
              )}
              <Text fontSize="lg" color="red.200">
                ¡HAZ CLICK!
              </Text>
            </VStack>
          </Box>

          {/* Timer Overlay */}
          <Box
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            bg="blackAlpha.800"
            color="white"
            px={6}
            py={3}
            borderRadius="md"
            zIndex="20"
            border="2px solid white"
          >
            <Text fontSize="2xl" fontWeight="bold">
              ⏱️ {timeLeft}s
            </Text>
          </Box>
        </>
      )}

      {/* Results Phase - Winner's Color Background */}
      {gamePhase === "finished" && (
        <Box
          w="100%"
          h="100vh"
          bg={winnerData.color}
          color="white"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          px={4}
        >
          <VStack gap={6}>
            <Text fontSize="4xl" fontWeight="black">
              {winnerData.emoji} {winnerData.winner}
            </Text>
            
            <VStack gap={4}>
              <HStack gap={8} alignItems="center">
                <VStack>
                  <Text fontSize="lg" color="blue.200">🔵 Jugador 1</Text>
                  <Text fontSize="4xl" fontWeight="black" color="white">
                    {player1Clicks}
                  </Text>
                  <Text fontSize="md" color="blue.200" opacity={0.8}>
                    ({formatCPS(player1Clicks, duration)} cps)
                  </Text>
                </VStack>
                
                <Text fontSize="3xl" fontWeight="bold">VS</Text>
                
                <VStack>
                  <Text fontSize="lg" color="red.200">🔴 Jugador 2</Text>
                  <Text fontSize="4xl" fontWeight="black" color="white">
                    {player2Clicks}
                  </Text>
                  <Text fontSize="md" color="red.200" opacity={0.8}>
                    ({formatCPS(player2Clicks, duration)} cps)
                  </Text>
                </VStack>
              </HStack>

              {winnerData.winner !== "¡EMPATE!" && (
                <Text fontSize="lg" color="white" opacity={0.9}>
                  Diferencia: {winnerData.winnerClicks - winnerData.loserClicks} clicks
                </Text>
              )}
              
              <Text fontSize="sm" color="white" opacity={0.7}>
                Duración: {duration} segundos
              </Text>
            </VStack>
            
            {/* Button spacer for better centering */}
            <Box h={6} />
            
            <HStack gap={6} mt={4}>
              <Button
                colorPalette="gray"
                size="xl"
                onClick={handleBackToSettings}
                px={10}
                py={4}
                minW="140px"
                fontSize="lg"
              >
                Volver
              </Button>
              <Button
                colorPalette="yellow"
                size="xl"
                onClick={handlePlayAgain}
                px={10}
                py={4}
                fontWeight="bold"
                minW="140px"
                fontSize="lg"
              >
                Revancha
              </Button>
            </HStack>
          </VStack>
        </Box>
      )}
    </Box>
  );
}
