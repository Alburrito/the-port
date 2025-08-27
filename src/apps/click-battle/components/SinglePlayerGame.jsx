import React, { useState, useEffect } from "react";
import { Box, Text, Button, VStack, HStack } from "@chakra-ui/react";

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
  onPlayAgain
}) {
  const [gamePhase, setGamePhase] = useState("countdown"); // "countdown", "playing", "finished"
  const [countdown, setCountdown] = useState(3);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [clickCount, setClickCount] = useState(0);

  // Countdown effect (3, 2, 1...)
  useEffect(() => {
    if (gamePhase === "countdown" && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (gamePhase === "countdown" && countdown === 0) {
      setGamePhase("playing");
      setTimeLeft(duration);
    }
  }, [gamePhase, countdown, duration]);

  // Game timer effect
  useEffect(() => {
    if (gamePhase === "playing" && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (gamePhase === "playing" && timeLeft === 0) {
      setGamePhase("finished");
    }
  }, [gamePhase, timeLeft]);

  const handleClick = () => {
    if (gamePhase === "playing") {
      setClickCount(clickCount + 1);
    }
  };

  const handlePlayAgain = () => {
    setGamePhase("countdown");
    setCountdown(3);
    setTimeLeft(duration);
    setClickCount(0);
    onPlayAgain();
  };

  const handleBackToSettings = () => {
    setGamePhase("countdown");
    setCountdown(3);
    setTimeLeft(duration);
    setClickCount(0);
    onBackToSettings();
  };

  // Performance evaluation system
  const getPerformanceMessage = (clicks, duration) => {
    const clicksPerSecond = clicks / duration;
    
    if (clicksPerSecond >= 15) {
        return {
            title: "¡LEYENDA!",
            message: "Espero que no estés haciendo trampa...",
            color: "purple.300"
        };
    } else if (clicksPerSecond >= 10) {
      return {
        title: "¡INCREÍBLE!",
        message: "Bueno pero tú eres una bestia, ¿no?",
        color: "green.300"
      };
    } else if (clicksPerSecond >= 8) {
      return {
        title: "¡EXCELENTE!",
        message: "Bien clickao",
        color: "blue.300"
      };
    } else if (clicksPerSecond >= 6) {
      return {
        title: "¡OYE!",
        message: "No está nada mal...",
        color: "orange.300"
      };
    } else if (clicksPerSecond >= 4) {
      return {
        title: "Bastante lento",
        message: "Pichí pichá pero bueno...",
        color: "yellow.300"
      };
    } else if (clicksPerSecond >= 2) {
      return {
        title: "Lamentable",
        message: "¿Tienes artritis o qué?",
        color: "gray.300"
      };
    } else {
      return {
        title: "¡FATAL!",
        message: "¿Le estás dando a la pantalla?",
        color: "red.300"
      };
    }
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

      {/* Finished Phase */}
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
              ({(clickCount / duration).toFixed(1)} clicks/seg)
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
