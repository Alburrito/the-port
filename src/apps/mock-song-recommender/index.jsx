import React from "react";

import { Box } from "@chakra-ui/react";

import { AppHeader } from "@/components/AppHeader";

import { SongRecommender } from "./components/SongRecommender";

/**
 * MockSongRecommender - Main Application Component
 * 
 * Application that asks questions about music preferences but always
 * recommends the album Lateralus by Tool
 * 
 * @param {number} backButtonHeightVh - Height of the back button in viewport units
 */
export default function MockSongRecommender({ backButtonHeightVh }) {
  // Calculate available height accounting for navigation
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
      bg="#2D3748"
      color="white"
    >
      {/* Main content area with SongRecommender */}
      <Box 
        textAlign="center" 
        flex="1" 
        display="flex" 
        flexDirection="column" 
        justifyContent="center"
        minH="0"
        maxW="100%"
        overflowX="hidden"
      >
        <SongRecommender />
      </Box>
    </Box>
  );
}
