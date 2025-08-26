import React from "react";
import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

/**
 * AppButton Component
 * 
 * Button component for app cards with featured app indicator.
 * Shows a featured emoji on the left when isFeatured is true.
 * 
 * @param {string} id - App identifier for routing
 * @param {string} name - App display name
 * @param {string} color - Chakra UI color palette
 * @param {Component} icon - React icon component
 * @param {boolean} isFeatured - Whether to show featured indicator
 * @param {string} featuredEmoji - Emoji to show for featured apps
 */
export function AppButton({ 
  id, 
  name, 
  color, 
  icon: IconComponent, 
  isFeatured = false,
  featuredEmoji = "🌟" 
}) {
  return (
    <Button
      key={id}
      as={Link}
      to={`/app/${id}`}
      size="lg"
      colorPalette={color}
      position="relative"
      paddingLeft={isFeatured ? "32px" : undefined}
    >
      {isFeatured && (
        <span 
          style={{
            position: 'absolute',
            left: '8px',
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: '16px'
          }}
        >
          {featuredEmoji}
        </span>
      )}
      <IconComponent /> {name}
    </Button>
  );
}
