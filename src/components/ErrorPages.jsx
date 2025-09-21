import React from "react";

import { Box, Text, VStack } from "@chakra-ui/react";

import { BackToPortButton } from "./BackToPortButton.jsx";

/**
 * Maintenance Page for Applications
 *
 * Displays a friendly message when an application is temporarily
 * out of service for maintenance, including the return button.
 *
 * @param {Object} props - Component properties
 * @param {string} props.appId - Unique identifier for the application
 * @param {string} props.appName - Display name for the application
 */
export function AppUnderMaintenance({ appId, appName }) {
  return (
    <Box textAlign="center" mt={20}>
      <VStack spacing={4}>
        <Text fontSize="6xl">🔧</Text>
        <Text fontSize="2xl" fontWeight="bold" color="yellow.500">
          En mantenimiento
        </Text>
        <Text fontSize="lg" color="gray.600">
          {appName || appId} está temporalmente fuera de servicio.
        </Text>
        <Text fontSize="md" color="gray.500">
          Estamos peinándola, vuelve en un ratito.
        </Text>
        <BackToPortButton mt={4} />
      </VStack>
    </Box>
  );
}

/**
 * Page Under Maintenance
 * 
 * Displays a friendly message when an application is temporarily
 * out of service for maintenance, including the return button.
 * 
 * @param {Object} props - Component properties
 * @param {string} props.appId - Unique identifier for the application
 */
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
        <BackToPortButton mt={4} />
      </VStack>
    </Box>
  );
}

/**
 * Page Load Error
 * 
 * Displays a friendly message when there is a technical issue loading an application.
 * Logs the error to the console for debugging but shows a user-friendly message.
 *
 * @param {Object} props - Component properties
 * @param {string} props.appId - Unique identifier for the application
 * @param {Error} props.error - Error object for console logging
 */
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
        <BackToPortButton mt={4} />
      </VStack>
    </Box>
  );
}

/**
 * Page Not Found
 *
 * Displays a message when the user navigates to a route that does not exist.
 * Utilizes consistent maritime metaphor with the "port" theme.
 *
 * @returns {JSX.Element} Not found page component with return button
 */
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
        <BackToPortButton mt={4} />
      </VStack>
    </Box>
  );
}
