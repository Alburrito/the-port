import React from "react";
import { Box, Text, Slider } from "@chakra-ui/react";

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
        disabled={isSpinning || winner}
        value={[sliderValue]}
        min={1}
        max={11}
        onValueChange={(details) => setSliderValue(details.value[0])}
      >
        <Slider.Label>
          Tiempo de giro: {
            sliderValue === 11 ? 
              'Aleatorio' 
              : sliderValue === 1 ?
                `${sliderValue} segundo`
                : `${sliderValue} segundos`
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
