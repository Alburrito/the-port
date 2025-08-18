import React from "react";
import { Box, Text, SimpleGrid } from "@chakra-ui/react";
import { ColorSectorItem } from "./ColorSectorItem";

/**
 * Sector list container with grid layout
 * 
 * Renders scrollable grid of roulette sectors with management operations.
 * Responsive 2-column layout with height constraints and overflow scrolling.
 * Delegates sector operations to child components while maintaining state consistency.
 * 
 * Layout implementation:
 * - Fixed width container with responsive breakpoints
 * - Constrained height (300px) with auto-scroll overflow
 * - Grid system for sector organization
 * - Empty state handling with instructional message
 */
export function ColorsList({ colors, setColors, onRemoveColor, isSpinning, winner }) {
  return (
    <Box w={{ base: "100%", md: "400px" }} mx="auto" mt={8} flex="1 1 0" display="flex" flexDirection="column">
      {/* Scrollable container with visual boundaries */}
      <Box
        flex="1 1 0"
        minH="0"
        maxH="calc(50vh)" // Constrain height to prevent page overflow
        overflowY="auto"  // Enable scrolling for many sectors
        pr={2}
        borderRadius="md"
        border="1px solid"
        borderColor="gray.200"
        bg="whiteAlpha.50"
        boxShadow="sm"
        transition="border-color 0.2s"
        p={3}
      >
        {/* Grid layout for sector organization */}
        <SimpleGrid columns={2} gap={2}>
          {colors.length === 0 ? (
            // Empty state: Guide user to add first sector
            <Text color="gray.400">No hay sectores aún.</Text>
          ) : (
            // Populated state: Render interactive sector items
            colors.map((item, idx) => (
              <ColorSectorItem 
                key={idx} // Index-based keys maintain order during edits
                item={item} 
                idx={idx} 
                colors={colors}
                setColors={setColors}
                onRemove={onRemoveColor}
                isSpinning={isSpinning}
                winner={winner}
              />
            ))
          )}
        </SimpleGrid>
      </Box>
    </Box>
  );
}
