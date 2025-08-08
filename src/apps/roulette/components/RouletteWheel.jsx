import React from "react";
import { Box, Text } from "@chakra-ui/react";

export function RouletteWheel({ colors, isSpinning, rotation }) {
  const radius = 180;
  const centerX = 200;
  const centerY = 200;
  
  const animationDuration = 3;

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
        transition={isSpinning ? `transform ${animationDuration}s cubic-bezier(0.23, 1, 0.32, 1)` : "none"}
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
