import React, { useState } from "react";

import { Box } from "@chakra-ui/react";

import { AppHeader } from "@/components/AppHeader";

import { TextInput, ColorDisplay } from "./components";

/**
 * TextToColorApp - Main Application Component
 * 
 * Converts text input into deterministic color values using ASCII-based algorithm.
 * Manages application state and coordinates component interactions.
 * 
 * Algorithm Implementation:
 * - ASCII value summation for deterministic color generation
 * - Mathematical transformation ensures reproducible results
 * - Hexadecimal conversion creates valid CSS color values
 * - Multiplier constant (1234567) provides good color distribution
 * 
 * State Management:
 * - inputText: Current text input value
 * - boxColor: Generated hex color string
 * - copied: Temporary feedback state for clipboard operations
 * 
 * Component Architecture:
 * - AppHeader: Static title and separators
 * - TextInput: Real-time input processing
 * - ColorDisplay: Color preview and clipboard interaction
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
   * Deterministic color generation based on ASCII character values.
   * Same input text always produces identical color output.
   * 
   * Mathematical Process:
   * 1. Convert each character to ASCII numeric value
   * 2. Sum all ASCII values to create unique text signature
   * 3. Apply mathematical transformation with large multiplier
   * 4. Use modulo operation to constrain within valid color range
   * 5. Convert to hexadecimal and pad to ensure 6-character format
   * 
   * Technical Constants:
   * - Multiplier (1234567): Chosen for good distribution properties
   * - Modulo (16777215): Maximum RGB value (0xFFFFFF)
   * - PadStart: Ensures consistent 6-digit hex format
   * 
   * Performance: O(n) time complexity where n = text length
   * 
   * @param {string} text - Input text to convert to color
   * @returns {string} Hex color code in format #RRGGBB
   */
  function textToColor(text) {
    const asciiValues = Array.from(text).map(char => char.charCodeAt(0));
    const sum = asciiValues.reduce((acc, val) => acc + val, 0);
    return `#${((sum * 1234567) % 16777215).toString(16).padStart(6, "0")}`;
  }

  /**
   * Input Change Handler
   * 
   * Processes text input changes and triggers real-time color generation.
   * Updates both text state and computed color on each keystroke.
   * 
   * Implementation Notes:
   * - Single state update per input change
   * - Synchronous color calculation (no async overhead)
   * - No debouncing required due to fast algorithm performance
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
   * Implements clipboard functionality using modern Clipboard API.
   * Provides temporary visual feedback for successful copy operations.
   * 
   * Implementation Details:
   * - Uses navigator.clipboard.writeText() for secure copying
   * - Temporary state change for 1.2 second feedback display
   * - Requires HTTPS for security compliance
   * - No fallback for unsupported browsers
   */
  function handleBoxClick() {
    navigator.clipboard.writeText(boxColor);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }

  return (
    // Main application container with fixed height and dark background
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
      <AppHeader title="Texto a Color" />

      <Box textAlign="center" flex="1" display="flex" flexDirection="column" minH="0">
        <TextInput 
          inputText={inputText}
          onInputChange={handleInputChange}
        />
        
        <ColorDisplay
          boxColor={boxColor}
          onBoxClick={handleBoxClick}
          copied={copied}
        />
      </Box>
    </Box>
  );
}
