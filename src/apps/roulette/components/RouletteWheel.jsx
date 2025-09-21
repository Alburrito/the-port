import React from "react";

import { Box, Text } from "@chakra-ui/react";

/**
 * Roulette wheel component with SVG and CSS animation
 *
 * Renders a dynamic sector wheel using polar coordinate math.
 * CSS transform animation provides smooth rotation transitions.
 * The responsive SVG scales to different screen sizes with trigonometric calculations.
 *
 * @param {Object} props - Component properties
 * @param {Array} props.colors - Array of color objects with {color, label} properties
 * @param {boolean} props.isSpinning - Control of the animation state
 * @param {number} props.rotation - Accumulated rotation degrees
 * @param {number} props.animationDuration - Duration of the animation in seconds
 */
export function RouletteWheel({ colors, isSpinning, rotation, animationDuration }) {
  // SVG coordinate constants for geometric calculations
  const radius = 180;
  const centerX = 200;
  const centerY = 200;

  // Placeholder when no sectors are configured
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

  // Calculate equal angular distribution for all sectors
  const anglePerSector = 360 / colors.length;
  
  /**
   * Creates SVG path string for a pie-slice sector using polar coordinates
   * 
   * Mathematical approach:
   * 1. Convert sector index to start/end angles in radians
   * 2. Offset by -90° to position first sector at top (12 o'clock)
   * 3. Calculate cartesian coordinates using trigonometric functions
   * 4. Generate SVG path with proper arc flags for different sector sizes
   * 
   * Special case: Single sector creates a full circle path
   * 
   * @param {number} index - Zero-based sector index
   * @returns {string} SVG path string for the sector
   */
  function createSectorPath(index) {
    // Convert degrees to radians, offset by -90° to start at top
    const startAngle = (index * anglePerSector - 90) * (Math.PI / 180);
    const endAngle = ((index + 1) * anglePerSector - 90) * (Math.PI / 180);
    
    // Calculate cartesian coordinates for arc endpoints using polar-to-cartesian conversion
    const x1 = centerX + radius * Math.cos(startAngle);
    const y1 = centerY + radius * Math.sin(startAngle);
    const x2 = centerX + radius * Math.cos(endAngle);
    const y2 = centerY + radius * Math.sin(endAngle);
    
    // Single sector: create full circle using two 180° arcs
    if (colors.length === 1) {
      return `M ${centerX} ${centerY} m -${radius}, 0 a ${radius},${radius} 0 1,1 ${radius*2},0 
        a ${radius},${radius} 0 1,1 -${radius*2},0`;
    }
    
    // Multiple sectors: create pie slice with appropriate arc flag
    // Large arc flag = 1 when sector > 180°, 0 otherwise
    const largeArcFlag = anglePerSector > 180 ? 1 : 0;
    
    // SVG path: Move to center, Line to start, Arc to end, Close path
    return `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
  }

  return (
    <Box>
      {/* Main wheel container with responsive sizing and pointer indicator */}
      <Box display="flex" justifyContent="center" alignItems="center" flex="0 0 40%" minH="220px" position="relative">
        {/* Fixed pointer/indicator arrow positioned at top center */}
        {/* This triangle points downward to indicate the winning sector */}
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
        
        {/* Animated wheel container - rotation and timing controlled by parent state */}
        <Box
          w={{ base: "200px", md: "280px", lg: "340px", xl: "400px" }}
          h={{ base: "200px", md: "280px", lg: "340px", xl: "400px" }}
          style={{
            // Conditional CSS animation: only apply transition during spinning
            // Cubic-bezier creates deceleration effect for realistic wheel physics
            transition: isSpinning ? `transform ${animationDuration}s cubic-bezier(0.17, 0.67, 0.83, 0.67)` : undefined,
            transform: `rotate(${rotation}deg)`,
          }}
        >
          {/* SVG wheel with responsive viewBox and drop shadow */}
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 400 400"
            style={{
              filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.15))",
            }}
          >
            {/* Render each sector as an SVG path element */}
            {colors.map((color, index) => (
              <path
                key={index}
                d={createSectorPath(index)}
                fill={color.color}
                stroke="#fff"
                strokeWidth="2"
              />
            ))}
            
            {/* Center hub/axle - visual anchor point for the wheel */}
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
    </Box>
  );
}
