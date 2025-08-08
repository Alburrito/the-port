import React from "react";
import { Box, Text, SimpleGrid } from "@chakra-ui/react";
import { ColorSectorItem } from "./ColorSectorItem";

export function ColorsList({ colors, setColors, onRemoveColor, isSpinning, winner }) {
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
