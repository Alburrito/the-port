import React from "react";
import { Box, Text, Button, Input, HStack } from "@chakra-ui/react";

export function AddSectorForm({ 
  colorInput, 
  setColorInput, 
  labelInput, 
  setLabelInput, 
  onAddColor, 
  onSpinRoulette, 
  onCancelSpin,
  onReset,
  isSpinning, 
  colorsCount, 
  errorMsg,
  winner
}) {
  const canSpin = colorsCount >= 2;
  
  return (
    <Box w={{ base: "100%", md: "400px" }} mx="auto" mt={6}>
      <Text fontWeight="bold" mb={2}>Añadir sector</Text>
      {errorMsg && (
        <Text color="red.400" fontSize="sm" mb={2}>{errorMsg}</Text>
      )}
      
      <HStack spacing={2} mb={4}>
        <Input
          type="color"
          value={colorInput}
          onChange={setColorInput}
          w="60px"
          h="40px"
          p={0}
          border="none"
          bg="none"
          cursor="pointer"
          borderRadius="md"
          isDisabled={isSpinning || winner}
        />
        <Input
          placeholder="Etiqueta (opcional)"
          value={labelInput}
          onChange={setLabelInput}
          isDisabled={isSpinning || winner}
        />
        <Button
          colorScheme="green"
          onClick={onAddColor}
          isDisabled={isSpinning || winner}
          opacity={isSpinning || winner ? 0.6 : 1}
          cursor={isSpinning || winner ? "not-allowed" : "pointer"}
        >
          Añadir
        </Button>
      </HStack>

      {/* Botón GIRAR RULETA */}
      {!isSpinning && !winner && canSpin && (
        <Button 
          colorScheme="orange" 
          onClick={onSpinRoulette} 
          fontWeight="bold" 
          size="lg" 
          borderRadius="md" 
          w="100%" 
          boxShadow="md"
        >
          GIRAR RULETA
        </Button>
      )}

      {/* Botón AÑADIR MÁS SECTORES */}
      {!isSpinning && !winner && !canSpin && (
        <Button 
          colorScheme="gray" 
          fontWeight="bold" 
          size="lg" 
          borderRadius="md" 
          w="100%" 
          boxShadow="md"
          isDisabled
          opacity={0.6}
          cursor="not-allowed"
        >
          AÑADE MÁS SECTORES
        </Button>
      )}

      {/* Botón CANCELAR */}
      {isSpinning && (
        <Button 
          colorScheme="red" 
          onClick={onCancelSpin} 
          fontWeight="bold" 
          size="lg" 
          borderRadius="md" 
          w="100%" 
          boxShadow="md"
        >
          CANCELAR
        </Button>
      )}

      {/* Botón RESETEAR */}
      {winner && (
        <Button 
          colorScheme="blue" 
          onClick={onReset} 
          fontWeight="bold" 
          size="lg" 
          borderRadius="md" 
          w="100%" 
          boxShadow="md"
        >
          RESETEAR
        </Button>
      )}
    </Box>
  );
}
