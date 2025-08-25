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
  Button
} from "@chakra-ui/react";
import { FiFilter, FiClock, FiEdit, FiType } from "react-icons/fi";

// Componente reutilizable para los botones de ordenación
const SortButton = ({ value, isSelected, icon, text, colorScheme = "teal", onClick }) => (
  <Button
    onClick={() => onClick(value)}
    variant={isSelected ? "solid" : "outline"}
    colorPalette={isSelected ? colorScheme : "gray"}
    cursor="pointer" 
    flex="1"
    p={3} 
    minH="20"
    borderRadius="md"
    transition="all 0.2s"
    display="flex"
    alignItems="center"
    justifyContent="center"
  >
    <VStack spacing={1}>
      <Icon as={icon} color={isSelected ? "white" : `${colorScheme}.500`} size="lg" />
      <Text 
        fontSize="xs" 
        fontWeight={isSelected ? "semibold" : "normal"}
        color={isSelected ? "white" : `${colorScheme}.600`}
        textAlign="center"
        lineHeight="tight"
      >
        {text}
      </Text>
    </VStack>
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
  const [isFiltersOpen, setIsFiltersOpen] = React.useState(false);

  const handleClear = () => {
    onSearchChange?.("");
  };

  // Al abrir el modal, sincronizar el estado temporal con el aplicado
  const handleFiltersOpenChange = (details) => {
    if (details.open) {
      setTempSortBy(appliedSortBy);
    }
    setIsFiltersOpen(details.open);
  };

  // Al cancelar, revertir el estado temporal
  const handleFiltersCancel = () => {
    setTempSortBy(appliedSortBy);
    setIsFiltersOpen(false);
  };

  // Aplicar filtros solo al confirmar
  const handleApplyFilters = () => {
    const filters = {
      sortBy: tempSortBy,
      sortOrder: tempSortBy === "name" ? "asc" : "desc"
    };
    setAppliedSortBy(tempSortBy);
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
              border="1px solid"
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
                    
                    <Text fontSize="sm" color="gray.500">
                      Estado: Activas, Archivadas (multiselect) - Botón todas
                    </Text>
                    <Separator />
                    <Text fontSize="sm" color="gray.500">
                      Categorias: grid con iconitos - Botón todas
                    </Text>
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
