import React from "react";
import { Box } from "@chakra-ui/react";

export function EditIcon() {
  return (
    <Box as="span" fontWeight="bold" fontSize="lg" color="gray.600" lineHeight={1}>
      <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline', verticalAlign: 'middle' }}>
        <path d="M4 13.5V16h2.5l7.06-7.06-2.5-2.5L4 13.5zM17.71 6.04a1.003 1.003 0 0 0 0-1.42l-2.34-2.34a1.003 1.003 0 0 0-1.42 0l-1.83 1.83 3.76 3.76 1.83-1.83z" fill="currentColor"/>
      </svg>
    </Box>
  );
}

export function RemoveIcon() {
  return (
    <Box as="span" fontWeight="bold" fontSize="lg" color="red.500" lineHeight={1}>
      ×
    </Box>
  );
}
