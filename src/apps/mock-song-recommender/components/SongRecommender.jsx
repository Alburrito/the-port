import React, { useState } from "react";

import { 
  Box, 
  Text, 
  Button, 
  VStack, 
  Flex, 
  Heading, 
  Image,
} from "@chakra-ui/react";

import { questions as allQuestions } from "../questions";

/**
 * Selects n random elements from an array
 * @param {Array} array - Array from which to select elements
 * @param {Number} n - Number of elements to select
 * @returns {Array} Array with n random elements
 */
function getRandomElements(array, n) {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}

/**
 * SongRecommender component
 * Displays a series of random music preference questions and always recommends Lateralus by Tool
 * @returns {JSX.Element} The SongRecommender component
 */
export function SongRecommender() {
  // State to hold the current set of random questions
  const [questions, setQuestions] = useState(() => getRandomElements(allQuestions, 10));
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);

  const bgColor = "gray.800";
  const questionBg = "teal.600";
  
  /**
   * Handles when a user selects an answer option
   * @param {string} option - The selected answer option
   */
  const handleAnswer = (option) => {
    const newAnswers = [...answers, option];
    setAnswers(newAnswers);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };
  
  /**
   * Resets the quiz to the beginning with new random questions
   */
  const resetQuiz = () => {
    // Generate a new set of random questions
    setQuestions(getRandomElements(allQuestions, 10));
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
  };
  
  if (showResult) {
    return (
      <Box p={{ base: 4, md: 6 }} borderRadius="md" bg={bgColor} maxW="600px" w="100%" mx="auto">
        <VStack spacing={6} align="center">
          <Heading size="lg" textAlign="center" wordBreak="break-word">¡Tu recomendación está lista!</Heading>
          <Text fontSize="xl" fontWeight="bold" textAlign="center">
            Lateralus - Tool
          </Text>
          
          <Image 
            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fen%2F6%2F63%2FTool_-_Lateralus.jpg&f=1&nofb=1&ipt=333ed6911b9867192267dc74b6ab3754150feaf7c4963b297eddb27ee56c7b28" 
            alt="Lateralus by Tool" 
            boxSize={{ base: "200px", md: "300px" }}
            objectFit="cover"
            borderRadius="md"
          />
          
          <VStack spacing={3} textAlign="center" wordBreak="break-word" px={2}>
            <Text fontSize="md">
              Basado en tus respuestas, creemos que disfrutarás la complejidad rítmica, 
              las letras introspectivas y la producción impecable de este álbum revolucionario.
            </Text>
            
            <Text fontSize="md" fontStyle="italic" color="teal.300">
              ¿Sabías que? La canción principal "Lateralus" está compuesta siguiendo la secuencia de Fibonacci 
              (1, 1, 2, 3, 5, 8, 13...), con las sílabas de los versos y los cambios de tempo 
              siguiendo este patrón matemático que aparece en toda la naturaleza.
            </Text>
          </VStack>
          
          <Button 
            variant="solid"
            bg="blue.600"
            onClick={resetQuiz}
            size="lg"
            py={3}
            px={6}
            color="white"
            fontWeight="semibold"
            shadow="md"
            borderRadius="md"
            _hover={{ bg: "blue.500", transform: "translateY(-2px)" }}
            transition="all 0.2s ease"
          >
            Reiniciar cuestionario
          </Button>
        </VStack>
      </Box>
    );
  }
  
  return (
    <Box p={{ base: 4, md: 6 }} borderRadius="md" bg={bgColor} maxW="600px" w="100%" mx="auto" overflowX="hidden">
      <VStack spacing={{ base: 4, md: 8 }} align="stretch">
        {/* Progress indicator */}
        <Flex justify="center">
          <Text fontWeight="bold">Pregunta {currentQuestion + 1}/{questions.length}</Text>
        </Flex>
        
        {/* Question */}
        <Box 
          p={{ base: 4, md: 6 }} 
          borderRadius="lg" 
          bg={questionBg}
          shadow="md"
          border="2px solid"
          borderColor="teal.400"
        >
          <Text 
            fontSize={{ base: "lg", md: "xl" }} 
            fontWeight="bold" 
            textAlign="center"
            wordBreak="break-word"
            color="white"
          >
            {questions[currentQuestion].text}
          </Text>
        </Box>
        
        {/* Answer options */}
        <VStack spacing={3}>
          {questions[currentQuestion].options.map((option, index) => (
            <Button 
              key={index}
              width="full" 
              variant="solid"
              bg="blue.600"
              borderRadius="md"
              onClick={() => handleAnswer(option)}
              whiteSpace="normal"
              height="auto"
              py={3}
              px={4}
              textAlign="center"
              wordBreak="break-word"
              fontSize={{ base: "md", md: "lg" }}
              fontWeight="semibold"
              color="white"
              shadow="md"
              _hover={{ bg: "blue.500", transform: "translateY(-2px)" }}
              transition="all 0.2s ease"
            >
              {option}
            </Button>
          ))}
        </VStack>
      </VStack>
    </Box>
  );
}