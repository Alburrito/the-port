import React, { useState, useCallback } from "react";
import { Box } from "@chakra-ui/react";
import { RouletteWheel } from "./components/RouletteWheel";
import { WinnerDisplay } from "./components/WinnerDisplay";
import { ColorsList } from "./components/ColorsList";
import { ControlPanel } from "./components/ControlPanel";

/**
 * Roulette App - Main container managing all state and business logic
 * 
 * This component uses a centralized state management approach where all state
 * is kept here and passed down as props. This ensures consistent behavior
 * across all child components and makes debugging easier.
 * 
 * Key architectural decisions:
 * - All UI state locks (isSpinning, winner) are managed centrally
 * - Animation duration is synchronized between CSS animation and JS timeout
 * - Rotation state accumulates to allow multiple spins without reset
 */
export default function RouletteApp({ backButtonHeightVh }) {
  // Core application state
  const [colorInput, setColorInput] = useState("#E53E3E");
  const [labelInput, setLabelInput] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  
  // Spin control state - these work together to manage the spinning lifecycle
  const [isSpinning, setIsSpinning] = useState(false); // UI lock for all interactions
  const [rotation, setRotation] = useState(0); // Cumulative rotation in degrees
  const [winner, setWinner] = useState(null); // Winning sector after spin completes
  const [spinTimeoutId, setSpinTimeoutId] = useState(null); // For cancelling spins
  
  // Animation synchronization - critical for consistent UX
  const [sliderValue, setSliderValue] = useState(3); // User-selected duration (1-10s or 11=random)
  const [animationDuration, setAnimationDuration] = useState(3); // Actual duration used for this spin
  
  // Roulette sectors - each sector needs unique color/label for proper identification
  const [colors, setColors] = useState([
    { color: "#42BC01", label: "Sector 1" },
    { color: "#E47200", label: "Sector 2" }
  ]);

  const availableHeight = backButtonHeightVh ? `${100 - backButtonHeightVh}vh` : "100vh";

  /**
   * State protection pattern: All mutations are blocked during critical states
   * This prevents race conditions and ensures UI consistency
   */
  const handleRemoveColor = useCallback((idx) => {
    if (isSpinning || winner) return; // Block during spin or when winner is displayed
    setColors(prev => prev.filter((_, i) => i !== idx));
    setWinner(null); // Clear any previous winner when modifying sectors
  }, [isSpinning, winner]);

  const handleColorInputChange = useCallback((e) => {
    setColorInput(e.target.value);
  }, []);

  const handleLabelInputChange = useCallback((e) => {
    setLabelInput(e.target.value);
  }, []);

  /**
   * Validates and adds new sectors with duplicate prevention
   * Color/label uniqueness is enforced to avoid user confusion
   */
  const handleAddColor = useCallback(() => {
    if (isSpinning || winner) return; // Block during critical states
    setErrorMsg("");
    if (!colorInput) return;
    
    // Validate uniqueness to prevent user confusion
    if (labelInput && colors.some(item => item.label === labelInput)) {
      setErrorMsg("Duplicate label");
      return;
    }
    if (colors.some(item => item.color === colorInput)) {
      setErrorMsg("Duplicate color");
      return;
    }
    
    setColors(prev => [...prev, { color: colorInput, label: labelInput }]);
    setLabelInput(""); // Clear label for next entry
    setWinner(null); // Clear any previous winner
  }, [colorInput, labelInput, colors, isSpinning, winner]);

  /**
   * Core roulette spinning logic with mathematical winner calculation
   * 
   * This function handles the complex synchronization between:
   * - CSS animation duration (visual feedback)
   * - JavaScript timeout (winner calculation)
   * - Random rotation calculation (fairness)
   * 
   * Algorithm explanation:
   * 1. Generate multiple full rotations (3-20) for visual effect
   * 2. Add random angle (0-360°) for unpredictability
   * 3. Calculate final position relative to pointer at top
   * 4. Use modulo arithmetic to find winning sector
   * 
   * Reference: https://en.wikipedia.org/wiki/Polar_coordinate_system
   */
  const spinRoulette = useCallback(() => {
    if (isSpinning || colors.length < 2) return;
    
    setIsSpinning(true);
    setWinner(null);
    
    // Duration calculation: slider value 11 = random (1-10s), otherwise use exact value
    let actualDuration;
    if (sliderValue === 11) {
      actualDuration = Math.floor(Math.random() * 10) + 1;
    } else {
      actualDuration = sliderValue;
    }
    setAnimationDuration(actualDuration); // Sync with CSS animation
    
    // Generate realistic spinning motion with multiple rotations
    const minSpins = 3;
    const maxSpins = 20;
    const spins = minSpins + Math.random() * (maxSpins - minSpins);
    const randomAngle = Math.random() * 360;
    const totalRotation = rotation + (spins * 360) + randomAngle;
    
    setRotation(totalRotation);
    
    // Critical: timeout must match animation duration exactly
    const timeoutId = setTimeout(() => {
      setIsSpinning(false);
      setSpinTimeoutId(null);
      
      // Winner calculation using modular arithmetic
      const normalizedRotation = totalRotation % 360;
      // Invert angle because wheel rotates counterclockwise but sectors are indexed clockwise
      const adjustedAngle = (360 - normalizedRotation) % 360;
      const anglePerSector = 360 / colors.length;
      const winnerIndex = Math.floor(adjustedAngle / anglePerSector);
      
      setWinner(colors[winnerIndex]);
    }, actualDuration * 1000);
    
    setSpinTimeoutId(timeoutId);
  }, [isSpinning, colors, rotation, sliderValue]);

  /**
   * Cancels ongoing spin and cleans up state
   * Important: clears timeout to prevent delayed winner calculation
   */
  const cancelSpin = useCallback(() => {
    if (spinTimeoutId) {
      clearTimeout(spinTimeoutId);
      setSpinTimeoutId(null);
    }
    setIsSpinning(false);
    setWinner(null);
  }, [spinTimeoutId]);

  /**
   * Resets to initial state for new game
   * Clears all spin-related state including rotation accumulation
   */
  const resetSpin = useCallback(() => {
    if (spinTimeoutId) {
      clearTimeout(spinTimeoutId);
      setSpinTimeoutId(null);
    }
    setIsSpinning(false);
    setWinner(null);
    setRotation(0); // Reset accumulated rotation
    setAnimationDuration(3); // Reset to default
  }, [spinTimeoutId]);

  return (
    <Box minH={availableHeight} maxH={availableHeight} w="100%" display="flex" flexDirection="column" px={4} py={6}>
      <RouletteWheel 
        colors={colors} 
        isSpinning={isSpinning} 
        rotation={rotation}
        animationDuration={animationDuration}
      />

      <WinnerDisplay winner={winner} />

      <ColorsList 
        colors={colors} 
        setColors={setColors}
        onRemoveColor={handleRemoveColor}
        isSpinning={isSpinning}
        winner={winner}
      />

      <ControlPanel 
        colorInput={colorInput}
        setColorInput={handleColorInputChange}
        labelInput={labelInput}
        setLabelInput={handleLabelInputChange}
        onAddColor={handleAddColor}
        onSpinRoulette={spinRoulette}
        onCancelSpin={cancelSpin}
        onReset={resetSpin}
        isSpinning={isSpinning}
        colorsCount={colors.length}
        errorMsg={errorMsg}
        winner={winner}
        sliderValue={sliderValue}
        setSliderValue={setSliderValue}
      />
    </Box>
  );
}
