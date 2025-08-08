import React from "react";
import { Text, Button, Input, HStack } from "@chakra-ui/react";

/**
 * AddSectorControls Component
 * 
 * Manages roulette sector configuration through controlled form inputs.
 * This component implements a dual-input system for color and label selection,
 * with comprehensive state protection during critical operations.
 * 
 * Input Validation Strategy:
 * - Color input: HTML5 color picker ensures valid hex values
 * - Label input: Optional text field with placeholder guidance
 * - Error messaging: Contextual feedback for validation failures
 * 
 * State Protection:
 * - All inputs disabled during spinning to prevent configuration drift
 * - Visual feedback (opacity, cursor) indicates unavailable states
 * - Atomic add operation prevents partial sector creation
 * 
 * UX Considerations:
 * - Compact horizontal layout optimizes screen space
 * - Color picker provides visual feedback before selection
 * - Optional labeling reduces friction for quick setup
 */
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
      {/* Error feedback: Display validation or state errors */}
      {errorMsg && (
        <Text color="red.400" fontSize="sm" mb={2}>{errorMsg}</Text>
      )}
      
      {/* Sector input controls: Color picker + label + add button */}
      <HStack spacing={2} mb={4}>
        {/* HTML5 color input: Ensures valid color values */}
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
          isDisabled={isSpinning || winner} // Protected during critical states
        />
        
        {/* Optional text label for sector identification */}
        <Input
          placeholder="Etiqueta (opcional)"
          value={labelInput}
          onChange={setLabelInput}
          isDisabled={isSpinning || winner} // Consistent state protection
        />
        
        {/* Add action: Commits both color and label atomically */}
        <Button
          colorScheme="green"
          onClick={onAddColor}
          isDisabled={isSpinning || winner}
          opacity={isSpinning || winner ? 0.6 : 1} // Visual state feedback
          cursor={isSpinning || winner ? "not-allowed" : "pointer"}
        >
          Añadir
        </Button>
      </HStack>
    </>
  );
}
