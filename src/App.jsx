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
import { BackToPortButton } from "@/components/BackToPortButton.jsx";
import { LoadingSpinner } from "@/components/LoadingSpinner.jsx";
import { useAppLoader } from "@/hooks/useAppLoader.js";

function AppLoader() {
  const { appId } = useParams();
  const { component: Component, config, loading, error } = useAppLoader(appId);

  if (loading) {
    return <LoadingSpinner message="Cargando app..." />;
  }

  if (error) {
    // Check if it's a "not found" error vs other loading errors
    if (error.includes("not found")) {
      return <AppNotFound appId={appId} />;
    } else {
      return <AppLoadError appId={appId} error={error} />;
    }
  }

  if (!config) {
    return <AppNotFound appId={appId} />;
  }

  // Render the component once it's loaded
  return (
    <Box minH="100vh" maxH="100vh" display="flex" flexDirection="column">
      <BackToPortButton variant="plain" size="md">
        {"<< Volver al Puerto"}
      </BackToPortButton>
      <Box flex="1">
        <Component />
      </Box>
    </Box>
  );
}

export default function App() {
  const [apps, setApps] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // Only load app configurations at startup (small and fast)
    loadAppConfigs().then((loadedApps) => {
      setApps(loadedApps);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <LoadingSpinner message="Cargando El Puerto..." />;
  }

  return (
    <Box p={6} maxW="container.md" mx="auto">
      <Routes>
        <Route
          path="/"
          element={
            <>
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

              <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} gap={4}>
                {apps.map(({ id, name, color, icon }) => {
                  const IconComponent = icon;
                  return (
                    <Button
                      key={id}
                      as={Link}
                      to={`/app/${id}`}
                      size="lg"
                      colorPalette={color}
                    >
                      <IconComponent /> {name}
                    </Button>
                  );
                })}
              </SimpleGrid>
            </>
          }
        />

        <Route path="/app/:appId" element={<AppLoader />} />
        
        {/* Catch-all route for 404 pages */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Box>
  );
}