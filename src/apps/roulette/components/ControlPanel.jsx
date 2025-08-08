import React from "react";
import { Box } from "@chakra-ui/react";
import { AddSectorControls } from "./AddSectorControls";
import { SpinDurationSlider } from "./SpinDurationSlider";
import { ActionButtons } from "./ActionButtons";

/**
 * ControlPanel Component
 * 
 * Orchestrates the user interface for roulette configuration and interaction.
 * This component acts as a composition layer that organizes three main control areas:
 * 1. Sector management (adding colors/labels)
 * 2. Spin duration configuration  
 * 3. Action buttons (spin, cancel, reset)
 * 
 * The component implements conditional rendering based on application state
 * to provide contextual UI that guides users through the roulette workflow.
 * 
 * State Management Pattern:
 * - Receives all state through props (no local state)
 * - Delegates state mutations to parent through callback functions
 * - Implements prop drilling architecture for centralized state control
 */
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
  // Business logic: minimum sectors required for meaningful roulette spin
  const canSpin = colorsCount >= 2;
  
  return (
    <Box w={{ base: "100%", md: "400px" }} mx="auto" mt={6}>
      {/* Sector Configuration: Color picker and label input */}
      {/* Disabled during spinning to prevent configuration changes */}
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

      {/* Duration Control: Slider for spin timing customization */}
      {/* Hidden during spinning to maintain clean interface */}
      <SpinDurationSlider 
        sliderValue={sliderValue}
        setSliderValue={setSliderValue}
        isSpinning={isSpinning}
        winner={winner}
      />

      {/* Action Controls: Context-sensitive button array */}
      {/* Renders different buttons based on application state */}
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
