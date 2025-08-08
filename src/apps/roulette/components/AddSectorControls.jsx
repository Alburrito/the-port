import React from "react";
import { Text, Button, Input, HStack } from "@chakra-ui/react";

export function AddSectorControls({ 
  colorInput, 
  setColorInput, 
  labelInput, 
  setLabelInput, 
  onAddColor, 
  isSpinning, 
  winner,
  errorMsg
}) {
  return (
    <>
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
    </>
  );
}
