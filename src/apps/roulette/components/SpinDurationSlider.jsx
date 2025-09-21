import React from "react";

import { Box, Text, Slider } from "@chakra-ui/react";

/**
 * Duration control slider with random mode
 * 
 * Bounded input control for spin duration with special randomization case.
 * Values 1-10 map directly to seconds, value 11 triggers random duration.
 * State protection disables control during spinning and result states.
 * 
 * Implementation details:
 * - Range: 1-11 (1-10 seconds + random option)
 * - Special case: Value 11 generates random duration (2-8 seconds)
 * - State management: Disabled during isSpinning && winner states
 * - Text rendering: Conditional display for direct/random modes
 */
export function SpinDurationSlider({ 
  sliderValue, 
  setSliderValue, 
  isSpinning, 
  winner, 
}) {
  return (
    <Box mb={4} justifyContent="center" display="flex">
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
              "Aleatorio"  // Special case: random duration
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
