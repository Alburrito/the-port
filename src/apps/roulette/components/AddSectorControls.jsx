import React from "react";

import { Text, Button, Input, HStack } from "@chakra-ui/react";

/**
 * Sector configuration input controls
 * 
 * Implements controlled form inputs for roulette sector creation.
 * Dual-input system with HTML5 color picker and text field.
 * State protection prevents configuration changes during critical operations.
 * 
 * Input validation:
 * - Color: HTML5 color picker returns valid hex values
 * - Label: Optional text field, empty string if unused
 * - Error handling: Displays validation messages from parent component
 * 
 * State management:
 * - Disabled during isSpinning and winner states
 * - Visual feedback through opacity and cursor properties
 * - Atomic sector creation prevents partial data
 */
export function AddSectorControls({ 
  colorInput, 
  setColorInput, 
  labelInput, 
  setLabelInput, 
  onAddColor, 
  isSpinning, 
  winner,
  errorMsg,
}) {
  return (
    <>
      {/* Error message display for validation failures */}
      {errorMsg && (
        <Text color="red.400" fontSize="sm" mb={2}>{errorMsg}</Text>
      )}
      
      {/* Horizontal input layout: color picker + text field + action button */}
      <HStack spacing={2} mb={4}>
        {/* HTML5 color input: Returns valid hex color values */}
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
          isDisabled={isSpinning || winner} // State protection during operations
        />
        
        {/* Text input for sector labeling (optional) */}
        <Input
          placeholder="Etiqueta (opcional)"
          value={labelInput}
          onChange={setLabelInput}
          isDisabled={isSpinning || winner} // Consistent state protection
        />
        
        {/* Add button: Triggers atomic sector creation */}
        <Button
          colorScheme="green"
          onClick={onAddColor}
          isDisabled={isSpinning || winner}
          opacity={isSpinning || winner ? 0.6 : 1} // Visual state indicator
          cursor={isSpinning || winner ? "not-allowed" : "pointer"}
        >
          Añadir
        </Button>
      </HStack>
    </>
  );
}
