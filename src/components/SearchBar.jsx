import React from "react";

import {
  Box,
  Input,
  Group,
  CloseButton,
  IconButton,
} from "@chakra-ui/react";
import { FiFilter } from "react-icons/fi";

import { Filters } from "./Filters.jsx";

/**
 * SearchBar Component - Real-time search input with integrated advanced filters
 * Combines search functionality with modal-based filtering system
 */
export function SearchBar({ 
  onSearchChange, 
  onFiltersChange,
  searchValue = "", 
  placeholder = "Buscar apps...",
  currentPlatforms = ["mobile", "tablet", "desktop"],
  currentStatus = ["active", "archived"],
  currentCategories = ["tools", "games", "education", "media", "music", "development"],
  currentSort = "dateAdded",
}) {
  // Applied filters state - persists until user changes them
  const [appliedSortBy, setAppliedSortBy] = React.useState(currentSort);
  const [appliedStatus, setAppliedStatus] = React.useState(currentStatus);
  const [appliedPlatforms, setAppliedPlatforms] = React.useState(currentPlatforms);
  const [appliedCategories, setAppliedCategories] = React.useState(currentCategories);

  // Sync with parent state when it changes (for device detection)
  React.useEffect(() => {
    setAppliedSortBy(currentSort);
    setAppliedStatus(currentStatus);
    setAppliedPlatforms(currentPlatforms);
    setAppliedCategories(currentCategories);
  }, [currentPlatforms, currentStatus, currentCategories, currentSort]);
  
  // Temporary filters state - reverted on cancel, applied on confirm
  const [tempSortBy, setTempSortBy] = React.useState(currentSort);
  const [tempStatus, setTempStatus] = React.useState(currentStatus);
  const [tempPlatforms, setTempPlatforms] = React.useState(currentPlatforms);
  const [tempCategories, setTempCategories] = React.useState(currentCategories);
  
  const [isFiltersOpen, setIsFiltersOpen] = React.useState(false);

  /**
   * Handle clearing the search input
   * Calls the onSearchChange callback with an empty string to clear the search
   */
  const handleClear = () => {
    onSearchChange?.("");
  };

  // Multiselect handlers with minimum-one constraint to prevent empty selections
  /**
   * Handle toggling a status in the temporary filters
   * Ensures at least one status is always selected, using "active" as the default
   *
   * @param {string} statusValue - The status value to toggle
   */
  const handleStatusToggle = (statusValue) => {
    setTempStatus(current => {
      const newStatus = current.includes(statusValue)
        ? current.filter(s => s !== statusValue)
        : [...current, statusValue];
      return newStatus.length === 0 ? ["active"] : newStatus;
    });
  };

  /**
   * Handle toggling a platform in the temporary filters
   * Ensures at least one platform is always selected, using "mobile" as the default
   *
   * @param {string} platformValue - The platform value to toggle
   */
  const handlePlatformToggle = (platformValue) => {
    setTempPlatforms(current => {
      const newPlatforms = current.includes(platformValue)
        ? current.filter(p => p !== platformValue)
        : [...current, platformValue];
      // Fallback to mobile if no platforms remain
      return newPlatforms.length === 0 ? ["mobile"] : newPlatforms;
    });
  };

  /**
   * Handle toggling a category in the temporary filters
   * Ensures at least one category is always selected, using "tools" as the default
   *
   * @param {string} categoryValue - The category value to toggle
   */
  const handleCategoryToggle = (categoryValue) => {
    setTempCategories(current => {
      const newCategories = current.includes(categoryValue)
        ? current.filter(c => c !== categoryValue)
        : [...current, categoryValue];
      return newCategories.length === 0 ? ["tools"] : newCategories;
    });
  };

  /**
   * Handle opening/closing the filters dialog
   * When opened, sync the temporary state with the currently applied state
   *
   * @param {Object} details - Opening/closing event details
   * @param {boolean} details.open - Whether the dialog is open or closed
   */
  const handleFiltersOpenChange = (details) => {
    if (details.open) {
      setTempSortBy(appliedSortBy);
      setTempStatus([...appliedStatus]);
      setTempPlatforms([...appliedPlatforms]);
      setTempCategories([...appliedCategories]);
    }
    setIsFiltersOpen(details.open);
  };

  /**
   * Handle canceling the filters dialog
   * Reverts temporary changes to previously applied values and closes the dialog
   */
  const handleFiltersCancel = () => {
    setTempSortBy(appliedSortBy);
    setTempStatus([...appliedStatus]);
    setTempPlatforms([...appliedPlatforms]);
    setTempCategories([...appliedCategories]);
    setIsFiltersOpen(false);
  };

  /**
   * Applies temporary filters as current filters
   * Updates local state and notifies parent component via onFiltersChange function
   */
  const handleApplyFilters = () => {
    const filters = {
      sortBy: tempSortBy,
      sortOrder: tempSortBy === "name" ? "asc" : "desc",
      status: [...tempStatus],
      platforms: [...tempPlatforms],
      categories: [...tempCategories],
    };
    setAppliedSortBy(tempSortBy);
    setAppliedStatus([...tempStatus]);
    setAppliedPlatforms([...tempPlatforms]);
    setAppliedCategories([...tempCategories]);
    onFiltersChange?.(filters);
    setIsFiltersOpen(false);
  };

  return (
    <Box mb={4}>
      <Group w="full" position="relative">
        <Input
          placeholder={placeholder}
          value={searchValue}
          onChange={(e) => onSearchChange?.(e.target.value)}
          borderRadius="md"
          bg="white"
          pr="20"
          _focus={{
            borderColor: "teal.500",
            boxShadow: "0 0 0 1px teal.500",
          }}
        />
        
        {/* Filter button trigger */}
        <IconButton
          aria-label="Filtros"
          variant="outline"
          colorPalette="gray"
          size="sm"
          position="absolute"
          right={searchValue ? "12" : "2"}
          top="50%"
          transform="translateY(-50%)"
          zIndex={1}
          border="0px"
          borderColor="gray.300"
          bg="white"
          color="gray.600"
          onClick={() => setIsFiltersOpen(true)}
          _hover={{
            bg: "gray.100",
            borderColor: "gray.400",
          }}
        >
          <FiFilter />
        </IconButton>

        <Filters
          isOpen={isFiltersOpen}
          onOpenChange={handleFiltersOpenChange}
          tempSortBy={tempSortBy}
          setTempSortBy={setTempSortBy}
          tempStatus={tempStatus}
          handleStatusToggle={handleStatusToggle}
          tempPlatforms={tempPlatforms}
          handlePlatformToggle={handlePlatformToggle}
          tempCategories={tempCategories}
          handleCategoryToggle={handleCategoryToggle}
          onApply={handleApplyFilters}
          onCancel={handleFiltersCancel}
        />

        {/* Clear search button */}
        {searchValue && (
          <CloseButton
            aria-label="Limpiar búsqueda"
            onClick={handleClear}
            size="sm"
            variant="ghost"
            colorPalette="gray"
            position="absolute"
            right="2"
            top="50%"
            transform="translateY(-50%)"
            zIndex={1}
          />
        )}
      </Group>
    </Box>
  );
}
