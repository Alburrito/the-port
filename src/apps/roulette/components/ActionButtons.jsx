import React from "react";
import { Button } from "@chakra-ui/react";

export function ActionButtons({ 
  isSpinning, 
  winner, 
  canSpin, 
  onSpinRoulette, 
  onCancelSpin, 
  onReset 
}) {
  return (
    <>
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
    </>
  );
}
