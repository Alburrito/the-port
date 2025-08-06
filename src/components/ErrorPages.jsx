import React from "react";
import { Box, Button, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

// Component for when an app is not found
export function AppNotFound({ appId }) {
  return (
    <Box textAlign="center" mt={20}>
      <VStack spacing={4}>
        <Text fontSize="6xl">🏴‍☠️</Text>
        <Text fontSize="2xl" fontWeight="bold" color="red.500">
          Aplicación no encontrada
        </Text>
        <Text fontSize="lg" color="gray.600">
          La aplicación "{appId}" no existe
        </Text>
        <Text fontSize="md" color="gray.500">
          Qué andarías buscando...
        </Text>
        <Button 
          as={Link} 
          to="/" 
          colorPalette="blue" 
          size="lg"
          mt={4}
        >
          Volver al Puerto
        </Button>
      </VStack>
    </Box>
  );
}

// Component for general loading errors
export function AppLoadError({ appId, error }) {
  // Log error to console for debugging, but don't show to user
  React.useEffect(() => {
    if (error) {
      console.error(`Error loading app "${appId}":`, error);
    }
  }, [appId, error]);

  return (
    <Box textAlign="center" mt={20}>
      <VStack spacing={4}>
        <Text fontSize="6xl">⚠️</Text>
        <Text fontSize="2xl" fontWeight="bold" color="orange.500">
          Error
        </Text>
        <Text fontSize="lg" color="gray.600">
          No se pudo cargar la aplicación "{appId}"
        </Text>
        <Text fontSize="md" color="gray.500">
          Algo salió mal pero no es culpa tuya. Inténtalo de nuevo más tarde.
        </Text>
        <Button 
          as={Link} 
          to="/" 
          colorPalette="blue" 
          size="lg"
          mt={4}
        >
          Volver al Puerto
        </Button>
      </VStack>
    </Box>
  );
}

// Component for 404 - Page not found
export function PageNotFound() {
  return (
    <Box textAlign="center" mt={20}>
      <VStack spacing={4}>
        <Text fontSize="6xl">🌊</Text>
        <Text fontSize="2xl" fontWeight="bold" color="blue.500">
          Página no encontrada
        </Text>
        <Text fontSize="lg" color="gray.600">
          Esta ruta no existe o no está disponible.
        </Text>
        <Text fontSize="md" color="gray.500">
          La página que buscas debe ser solo una leyenda...
        </Text>
        <Button 
          as={Link} 
          to="/" 
          colorPalette="blue" 
          size="lg"
          mt={4}
        >
          Volver al Puerto
        </Button>
      </VStack>
    </Box>
  );
}
