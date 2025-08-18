import React from "react";
import { Routes, Route, useParams, Link } from "react-router-dom";
import {
  Box,
  Button,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { loadAppConfigs } from "@/utils/loadApps.js";
import { AppNotFound, AppLoadError, PageNotFound } from "@/components/ErrorPages.jsx";
import { BackToPortButton, BACK_BUTTON_HEIGHT_VH } from "@/components/BackToPortButton.jsx";
import { LoadingSpinner } from "@/components/LoadingSpinner.jsx";
import { useAppLoader } from "@/hooks/useAppLoader.js";

/**
 * Dynamic component loader for individual apps
 * Handles route parameter extraction and component lazy loading
 * Implements loading states and error boundaries
 */
function AppLoader() {
  const { appId } = useParams(); // Extract app identifier from URL path
  const { component: Component, config, loading, error } = useAppLoader(appId);

  // Loading state with spinner component
  if (loading) {
    return <LoadingSpinner message="Cargando app..." />;
  }

  // Error state differentiation: not found vs loading errors
  if (error) {
    if (error.includes("not found")) {
      return <AppNotFound appId={appId} />;
    } else {
      return <AppLoadError appId={appId} error={error} />;
    }
  }

  // Config validation before rendering
  if (!config) {
    return <AppNotFound appId={appId} />;
  }

  // Component rendering with layout structure
  // Fixed header with back navigation + flexible content area
  return (
    <Box minH="100vh" maxH="100vh" display="flex" flexDirection="column">
      <Box 
        bg="gray.800" 
        px={4} 
        py={2}
      >
        <BackToPortButton variant="plain" size="md" color="white">
          {"<< Volver al Puerto"}
        </BackToPortButton>
      </Box>
      <Box flex="1" overflow="hidden">
        <Component backButtonHeightVh={BACK_BUTTON_HEIGHT_VH} />
      </Box>
    </Box>
  );
}

/**
 * Main application component - routing orchestrator and app registry
 * Manages app configuration loading and route-based navigation
 * Implements landing page with dynamic app grid generation
 */
export default function App() {
  const [apps, setApps] = React.useState([]); // App configuration registry
  const [loading, setLoading] = React.useState(true); // Initial load state

  // Configuration loading on mount
  // Loads app metadata only (configs), not component code
  React.useEffect(() => {
    loadAppConfigs().then((loadedApps) => {
      setApps(loadedApps);
      setLoading(false);
    });
  }, []);

  // Global loading state for initial app discovery
  if (loading) {
    return <LoadingSpinner message="Cargando El Puerto..." />;
  }

  return (
    <>
      <Routes>
        {/* Landing page route - app discovery interface */}
        <Route
          path="/"
          element={
            <Box p={6} maxW="container.md" mx="auto">
              <VStack spacing={4} mb={8}>
                <Text fontSize="5xl" fontWeight="bold" textAlign="center">
                  El Puerto
                </Text>
                <Text
                  fontSize="md"
                  color="gray.500"
                  textAlign="center"
                  maxW="md"
                >
                  Al lado del mar, donde siempre estuvo.
                </Text>
              </VStack>

              {/* Dynamic app grid generation from configuration registry */}
              <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} gap={4}>
                {apps.map(({ id, name, color, icon }) => {
                  const IconComponent = icon; // Component reference from config
                  return (
                    <Button
                      key={id}
                      as={Link}
                      to={`/app/${id}`} // Route to app-specific path
                      size="lg"
                      colorPalette={color}
                    >
                      <IconComponent /> {name}
                    </Button>
                  );
                })}
              </SimpleGrid>
            </Box>
          }
        />

        {/* Dynamic app routing with parameter extraction */}
        <Route path="/app/:appId" element={<AppLoader />} />
        
        {/* Fallback route for unmatched paths */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}