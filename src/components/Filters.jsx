import React from "react";

import {
  Dialog,
  Portal,
  CloseButton,
  VStack,
  Text,
  HStack,
  Icon,
  Button,
  SimpleGrid,
} from "@chakra-ui/react";
import { FiClock, FiEdit, FiType, FiCheck, FiArchive, FiTool, FiSmartphone, FiTablet, FiMonitor } from "react-icons/fi";

import { APP_CATEGORIES } from "@/constants/metadata.js";

/**
 * Button component for selecting application status
 *
 * Provides an interactive button to filter applications by their status
 * with customizable icons and text, and visual changes based on selection state.
 *
 * @param {Object} props - Component properties
 * @param {string} props.value - The value representing this status for the filter
 * @param {boolean} props.isSelected - Whether this status is currently selected
 * @param {React.ElementType} props.icon - The icon component to display
 * @param {string} props.text - Descriptive text for the status
 * @param {string} [props.colorScheme="teal"] - Color scheme of the button when selected
 * @param {Function} props.onClick - Function to execute when the button is clicked
 */
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
        fontSize={{ base: "2xs", sm: "sm" }}
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
 * Button component for selecting application categories
 *
 * Provides an interactive button to filter applications by their category,
 * with customizable icons and text, and visual changes based on selection state.
 *
 * @param {Object} props - Component properties
 * @param {string} props.value - The value representing this category for the filter
 * @param {boolean} props.isSelected - Whether this category is currently selected
 * @param {React.ElementType} props.icon - The icon component to display
 * @param {string} props.text - Descriptive text for the category
 * @param {string} [props.colorScheme="teal"] - Color scheme of the button when selected
 * @param {Function} props.onClick - Function to execute when the button is clicked
 */
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
        fontSize={{ base: "2xs", sm: "xs" }}
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
 * Maintenance Page for Applications
 *
 * Provides an interactive button to sort applications by different criteria,
 * with customizable icons and text, and visual changes based on selection state.
 *
 * @param {Object} props - Component properties
 * @param {string} props.value - The value representing this sorting criterion
 * @param {boolean} props.isSelected - Whether this criterion is currently selected
 * @param {React.ElementType} props.icon - The icon component to display
 * @param {string} props.text - Descriptive text for the sorting criterion
 * @param {string} [props.colorScheme="teal"] - Color scheme of the button when selected
 * @param {Function} props.onClick - Function to execute when the button is clicked
 */
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
        fontSize={{ base: "2xs", sm: "sm" }}
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
 * Filters Component - Modal dialog for advanced filtering and sorting
 * Manages temporary state until user confirms or cancels changes
 */
export function Filters({
  isOpen,
  onOpenChange,
  tempSortBy,
  setTempSortBy,
  tempStatus,
  handleStatusToggle,
  tempPlatforms,
  handlePlatformToggle,
  tempCategories,
  handleCategoryToggle,
  onApply,
  onCancel,
}) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Filtros</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <VStack spacing={6} align="stretch">
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
                <Button variant="outline" onClick={onCancel}>
                  Cancelar
                </Button>
                <Button onClick={onApply} colorPalette="teal">
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