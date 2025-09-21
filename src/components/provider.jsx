"use client";

import { ChakraProvider, defaultSystem } from "@chakra-ui/react";

/**
 * Context Provider Component
 *
 * Chakra UI design system configuration for the application.
 * Wraps all components to provide consistent styles and theme.
 *
 * @param {Object} props - Component properties
 * @param {React.ReactNode} props.children - Child components to render within the provider
 */
export function Provider(props) {
  return (
    <ChakraProvider value={defaultSystem}>
      <>{props.children}</>
    </ChakraProvider>
  );
}