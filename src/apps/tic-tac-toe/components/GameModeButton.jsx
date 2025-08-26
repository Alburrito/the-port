import React from "react";
import { Text, Button } from "@chakra-ui/react";

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
