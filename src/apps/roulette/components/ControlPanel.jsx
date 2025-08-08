import React from "react";
import { Box } from "@chakra-ui/react";
import { AddSectorControls } from "./AddSectorControls";
import { SpinDurationSlider } from "./SpinDurationSlider";
import { ActionButtons } from "./ActionButtons";

export function ControlPanel({ 
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
  winner,
  sliderValue,
  setSliderValue
}) {
  const canSpin = colorsCount >= 2;
  
  return (
    <Box w={{ base: "100%", md: "400px" }} mx="auto" mt={6}>
      <AddSectorControls 
        colorInput={colorInput}
        setColorInput={setColorInput}
        labelInput={labelInput}
        setLabelInput={setLabelInput}
        onAddColor={onAddColor}
        isSpinning={isSpinning}
        winner={winner}
        errorMsg={errorMsg}
      />

      <SpinDurationSlider 
        sliderValue={sliderValue}
        setSliderValue={setSliderValue}
        isSpinning={isSpinning}
        winner={winner}
      />

      <ActionButtons 
        isSpinning={isSpinning}
        winner={winner}
        canSpin={canSpin}
        onSpinRoulette={onSpinRoulette}
        onCancelSpin={onCancelSpin}
        onReset={onReset}
      />
    </Box>
  );
}
