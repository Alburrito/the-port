import React, { useState } from "react";

import {
  Dialog,
  VStack,
  Text,
  HStack,
  Button,
  Input,
  Box,
  SimpleGrid,
} from "@chakra-ui/react";

const AVAILABLE_SYMBOLS = [
  "⭕", "❌", "🔵", "❎", "🟡", "🔴", "🟢", "🟠", "🟣", "🟤", "⚫", "⚪", "🔥", "💎", "🌟",
  "⭐", "🎯", "🚀", "⚽", "🏀", "🎪", "🎨", "🎮", "🍕", "🍎", "🦄", "🐱", "🦦", "⚡", "🌙",
];

/**
 * Dropdown de selección de símbolo
 * 
 * Allows the user to choose a symbol from a predefined collection.
 *
 * Prevents duplicates between players and provides an intuitive visual interface.
 *
 * @param {Object} props - Component properties
 * @param {string} props.currentSymbol - Currently selected symbol
 * @param {Function} props.onSymbolChange - Callback for when a new symbol is selected
 * @param {string} props.otherSymbol - Symbol of the other player (to avoid duplicates)
 */
const SymbolDropdown = ({ currentSymbol, onSymbolChange, otherSymbol }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box position="relative">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        w="50px"
        h="50px"
        fontSize="2xl"
        fontWeight="bold"
        bg="gray.600"
        color="white"
        border="2px solid"
        borderColor="teal.400"
        _hover={{ bg: "gray.500" }}
      >
        {currentSymbol}
      </Button>
      
      {isOpen && (
        <Box
          position="absolute"
          top="60px"
          right="0"
          bg="gray.700"
          border="1px solid"
          borderColor="gray.500"
          borderRadius="md"
          p={3}
          zIndex="1000"
          w="280px"
        >
          <SimpleGrid columns={6} gap={2}>
            {AVAILABLE_SYMBOLS.map((symbol) => (
              <Button
                key={symbol}
                onClick={() => {
                  onSymbolChange(symbol);
                  setIsOpen(false);
                }}
                variant={symbol === currentSymbol ? "solid" : "outline"}
                colorScheme={symbol === currentSymbol ? "teal" : "gray"}
                w="40px"
                h="40px"
                fontSize="lg"
                disabled={symbol === otherSymbol}
                opacity={symbol === otherSymbol ? 0.5 : 1}
              >
                {symbol}
              </Button>
            ))}
          </SimpleGrid>
        </Box>
      )}
    </Box>
  );
};

/**
 * Setting Modal
 * 
 * Modal dialog for configuring player settings before starting the game.
 * Allows customization of player names and symbols.
 * Validates user input and provides visual feedback.
 *
 * @param {Object} props - Component properties
 * @param {boolean} props.isOpen - Controls whether the modal is visible
 * @param {Function} props.onClose - Callback for closing the modal
 * @param {Function} props.onSave - Callback for saving the settings
 * @param {string} props.gameMode - Current game mode
 * @param {string} props.player1Symbol - Symbol for player 1
 * @param {string} props.player2Symbol - Symbol for player 2
 * @param {Function} props.onPlayer1SymbolChange - Callback for changing player 1 symbol
 * @param {Function} props.onPlayer2SymbolChange - Callback for changing player 2 symbol
 * @param {string} props.player1Name - Name of player 1
 * @param {string} props.player2Name - Name of player 2
 * @param {Function} props.onPlayer1NameChange - Callback for changing player 1 name
 * @param {Function} props.onPlayer2NameChange - Callback for changing player 2 name
 */
export function SettingsModal({
  isOpen,
  onClose,
  onSave,
  gameMode,
  player1Symbol,
  player2Symbol,
  onPlayer1SymbolChange,
  onPlayer2SymbolChange,
  player1Name,
  player2Name,
  onPlayer1NameChange,
  onPlayer2NameChange,
}) {
  const isPlayer1NameEmpty = !player1Name.trim();
  const isPlayer2NameEmpty = gameMode === "ai" ? false : !player2Name.trim();
  const canSave = !isPlayer1NameEmpty && !isPlayer2NameEmpty;

  return (
    <Dialog.Root open={isOpen} onOpenChange={({ open }) => !open && onClose()}>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content maxW="400px" bg="gray.800" color="white">
          <Dialog.Header>
            <Dialog.Title fontSize="xl" fontWeight="bold">
              Configuración de Jugadores
            </Dialog.Title>
          </Dialog.Header>
          
          <Dialog.Body py={6}>
            <VStack gap={6} align="stretch">
              <HStack justify="space-between" align="center">
                <Text fontSize="md" fontWeight="medium" minW="80px">
                  {gameMode === "ai" ? "Jugador:" : "Jugador 1:"}
                </Text>
                <Input
                  value={player1Name}
                  onChange={(e) => onPlayer1NameChange(e.target.value)}
                  bg="gray.700"
                  border="2px solid"
                  borderColor={isPlayer1NameEmpty ? "red.500" : "gray.500"}
                  color="white"
                  maxW="150px"
                  maxLength={10}
                  placeholder="Máx. 10 chars"
                  _focus={{ borderColor: isPlayer1NameEmpty ? "red.400" : "teal.400" }}
                />
                <SymbolDropdown
                  currentSymbol={player1Symbol}
                  onSymbolChange={onPlayer1SymbolChange}
                  otherSymbol={player2Symbol}
                />
              </HStack>

              {gameMode !== "ai" && (
                <HStack justify="space-between" align="center">
                  <Text fontSize="md" fontWeight="medium" minW="80px">
                    Jugador 2:
                  </Text>
                  <Input
                    value={player2Name}
                    onChange={(e) => onPlayer2NameChange(e.target.value)}
                    bg="gray.700"
                    border="2px solid"
                    borderColor={isPlayer2NameEmpty ? "red.500" : "gray.500"}
                    color="white"
                    maxW="150px"
                    maxLength={10}
                    placeholder="Máx. 10 chars"
                    _focus={{ borderColor: isPlayer2NameEmpty ? "red.400" : "teal.400" }}
                  />
                  <SymbolDropdown
                    currentSymbol={player2Symbol}
                    onSymbolChange={onPlayer2SymbolChange}
                    otherSymbol={player1Symbol}
                  />
                </HStack>
              )}

              {gameMode === "ai" && (
                <HStack justify="space-between" align="center">
                  <Text fontSize="md" fontWeight="medium" minW="80px">
                    IA:
                  </Text>
                  <Input
                    value="IA"
                    bg="gray.600"
                    border="2px solid"
                    borderColor="gray.400"
                    color="gray.300"
                    maxW="150px"
                    disabled
                    readOnly
                  />
                  <SymbolDropdown
                    currentSymbol={player2Symbol}
                    onSymbolChange={onPlayer2SymbolChange}
                    otherSymbol={player1Symbol}
                  />
                </HStack>
              )}
            </VStack>
          </Dialog.Body>
          
          <Dialog.Footer>
            <HStack gap={3} justify="center" w="100%">
              <Button 
                onClick={onClose}
                variant="outline"
                colorScheme="gray"
                color="white"
                borderColor="gray.500"
                _hover={{ bg: "gray.600" }}
              >
                Cancelar
              </Button>
              <Button 
                onClick={onSave}
                colorScheme="teal"
                variant="solid"
                disabled={!canSave}
                opacity={!canSave ? 0.5 : 1}
              >
                Guardar
              </Button>
            </HStack>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
}