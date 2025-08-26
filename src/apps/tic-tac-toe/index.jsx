import React, { useState, useCallback, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { AppHeader } from "@/components/AppHeader";
import { ModeSelectionScreen, GameScreen } from "./components";

/**
 * Classic Tic Tac Toe game with both single-player (vs AI) and two-player modes.
 * Features separate state management for each mode and 3 AI difficulty levels.
 * Player always goes first in AI mode.
 */
export default function TicTacToe({ backButtonHeightVh }) {
  const [gameMode, setGameMode] = useState(null); // null, 'player', 'ai'
  const [showSettings, setShowSettings] = useState(false);
  
  // Settings for each game mode
  const [playerModeSettings, setPlayerModeSettings] = useState({
    player1Symbol: '⭕',
    player2Symbol: '❌',
    player1Name: 'Jugador 1',
    player2Name: 'Jugador 2'
  });
  
  const [aiModeSettings, setAiModeSettings] = useState({
    player1Symbol: '⭕',
    player2Symbol: '❌',
    player1Name: 'Jugador 1',
    player2Name: 'IA'
  });
  
  // Current settings based on selected mode
  const currentSettings = gameMode === 'ai' ? aiModeSettings : playerModeSettings;
  const { player1Symbol, player2Symbol, player1Name, player2Name } = currentSettings;
  
  // Player wins state - separate for each game mode
  const [playerModeWins, setPlayerModeWins] = useState({ player1: 0, player2: 0 });
  const [aiModeWins, setAiModeWins] = useState({ player1: 0, player2: 0 });
  
  // Current game mode wins
  const player1Wins = gameMode === 'ai' ? aiModeWins.player1 : playerModeWins.player1;
  const player2Wins = gameMode === 'ai' ? aiModeWins.player2 : playerModeWins.player2;
  
  // Game state for each mode
  const [playerModeState, setPlayerModeState] = useState({
    board: Array(9).fill(null),
    currentPlayer: 1,
    gameWinner: null,
    gameOver: false
  });
  
  const [aiModeState, setAiModeState] = useState({
    board: Array(9).fill(null),
    currentPlayer: 1,
    gameWinner: null,
    gameOver: false,
    aiDifficulty: null
  });
  
  // Current game state based on selected mode
  const gameState = gameMode === 'ai' ? aiModeState : playerModeState;
  const { board, currentPlayer, gameWinner, gameOver } = gameState;
  const aiDifficulty = gameMode === 'ai' ? aiModeState.aiDifficulty : null;
  
  // Temporary settings for the modal (based on current mode)
  const [tempSettings, setTempSettings] = useState({
    player1Symbol: '⭕',
    player2Symbol: '❌',
    player1Name: 'Jugador 1',
    player2Name: 'Jugador 2'
  });

  // Calculate available height accounting for navigation
  const availableHeight = backButtonHeightVh ? `${100 - backButtonHeightVh}vh` : "100vh";

  const handleModeSelect = (mode) => {
    setGameMode(mode);
    if (mode === 'ai') {
      // Select random AI difficulty when entering AI mode
      selectRandomAI();
    }
  };

  const handleShowSettings = () => {
    // Initialize temporary settings with current mode's settings
    setTempSettings({
      player1Symbol: currentSettings.player1Symbol,
      player2Symbol: currentSettings.player2Symbol,
      player1Name: currentSettings.player1Name,
      player2Name: currentSettings.player2Name
    });
    setShowSettings(true);
  };

  const handleCloseSettings = () => {
    setShowSettings(false);
  };

  const handleSaveSettings = () => {
    const isPlayer2NameRequired = gameMode !== 'ai';
    if (!tempSettings.player1Name.trim() || (isPlayer2NameRequired && !tempSettings.player2Name.trim())) {
      return;
    }

    const oldPlayer1Symbol = currentSettings.player1Symbol;
    const oldPlayer2Symbol = currentSettings.player2Symbol;
    
    // Update settings for the current mode
    if (gameMode === 'ai') {
      setAiModeSettings({
        player1Symbol: tempSettings.player1Symbol,
        player2Symbol: tempSettings.player2Symbol,
        player1Name: tempSettings.player1Name.trim(),
        player2Name: tempSettings.player2Name.trim()
      });
    } else {
      setPlayerModeSettings({
        player1Symbol: tempSettings.player1Symbol,
        player2Symbol: tempSettings.player2Symbol,
        player1Name: tempSettings.player1Name.trim(),
        player2Name: tempSettings.player2Name.trim()
      });
    }
    
    // Update symbols in active game board if they changed
    if (oldPlayer1Symbol !== tempSettings.player1Symbol || oldPlayer2Symbol !== tempSettings.player2Symbol) {
      const updateStateBoard = (prevState) => ({
        ...prevState,
        board: prevState.board.map(cell => {
          if (cell === oldPlayer1Symbol) return tempSettings.player1Symbol;
          if (cell === oldPlayer2Symbol) return tempSettings.player2Symbol;
          return cell;
        }),
        gameWinner: prevState.gameWinner && prevState.gameWinner !== 'draw' 
          ? (prevState.gameWinner === oldPlayer1Symbol ? tempSettings.player1Symbol 
            : prevState.gameWinner === oldPlayer2Symbol ? tempSettings.player2Symbol 
            : prevState.gameWinner)
          : prevState.gameWinner
      });
      
      if (gameMode === 'ai') {
        setAiModeState(updateStateBoard);
      } else {
        setPlayerModeState(updateStateBoard);
      }
    }
    
    setShowSettings(false);
  };

  const handleBackToModeSelection = () => {
    setGameMode(null);
  };

  // Check for winner using standard tic-tac-toe winning patterns
  const checkWinner = useCallback((board) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  }, []);

  const makeRandomMove = useCallback((board) => {
    const availableMoves = board.map((cell, index) => cell === null ? index : null).filter(val => val !== null);
    if (availableMoves.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * availableMoves.length);
    return availableMoves[randomIndex];
  }, []);

  // Medium AI: blocks player wins and tries to win, falls back to random
  const makeMediumMove = useCallback((board) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    const aiSymbol = player2Symbol; // AI is always player 2
    const humanSymbol = player1Symbol; // Human is always player 1

    // Try to win first
    for (let line of lines) {
      const [a, b, c] = line;
      const cells = [board[a], board[b], board[c]];
      if (cells.filter(cell => cell === aiSymbol).length === 2 && cells.includes(null)) {
        return line[cells.indexOf(null)];
      }
    }

    // Block player wins second
    for (let line of lines) {
      const [a, b, c] = line;
      const cells = [board[a], board[b], board[c]];
      if (cells.filter(cell => cell === humanSymbol).length === 2 && cells.includes(null)) {
        return line[cells.indexOf(null)];
      }
    }

    return makeRandomMove(board);
  }, [player1Symbol, player2Symbol, makeRandomMove]);

  // Hard AI: uses minimax algorithm for optimal play
  const makeHardMove = useCallback((board) => {
    const aiSymbol = player2Symbol; // AI is always player 2
    const humanSymbol = player1Symbol; // Human is always player 1

    const minimax = (board, depth, isMaximizing) => {
      const winner = checkWinner(board);
      if (winner === aiSymbol) return 10 - depth;
      if (winner === humanSymbol) return depth - 10;
      if (board.every(cell => cell !== null)) return 0;

      if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < 9; i++) {
          if (board[i] === null) {
            board[i] = aiSymbol;
            const score = minimax(board, depth + 1, false);
            board[i] = null;
            bestScore = Math.max(score, bestScore);
          }
        }
        return bestScore;
      } else {
        let bestScore = Infinity;
        for (let i = 0; i < 9; i++) {
          if (board[i] === null) {
            board[i] = humanSymbol;
            const score = minimax(board, depth + 1, true);
            board[i] = null;
            bestScore = Math.min(score, bestScore);
          }
        }
        return bestScore;
      }
    };

    let bestMove = -1;
    let bestScore = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        board[i] = aiSymbol;
        const score = minimax(board, 0, false);
        board[i] = null;
        if (score > bestScore) {
          bestScore = score;
          bestMove = i;
        }
      }
    }
    return bestMove;
  }, [player1Symbol, player2Symbol, checkWinner]);

  // Execute AI move based on selected difficulty
  const makeAIMove = useCallback((board, difficulty) => {
    let move;
    switch (difficulty) {
      case 'random':
        move = makeRandomMove(board);
        break;
      case 'medium':
        move = makeMediumMove(board);
        break;
      case 'hard':
        move = makeHardMove(board);
        break;
      default:
        move = makeRandomMove(board);
    }
    return move;
  }, [makeRandomMove, makeMediumMove, makeHardMove]);

  const handleCellClick = useCallback((index) => {
    if (board[index] || gameOver) return;

    const newBoard = [...board];
    const currentSymbol = currentPlayer === 1 ? player1Symbol : player2Symbol;
    newBoard[index] = currentSymbol;

    const winner = checkWinner(newBoard);
    const isDrawGame = !winner && newBoard.every(cell => cell !== null);
    const nextPlayer = currentPlayer === 1 ? 2 : 1;

    const newState = {
      board: newBoard,
      currentPlayer: isDrawGame || winner ? currentPlayer : nextPlayer,
      gameWinner: winner || (isDrawGame ? 'draw' : null),
      gameOver: !!(winner || isDrawGame)
    };

    // Update the appropriate game mode state
    if (gameMode === 'ai') {
      setAiModeState(prev => ({ ...prev, ...newState }));
    } else {
      setPlayerModeState(prev => ({ ...prev, ...newState }));
    }

    // Handle victory counting
    if (winner) {
      if (winner === player1Symbol) {
        if (gameMode === 'ai') {
          setAiModeWins(prev => ({ ...prev, player1: prev.player1 + 1 }));
        } else {
          setPlayerModeWins(prev => ({ ...prev, player1: prev.player1 + 1 }));
        }
      } else if (winner === player2Symbol) {
        if (gameMode === 'ai') {
          setAiModeWins(prev => ({ ...prev, player2: prev.player2 + 1 }));
        } else {
          setPlayerModeWins(prev => ({ ...prev, player2: prev.player2 + 1 }));
        }
      }
    }
  }, [board, gameOver, currentPlayer, player1Symbol, player2Symbol, checkWinner, gameMode]);

  const selectRandomAI = useCallback(() => {
    const difficulties = ['random', 'medium', 'hard'];
    const selected = difficulties[Math.floor(Math.random() * difficulties.length)];
    console.log(`🤖 AI Difficulty selected: ${selected}`);
    
    // Update the state and return the selected difficulty
    setAiModeState(prev => ({ ...prev, aiDifficulty: selected }));
    return selected;
  }, []);

  // Reset the current game (keeps wins and settings)
  const handleResetGame = useCallback(() => {
    if (gameMode === 'ai') {
      const newAiDifficulty = selectRandomAI();
      setAiModeState(prev => ({
        ...prev,
        board: Array(9).fill(null),
        currentPlayer: 1, // Player always starts first
        gameWinner: null,
        gameOver: false,
        aiDifficulty: newAiDifficulty
      }));
    } else {
      setPlayerModeState(prev => ({
        ...prev,
        board: Array(9).fill(null),
        currentPlayer: 1,
        gameWinner: null,
        gameOver: false
      }));
    }
  }, [gameMode, selectRandomAI]);

  // Reset everything for current mode (game state, victories, and settings)
  const handleResetCurrentMode = useCallback(() => {
    if (gameMode === 'ai') {
      setAiModeState({
        board: Array(9).fill(null),
        currentPlayer: 1,
        gameWinner: null,
        gameOver: false,
        aiDifficulty: null
      });
      setAiModeWins({ player1: 0, player2: 0 });
      setAiModeSettings({
        player1Symbol: '⭕',
        player2Symbol: '❌',
        player1Name: 'Jugador 1',
        player2Name: 'IA'
      });
    } else {
      setPlayerModeState({
        board: Array(9).fill(null),
        currentPlayer: 1,
        gameWinner: null,
        gameOver: false
      });
      setPlayerModeWins({ player1: 0, player2: 0 });
      setPlayerModeSettings({
        player1Symbol: '⭕',
        player2Symbol: '❌',
        player1Name: 'Jugador 1',
        player2Name: 'Jugador 2'
      });
    }
    
    setTempSettings({
      player1Symbol: '⭕',
      player2Symbol: '❌',
      player1Name: 'Jugador 1',
      player2Name: 'Jugador 2'
    });
  }, [gameMode]);

  const handleTempSymbolChange = useCallback((player, symbol) => {
    setTempSettings(prev => ({
      ...prev,
      [player === 'player1' ? 'player1Symbol' : 'player2Symbol']: symbol
    }));
  }, []);

  const handleTempNameChange = useCallback((player, name) => {
    setTempSettings(prev => ({
      ...prev,
      [player === 'player1' ? 'player1Name' : 'player2Name']: name
    }));
  }, []);

  // Block user clicks during AI turns to prevent interference
  const handleUserCellClick = useCallback((index) => {
    const isAITurn = gameMode === 'ai' && currentPlayer === 2; // AI is always player 2
    
    if (isAITurn) return;
    
    handleCellClick(index);
  }, [handleCellClick, gameMode, currentPlayer]);

  // Execute AI moves with proper timing and state management
  useEffect(() => {
    const isAITurn = gameMode === 'ai' && currentPlayer === 2; // AI is always player 2
    
    if (isAITurn && !gameOver && aiDifficulty) {
      const timeoutId = setTimeout(() => {
        const aiMove = makeAIMove(board, aiDifficulty);
        if (aiMove !== null && aiMove !== -1) {
          handleCellClick(aiMove);
        }
      }, 500);

      return () => clearTimeout(timeoutId);
    }
  }, [currentPlayer, gameMode, gameOver, board, aiDifficulty, makeAIMove, handleCellClick]);

  return (
    <Box 
      minH={availableHeight}
      maxH={availableHeight}
      w="100%"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      px={4}
      overflow="hidden"
      bg="#2D3748"
      color="white"
    >
      <AppHeader title="Tres en Raya" />

      {!gameMode ? (
        <ModeSelectionScreen onModeSelect={handleModeSelect} />
      ) : (
        <GameScreen 
          gameMode={gameMode}
          onBackToModeSelection={handleBackToModeSelection}
          onShowSettings={handleShowSettings}
          onResetGame={handleResetGame}
          onResetCurrentMode={handleResetCurrentMode}
          showSettings={showSettings}
          onCloseSettings={handleCloseSettings}
          onSaveSettings={handleSaveSettings}
          player1Symbol={player1Symbol}
          player2Symbol={player2Symbol}
          player1Name={player1Name}
          player2Name={player2Name}
          player1Wins={player1Wins}
          player2Wins={player2Wins}
          tempPlayer1Symbol={tempSettings.player1Symbol}
          tempPlayer2Symbol={tempSettings.player2Symbol}
          onTempSymbolChange={handleTempSymbolChange}
          tempPlayer1Name={tempSettings.player1Name}
          tempPlayer2Name={tempSettings.player2Name}
          onTempNameChange={handleTempNameChange}
          board={board}
          currentPlayer={currentPlayer}
          gameWinner={gameWinner}
          gameOver={gameOver}
          onCellClick={handleUserCellClick}
        />
      )}
    </Box>
  );
}
