import React from "react";

import { loadApp } from "@/utils/loadApps.js";

/**
 * Custom hook to dynamically load apps with caching and error handling.
 * Maintains loading state including component, metadata, and error states.
 *
 * @param {string} appId - Unique identifier for the app to load
 * @returns {Object} Loading state with the following properties:
 *   @returns {React.Component|null} component - The loaded app component
 *   @returns {Object|null} metadata - App metadata
 *   @returns {boolean} loading - Indicates if the app is being loaded
 *   @returns {string|null} error - Error message if loading failed
 */
export function useAppLoader(appId) {
  const [state, setState] = React.useState({
    component: null,
    metadata: null,
    loading: true,
    error: null,
  });

  React.useEffect(() => {
    if (!appId) return;

    // Reset state when appId changes
    setState({
      component: null,
      metadata: null,
      loading: true,
      error: null,
    });

    let cancelled = false;

    // Load the app asynchronously
    loadApp(appId)
      .then(({ metadata, component }) => {
        if (!cancelled) {
          setState({
            metadata,
            component,
            loading: false,
            error: null,
          });
        }
      })
      .catch((error) => {
        if (!cancelled) {
          setState({
            component: null,
            metadata: null,
            loading: false,
            error: error.message || `App "${appId}" no encontrada`,
          });
        }
      });

    // Cleanup function to prevent memory leaks
    return () => {
      cancelled = true;
    };
  }, [appId]);

  return state;
}
