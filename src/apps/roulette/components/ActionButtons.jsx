import React from "react";
import { Button } from "@chakra-ui/react";

/**
 * State-based action button controller
 * 
 * Implements conditional rendering based on roulette application state.
 * Single-action paradigm prevents concurrent operations and race conditions.
 * State machine logic ensures only valid actions are available.
 * 
 * State mappings:
 * - Ready state (!isSpinning && !winner && canSpin): SPIN button
 * - Insufficient sectors (!isSpinning && !winner && !canSpin): Disabled state
 * - Active spinning (isSpinning): CANCEL button
 * - Result state (winner): RESET button
 * 
 * Prevents simultaneous spin/cancel/reset operations through state exclusion.
 */
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
      {/* Primary Action: Spin roulette (available when ready) */}
      {/* Requires: not spinning, no winner declared, minimum 2 sectors */}
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

      {/* Guidance State: Prompt user to add more sectors */}
      {/* Shown when configuration is incomplete (< 2 sectors) */}
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

      {/* Emergency Control: Cancel spin in progress */}
      {/* Only available during active spinning state */}
      {/* Critical for UX - allows users to regain control */}
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

      {/* State Reset: Return to configuration mode */}
      {/* Available after winner is determined */}
      {/* Clears winner and prepares for new spin */}
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
