import React from "react";
import { Routes, Route, useParams, Link } from "react-router-dom";
import {
  Box,
  Button,
  SimpleGrid,
  Text,
  VStack
} from "@chakra-ui/react";
import { loadAppConfigs } from "@/utils/loadApps.js";
import { AppNotFound, AppLoadError, PageNotFound } from "@/components/ErrorPages.jsx";
import { BackToPortButton, BACK_BUTTON_HEIGHT_VH } from "@/components/BackToPortButton.jsx";
import { LoadingSpinner } from "@/components/LoadingSpinner.jsx";
import { SearchBar } from "@/components/SearchBar.jsx";
import { useAppLoader } from "@/hooks/useAppLoader.js";

/**
 * Dynamic component loader for individual apps
 * Handles route parameter extraction and component lazy loading
 * Implements loading states and error boundaries
 */
function AppLoader() {
  const { appId } = useParams(); // Extract app identifier from URL path
  const { component: Component, config, loading, error } = useAppLoader(appId);

  // Loading state with spinner component
  if (loading) {
    return <LoadingSpinner message="Cargando app..." />;
  }

  // Error state differentiation: not found vs loading errors
  if (error) {
    if (error.includes("not found")) {
      return <AppNotFound appId={appId} />;
    } else {
      return <AppLoadError appId={appId} error={error} />;
    }
  }

  // Config validation before rendering
  if (!config) {
    return <AppNotFound appId={appId} />;
  }

  // Component rendering with layout structure
  // Fixed header with back navigation + flexible content area
  return (
    <Box minH="100vh" maxH="100vh" display="flex" flexDirection="column">
      <Box 
        bg="gray.800" 
        px={4} 
        py={2}
      >
        <BackToPortButton variant="plain" size="md" color="white">
          {"<< Volver al Puerto"}
        </BackToPortButton>
      </Box>
      <Box flex="1" overflow="hidden">
        <Component backButtonHeightVh={BACK_BUTTON_HEIGHT_VH} />
      </Box>
    </Box>
  );
}

/**
 * Main application component - routing orchestrator and app registry
 * Manages app configuration loading and route-based navigation
 * Implements landing page with dynamic app grid generation
 */
export default function App() {
  const [apps, setApps] = React.useState([]); // App configuration registry
  const [filteredApps, setFilteredApps] = React.useState([]); // Filtered and sorted apps
  const [loading, setLoading] = React.useState(true); // Initial load state
  const [searchValue, setSearchValue] = React.useState(""); // Search input state
  const [currentSort, setCurrentSort] = React.useState({ // Estado del orden actual
    sortBy: "dateAdded",
    sortOrder: "desc"
  });

  // Helper function to apply search and sorting
  const applyFiltersAndSort = React.useCallback((searchTerm, sortConfig) => {
    let result = [...apps];

    // Apply search filter
    if (searchTerm.trim() !== "") {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter(app => 
        app.name.toLowerCase().includes(searchLower)
      );
    }

    // Apply sorting
    result.sort((a, b) => {
      let aValue, bValue;

      switch (sortConfig.sortBy) {
        case "dateAdded":
          aValue = new Date(a.dateAdded || 0);
          bValue = new Date(b.dateAdded || 0);
          return bValue - aValue; // Descending
        case "lastUpdated":
          aValue = new Date(a.lastUpdated || 0);
          bValue = new Date(b.lastUpdated || 0);
          return bValue - aValue; // Descending
        case "name":
        default:
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          if (sortConfig.sortOrder === "desc") {
            return bValue.localeCompare(aValue);
          } else {
            return aValue.localeCompare(bValue);
          }
      }
    });

    setFilteredApps(result);
  }, [apps]);

  // Configuration loading on mount
  // Loads app metadata only (configs), not component code
  React.useEffect(() => {
    loadAppConfigs().then((loadedApps) => {
      setApps(loadedApps);
      setLoading(false);
    });
  }, []);

  // Apply initial sort when apps are loaded
  React.useEffect(() => {
    if (apps.length > 0) {
      applyFiltersAndSort(searchValue, currentSort);
    }
  }, [apps, applyFiltersAndSort, searchValue, currentSort]);

  // Handle search changes
  const handleSearchChange = React.useCallback((searchTerm) => {
    setSearchValue(searchTerm);
    applyFiltersAndSort(searchTerm, currentSort);
  }, [applyFiltersAndSort, currentSort]);

  // Handle filter changes
  const handleFiltersChange = React.useCallback((filters) => {
    const newSortConfig = {
      sortBy: filters.sortBy,
      sortOrder: filters.sortBy === "name" ? "asc" : "desc"
    };
    setCurrentSort(newSortConfig);
    applyFiltersAndSort(searchValue, newSortConfig);
  }, [applyFiltersAndSort, searchValue]);

  // Global loading state for initial app discovery
  if (loading) {
    return <LoadingSpinner message="Cargando El Puerto..." />;
  }

  return (
    <>
      <Routes>
        {/* Landing page route - app discovery interface */}
        <Route
          path="/"
          element={
            <Box p={6} maxW="container.md" mx="auto">
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

              <SearchBar 
                onSearchChange={handleSearchChange} 
                onFiltersChange={handleFiltersChange}
                searchValue={searchValue} 
                hasActiveFilters={false} // Por ahora, solo el orden no cuenta como filtro activo
              />

              {/* Dynamic app grid generation from configuration registry */}
              <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} gap={4}>
                {filteredApps.map(({ id, name, color, icon }) => {
                  const IconComponent = icon; // Component reference from config
                  return (
                    <Button
                      key={id}
                      as={Link}
                      to={`/app/${id}`} // Route to app-specific path
                      size="lg"
                      colorPalette={color}
                    >
                      <IconComponent /> {name}
                    </Button>
                  );
                })}
              </SimpleGrid>
            </Box>
          }
        />

        {/* Dynamic app routing with parameter extraction */}
        <Route path="/app/:appId" element={<AppLoader />} />
        
        {/* Fallback route for unmatched paths */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}