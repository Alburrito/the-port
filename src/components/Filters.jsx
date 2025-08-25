import React, { useState } from "react";
import {
    Button,
    Dialog,
    Portal,
    CloseButton,
    Separator,
    VStack,
    Text,
    HStack,
    Icon
} from "@chakra-ui/react";
import { FiClock, FiEdit, FiType } from "react-icons/fi";

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

export function Filters({ onFiltersChange, ...props }) {
    // Suponiendo que recibes una prop llamada "hasActiveFilters"
    const { hasActiveFilters = false } = props;
    
    // Estado actual de los filtros aplicados
    const [appliedSortBy, setAppliedSortBy] = useState("dateAdded");
    // Estado temporal para el modal (se revierte al cancelar)
    const [tempSortBy, setTempSortBy] = useState("dateAdded");
    const [isOpen, setIsOpen] = useState(false);

    // Al abrir el modal, sincronizar el estado temporal con el aplicado
    const handleOpenChange = (details) => {
        if (details.open) {
            setTempSortBy(appliedSortBy);
        }
        setIsOpen(details.open);
    };

    // Al cancelar, revertir el estado temporal
    const handleCancel = () => {
        setTempSortBy(appliedSortBy);
        setIsOpen(false);
    };

    // Aplicar filtros solo al confirmar
    const handleApplyFilters = () => {
        const filters = {
            sortBy: tempSortBy,
            sortOrder: tempSortBy === "name" ? "asc" : "desc"
        };
        setAppliedSortBy(tempSortBy); // Actualizar el estado aplicado
        onFiltersChange?.(filters);
        setIsOpen(false);
    };

    return (
      <Dialog.Root open={isOpen} onOpenChange={handleOpenChange}>
        <Dialog.Trigger asChild>
          <Button
            variant={hasActiveFilters ? "solid" : "outline"}
            colorPalette={hasActiveFilters ? "teal" : "gray"}
            size="sm"
          >
            Filtros
          </Button>
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
                  <Button variant="outline" onClick={handleCancel}>
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
    );
}