import React, { useState } from "react";

import { Box, Text, Button, Input, SimpleGrid, HStack, Dialog, Portal } from "@chakra-ui/react";

import { EditIcon, RemoveIcon } from "./icons";

/**
 * Individual sector management component with modal editing
 * 
 * Handles single roulette sector display and modification operations.
 * Modal-based editing system with validation and conflict detection.
 * State protection prevents modifications during spinning/winner states.
 * 
 * Features:
 * - Modal edit interface for color and label changes
 * - Duplicate validation across sector array
 * - Atomic save operations with error handling
 * - State-based disable logic for operation protection
 */
export function ColorSectorItem({ item, idx, onRemove, colors, setColors, isSpinning, winner }) {
  // Local state for modal editing with validation
  const [isOpen, setIsOpen] = useState(false);
  const [editColor, setEditColor] = useState(item.color);
  const [editLabel, setEditLabel] = useState(item.label);
  const [errorMsg, setErrorMsg] = useState("");

  /**
   * Handles modal closure with state cleanup
   * Resets form to original values and clears any error messages
   */
  function handleClose() {
    setErrorMsg("");
    setEditColor(item.color);
    setEditLabel(item.label);
    setIsOpen(false);
  }

  /**
   * Validates and saves sector changes
   * 
   * Validation Rules:
   * 1. No operations during spinning or winner states
   * 2. No duplicate labels across sectors (excluding current)
   * 3. No duplicate colors across sectors (excluding current)
   * 
   * Success: Updates parent state and closes modal
   * Failure: Shows error message and keeps modal open
   */
  function handleSave() {
    if (isSpinning || winner) return; // State protection barrier
    
    // Check for duplicate label (excluding current sector)
    if (editLabel && colors.some((c, i) => i !== idx && c.label === editLabel)) {
      setErrorMsg("Etiqueta duplicada");
      return;
    }
    
    // Check for duplicate color (excluding current sector)
    if (colors.some((c, i) => i !== idx && c.color === editColor)) {
      setErrorMsg("Color duplicado");
      return;
    }
    
    // Validation passed: apply changes atomically
    setErrorMsg("");
    setColors(colors.map((c, i) => i === idx ? { ...c, color: editColor, label: editLabel } : c));
    setIsOpen(false);
  }

  return (
    /* Sector display row with visual feedback during disabled states */
    <HStack key={idx} spacing={2} justify="space-between" w="100%" opacity={isSpinning || winner ? 0.5 : 1}>
      {/* Color preview circle */}
      <Box
        w="32px"
        h="32px"
        borderRadius="full"
        bg={item.color}
        border="2px solid whiteAlpha.400"
      />
      
      {/* Sector label with overflow handling */}
      <Text
        fontSize="sm"
        flex="1"
        whiteSpace="nowrap"
        overflow="hidden"
        textOverflow="ellipsis"
      >
        {item.label || item.color} {/* Fallback to color if no label */}
      </Text>
      
      {/* Action buttons container */}
      <Box display="flex">
        {/* Edit Modal Dialog */}
        <Dialog.Root open={isOpen && !isSpinning && !winner} onOpenChange={open => {
          if (!isSpinning && !winner) {
            setIsOpen(open);
            if (!open) setErrorMsg("");
          }
        }}>
          <Dialog.Trigger asChild>
            <Button 
              size="xs" 
              variant="ghost" 
              onClick={() => {
                if (!isSpinning && !winner) {
                  setIsOpen(true);
                }
              }} 
              p={0} 
              minW={4} 
              h={6} 
              aria-label="Editar"
              isDisabled={isSpinning || winner}
            >
              <EditIcon />
            </Button>
          </Dialog.Trigger>
          <Portal>
            <Dialog.Backdrop />
            <Dialog.Positioner>
              <Dialog.Content maxW="400px" w="90%" borderRadius="md" p={6}>
                <Dialog.Header>
                  <Dialog.Title fontSize="lg" fontWeight="bold">Editar sector</Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                  {/* Edit form with color and label inputs */}
                  <SimpleGrid columns={2} gap={3} mb={4}>
                    <Input
                      type="color"
                      value={editColor}
                      onChange={e => setEditColor(e.target.value)}
                      w="100%"
                      h="40px"
                      p={0}
                      border="none"
                      bg="none"
                      cursor="pointer"
                      borderRadius="md"
                      isDisabled={isSpinning || winner}
                    />
                    <Input
                      value={editLabel}
                      onChange={e => setEditLabel(e.target.value)}
                      size="sm"
                      fontSize="sm"
                      borderRadius="md"
                      border="1px solid"
                      borderColor="gray.400"
                      w="100%"
                      color="gray.900"
                      bg="whiteAlpha.200"
                      placeholder="Etiqueta"
                      isDisabled={isSpinning || winner}
                    />
                  </SimpleGrid>
                  
                  {/* Validation error display */}
                  {errorMsg && (
                    <Text color="red.400" fontSize="sm" mb={2}>{errorMsg}</Text>
                  )}
                </Dialog.Body>
                <Dialog.Footer>
                  <Button variant="outline" colorScheme="gray" onClick={handleClose}>
                    Cancelar
                  </Button>
                  <Button 
                    colorScheme="purple" 
                    fontWeight="bold" 
                    onClick={handleSave}
                    isDisabled={isSpinning || winner}
                  >
                    Guardar
                  </Button>
                </Dialog.Footer>
              </Dialog.Content>
            </Dialog.Positioner>
          </Portal>
        </Dialog.Root>
        
        {/* Remove button with immediate action */}
        <Button 
          size="xs" 
          colorScheme="red" 
          variant="ghost" 
          onClick={() => onRemove(idx)} 
          p={0} 
          minW={4} 
          h={6} 
          aria-label="Eliminar"
          isDisabled={isSpinning || winner}
        >
          <RemoveIcon />
        </Button>
      </Box>
    </HStack>
  );
}
