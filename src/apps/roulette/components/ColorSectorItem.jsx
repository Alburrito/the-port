import React, { useState } from "react";
import { Box, Text, Button, Input, SimpleGrid, HStack, Dialog, Portal } from "@chakra-ui/react";
import { EditIcon, RemoveIcon } from "./icons";

export function ColorSectorItem({ item, idx, onRemove, colors, setColors, isSpinning }) {
  const [isOpen, setIsOpen] = useState(false);
  const [editColor, setEditColor] = useState(item.color);
  const [editLabel, setEditLabel] = useState(item.label);
  const [errorMsg, setErrorMsg] = useState("");

  function handleClose() {
    setErrorMsg("");
    setEditColor(item.color);
    setEditLabel(item.label);
    setIsOpen(false);
  }

  function handleSave() {
    if (editLabel && colors.some((c, i) => i !== idx && c.label === editLabel)) {
      setErrorMsg("Etiqueta duplicada");
      return;
    }
    if (colors.some((c, i) => i !== idx && c.color === editColor)) {
      setErrorMsg("Color duplicado");
      return;
    }
    setErrorMsg("");
    setColors(colors.map((c, i) => i === idx ? { ...c, color: editColor, label: editLabel } : c));
    setIsOpen(false);
  }

  return (
    <HStack key={idx} spacing={2} justify="space-between" w="100%" opacity={isSpinning ? 0.5 : 1}>
      <Box
        w="32px"
        h="32px"
        borderRadius="full"
        bg={item.color}
        border="2px solid whiteAlpha.400"
      />
      <Text
        fontSize="sm"
        flex="1"
        whiteSpace="nowrap"
        overflow="hidden"
        textOverflow="ellipsis"
      >
        {item.label || item.color}
      </Text>
      <Box display="flex">
        <Dialog.Root open={isOpen} onOpenChange={open => {
          setIsOpen(open);
          if (!open) setErrorMsg("");
        }}>
          <Dialog.Trigger asChild>
            <Button 
              size="xs" 
              variant="ghost" 
              onClick={() => setIsOpen(true)} 
              p={0} 
              minW={4} 
              h={6} 
              aria-label="Editar"
              isDisabled={isSpinning}
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
                    />
                  </SimpleGrid>
                  {errorMsg && (
                    <Text color="red.400" fontSize="sm" mb={2}>{errorMsg}</Text>
                  )}
                </Dialog.Body>
                <Dialog.Footer>
                  <Button variant="outline" colorScheme="gray" onClick={handleClose}>
                    Cancelar
                  </Button>
                  <Button colorScheme="purple" fontWeight="bold" onClick={handleSave}>
                    Guardar
                  </Button>
                </Dialog.Footer>
              </Dialog.Content>
            </Dialog.Positioner>
          </Portal>
        </Dialog.Root>
        <Button 
          size="xs" 
          colorScheme="red" 
          variant="ghost" 
          onClick={() => onRemove(idx)} 
          p={0} 
          minW={4} 
          h={6} 
          aria-label="Eliminar"
          isDisabled={isSpinning}
        >
          <RemoveIcon />
        </Button>
      </Box>
    </HStack>
  );
}
