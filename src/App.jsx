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
import { apps } from "@/constants/apps.js";

function AppLoader() {
  const { appId } = useParams();
  const navigate = useNavigate();

  // Dynamic loading of components based on appId
  // Note: import paths must be static or use import.meta.glob (Vite)
  // Here I use import.meta.glob for Vite

  const modules = import.meta.glob("./apps/*/index.jsx");

  const [Component, setComponent] = React.useState(null);

  // Every time appId changes resets the component and loads the new one
  // If the appId is not found in apps list, shows an error message and navigates back to the home page
  // TODO:
  // If the appId is valid, but no module is found, show a message (under construction)
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

  // Get the name of the app from the apps array
  const app = apps.find((app) => app.id === appId);

  if (!app) {
    return (
      <Box textAlign="center" mt={20}>
        <Text fontSize="xl" color="red.500">
          App no encontrada: {appId}
        </Text>
        <Button mt={4} as={Link} to="/">
          Volver al Puerto
        </Button>
      </Box>
    );
  }

  // If the component is not loaded yet, show a loading spinner
  if (!Component) {
    return (
      <Box textAlign="center" mt={20}>
        <Spinner size="xl" />
        <Text mt={4}>Cargando {app.name}...</Text>
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