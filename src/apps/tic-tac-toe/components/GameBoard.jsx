import React from "react";

import { Grid, Box } from "@chakra-ui/react";

/**
 * Tic Tac Toe Game Board
 *
 * Renders an interactive 3x3 grid for the game.
 * Handles the display of the game state and user interactions.
 *
 * @param {Object} props - Component properties
 * @param {Array<string>} props.board - Current board state (array of 9 elements)
 * @param {Function} props.onCellClick - Callback for when a cell is clicked
 * @param {boolean} props.gameOver - Indicates if the game is over
 */
export function GameBoard({ board, onCellClick, gameOver }) {
  return (
    <Grid
      templateColumns="repeat(3, 1fr)"
      gap={2}
      w="300px"
      h="300px"
      mx="auto"
    >
      {board.map((cell, index) => (
        <Box
          key={index}
          bg="gray.600"
          border="2px solid"
          borderColor="gray.500"
          borderRadius="md"
          display="flex"
          alignItems="center"
          justifyContent="center"
          fontSize="3xl"
          fontWeight="bold"
          color="white"
          cursor={cell || gameOver ? "default" : "pointer"}
          _hover={cell || gameOver ? {} : { bg: "gray.500", borderColor: "gray.400" }}
          _active={cell || gameOver ? {} : { bg: "gray.700" }}
          transition="all 0.2s"
          onClick={() => !cell && !gameOver && onCellClick(index)}
          opacity={cell || gameOver ? 1 : 0.8}
          minW="96px"
          minH="96px"
          maxW="96px"
          maxH="96px"
        >
          {cell}
        </Box>
      ))}
    </Grid>
  );
}
