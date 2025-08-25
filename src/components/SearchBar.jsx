import React from "react";
import {
  Box,
  Input,
  Group,
  CloseButton,
  IconButton,
  Dialog,
  Portal,
  Separator,
  VStack,
  Text,
  HStack,
  Icon,
  Button,
  SimpleGrid
} from "@chakra-ui/react";
import { FiFilter, FiClock, FiEdit, FiType, FiCheck, FiArchive, FiTool, FiSmartphone, FiTablet, FiMonitor } from "react-icons/fi";
import { APP_CATEGORIES } from "@/constants/metadata.js";

// Componente reutilizable para los botones de estado (multiselect)
const StatusButton = ({ value, isSelected, icon, text, colorScheme = "teal", onClick }) => (
  <Button
    onClick={() => onClick(value)}
    variant={isSelected ? "solid" : "outline"}
    colorPalette={isSelected ? colorScheme : "gray"}
    cursor="pointer" 
    flex="1"
    px={3}
    py={2}
    h="auto"
    borderRadius="md"
    transition="all 0.2s"
    display="flex"
    alignItems="center"
    justifyContent="center"
  >
    <HStack spacing={2}>
      <Icon as={icon} color={isSelected ? "white" : `${colorScheme}.500`} size="sm" />
      <Text 
        fontSize="sm" 
        fontWeight={isSelected ? "semibold" : "normal"}
        color={isSelected ? "white" : `${colorScheme}.600`}
        lineHeight="tight"
      >
        {text}
      </Text>
    </HStack>
  </Button>
);

// Componente específico para los botones de categorías (más compactos)
const CategoryButton = ({ value, isSelected, icon, text, colorScheme = "teal", onClick }) => (
  <Button
    onClick={() => onClick(value)}
    variant={isSelected ? "solid" : "outline"}
    colorPalette={isSelected ? colorScheme : "gray"}
    cursor="pointer" 
    width="full"
    px={2}
    py={2}
    h="auto"
    borderRadius="md"
    transition="all 0.2s"
    display="flex"
    alignItems="center"
    justifyContent="center"
    size="sm"
  >
    <HStack spacing={1}>
      <Icon as={icon} color={isSelected ? "white" : `${colorScheme}.500`} size="xs" />
      <Text 
        fontSize="xs" 
        fontWeight={isSelected ? "semibold" : "normal"}
        color={isSelected ? "white" : `${colorScheme}.600`}
        lineHeight="tight"
      >
        {text}
      </Text>
    </HStack>
  </Button>
);
const SortButton = ({ value, isSelected, icon, text, colorScheme = "teal", onClick }) => (
  <Button
    onClick={() => onClick(value)}
    variant={isSelected ? "solid" : "outline"}
    colorPalette={isSelected ? colorScheme : "gray"}
    cursor="pointer" 
    flex="1"
    px={3}
    py={2}
    h="auto"
    borderRadius="md"
    transition="all 0.2s"
    display="flex"
    alignItems="center"
    justifyContent="center"
  >
    <HStack spacing={2}>
      <Icon as={icon} color={isSelected ? "white" : `${colorScheme}.500`} size="sm" />
      <Text 
        fontSize="sm" 
        fontWeight={isSelected ? "semibold" : "normal"}
        color={isSelected ? "white" : `${colorScheme}.600`}
        lineHeight="tight"
      >
        {text}
      </Text>
    </HStack>
  </Button>
);

/**
 * SearchBar Component - Enhanced search functionality with integrated filters
 * 
 * Features:
 * - Real-time search input
 * - Clear button (X) to reset search
 * - Filters button with modal
 * - Visual indicator for active filters
 * - Integrated sorting options
 */
