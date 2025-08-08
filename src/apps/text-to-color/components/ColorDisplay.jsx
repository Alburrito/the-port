import React from "react";
import { Box, Text } from "@chakra-ui/react";

/**
 * ColorDisplay Component
 * 
 * Renders the generated color preview with interactive copy functionality.
 * This component serves as the primary output mechanism, displaying both
 * visual and textual representations of the computed color value.
 * 
 * Core Features:
 * - Visual color preview as prominent square/rectangle
 * - Hex color code display with copy-to-clipboard functionality
 * - Responsive sizing across different screen breakpoints
 * - Interactive hover effects for enhanced user experience
 * 
 * Interaction Design:
 * - Click-to-copy functionality on both color box and hex text
 * - Hover animations provide immediate visual feedback
 * - Scale transformation creates engaging micro-interaction
 * - Border color changes indicate interactive elements
 * 
 * Technical Implementation:
 * - Clipboard API integration for modern browsers
 * - Responsive breakpoint system for optimal sizing
 * - CSS transitions for smooth animations
 * - User-selectable text for accessibility
 * 
 * Accessibility Considerations:
 * - Keyboard accessible through click handlers
 * - High contrast hex text for readability
 * - Clear visual boundaries with border styling
 * - Semantic structure for screen reader support
 * 
 * @param {string} boxColor - Generated hex color value
 * @param {Function} onBoxClick - Click handler for copy functionality
 * @param {boolean} copied - State indicating successful copy operation
 */
export function ColorDisplay({ boxColor, onBoxClick, copied }) {
  return (
    <Box flex="1" display="flex" justifyContent="center" p={10}>
      <Box display="flex" flexDirection="column" alignItems="center">
        {/* Interactive color preview box with responsive sizing */}
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
            {/* Temporary success feedback for copy operation */}
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
