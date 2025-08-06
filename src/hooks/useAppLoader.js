import React from "react";
import { loadApp } from "@/utils/loadApps.js";

// Custom hook for loading apps with caching and error handling
export function useAppLoader(appId) {
  const [state, setState] = React.useState({
    component: null,
    config: null,
    loading: true,
    error: null,
  });

  React.useEffect(() => {
    if (!appId) return;

    // Reset state when appId changes
    setState({
      component: null,
      config: null,
      loading: true,
      error: null,
    });

    let cancelled = false;

    // Load the app asynchronously
    loadApp(appId)
      .then(({ config, component }) => {
        if (!cancelled) {
          setState({
            config,
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
            config: null,
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