export function SearchBar({ 
  onSearchChange, 
  onFiltersChange,
  searchValue = "", 
  hasActiveFilters = false,
  placeholder = "Buscar apps..." 
}) {
  const [appliedSortBy, setAppliedSortBy] = React.useState("dateAdded");
  const [tempSortBy, setTempSortBy] = React.useState("dateAdded");
  const [appliedStatus, setAppliedStatus] = React.useState(["active", "archived"]); // Array para multiselect
  const [tempStatus, setTempStatus] = React.useState(["active", "archived"]);
  const [appliedPlatforms, setAppliedPlatforms] = React.useState(["mobile", "tablet", "desktop"]); // Filtro de plataformas
  const [tempPlatforms, setTempPlatforms] = React.useState(["mobile", "tablet", "desktop"]);
  const [appliedCategories, setAppliedCategories] = React.useState(["tools", "games", "education", "media", "music", "development"]); // Filtro de categorías
  const [tempCategories, setTempCategories] = React.useState(["tools", "games", "education", "media", "music", "development"]);
  const [isFiltersOpen, setIsFiltersOpen] = React.useState(false);

  const handleClear = () => {
    onSearchChange?.("");
  };

  // Función para manejar la selección de estado (multiselect con mínimo 1)
  const handleStatusToggle = (statusValue) => {
    setTempStatus(current => {
      const newStatus = current.includes(statusValue)
        ? current.filter(s => s !== statusValue) // Remover si ya está
        : [...current, statusValue]; // Agregar si no está

      // Asegurar que siempre hay al menos uno activo
      return newStatus.length === 0 ? ["active"] : newStatus;
    });
  };

  // Función para manejar la selección de plataforma (multiselect con mínimo 1)
  const handlePlatformToggle = (platformValue) => {
    setTempPlatforms(current => {
      const newPlatforms = current.includes(platformValue)
        ? current.filter(p => p !== platformValue) // Remover si ya está
        : [...current, platformValue]; // Agregar si no está

      // Asegurar que siempre hay al menos una activa
      return newPlatforms.length === 0 ? ["mobile"] : newPlatforms;
    });
  };

  // Función para manejar la selección de categoría (multiselect con mínimo 1)
  const handleCategoryToggle = (categoryValue) => {
    setTempCategories(current => {
      const newCategories = current.includes(categoryValue)
        ? current.filter(c => c !== categoryValue) // Remover si ya está
        : [...current, categoryValue]; // Agregar si no está

      // Asegurar que siempre hay al menos una activa
      return newCategories.length === 0 ? ["tools"] : newCategories;
    });
  };

  // Al abrir el modal, sincronizar el estado temporal con el aplicado
  const handleFiltersOpenChange = (details) => {
    if (details.open) {
      setTempSortBy(appliedSortBy);
      setTempStatus([...appliedStatus]); // Copiar array de estado
      setTempPlatforms([...appliedPlatforms]); // Copiar array de plataformas
      setTempCategories([...appliedCategories]); // Copiar array de categorías
    }
    setIsFiltersOpen(details.open);
  };

  // Al cancelar, revertir el estado temporal
  const handleFiltersCancel = () => {
    setTempSortBy(appliedSortBy);
    setTempStatus([...appliedStatus]);
    setTempPlatforms([...appliedPlatforms]);
    setTempCategories([...appliedCategories]);
    setIsFiltersOpen(false);
  };

  // Aplicar filtros solo al confirmar
  const handleApplyFilters = () => {
    const filters = {
      sortBy: tempSortBy,
      sortOrder: tempSortBy === "name" ? "asc" : "desc",
      status: [...tempStatus], // Incluir array de estados
      platforms: [...tempPlatforms], // Incluir array de plataformas
      categories: [...tempCategories] // Incluir array de categorías
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
          pr="20" // Más padding para dos botones
          _focus={{
            borderColor: "teal.500",
            boxShadow: "0 0 0 1px teal.500"
          }}
        />
        
        {/* Botón de filtros */}
        <Dialog.Root open={isFiltersOpen} onOpenChange={handleFiltersOpenChange}>
          <Dialog.Trigger asChild>
            <IconButton
              aria-label="Filtros"
              variant={hasActiveFilters ? "solid" : "outline"}
              colorPalette={hasActiveFilters ? "teal" : "gray"}
              size="sm"
              position="absolute"
              right={searchValue ? "12" : "2"}
              top="50%"
              transform="translateY(-50%)"
              zIndex={1}
              border="0px"
              borderColor={hasActiveFilters ? "teal.500" : "gray.300"}
              bg={hasActiveFilters ? "teal.500" : "white"}
              color={hasActiveFilters ? "white" : "gray.600"}
              _hover={{
                bg: hasActiveFilters ? "teal.600" : "gray.100",
                borderColor: hasActiveFilters ? "teal.600" : "gray.400"
              }}
            >
              <FiFilter />
            </IconButton>
          </Dialog.Trigger>
          <Portal>
            <Dialog.Backdrop />
            <Dialog.Positioner>
              <Dialog.Content>
                <Dialog.Header>
                  <Dialog.Title>Filtros</Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                  <VStack spacing={4} align="stretch">
                    <div>
                      <Text fontWeight="semibold" mb={3} color="gray.700">
                        Ordenar por
                      </Text>
                      <HStack spacing={2} width="full">
                        <SortButton
                          value="dateAdded"
                          isSelected={tempSortBy === "dateAdded"}
                          icon={FiClock}
                          text="Reciente"
                          colorScheme="teal"
                          onClick={setTempSortBy}
                        />
                        <SortButton
                          value="lastUpdated"
                          isSelected={tempSortBy === "lastUpdated"}
                          icon={FiEdit}
                          text="Actualizado"
                          colorScheme="blue"
                          onClick={setTempSortBy}
                        />
                        <SortButton
                          value="name"
                          isSelected={tempSortBy === "name"}
                          icon={FiType}
                          text="A-Z"
                          colorScheme="purple"
                          onClick={setTempSortBy}
                        />
                      </HStack>
                    </div>

                    <Separator />
                    
                    <div>
                      <Text fontWeight="semibold" mb={3} color="gray.700">
                        Estado
                      </Text>
                      <HStack spacing={2} width="full">
                        <StatusButton
                          value="active"
                          isSelected={tempStatus.includes("active")}
                          icon={FiCheck}
                          text="Activa"
                          colorScheme="green"
                          onClick={handleStatusToggle}
                        />
                        <StatusButton
                          value="archived"
                          isSelected={tempStatus.includes("archived")}
                          icon={FiArchive}
                          text="Archivada"
                          colorScheme="orange"
                          onClick={handleStatusToggle}
                        />
                        <StatusButton
                          value="beta"
                          isSelected={tempStatus.includes("beta")}
                          icon={FiTool}
                          text="Beta"
                          colorScheme="blue"
                          onClick={handleStatusToggle}
                        />
                      </HStack>
                    </div>

                    <Separator />
                    
                    <div>
                      <Text fontWeight="semibold" mb={3} color="gray.700">
                        Plataforma
                      </Text>
                      <HStack spacing={2} width="full">
                        <StatusButton
                          value="mobile"
                          isSelected={tempPlatforms.includes("mobile")}
                          icon={FiSmartphone}
                          text="Mobile"
                          colorScheme="indigo"
                          onClick={handlePlatformToggle}
                        />
                        <StatusButton
                          value="tablet"
                          isSelected={tempPlatforms.includes("tablet")}
                          icon={FiTablet}
                          text="Tablet"
                          colorScheme="cyan"
                          onClick={handlePlatformToggle}
                        />
                        <StatusButton
                          value="desktop"
                          isSelected={tempPlatforms.includes("desktop")}
                          icon={FiMonitor}
                          text="Desktop"
                          colorScheme="purple"
                          onClick={handlePlatformToggle}
                        />
                      </HStack>
                    </div>

                    <Separator />
                    
                    <div>
                      <Text fontWeight="semibold" mb={3} color="gray.700">
                        Categorías
                      </Text>
                      <SimpleGrid columns={3} gap={1} width="full">
                        {APP_CATEGORIES.map((category) => (
                          <CategoryButton
                            key={category.value}
                            value={category.value}
                            isSelected={tempCategories.includes(category.value)}
                            icon={category.icon}
                            text={category.label}
                            colorScheme="teal"
                            onClick={handleCategoryToggle}
                          />
                        ))}
                      </SimpleGrid>
                    </div>
                  </VStack>
                </Dialog.Body>
                <Dialog.Footer>
                  <HStack spacing={3}>
                    <Button variant="outline" onClick={handleFiltersCancel}>
                      Cancelar
                    </Button>
                    <Button onClick={handleApplyFilters} colorPalette="teal">
                      Guardar
                    </Button>
                  </HStack>
                </Dialog.Footer>
                <Dialog.CloseTrigger asChild>
                  <CloseButton
                    position="absolute"
                    top="2"
                    insetEnd="2"
                    size="sm"
                  />
                </Dialog.CloseTrigger>
              </Dialog.Content>
            </Dialog.Positioner>
          </Portal>
        </Dialog.Root>

        {/* Botón de limpiar búsqueda */}
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
