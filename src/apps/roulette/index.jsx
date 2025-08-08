import React, { useState, useCallback } from "react";
import { Box } from "@chakra-ui/react";
import { RouletteWheel } from "./components/RouletteWheel";
import { WinnerDisplay } from "./components/WinnerDisplay";
import { ColorsList } from "./components/ColorsList";
import { ControlPanel } from "./components/ControlPanel";

export default function RouletteApp({ backButtonHeightVh }) {
  const [colorInput, setColorInput] = useState("#E53E3E");
  const [labelInput, setLabelInput] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [winner, setWinner] = useState(null);
  const [spinTimeoutId, setSpinTimeoutId] = useState(null);
  const [sliderValue, setSliderValue] = useState(3);
  const [animationDuration, setAnimationDuration] = useState(3);
  const [colors, setColors] = useState([
    // 7 sectores para empezar
    { color: "#42BC01", label: "Sector 1" },
    { color: "#E47200", label: "Sector 2" },
    { color: "#E53E3E", label: "Sector 3" },
    { color: "#805AD5", label: "Sector 4" },
    { color: "#2B6CB0", label: "Sector 5"},
    { color: "#38A169", label: "Sector 6" },
    { color: "#DD6B20", label: "Sector 7" },
  ]);

  const availableHeight = backButtonHeightVh ? `${100 - backButtonHeightVh}vh` : "100vh";

  const handleRemoveColor = useCallback((idx) => {
    if (isSpinning || winner) return; // Evitar eliminación mientras gira o hay ganador
    setColors(prev => prev.filter((_, i) => i !== idx));
    setWinner(null);
  }, [isSpinning, winner]);

  const handleColorInputChange = useCallback((e) => {
    setColorInput(e.target.value);
  }, []);

  const handleLabelInputChange = useCallback((e) => {
    setLabelInput(e.target.value);
  }, []);

  const handleAddColor = useCallback(() => {
    if (isSpinning || winner) return; // Evitar añadir mientras gira o hay ganador
    setErrorMsg("");
    if (!colorInput) return;
    if (labelInput && colors.some(item => item.label === labelInput)) {
      setErrorMsg("Etiqueta duplicada");
      return;
    }
    if (colors.some(item => item.color === colorInput)) {
      setErrorMsg("Color duplicado");
      return;
    }
    setColors(prev => [...prev, { color: colorInput, label: labelInput }]);
    setLabelInput("");
    setWinner(null);
  }, [colorInput, labelInput, colors, isSpinning, winner]);

  const spinRoulette = useCallback(() => {
    if (isSpinning || colors.length < 2) return;
    
    setIsSpinning(true);
    setWinner(null);
    
    let actualDuration;
    if (sliderValue === 11) {
      actualDuration = Math.floor(Math.random() * 10) + 1;
    } else {
      actualDuration = sliderValue;
    }
    setAnimationDuration(actualDuration);
    
    const minSpins = 3;
    const maxSpins = 20;
    const spins = minSpins + Math.random() * (maxSpins - minSpins);
    const randomAngle = Math.random() * 360;
    const totalRotation = rotation + (spins * 360) + randomAngle;
    
    setRotation(totalRotation);
    
    const timeoutId = setTimeout(() => {
      setIsSpinning(false);
      setSpinTimeoutId(null);
      
      const normalizedRotation = totalRotation % 360;
      const adjustedAngle = (360 - normalizedRotation) % 360; // Invertir porque la ruleta gira en sentido contrario
      const anglePerSector = 360 / colors.length;
      const winnerIndex = Math.floor(adjustedAngle / anglePerSector);
      
      setWinner(colors[winnerIndex]);
    }, actualDuration * 1000);
    
    setSpinTimeoutId(timeoutId);
  }, [isSpinning, colors, rotation, sliderValue]);

  const cancelSpin = useCallback(() => {
    if (spinTimeoutId) {
      clearTimeout(spinTimeoutId);
      setSpinTimeoutId(null);
    }
    setIsSpinning(false);
    setWinner(null);
  }, [spinTimeoutId]);

  const resetSpin = useCallback(() => {
    if (spinTimeoutId) {
      clearTimeout(spinTimeoutId);
      setSpinTimeoutId(null);
    }
    setIsSpinning(false);
    setWinner(null);
    setRotation(0);
    setAnimationDuration(3);
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
