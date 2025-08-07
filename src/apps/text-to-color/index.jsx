import React, { useState } from "react";
import { Box, Text, Textarea, Separator } from "@chakra-ui/react";

export default function TextToColorApp({ backButtonHeightVh }) {
  const [copied, setCopied] = useState(false);

  function handleBoxClick() {
    navigator.clipboard.writeText(boxColor);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }
  const availableHeight = backButtonHeightVh ? `${100 - backButtonHeightVh}vh` : "100vh";
  const [inputText, setInputText] = useState("");
  const [boxColor, setBoxColor] = useState("#38A169");

  // This function converts the input text into a color based on its ASCII values.
  // It sums the ASCII values of all characters, then generates a color based on that sum
  // To generate a color, it converts the sum into a hexadecimal format.
  function textToColor(text) {
    const asciiValues = Array.from(text).map(char => char.charCodeAt(0));
    const sum = asciiValues.reduce((acc, val) => acc + val, 0);
    return `#${((sum * 1234567) % 16777215).toString(16).padStart(6, '0')}`;
  }

  function handleInputChange(e) {
    setInputText(e.target.value);
    setBoxColor(textToColor(e.target.value));
  }

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
      bg="#2D3748"
      color="white"
    >

      <Separator my={4} />

      <Box textAlign="center">
        <Text fontSize="3xl" fontWeight="bold">
          Texto a Color
        </Text>
      </Box>

      <Separator my={4} />
      
      <Box textAlign="center" flex="1" display="flex" flexDirection="column" minH="0">
        <Box>
          <Textarea
            value={inputText}
            onChange={handleInputChange}
            placeholder="Escribe tu texto aquí..."
            size="lg"
            textAlign="center"
            bg="whiteAlpha.200"
            border="none"
            color="white"
            _placeholder={{ color: "whiteAlpha.700" }}
            _focus={{ bg: "whiteAlpha.300" }}
            maxW="500px"
            mx="auto"
            maxH="30vh"
            autoresize
            overflow="auto"
          />
        </Box>
        
        <Box flex="1" display="flex" justifyContent="center" p={10}>
          <Box display="flex" flexDirection="column" alignItems="center">
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
              onClick={handleBoxClick}
              _hover={{ 
                borderColor: "whiteAlpha.500",
                transform: "scale(1.02)",
                transition: "all 0.2s"
              }}
            />
            <Box mt={2}>
              <Text fontSize="xl" fontWeight="bold" color="white" userSelect="all" cursor="pointer" onClick={handleBoxClick}>
                {boxColor.toUpperCase()}
                {copied && (
                  <Text as="span" fontSize="md" color="green.300" ml={2}>¡Copiado!</Text>
                )}
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
