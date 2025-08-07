import React, { useState } from "react";
import { Box, Text, Input, Button, SimpleGrid, HStack, Dialog, Portal } from "@chakra-ui/react";

function EditIcon() {
  return (
    <Box as="span" fontWeight="bold" fontSize="lg" color="gray.600" lineHeight={1}>
      <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline', verticalAlign: 'middle' }}>
        <path d="M4 13.5V16h2.5l7.06-7.06-2.5-2.5L4 13.5zM17.71 6.04a1.003 1.003 0 0 0 0-1.42l-2.34-2.34a1.003 1.003 0 0 0-1.42 0l-1.83 1.83 3.76 3.76 1.83-1.83z" fill="currentColor"/>
      </svg>
    </Box>
  );
}

function RemoveIcon() {
  return (
    <Box as="span" fontWeight="bold" fontSize="lg" color="red.500" lineHeight={1}>
      ×
    </Box>
  );
}

function RouletteWheel({ colors, isSpinning, rotation }) {
  const radius = 180;
  const centerX = 200;
  const centerY = 200;
  
  if (colors.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" flex="0 0 40%" minH="220px">
        <Box
          w={{ base: "180px", md: "260px", lg: "320px", xl: "380px" }}
          h={{ base: "180px", md: "260px", lg: "320px", xl: "380px" }}
          bg="gray.200"
          borderRadius="full"
          boxShadow="xl"
          border="4px solid"
          borderColor="whiteAlpha.400"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Text color="gray.500" fontSize="sm" textAlign="center">
            Añade sectores para empezar
          </Text>
        </Box>
      </Box>
    );
  }

  const anglePerSector = 360 / colors.length;
  
  function createSectorPath(index) {
    const startAngle = (index * anglePerSector - 90) * (Math.PI / 180); // -90 so it starts at the top
    const endAngle = ((index + 1) * anglePerSector - 90) * (Math.PI / 180);
    
    const x1 = centerX + radius * Math.cos(startAngle);
    const y1 = centerY + radius * Math.sin(startAngle);
    const x2 = centerX + radius * Math.cos(endAngle);
    const y2 = centerY + radius * Math.sin(endAngle);
    
    // Si solo hay un color, crear un círculo completo
    if (colors.length === 1) {
      return `M ${centerX} ${centerY} m -${radius}, 0 a ${radius},${radius} 0 1,1 ${radius*2},0 a ${radius},${radius} 0 1,1 -${radius*2},0`;
    }
    
    const largeArcFlag = anglePerSector > 180 ? 1 : 0;
    
    return `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" flex="0 0 40%" minH="220px" position="relative">
      <Box 
        position="absolute" 
        top="10px" 
        left="50%" 
        transform="translateX(-50%)" 
        zIndex={2}
        w="0" 
        h="0" 
        borderLeft="15px solid transparent"
        borderRight="15px solid transparent"
        borderTop="25px solid #2D3748"
        filter="drop-shadow(0 2px 4px rgba(0,0,0,0.3))"
      />
      
      <Box
        w={{ base: "200px", md: "280px", lg: "340px", xl: "400px" }}
        h={{ base: "200px", md: "280px", lg: "340px", xl: "400px" }}
        transform={`rotate(${rotation}deg)`}
        transition={isSpinning ? "transform 2s cubic-bezier(0.23, 1, 0.32, 1)" : "none"}
        style={{ transformOrigin: "center" }}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 400 400"
          style={{
            filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.15))",
          }}
        >
          {colors.map((color, index) => (
            <path
              key={index}
              d={createSectorPath(index)}
              fill={color.color}
              stroke="#fff"
              strokeWidth="2"
            />
          ))}
          
          <circle
            cx={centerX}
            cy={centerY}
            r="20"
            fill="#2D3748"
            stroke="#fff"
            strokeWidth="3"
          />
        </svg>
      </Box>
    </Box>
  );
}


function ColorSectorItem({ item, idx, onRemove, colors, setColors }) {
  const [isOpen, setIsOpen] = useState(false);
  const [editColor, setEditColor] = useState(item.color);
  const [editLabel, setEditLabel] = useState(item.label);
  const [errorMsg, setErrorMsg] = useState("");

  function handleClose() {
    setErrorMsg("");
    setEditColor(item.color);
    setEditLabel(item.label);
    setIsOpen(false);
  }

  function handleSave() {
    if (editLabel && colors.some((c, i) => i !== idx && c.label === editLabel)) {
      setErrorMsg("Etiqueta duplicada");
      return;
    }
    if (colors.some((c, i) => i !== idx && c.color === editColor)) {
      setErrorMsg("Color duplicado");
      return;
    }
    setErrorMsg("");
    setColors(colors.map((c, i) => i === idx ? { ...c, color: editColor, label: editLabel } : c));
    setIsOpen(false);
  }

  return (
    <HStack key={idx} spacing={2} justify="space-between" w="100%">
      <Box
        w="32px"
        h="32px"
        borderRadius="full"
        bg={item.color}
        border="2px solid whiteAlpha.400"
      />
      <Text
        fontSize="sm"
        flex="1"
        whiteSpace="nowrap"
        overflow="hidden"
        textOverflow="ellipsis"
      >
        {item.label || item.color}
      </Text>
      <Box display="flex">
        <Dialog.Root open={isOpen} onOpenChange={open => {
          setIsOpen(open);
          if (!open) setErrorMsg("");
        }}>
          <Dialog.Trigger asChild>
            <Button size="xs" variant="ghost" onClick={() => setIsOpen(true)} p={0} minW={4} h={6} aria-label="Editar">
              <EditIcon />
            </Button>
          </Dialog.Trigger>
          <Portal>
            <Dialog.Backdrop />
            <Dialog.Positioner>
              <Dialog.Content maxW="400px" w="90%" borderRadius="md" p={6}>
                <Dialog.Header>
                  <Dialog.Title fontSize="lg" fontWeight="bold">Editar sector</Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                  <SimpleGrid columns={2} gap={3} mb={4}>
                    <Input
                      type="color"
                      value={editColor}
                      onChange={e => setEditColor(e.target.value)}
                      w="100%"
                      h="40px"
                      p={0}
                      border="none"
                      bg="none"
                      cursor="pointer"
                      borderRadius="md"
                    />
                    <Input
                      value={editLabel}
                      onChange={e => setEditLabel(e.target.value)}
                      size="sm"
                      fontSize="sm"
                      borderRadius="md"
                      border="1px solid"
                      borderColor="gray.400"
                      w="100%"
                      color="gray.900"
                      bg="whiteAlpha.200"
                      placeholder="Etiqueta"
                    />
                  </SimpleGrid>
                  {errorMsg && (
                    <Text color="red.400" fontSize="sm" mb={2}>{errorMsg}</Text>
                  )}
                </Dialog.Body>
                <Dialog.Footer>
                  <Button variant="outline" colorScheme="gray" onClick={handleClose}>
                    Cancelar
                  </Button>
                  <Button colorScheme="purple" fontWeight="bold" onClick={handleSave}>
                    Guardar
                  </Button>
                </Dialog.Footer>
              </Dialog.Content>
            </Dialog.Positioner>
          </Portal>
        </Dialog.Root>
        <Button size="xs" colorScheme="red" variant="ghost" onClick={() => onRemove(idx)} p={0} minW={4} h={6} aria-label="Eliminar">
          <RemoveIcon />
        </Button>
      </Box>
    </HStack>
  );
}

function ColorsList({ colors, setColors, onRemoveColor }) {
  return (
    <Box w={{ base: "100%", md: "400px" }} mx="auto" mt={8} flex="1 1 0" display="flex" flexDirection="column">
      <Text fontWeight="bold" mb={2}>Colores añadidos</Text>
      <Box
        flex="1 1 0"
        minH="0"
        maxH="calc(50vh)"
        overflowY="auto"
        pr={2}
        borderRadius="md"
        border="1px solid"
        borderColor="gray.200"
        bg="whiteAlpha.50"
        boxShadow="sm"
        transition="border-color 0.2s"
        p={3}
      >
        <SimpleGrid columns={2} gap={2}>
          {colors.length === 0 ? (
            <Text color="gray.400">No hay sectores aún.</Text>
          ) : (
            colors.map((item, idx) => (
              <ColorSectorItem 
                key={idx}
                item={item} 
                idx={idx} 
                colors={colors}
                setColors={setColors}
                onRemove={onRemoveColor} 
              />
            ))
          )}
        </SimpleGrid>
      </Box>
    </Box>
  );
}

function AddSectorForm({ colorInput, setColorInput, labelInput, setLabelInput, onAddColor, onSpinRoulette, isSpinning, colorsCount, errorMsg }) {
  const canSpin = colorsCount >= 2;
  
  return (
    <Box w={{ base: "100%", md: "400px" }} mx="auto" mt={6}>
      <Text fontWeight="bold" mb={2}>Añadir sector</Text>
      {errorMsg && (
        <Text color="red.400" fontSize="sm" mb={2}>{errorMsg}</Text>
      )}
      <SimpleGrid columns={2} gap={3} mb={2}>
        <Input
          type="color"
          value={colorInput}
          onChange={e => setColorInput(e.target.value)}
          w="100%"
          h="40px"
          p={0}
          border="none"
          bg="none"
          cursor="pointer"
          borderRadius="md"
        />
        <Input
          placeholder="Etiqueta (opcional)"
          value={labelInput}
          onChange={e => setLabelInput(e.target.value)}
          bg="whiteAlpha.200"
          color="gray.900"
          border="1px solid"
          borderColor="gray.400"
          size="sm"
          fontSize="sm"
          borderRadius="md"
        />
      </SimpleGrid>
      <Button colorScheme="purple" onClick={onAddColor} fontWeight="bold" size="sm" borderRadius="md" w="100%">
        Añadir
      </Button>
      <Button 
        colorScheme={canSpin ? "orange" : "gray"} 
        onClick={onSpinRoulette} 
        fontWeight="bold" 
        size="lg" 
        borderRadius="md" 
        mt={4} 
        w="100%" 
        boxShadow="md"
        isLoading={isSpinning}
        loadingText="Girando..."
        isDisabled={isSpinning || !canSpin}
        opacity={!canSpin && !isSpinning ? 0.6 : 1}
        cursor={!canSpin && !isSpinning ? "not-allowed" : "pointer"}
      >
        {isSpinning 
          ? "GIRANDO..." 
          : !canSpin 
            ? "AÑADE MÁS SECTORES" 
            : "GIRAR RULETA"
        }
      </Button>
    </Box>
  );
}

export default function RouletteApp({ backButtonHeightVh }) {
  const [colorInput, setColorInput] = useState("#E53E3E");
  const [labelInput, setLabelInput] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [winner, setWinner] = useState(null);
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

  function handleRemoveColor(idx) {
    setColors(colors.filter((_, i) => i !== idx));
    setWinner(null); // Limpiar ganador al cambiar sectores
  }

  function handleAddColor() {
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
    setColors([...colors, { color: colorInput, label: labelInput }]);
    setLabelInput("");
    setWinner(null); // Limpiar ganador al cambiar sectores
  }

  function spinRoulette() {
    if (isSpinning || colors.length < 2) return;
    
    setIsSpinning(true);
    setWinner(null);
    
    // Calcular rotación aleatoria (al menos 3 vueltas completas + ángulo aleatorio)
    const minSpins = 3;
    const maxSpins = 6;
    const spins = minSpins + Math.random() * (maxSpins - minSpins);
    const randomAngle = Math.random() * 360;
    const totalRotation = rotation + (spins * 360) + randomAngle;
    
    setRotation(totalRotation);
    
    // Calcular ganador después de 2 segundos
    setTimeout(() => {
      setIsSpinning(false);
      
      // El triángulo apunta hacia arriba (0 grados), calcular qué sector toca
      const normalizedRotation = totalRotation % 360;
      const adjustedAngle = (360 - normalizedRotation) % 360; // Invertir porque la ruleta gira en sentido contrario
      const anglePerSector = 360 / colors.length;
      const winnerIndex = Math.floor(adjustedAngle / anglePerSector);
      
      setWinner(colors[winnerIndex]);
    }, 2000);
  }

  return (
    <Box minH={availableHeight} maxH={availableHeight} w="100%" display="flex" flexDirection="column" px={4} py={6}>
      <RouletteWheel colors={colors} isSpinning={isSpinning} rotation={rotation} />

      {/* Resultado del ganador */}
      {winner && (
        <Box textAlign="center" mb={4}>
          <Text fontSize="xl" fontWeight="bold" color="green.500">
            🎉 ¡Ganador! 🎉
          </Text>
          <Box display="flex" alignItems="center" justifyContent="center" gap={3} mt={2}>
            <Box w="24px" h="24px" borderRadius="full" bg={winner.color} border="2px solid white" boxShadow="md" />
            <Text fontSize="lg" fontWeight="semibold">
              {winner.label || winner.color}
            </Text>
          </Box>
        </Box>
      )}

      <ColorsList 
        colors={colors} 
        setColors={setColors}
        onRemoveColor={handleRemoveColor} 
      />

      <AddSectorForm 
        colorInput={colorInput}
        setColorInput={setColorInput}
        labelInput={labelInput}
        setLabelInput={setLabelInput}
        onAddColor={handleAddColor}
        onSpinRoulette={spinRoulette}
        isSpinning={isSpinning}
        colorsCount={colors.length}
        errorMsg={errorMsg}
      />
    </Box>
  );
}
