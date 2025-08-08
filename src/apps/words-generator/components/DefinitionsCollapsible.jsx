import React from "react";
import { Box, Text, VStack, Collapsible } from "@chakra-ui/react";

/**
 * DefinitionsCollapsible Component
 * 
 * Manages the expandable definitions section with custom scrollbar styling.
 * This component implements a space-efficient approach to displaying detailed
 * word definitions, allowing users to focus on the word initially while
 * providing easy access to comprehensive information.
 * 
 * UX Strategy:
 * - Collapsed by default to reduce cognitive load
 * - Toggle mechanism with clear visual indicators
 * - Scrollable content area prevents interface overflow
 * - Custom scrollbar styling maintains theme consistency
 * 
 * Scrollbar Customization:
 * - WebKit-specific styling for modern browsers
 * - Semi-transparent scrollbar elements blend with theme
 * - Hover states provide interactive feedback
 * - Graceful degradation for unsupported browsers
 * 
 * Performance Considerations:
 * - unmountOnExit optimizes DOM when collapsed
 * - CSS-in-JS styling isolated to component scope
 * - Minimal re-renders through controlled state
 * 
 * @param {Object} currentWord - Word object containing definitions array
 * @param {boolean} showDefinitions - Toggle state for definitions visibility
 * @param {Function} setShowDefinitions - State setter for toggle control
 * @param {Object} colorScheme - Current color theme object with bg/text properties
 */
export function DefinitionsCollapsible({ 
  currentWord, 
  showDefinitions, 
  setShowDefinitions, 
  colorScheme 
}) {
  return (
    <Collapsible.Root unmountOnExit>
      {/* Toggle trigger with hover effects and semantic indicators */}
      <Collapsible.Trigger 
        paddingY={2} 
        paddingX={4}
        bg="whiteAlpha.200" 
        borderRadius="md"
        _hover={{ bg: "whiteAlpha.300" }}
        cursor="pointer"
        display="inline-flex"
        alignItems="center"
        gap={2}
        onClick={() => setShowDefinitions(!showDefinitions)}
        color={colorScheme.text}
        mb={4}
      >
        {/* Dynamic button text with directional indicators */}
        <Text fontSize="xs">
          {showDefinitions ? "Ocultar" : "Mostrar"} definiciones {showDefinitions ? "▲" : "▼"}
        </Text>
      </Collapsible.Trigger>
      
      {/* Collapsible content with constrained height and custom scrolling */}
      <Collapsible.Content>
        <Box 
          maxH="40vh" // Prevent content overflow beyond viewport
          overflowY="auto"  // Enable vertical scrolling for long definitions
          css={{
            // Custom WebKit scrollbar styling for theme consistency
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-track': {
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: 'rgba(255, 255, 255, 0.3)',
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: 'rgba(255, 255, 255, 0.5)',
            },
          }}
        >
          {/* Definitions list with consistent spacing */}
          <VStack spacing={2} textAlign="left">
            {currentWord.definitions.map((definition, index) => (
              <Text key={index} fontSize="md" width="100%" p={2}>
                {definition}
              </Text>
            ))}
          </VStack>
        </Box>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}
