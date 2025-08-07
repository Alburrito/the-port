import React, { useState } from "react";
import { Box, Text, Input, Button, SimpleGrid, HStack, Dialog, Portal } from "@chakra-ui/react";

function EditIcon() {
  return (
    <Box as="span" fontWeight="bold" fontSize="lg" color="gray.600" lineHeight={1}>
      <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline', verticalAlign: 'middle' }}>
        <path d="M4 13.5V16h2.5l7.06-7.06-2.5-2.5L4 13.5zM17.71 6.04a1.003 1.003 0 0 0 0-1.42l-2.34-2.34a1.003 1.003 0 0 0-1.42 0l-1.83 1.83 3.76 3.76 1.83-1.83z" fill="currentColor"/>
      </svg>
    </Box>
  );
}

function RemoveIcon() {
  return (
    <Box as="span" fontWeight="bold" fontSize="lg" color="red.500" lineHeight={1}>
      ×
    </Box>
  );
}

function RouletteCircle() {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" flex="0 0 40%" minH="220px">
      <Box
        w={{ base: "180px", md: "260px", lg: "320px", xl: "380px" }}
        h={{ base: "180px", md: "260px", lg: "320px", xl: "380px" }}
        bg="#805AD5"
        borderRadius="full"
        boxShadow="xl"
        border="4px solid"
        borderColor="whiteAlpha.400"
      />
    </Box>
  );
}


function ColorSectorItem({ item, idx, onRemove, colors, setColors }) {
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
    <HStack key={idx} spacing={2} justify="space-between" w="100%">
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
            <Button size="xs" variant="ghost" onClick={() => setIsOpen(true)} p={0} minW={4} h={6} aria-label="Editar">
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
        <Button size="xs" colorScheme="red" variant="ghost" onClick={() => onRemove(idx)} p={0} minW={4} h={6} aria-label="Eliminar">
          <RemoveIcon />
        </Button>
      </Box>
    </HStack>
  );
}

function ColorsList({ colors, setColors, onRemoveColor }) {
  return (
    <Box w={{ base: "100%", md: "400px" }} mx="auto" mt={8} flex="1 1 0" display="flex" flexDirection="column">
      <Text fontWeight="bold" mb={2}>Colores añadidos</Text>
      <Box
        flex="1 1 0"
        minH="0"
        maxH="calc(50vh)"
        overflowY="auto"
        pr={2}
        borderRadius="md"
        border="1px solid"
        borderColor="gray.200"
        bg="whiteAlpha.50"
        boxShadow="sm"
        transition="border-color 0.2s"
        p={3}
      >
        <SimpleGrid columns={2} gap={2}>
          {colors.length === 0 ? (
            <Text color="gray.400">No hay sectores aún.</Text>
          ) : (
            colors.map((item, idx) => (
              <ColorSectorItem 
                key={idx}
                item={item} 
                idx={idx} 
                colors={colors}
                setColors={setColors}
                onRemove={onRemoveColor} 
              />
            ))
          )}
        </SimpleGrid>
      </Box>
    </Box>
  );
}

function AddSectorForm({ colorInput, setColorInput, labelInput, setLabelInput, onAddColor, errorMsg }) {
  return (
    <Box w={{ base: "100%", md: "400px" }} mx="auto" mt={6}>
      <Text fontWeight="bold" mb={2}>Añadir sector</Text>
      {errorMsg && (
        <Text color="red.400" fontSize="sm" mb={2}>{errorMsg}</Text>
      )}
      <SimpleGrid columns={2} gap={3} mb={2}>
        <Input
          type="color"
          value={colorInput}
          onChange={e => setColorInput(e.target.value)}
          w="100%"
          h="40px"
          p={0}
          border="none"
          bg="none"
          cursor="pointer"
          borderRadius="md"
        />
        <Input
          placeholder="Etiqueta (opcional)"
          value={labelInput}
          onChange={e => setLabelInput(e.target.value)}
          bg="whiteAlpha.200"
          color="gray.900"
          border="1px solid"
          borderColor="gray.400"
          size="sm"
          fontSize="sm"
          borderRadius="md"
        />
      </SimpleGrid>
      <Button colorScheme="purple" onClick={onAddColor} fontWeight="bold" size="sm" borderRadius="md" w="100%">
        Añadir
      </Button>
      <Button colorScheme="orange" fontWeight="bold" size="lg" borderRadius="md" mt={4} w="100%" boxShadow="md">
        GIRAR RULETA
      </Button>
    </Box>
  );
}

export default function RouletteApp({ backButtonHeightVh }) {
  const [colorInput, setColorInput] = useState("#E53E3E");
  const [labelInput, setLabelInput] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [colors, setColors] = useState([
    // 16 unique colors 
    { color: "#42BC01", label: "Sector 1" },
    { color: "#E47200", label: "Sector 2" },
    { color: "#E53E3E", label: "Sector 3" },
    { color: "#805AD5", label: "Sector 4" },
    { color: "#2B6CB0", label: "Sector 5"},
    { color: "#38A169", label: "Sector 6" },
    { color: "#DD6B20", label: "Sector 7" },
  ]);

  const availableHeight = backButtonHeightVh ? `${100 - backButtonHeightVh}vh` : "100vh";

  function handleRemoveColor(idx) {
    setColors(colors.filter((_, i) => i !== idx));
  }

  function handleAddColor() {
    setErrorMsg("");
    if (!colorInput) return;
    if (labelInput && colors.some(item => item.label === labelInput)) {
      setErrorMsg("Etiqueta duplicada");
      return;
    }
    if (colors.some(item => item.color === colorInput)) {
      setErrorMsg("Color duplicado");
      return;
    }
    setColors([...colors, { color: colorInput, label: labelInput }]);
    setLabelInput("");
  }

  return (
    <Box minH={availableHeight} maxH={availableHeight} w="100%" display="flex" flexDirection="column" px={4} py={6}>
      <RouletteCircle />

      <ColorsList 
        colors={colors} 
        setColors={setColors}
        onRemoveColor={handleRemoveColor} 
      />

      <AddSectorForm 
        colorInput={colorInput}
        setColorInput={setColorInput}
        labelInput={labelInput}
        setLabelInput={setLabelInput}
        onAddColor={handleAddColor}
        errorMsg={errorMsg}
      />
    </Box>
  );
}
