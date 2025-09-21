import React from "react";

import { Box, HStack, VStack, Button, Text } from "@chakra-ui/react";
import { MdSettings, MdArrowBack, MdRefresh, MdRestartAlt } from "react-icons/md";

import { GameBoard } from "./GameBoard";
import { PlayerInfo } from "./PlayerInfo";
import { SettingsModal } from "./SettingsModal";

/**
 * Tic Tac Toe Main Game Screen
 *
 * Manages the display of the board, player information,
 * game controls, and access to settings.
 *
 * @param {Object} props - Component properties
 * @param {string} props.gameMode - Current game mode ('singleplayer', 'multiplayer')
 * @param {Function} props.onBackToModeSelection - Callback to go back to mode selection
 * @param {Function} props.onShowSettings - Callback to show settings
 * @param {Function} props.onResetGame - Callback to reset game statistics
 * @param {Function} props.onResetCurrentMode - Callback to reset current game mode
 * @param {boolean} props.showSettings - Controls the visibility of the settings modal
 * @param {Function} props.onCloseSettings - Callback to close the settings modal
 * @param {Function} props.onSaveSettings - Callback to save the settings
 * @param {string} props.player1Symbol - Symbol for player 1
 * @param {string} props.player2Symbol - Symbol for player 2
 * @param {string} props.player1Name - Name of player 1
 * @param {string} props.player2Name - Name of player 2
 * @param {number} props.player1Wins - Wins of player 1
 * @param {number} props.player2Wins - Wins of player 2
 * @param {string} props.tempPlayer1Symbol - Temporary symbol for editing
 * @param {string} props.tempPlayer2Symbol - Temporary symbol for editing
 * @param {Function} props.onTempSymbolChange - Handler for temporary symbol changes
 * @param {string} props.tempPlayer1Name - Temporary name for editing
 * @param {string} props.tempPlayer2Name - Temporary name for editing
 * @param {Function} props.onTempNameChange - Handler for temporary name changes
 * @param {Array<string>} props.board - Current game board state
 * @param {string} props.currentPlayer - Symbol of the current player
 * @param {string|null} props.gameWinner - Symbol of the winner or null if no winner
 * @param {boolean} props.gameOver - Indicates if the game is over
 * @param {Function} props.onCellClick - Callback for cell clicks
 */
export function GameScreen({ 
  gameMode,
  onBackToModeSelection, 
  onShowSettings, 
  onResetGame,
  onResetCurrentMode,
  showSettings,
  onCloseSettings,
  onSaveSettings,
  player1Symbol,
  player2Symbol,
  player1Name,
  player2Name,
  player1Wins,
  player2Wins,
  tempPlayer1Symbol,
  tempPlayer2Symbol,
  onTempSymbolChange,
  tempPlayer1Name,
  tempPlayer2Name,
  onTempNameChange,
  board,
  currentPlayer,
  gameWinner,
  gameOver,
  onCellClick,
}) {
  return (
    <Box 
      textAlign="center" 
      flex="1" 
      display="flex" 
      flexDirection="column" 
      justifyContent="flex-start"
      pt={4}
      minH="0"
    >
      <VStack gap={3}>
        <GameBoard 
          board={board}
          onCellClick={onCellClick}
          gameOver={gameOver}
        />
        
        <PlayerInfo 
          player1Symbol={player1Symbol}
          player2Symbol={player2Symbol}
          player1Name={player1Name}
          player2Name={gameMode === "ai" ? "IA" : player2Name}
          player1Wins={player1Wins}
          player2Wins={player2Wins}
        />

        {/* Indicador de turno o mensaje de resultado */}
        <Box textAlign="center">
          {gameOver ? (
            gameWinner === "draw" ? (
              <Text fontSize="lg" color="yellow.400" fontWeight="bold">
                ¡Empate!
              </Text>
            ) : (
              <Text fontSize="lg" color="teal.400" fontWeight="bold">
                ¡{gameWinner === player1Symbol ? player1Name : (gameMode === "ai" ? "IA" : player2Name)} gana!
              </Text>
            )
          ) : (
            <Text fontSize="md" color="gray.300">
              Turno de {currentPlayer === 1 ? player1Name : (gameMode === "ai" ? "IA" : player2Name)}
            </Text>
          )}
        </Box>
        
        <HStack gap={1}>
          <Button
            leftIcon={<MdArrowBack />}
            onClick={onBackToModeSelection}
            colorPalette="gray"
            variant="outline"
            color="white"
            borderColor="gray.500"
            _hover={{ bg: "gray.600", borderColor: "gray.400" }}
          >
            Volver
          </Button>

          <Button
            leftIcon={<MdRefresh />}
            onClick={onResetGame}
            colorPalette="blue"
            variant="outline"
            color="white"
            borderColor="blue.500"
            _hover={{ bg: "blue.600", borderColor: "blue.400" }}
          >
            Reiniciar
          </Button>

          <Button
            leftIcon={<MdRestartAlt />}
            onClick={onResetCurrentMode}
            colorPalette="red"
            variant="outline"
            color="white"
            borderColor="red.500"
            _hover={{ bg: "red.600", borderColor: "red.400" }}
            size="sm"
          >
            Resetear
          </Button>

          <Button
            leftIcon={<MdSettings />}
            onClick={onShowSettings}
            colorPalette="gray"
            variant="outline"
            color="white"
            borderColor="gray.500"
            _hover={{ bg: "gray.600", borderColor: "gray.400" }}
          >
            Ajustes
          </Button>
        </HStack>
      </VStack>

      <SettingsModal
        isOpen={showSettings}
        onClose={onCloseSettings}
        onSave={onSaveSettings}
        gameMode={gameMode}
        player1Symbol={tempPlayer1Symbol}
        player2Symbol={tempPlayer2Symbol}
        onPlayer1SymbolChange={(symbol) => onTempSymbolChange("player1", symbol)}
        onPlayer2SymbolChange={(symbol) => onTempSymbolChange("player2", symbol)}
        player1Name={tempPlayer1Name}
        player2Name={tempPlayer2Name}
        onPlayer1NameChange={(name) => onTempNameChange("player1", name)}
        onPlayer2NameChange={(name) => onTempNameChange("player2", name)}
      />
    </Box>
  );
}
