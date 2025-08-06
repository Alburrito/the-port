import React, { useState } from "react";
import { Box, Text, Button, VStack, Collapsible, Separator } from "@chakra-ui/react";
import wordsData from "./words.json";

export default function WordsGeneratorApp() {
  const [currentWord, setCurrentWord] = useState(
    wordsData[
      Math.floor(Math.random() * wordsData.length)
    ]
  );
  const [showDefinitions, setShowDefinitions] = useState(false);

  const getRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * wordsData.length);
    setCurrentWord(wordsData[randomIndex]);
  };

  return (
    <>
      <Separator my={4} />

      <Box textAlign="center">
        <Text fontSize="3xl" fontWeight="bold">
          Generador de Palabras
        </Text>
      </Box>
      
      <Separator my={4} />
        
      <Box textAlign="center" mb={8}>
        <Text fontSize="2xl" color="teal.500" mb={4}>
          {currentWord.word.charAt(0).toUpperCase() + currentWord.word.slice(1)}
        </Text>

        <Collapsible.Root unmountOnExit>
          <Collapsible.Trigger 
            paddingY={2} 
            paddingX={4}
            bg="gray.100" 
            borderRadius="md"
            _hover={{ bg: "gray.200" }}
            cursor="pointer"
            display="inline-flex"
            alignItems="center"
            gap={2}
            onClick={() => setShowDefinitions(!showDefinitions)}
          >
            <Text fontSize="xs" color="gray.500">
              {showDefinitions ? "Ocultar" : "Mostrar"} definiciones {showDefinitions ? "▲" : "▼"}
            </Text>
          </Collapsible.Trigger>
          <Collapsible.Content>
            <VStack spacing={2} mb={4} textAlign="left" mt={4}>
              {currentWord.definitions.map((definition, index) => (
                <Text key={index} fontSize="md" width="100%">
                  {definition}
                </Text>
              ))}
            </VStack>
          </Collapsible.Content>
        </Collapsible.Root>
      </Box>

      <Box 
        position="fixed" 
        bottom="20px" 
        left="50%" 
        transform="translateX(-50%)"
        zIndex={10}
      >
        <Button onClick={getRandomWord} colorScheme="teal" size="lg">
          Siguiente
        </Button>
      </Box>
    </>
  );
}
