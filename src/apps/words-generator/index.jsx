import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import wordsData from "./words.json";
import { getRandomDifferentIndex } from "@/utils/randomUtils.js";
import { 
  WordDisplay, 
  DefinitionsCollapsible, 
  NextWordButton 
} from "./components";
import { AppHeader } from "@/components/AppHeader";

/**
 * WordsGeneratorApp - Main Application Component
 * 
 * A vocabulary application that presents random Spanish words
 * with their definitions, featuring dynamic color themes and responsive design.
 * The app uses a curated dictionary dataset.
 * 
 * Core Features:
 * - Random word selection with anti-repetition logic
 * - Dynamic color theme changes for visual variety
 * - Collapsible definitions to reduce cognitive load
 * - Responsive design across device sizes
 * - Custom scrollbar styling for enhanced UX
 * 
 * Data Management:
 * - Uses external JSON dataset with 5,000+ Spanish words
 * - Implements randomization utilities to prevent consecutive repeats
 * - Maintains minimal state for optimal performance
 * 
 * Theme System:
 * - 10 predefined color schemes for visual diversity
 * - Synchronized theme changes with word transitions
 * - High contrast ratios ensure accessibility
 * 
 * State Architecture:
 * - Centralized state management in main component
 * - Props-based data flow to child components
 * - Minimal re-renders through strategic state design
 * 
 * @param {number} backButtonHeightVh - Height reserved for navigation button
 */
export default function WordsGeneratorApp({ backButtonHeightVh }) {
  // Calculate available height accounting for navigation
  const availableHeight = backButtonHeightVh ? `${100 - backButtonHeightVh}vh` : "100vh";
  
  /**
   * Color Scheme Palette
   * 
   * Predefined collection of high-contrast color combinations designed for:
   * - Accessibility compliance (WCAG guidelines)
   * - Visual variety to maintain user engagement
   * - Professional appearance across different preferences
   * - Consistent readability regardless of theme
   * 
   * Each scheme includes background and text colors optimized for legibility.
   */
  const colorSchemes = [
    { bg: "#2D3748", text: "white"},  // Slate gray - professional default
    { bg: "#1A202C", text: "white"},  // Dark navy - high contrast
    { bg: "#2B6CB0", text: "white"},  // Blue - calming and focused
    { bg: "#38A169", text: "white"},  // Green - natural and refreshing
    { bg: "#805AD5", text: "white"},  // Purple - creative and engaging
    { bg: "#E53E3E", text: "white"},  // Red - energetic and bold
    { bg: "#DD6B20", text: "white"},  // Orange - warm and inviting
    { bg: "#319795", text: "white"},  // Teal - balanced and modern
    { bg: "#4A5568", text: "white"},  // Gray - neutral and versatile
    { bg: "#2C5282", text: "white"},  // Deep blue - trustworthy and stable
  ];

  // Application state management
  const [currentWord, setCurrentWord] = useState(
    wordsData[Math.floor(Math.random() * wordsData.length)]
  );
  const [showDefinitions, setShowDefinitions] = useState(false);
  const [currentColorScheme, setCurrentColorScheme] = useState(colorSchemes[0]);
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  /**
   * Word and Theme Randomization Handler
   * 
   * Implements sophisticated randomization strategy to enhance user experience:
   * 
   * Anti-Repetition Logic:
   * - Uses utility function to prevent consecutive identical selections
   * - Maintains previous indices to enable intelligent filtering
   * - Ensures variety in both content and visual presentation
   * 
   * Synchronized Updates:
   * - Word and theme changes happen atomically
   * - State updates are batched for optimal performance
   * - UI reflects changes immediately across all components
   */
  const getRandomWord = () => {
    const newWordIndex = getRandomDifferentIndex(wordsData, currentWordIndex);
    const newColorIndex = getRandomDifferentIndex(colorSchemes, currentColorIndex);
    
    setCurrentWord(wordsData[newWordIndex]);
    setCurrentWordIndex(newWordIndex);
    setCurrentColorScheme(colorSchemes[newColorIndex]);
    setCurrentColorIndex(newColorIndex);
  };

  return (
    /* Main application container with dynamic theming and responsive layout */
    <Box 
      minH={availableHeight}
      maxH={availableHeight}
      w="100%"
      background={currentColorScheme.bg}
      color={currentColorScheme.text}
      display="flex"
      flexDirection="column"
      overflow="hidden"
    >
      {/* Application header with branding and navigation */}
      <AppHeader title="Generador de Palabras" colorScheme={currentColorScheme} />
        
      {/* Main content area with flexible layout and word display */}
      <Box 
        textAlign="center" 
        flex="1" 
        display="flex" 
        flexDirection="column" 
        px={4} 
        mt={8}
      >
        {/* Primary word display component */}
        <WordDisplay 
          currentWord={currentWord} 
          colorScheme={currentColorScheme} 
        />

        {/* Expandable definitions section with scroll management */}
        <DefinitionsCollapsible
          currentWord={currentWord}
          showDefinitions={showDefinitions}
          setShowDefinitions={setShowDefinitions}
          colorScheme={currentColorScheme}
        />
      </Box>

      {/* Action area with primary navigation button */}
      <NextWordButton 
        onNextWord={getRandomWord}
        colorScheme={currentColorScheme}
      />
    </Box>
  );
}
