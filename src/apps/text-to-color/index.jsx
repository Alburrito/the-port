import React, { useState } from "react";
import { Box, Text, Input, Separator } from "@chakra-ui/react";

export default function TextToColorApp({ backButtonHeightVh }) {
  const availableHeight = backButtonHeightVh ? `${100 - backButtonHeightVh}vh` : "100vh";
  const [inputText, setInputText] = useState("");

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

      <Separator my={4} />

      <Box textAlign="center">
        <Text fontSize="3xl" fontWeight="bold" mb={6}>
          Texto a Color
        </Text>
      </Box>

      <Separator my={4} />
      
      <Box textAlign="center" flex="1" display="flex" flexDirection="column">
        <Box mb={8}>
          <Input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Escribe tu texto aquí..."
            size="lg"
            textAlign="center"
            bg="whiteAlpha.200"
            border="none"
            color="white"
            _placeholder={{ color: "whiteAlpha.700" }}
            _focus={{ bg: "whiteAlpha.300" }}
            maxW="400px"
            mx="auto"
          />
        </Box>
        
        <Box
          w="150px"
          h="150px"
          bg="#38A169"
          borderRadius="lg"
          mx="auto"
          boxShadow="lg"
        />
      </Box>
    </Box>
  );
}
