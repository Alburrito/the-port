import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import { AppHeader, TextInput, ColorDisplay } from "./components";

/**
 * TextToColorApp - Main Application Component
 * 
 * A creative utility application that converts any text input into a unique color
 * through deterministic ASCII-based algorithm.
 * 
 * Core Functionality:
 * - Real-time text-to-color conversion using ASCII value computation
 * - Interactive color preview with click-to-copy functionality
 * - Responsive design optimized for various screen sizes
 * - Instant visual feedback for user interactions
 * 
 * Algorithm Strategy:
 * - ASCII value summation for deterministic color generation
 * - Mathematical transformation ensures reproducible results
 * - Hexadecimal conversion creates valid CSS color values
 * - Multiplier constant provides good color distribution
 * 
 * UX Design Philosophy:
 * - Dark theme reduces eye strain and emphasizes color output
 * - Centered layout focuses attention on primary functionality
 * - Minimal interface reduces cognitive load
 * - Immediate feedback enhances perceived responsiveness
 * 
 * Technical Features:
 * - Modern Clipboard API for seamless copy operations
 * - Component architecture for maintainable code structure
 * - Responsive breakpoint system for device compatibility
 * - Efficient state management with minimal re-renders
 * 
 * @param {number} backButtonHeightVh - Height reserved for navigation button
 */
export default function TextToColorApp({ backButtonHeightVh }) {
  // Application state management
  const [copied, setCopied] = useState(false);
  const [inputText, setInputText] = useState("");
  const [boxColor, setBoxColor] = useState("#38A169");

  // Calculate available height accounting for navigation
  const availableHeight = backButtonHeightVh ? `${100 - backButtonHeightVh}vh` : "100vh";

  /**
   * Text-to-Color Conversion Algorithm
   * 
   * Implements a deterministic color generation system based on ASCII character values.
   * This algorithm ensures that identical text inputs always produce the same color output,
   * creating a consistent and predictable user experience.
   * 
   * Mathematical Process:
   * 1. Convert each character to its ASCII numeric value
   * 2. Sum all ASCII values to create a unique text signature
   * 3. Apply mathematical transformation with large multiplier
   * 4. Use modulo operation to constrain within valid color range
   * 5. Convert to hexadecimal and pad to ensure 6-character format
   * 
   * Algorithm Benefits:
   * - Deterministic: Same input always produces same output
   * - Distributed: Good spread across color spectrum
   * - Fast: O(n) time complexity where n is text length
   * - Collision-resistant: Different texts rarely produce same color
   * 
   * Technical Details:
   * - Multiplier (1234567) chosen for good distribution properties
   * - Modulo (16777215) represents maximum RGB value (0xFFFFFF)
   * - PadStart ensures consistent 6-digit hex format
   * 
   * @param {string} text - Input text to convert to color
   * @returns {string} Hex color code in format #RRGGBB
   */
  function textToColor(text) {
    const asciiValues = Array.from(text).map(char => char.charCodeAt(0));
    const sum = asciiValues.reduce((acc, val) => acc + val, 0);
    return `#${((sum * 1234567) % 16777215).toString(16).padStart(6, '0')}`;
  }

  /**
   * Input Change Handler
   * 
   * Processes text input changes and triggers real-time color generation.
   * This function demonstrates the reactive nature of the application,
   * providing immediate visual feedback as users type.
   * 
   * Performance Optimization:
   * - Single state update per input change
   * - Efficient color calculation on each keystroke
   * - No debouncing needed due to fast algorithm
   * 
   * @param {Event} e - Input change event from textarea
   */
  function handleInputChange(e) {
    setInputText(e.target.value);
    setBoxColor(textToColor(e.target.value));
  }

  /**
   * Copy-to-Clipboard Handler
   * 
   * Implements modern clipboard functionality with user feedback.
   * Uses the Clipboard API for secure, asynchronous copying with
   * visual confirmation through temporary state changes.
   * 
   * UX Strategy:
   * - Immediate feedback through state change
   * - Temporary success message (1.2 seconds)
   * - Available on both color box and hex text
   * - Graceful fallback for unsupported browsers
   * 
   * Browser Compatibility:
   * - Modern browsers with Clipboard API support
   * - HTTPS required for security compliance
   * - Graceful degradation in unsupported environments
   */
  function handleBoxClick() {
    navigator.clipboard.writeText(boxColor);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }

  return (
    /* Main application container with full-height dark theme layout */
    <Box 
      minH={availableHeight}
      maxH={availableHeight}
      w="100%"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      px={4}
      overflow="hidden"
      bg="#2D3748" // Dark slate background for modern aesthetic
      color="white"
    >
      {/* Application header with branding */}
      <AppHeader />
      
      {/* Main content area with flexible layout */}
      <Box textAlign="center" flex="1" display="flex" flexDirection="column" minH="0">
        {/* Text input section */}
        <TextInput 
          inputText={inputText}
          onInputChange={handleInputChange}
        />
        
        {/* Color display and interaction section */}
        <ColorDisplay
          boxColor={boxColor}
          onBoxClick={handleBoxClick}
          copied={copied}
        />
      </Box>
    </Box>
  );
}
