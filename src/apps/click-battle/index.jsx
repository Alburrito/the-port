import React, { useState } from "react";

import { Box } from "@chakra-ui/react";

import { AppHeader } from "@/components/AppHeader";

import { GameSettings, SinglePlayerGame, TwoPlayerGame } from "./components";

/**
 * ClickBattle - Main Application Component
 * 
 * A competitive clicking game where players try to click as fast as possible
 * within a limited time. Supports single player and two player modes.
 * 
 * @param {number} backButtonHeightVh - Height of the back button in viewport units
 */
export default function ClickBattle({ backButtonHeightVh }) {
  // Game configuration state
  const [playerMode, setPlayerMode] = useState(1); // 1 or 2 players
  const [duration, setDuration] = useState(5); // 5, 10, or 30 seconds
  const [showCounter, setShowCounter] = useState(true); // show click counter during game
  
  // Game state
  const [gameState, setGameState] = useState("settings"); // "settings", "playing", "results"

  // Calculate available height accounting for navigation
  const availableHeight = backButtonHeightVh ? `${100 - backButtonHeightVh}vh` : "100vh";

  /**
   * Initializes the game
   */
  const handleStartGame = () => {
    setGameState("playing");
  };

  /**
   * Returns to the configuration screen
   */
  const handleBackToSettings = () => {
    setGameState("settings");
  };

  /**
   * Resets the game but keeps current config
   */
  const handlePlayAgain = () => {
    setGameState("playing");
  };

  return (
    <Box 
      minH={availableHeight}
      maxH={availableHeight}
      w="100%"
      display="flex"
      flexDirection="column"
      px={gameState === "playing" ? 0 : 4}
      overflow="hidden"
      bg={gameState === "playing" ? "transparent" : "#2D3748"}
      color="white"
    >
      {gameState !== "playing" && <AppHeader title="Batalla de Clicks" />}

      {/* Main content area */}
      {gameState === "settings" && (
        <Box 
          textAlign="center" 
          flex="1" 
          display="flex" 
          flexDirection="column" 
          justifyContent="flex-start"
          alignItems="center"
          minH="0"
          pt={8}
        >
          <GameSettings
            playerMode={playerMode}
            setPlayerMode={setPlayerMode}
            duration={duration}
            setDuration={setDuration}
            showCounter={showCounter}
            setShowCounter={setShowCounter}
            onStartGame={handleStartGame}
          />
        </Box>
      )}

      {gameState === "playing" && playerMode === 1 && (
        <SinglePlayerGame
          duration={duration}
          showCounter={showCounter}
          onBackToSettings={handleBackToSettings}
          onPlayAgain={handlePlayAgain}
        />
      )}
      
      {gameState === "playing" && playerMode === 2 && (
        <TwoPlayerGame
          duration={duration}
          showCounter={showCounter}
          onBackToSettings={handleBackToSettings}
          onPlayAgain={handlePlayAgain}
        />
      )}
      
      {gameState === "results" && (
        <Box>
          {/* TODO: Results screen */}
          Resultados...
        </Box>
      )}
    </Box>
  );
}
