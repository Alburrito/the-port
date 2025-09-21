import React from "react";

import { Text, Button } from "@chakra-ui/react";

/**
 * Game Mode Selection Button
 *
 * Large button component with icon and title for selecting game modes.
 * Utilizes hover effects and animations to enhance interactivity.
 *
 * @param {Object} props - Component properties
 * @param {React.ComponentType} props.icon - Icon component to display
 * @param {string} props.title - Descriptive text for the game mode
 * @param {Function} props.onClick - Event handler for selection
 */
export function GameModeButton({ icon: Icon, title, onClick }) {
  return (
    <Button
      onClick={onClick}
      h="150px"
      w="150px"
      colorPalette="teal"
      variant="solid"
      bg="teal.600"
      color="white"
      _hover={{ bg: "teal.500", transform: "scale(1.05)" }}
      _active={{ bg: "teal.700", transform: "scale(0.98)" }}
      display="flex"
      flexDirection="column"
      gap={3}
      border="2px solid"
      borderColor="teal.400"
      boxShadow="lg"
      transition="all 0.2s"
    >
      {Icon && <Icon size={60} color="white" />}
      <Text fontSize="md" fontWeight="bold" textAlign="center">
        {title}
      </Text>
    </Button>
  );
}
