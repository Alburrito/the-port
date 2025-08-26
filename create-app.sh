#!/bin/bash

# Script to create a new app in The Port
set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored messages
print_message() {
    echo -e "${2}${1}${NC}"
}

# Function to show help
show_help() {
    echo "Usage: $0 <app-name>"
    echo ""
    echo "🚀 Creates a new application in The Port with:"
    echo "  • Application folder in src/apps/"
    echo "  • index.jsx with modern React component template"
    echo "  • metadata.js with complete configuration"
    echo "  • components/ folder with sample component"
    echo "  • Automatic device detection support"
    echo "  • Ready-to-use filtering and categorization"
    echo ""
    echo "Example:"
    echo "  $0 calculator"
    echo "  $0 todo-list"
    echo ""
    echo "The app-id must use kebab-case (words separated by hyphens, all lowercase)."
}

# Check arguments
if [ $# -eq 0 ] || [ "$1" = "-h" ] || [ "$1" = "--help" ]; then
    show_help
    exit 0
fi

APP_ID="$1"
APPS_DIR="src/apps"
APP_DIR="$APPS_DIR/$APP_ID"

# Validate app-id format
if [[ ! "$APP_ID" =~ ^[a-z][a-z0-9-]*$ ]]; then
    print_message "❌ Error: The app-id must use kebab-case (lowercase letters, numbers, and hyphens only)" "$RED"
    print_message "   Valid examples: calculator, todo-list, color-picker" "$YELLOW"
    exit 1
fi

# Check that we are in the correct directory
if [ ! -d "$APPS_DIR" ]; then
    print_message "❌ Error: No application folder found at $APPS_DIR" "$RED"
    print_message "   Make sure to run this script from the project root" "$YELLOW"
    exit 1
fi

# Check if the app already exists
if [ -d "$APP_DIR" ]; then
    print_message "❌ Error: The application '$APP_ID' already exists at $APP_DIR" "$RED"
    exit 1
fi

# Convert app-id to display name format
APP_NAME=$(echo "$APP_ID" | sed 's/-/ /g' | sed 's/\b\w/\U&/g')

# Convert app-id to PascalCase format for the component
COMPONENT_NAME=$(echo "$APP_ID" | sed 's/-/ /g' | sed 's/\b\w/\U&/g' | sed 's/ //g')

print_message "🚀 Creating new application: $APP_ID" "$BLUE"
print_message "   Name: $APP_NAME" "$BLUE"
print_message "   Component: ${COMPONENT_NAME}App" "$BLUE"

# Create folder structure
print_message "📁 Creating folder structure..." "$YELLOW"
mkdir -p "$APP_DIR/components"

# Create metadata.js file
print_message "⚙️  Creating metadata.js..." "$YELLOW"
cat > "$APP_DIR/metadata.js" << EOF
import { MdApps } from "react-icons/md";

export const config = {
  id: "$APP_ID",
  name: "$APP_NAME",
  description: "A new app for The Port", // TODO: Add meaningful description
  categories: ["tools"], // Available: tools, games, education, media, music, development
  dateAdded: "$(date -I)",
  lastUpdated: "$(date -I)",
  author: "ajburri", // TODO: Change to your name
  isFeatured: false,
  platforms: ["mobile", "tablet", "desktop"], // Supported platforms  
  version: "1.0.0",
  status: "beta", // active, beta, archived, maintenance
  color: "teal", // Available: red, teal, blue, green, orange, purple, pink, yellow, gray
  icon: MdApps // TODO: Change to appropriate icon from react-icons/md
};
EOF

# Create index.jsx file
print_message "📄 Creating index.jsx..." "$YELLOW"
cat > "$APP_DIR/index.jsx" << 'EOF'
import React, { useState } from "react";
import { Box, Text, Button, VStack } from "@chakra-ui/react";
import { AppHeader } from "@/components/AppHeader";

/**
 * APP_COMPONENT_NAME - Main Application Component
 * 
 * TODO: Describe what this application does and its main purpose.
 * 
 * @param {number} backButtonHeightVh - Height of the back button in viewport units
 */
export default function APP_COMPONENT_NAME({ backButtonHeightVh }) {
  // TODO: Add your state management here
  const [counter, setCounter] = useState(0);

  // Calculate available height accounting for navigation
  const availableHeight = backButtonHeightVh ? `${100 - backButtonHeightVh}vh` : "100vh";

  return (
    <Box 
      minH={availableHeight}
      maxH={availableHeight}
      w="100%"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      px={4}
      overflow="hidden"
      bg="#2D3748"
      color="white"
    >
      <AppHeader title="APP_NAME" />

      {/* Main content area - TODO: Replace with your components */}
      <Box 
        textAlign="center" 
        flex="1" 
        display="flex" 
        flexDirection="column" 
        justifyContent="center"
        minH="0"
      >
        <VStack spacing={4}>
          <Text fontSize="xl" color="gray.300">
            Welcome to APP_ID!
          </Text>
          
          <Text fontSize="4xl" fontWeight="bold" color="teal.400">
            {counter}
          </Text>
          
          <Button 
            onClick={() => setCounter(counter + 1)}
            colorPalette="teal"
            size="lg"
          >
            Click me!
          </Button>
          
          <Text fontSize="sm" color="gray.500" mt={4}>
            Edit src/apps/APP_ID/index.jsx to customize this app
          </Text>
        </VStack>
      </Box>
    </Box>
  );
}
EOF

# Replace placeholders in index.jsx
sed -i "s/APP_COMPONENT_NAME/$COMPONENT_NAME/g" "$APP_DIR/index.jsx"
sed -i "s/APP_NAME/$APP_NAME/g" "$APP_DIR/index.jsx"
sed -i "s/APP_ID/$APP_ID/g" "$APP_DIR/index.jsx"

# Create components folder and sample component
print_message "🧩 Creating components..." "$YELLOW"
mkdir -p "$APP_DIR/components"

cat > "$APP_DIR/components/SampleComponent.jsx" << 'EOF'
import React from "react";
import { Box, Text } from "@chakra-ui/react";

export function SampleComponent() {
  return (
    <Box p={4} bg="gray.600" borderRadius="md">
      <Text>Sample component</Text>
    </Box>
  );
}
EOF

# Create components index.js for easier imports
cat > "$APP_DIR/components/index.js" << 'EOF'
export { SampleComponent } from "./SampleComponent.jsx";
EOF

# Success message
print_message "" "$NC"
print_message "✅ App '$APP_ID' created successfully!" "$GREEN"
print_message "" ""
print_message "📋 Created structure:" "$BLUE"
print_message "   $APP_DIR/" "$NC"
print_message "   ├── index.jsx (main component)" "$NC"
print_message "   ├── metadata.js (app configuration)" "$NC"
print_message "   └── components/" "$NC"
print_message "       ├── SampleComponent.jsx (sample component)" "$NC"
print_message "       └── index.js (barrel exports)" "$NC"
print_message "" ""
print_message "📝 Next steps:" "$YELLOW"
print_message "1. Edit $APP_DIR/metadata.js to configure the icon and color" "$NC"
print_message "2. Implement the logic in $APP_DIR/index.jsx" "$NC"
print_message "3. Create components in $APP_DIR/components/ as needed" "$NC"
print_message "4. Update $APP_DIR/components/index.js with the exports" "$NC"
print_message "" ""
print_message "🚀 The application will be automatically available on the port!" "$GREEN"
