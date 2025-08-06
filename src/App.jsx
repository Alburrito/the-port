import React from "react";
import { Routes, Route, useParams, Link, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  SimpleGrid,
  Text,
  VStack,
  Spinner,
} from "@chakra-ui/react";
import { loadAppConfigs, loadApp } from "@/utils/loadApps.js";

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
    return (
      <Box textAlign="center" mt={20}>
        <Spinner size="xl" />
        <Text mt={4}>Cargando app...</Text>
      </Box>
    );
  }

  if (error || !appConfig) {
    return (
      <Box textAlign="center" mt={20}>
        <Text fontSize="xl" color="red.500" mb={4}>
          App no encontrada: {appId}
        </Text>
        <Text fontSize="md" color="gray.500" mb={6}>
          La aplicación que buscas no existe o no está disponible.
        </Text>
        <Button 
          as={Link} 
          to="/" 
          colorPalette="blue" 
          size="lg"
        >
          Volver al Puerto
        </Button>
      </Box>
    );
  }

  // Render the component once it's loaded
  return (
    <Box>
      <Button variant={'plain'} as={Link} to="/">
        {"<< Volver al Puerto"}
      </Button>
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
    return (
      <Box textAlign="center" mt={20}>
        <Spinner size="xl" />
        <Text mt={4}>Cargando El Puerto...</Text>
      </Box>
    );
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
      </Routes>
    </Box>
  );
}