import React from "react";
import { Box, Text } from "@chakra-ui/react";

export default function TextToColorApp({ backButtonHeightVh }) {
  const availableHeight = backButtonHeightVh ? `${100 - backButtonHeightVh}vh` : "100vh";

  return (
    <Box 
      minH={availableHeight}
      maxH={availableHeight}
      w="100%"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      px={4}
      overflow="hidden"
    >
      <Box textAlign="center">
        <Text fontSize="3xl" fontWeight="bold" mb={6}>
          Texto a Color
        </Text>
      </Box>
    </Box>
  );
}
