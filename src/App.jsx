import React from "react";
import { Routes, Route, useParams, Link, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { loadAppConfigs, loadApp } from "@/utils/loadApps.js";
import { AppNotFound, AppLoadError, PageNotFound } from "@/components/ErrorPages.jsx";
import { BackToPortButton } from "@/components/BackToPortButton.jsx";
import { LoadingSpinner } from "@/components/LoadingSpinner.jsx";

function AppLoader() {
  const { appId } = useParams();
  const navigate = useNavigate();
  const [Component, setComponent] = React.useState(null);
  const [appConfig, setAppConfig] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    setComponent(null);
    setAppConfig(null);
    setLoading(true);
    setError(null);

    // Lazy loading the app configuration and component
    loadApp(appId)
      .then(({ config, component }) => {
        setAppConfig(config);
        setComponent(() => component);
        setLoading(false);
      })
      .catch((err) => {
        // App not found or error loading
        setError(err.message || `App "${appId}" no encontrada`);
        setLoading(false);
      });

  }, [appId, navigate]);

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

  if (!appConfig) {
    return <AppNotFound appId={appId} />;
  }

  // Render the component once it's loaded
  return (
    <Box>
      <BackToPortButton variant="plain" size="md" mb={4}>
        {"<< Volver al Puerto"}
      </BackToPortButton>
      <Component />
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