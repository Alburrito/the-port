import React from "react";
import { Box, Text } from "@chakra-ui/react";

/**
 * ColorDisplay Component
 * 
 * Interactive color preview box with clipboard functionality.
 * Displays generated color with hex value and copy feedback.
 * 
 * Technical Implementation:
 * - Click handler triggers clipboard API
 * - Conditional rendering for copy feedback state
 * - Responsive sizing with breakpoint system
 * - Dynamic background color from boxColor prop
 * - CSS hover transform effects
 * 
 * @param {string} boxColor - Generated hex color value
 * @param {Function} onBoxClick - Click handler for copy functionality
 * @param {boolean} copied - State indicating successful copy operation
 */
export function ColorDisplay({ boxColor, onBoxClick, copied }) {
  return (
    <Box flex="1" display="flex" justifyContent="center" p={10}>
      <Box display="flex" flexDirection="column" alignItems="center">
        {/* Color preview box with responsive sizing */}
        <Box
          w={{ base: "200px", md: "280px", lg: "350px", xl: "400px" }}
          h={{ base: "200px", md: "280px", lg: "350px", xl: "400px" }}
          bg={boxColor}
          borderRadius="lg"
          boxShadow="xl"
          border="3px solid"
          borderColor="whiteAlpha.300"
          cursor="pointer"
          display="flex"
          alignItems="center"
          justifyContent="center"
          position="relative"
          onClick={onBoxClick}
          _hover={{ 
            borderColor: "whiteAlpha.500",
            transform: "scale(1.02)",
            transition: "all 0.2s"
          }}
        />
        
        {/* Hex color code display with copy feedback */}
        <Box mt={2}>
          <Text 
            fontSize="xl" 
            fontWeight="bold" 
            color="white" 
            userSelect="all" 
            cursor="pointer" 
            onClick={onBoxClick}
          >
            {boxColor.toUpperCase()}
            {/* Copy operation feedback */}
            {copied && (
              <Text as="span" fontSize="md" color="green.300" ml={2}>
                ¡Copiado!
              </Text>
            )}
          </Text>
        </Box>
      </Box>
    </Box>
  );
}
