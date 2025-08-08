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
  isSpinning, 
  colorsCount, 
  errorMsg
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
          isDisabled={isSpinning}
        />
        <Input
          placeholder="Etiqueta (opcional)"
          value={labelInput}
          onChange={setLabelInput}
          bg="whiteAlpha.200"
          color="gray.900"
          border="1px solid"
          borderColor="gray.400"
          size="sm"
          fontSize="sm"
          borderRadius="md"
          flex="1"
          isDisabled={isSpinning}
        />
        <Button 
          colorScheme="purple" 
          onClick={onAddColor} 
          fontWeight="bold" 
          size="sm" 
          borderRadius="md"
          isDisabled={isSpinning}
        >
          Añadir
        </Button>
      </HStack>

      {isSpinning ? (
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
      ) : (
        <Button 
          colorScheme={canSpin ? "orange" : "gray"} 
          onClick={onSpinRoulette} 
          fontWeight="bold" 
          size="lg" 
          borderRadius="md" 
          w="100%" 
          boxShadow="md"
          isDisabled={!canSpin}
          opacity={!canSpin ? 0.6 : 1}
          cursor={!canSpin ? "not-allowed" : "pointer"}
        >
          {!canSpin ? "AÑADE MÁS SECTORES" : "GIRAR RULETA"}
        </Button>
      )}
    </Box>
  );
}
