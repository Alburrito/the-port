import React from "react";

import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

/**
 * AppButton - Application Card Button with Featured Indicator
 * 
 * Button for application cards with featured indicator.
 * Displays a featured emoji on the left when isFeatured is true.
 * 
 * @param {Object} props - Component properties
 * @param {string} props.id - Application identifier for routing
 * @param {string} props.color - Chakra UI color palette
 * @param {boolean} props.isFeatured - Whether to show the featured indicator
 * @param {string} props.featuredEmoji - Emoji to display in featured apps
 * @param {Component} props.icon - Icon component
 * @param {string} props.name - Name to display on the button
 */
export function AppButton({ 
  id, 
  color, 
  isFeatured = false,
  featuredEmoji = "🌟", 
  // eslint-disable-next-line no-unused-vars
  icon: IconComponent,
  name,
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
            position: "absolute",
            left: "8px",
            top: "50%",
            transform: "translateY(-50%)",
            fontSize: "16px",
          }}
        >
          {featuredEmoji}
        </span>
      )}
      <IconComponent /> {name}
    </Button>
  );
}
