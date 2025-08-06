import React, { useState } from "react";
import { Box, Text, Button, VStack, Collapsible, Separator } from "@chakra-ui/react";
import wordsData from "./words.json";
import { getRandomDifferentIndex } from "../../utils/randomUtils.js";

export default function WordsGeneratorApp() {
  const colorSchemes = [
    { bg: "#2D3748", text: "white"},
    { bg: "#1A202C", text: "white"},
    { bg: "#2B6CB0", text: "white"},
    { bg: "#38A169", text: "white"},
    { bg: "#805AD5", text: "white"},
    { bg: "#E53E3E", text: "white"},
    { bg: "#DD6B20", text: "white"},
    { bg: "#319795", text: "white"},
    { bg: "#4A5568", text: "white"},
    { bg: "#2C5282", text: "white"},
  ];

  const [currentWord, setCurrentWord] = useState(
    wordsData[
      Math.floor(Math.random() * wordsData.length)
    ]
  );
  const [showDefinitions, setShowDefinitions] = useState(false);
  const [currentColorScheme, setCurrentColorScheme] = useState(colorSchemes[0]);
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  const getRandomWord = () => {
    const newWordIndex = getRandomDifferentIndex(wordsData, currentWordIndex);
    const newColorIndex = getRandomDifferentIndex(colorSchemes, currentColorIndex);
    
    setCurrentWord(wordsData[newWordIndex]);
    setCurrentWordIndex(newWordIndex);
    setCurrentColorScheme(colorSchemes[newColorIndex]);
    setCurrentColorIndex(newColorIndex);
  };

  return (
    <Box 
      minH="calc(100vh - 80px)"
      w="100%"
      background={currentColorScheme.bg}
      color={currentColorScheme.text}
      p={4}
      display="flex"
      flexDirection="column"
      overflow="hidden"
    >
      <Separator my={4} />

      <Box textAlign="center">
        <Text fontSize="3xl" fontWeight="bold">
          Generador de Palabras
        </Text>
      </Box>
      
      <Separator my={4} />
        
      <Box textAlign="center" flex="1" display="flex" flexDirection="column">
        <Text fontSize="2xl" color={currentColorScheme.text} mb={4} fontWeight="bold">
          {currentWord.word.charAt(0).toUpperCase() + currentWord.word.slice(1)}
        </Text>

        <Collapsible.Root unmountOnExit>
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
            color={currentColorScheme.text}
            mb={4}
          >
            <Text fontSize="xs">
              {showDefinitions ? "Ocultar" : "Mostrar"} definiciones {showDefinitions ? "▲" : "▼"}
            </Text>
          </Collapsible.Trigger>
          <Collapsible.Content>
            <Box 
              maxH="40vh"
              overflowY="auto" 
              css={{
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
      </Box>

      <Box textAlign="center" pb={4}>
        <Button 
          onClick={getRandomWord} 
          colorScheme="whiteAlpha" 
          size="lg"
          bg="whiteAlpha.200"
          _hover={{ bg: "whiteAlpha.300" }}
          color={currentColorScheme.text}
          fontWeight="bold"
        >
          Siguiente
        </Button>
      </Box>
    </Box>
  );
}
