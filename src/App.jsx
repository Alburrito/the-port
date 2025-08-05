import React from "react";
import { Routes, Route, useParams, Link, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  SimpleGrid,
  Text,
  VStack,
  Icon,
  Spinner,
} from "@chakra-ui/react";
import { apps } from "@/constants/apps.js";

function AppLoader() {
  const { appId } = useParams();
  const navigate = useNavigate();

  // Dynamic loading of components based on appId
  // Note: import paths must be static or use import.meta.glob (Vite)
  // Here I use import.meta.glob for Vite

  const modules = import.meta.glob("./apps/*/index.jsx");

  const [Component, setComponent] = React.useState(null);

  // Every time appId changes, reset the component and load the new one 
  // If the appId does not exist, redirect to home
  React.useEffect(() => {
    setComponent(null);
    if (!modules[`./apps/${appId}/index.jsx`]) {
      navigate("/", { replace: true });
      return;
    }

    modules[`./apps/${appId}/index.jsx`]().then((mod) => {
      setComponent(() => mod.default);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appId]);

  // If the component is not loaded yet, show a loading spinner
  if (!Component) {
    return (
      <Box textAlign="center" mt={20}>
        <Spinner size="xl" />
        <Text mt={4}>Cargando {appId}...</Text>
      </Box>
    );
  }

  // Render the component once it's loaded
  return (
    <Box>
      <Button mb={4} colorScheme="teal" as={Link} to="/">
        ← Volver al Puerto
      </Button>
      <Component />
    </Box>
  );
}

export default function App() {
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

              <SimpleGrid columns={{ base: 2, md: 4 }} spacing={6}>
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