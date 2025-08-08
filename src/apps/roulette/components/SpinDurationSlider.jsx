import React from "react";
import { Box, Text, Slider } from "@chakra-ui/react";

/**
 * SpinDurationSlider Component
 * 
 * Provides user control over roulette spin duration with special handling
 * for randomization. This component implements a bounded control system
 * where users can select predictable timing (1-10 seconds) or delegate
 * to random duration generation.
 * 
 * Value Mapping:
 * - Values 1-10: Direct second mapping for predictable spins
 * - Value 11: Special "random" mode that triggers algorithmic duration
 * 
 * The slider is disabled during spinning and winner states to prevent
 * mid-operation configuration changes that could disrupt timing calculations.
 * 
 * UX Design: Clear labeling with singular/plural grammar and special
 * text for the random option enhances user understanding.
 */
export function SpinDurationSlider({ 
  sliderValue, 
  setSliderValue, 
  isSpinning, 
  winner 
}) {
  return (
    <Box mb={4} justifyContent={"center"} display="flex">
      <Slider.Root 
        width="100%" 
        disabled={isSpinning || winner} // Prevent changes during critical states
        value={[sliderValue]}
        min={1}
        max={11} // 11 represents "random" option
        onValueChange={(details) => setSliderValue(details.value[0])}
      >
        <Slider.Label>
          {/* Dynamic label with proper grammar and special case handling */}
          Tiempo de giro: {
            sliderValue === 11 ? 
              'Aleatorio'  // Special case: random duration
              : sliderValue === 1 ?
                `${sliderValue} segundo`  // Singular form
                : `${sliderValue} segundos` // Plural form
            }
        </Slider.Label>
        <Slider.Control>
          <Slider.Track>
            <Slider.Range />
          </Slider.Track>
          <Slider.Thumb />
        </Slider.Control>
      </Slider.Root>
    </Box>
  );
}
