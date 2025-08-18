#!/bin/bash

# Script to create a new application in The Port
# Usage: ./create-app.sh <app-id>
# Example: ./create-app.sh my-new-app

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
    echo "Usage: $0 <app-id>"
    echo ""
    echo "Creates a new application in The Port with the complete structure:"
    echo "  - Application folder"
    echo "  - index.jsx file with template"
    echo "  - config.js file with configuration"
    echo "  - components folder with index.js"
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

# Create config.js file
print_message "⚙️  Creating config.js..." "$YELLOW"
cat > "$APP_DIR/config.js" << EOF
import { MdApps } from "react-icons/md";

export const config = {
  id: "$APP_ID",
  name: "$APP_NAME",
  color: "blue", // TODO: Change to appropriate color (red, green, blue, teal, purple, etc.)
  icon: MdApps    // TODO: Change to appropriate icon from react-icons/md
};
EOF

# Create index.jsx file
print_message "📄 Creating index.jsx..." "$YELLOW"
cat > "$APP_DIR/index.jsx" << 'EOF'
import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import { AppHeader } from "@/components/AppHeader";

/**
 * APP_COMPONENT_NAME - Main Application Component
 * 
 * TODO: Describe what this application does and its main purpose.
 * 
 * Key Features:
 * - TODO: List main features
 * - TODO: Add more features
 * - TODO: Include any special functionality
 * 
 * State Management:
 * - TODO: Describe main state variables
 * - TODO: Add state descriptions
 * 
 * Component Architecture:
 * - AppHeader: Reusable header with application title
 * - TODO: Add other components as they are created
 * 
 * Technical Implementation:
 * - TODO: Describe any algorithms or special logic
 * - TODO: Include performance considerations
 * - TODO: Note any external dependencies
 * 
 * @param {number} backButtonHeightVh - Height reserved for navigation button
 */
export default function APP_COMPONENT_NAME({ backButtonHeightVh }) {
  // TODO: Add state management here
  // const [exampleState, setExampleState] = useState("");

  // Calculate available height accounting for navigation
  const availableHeight = backButtonHeightVh ? `${100 - backButtonHeightVh}vh` : "100vh";

  /**
   * TODO: Add your main business logic functions here
   * 
   * Example function structure:
   * 
   * function handleSomeAction() {
   *   // Implementation here
   * }
   */

  return (
    // Main application container
    <Box 
      minH={availableHeight}
      maxH={availableHeight}
      w="100%"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      px={4}
      overflow="hidden"
      bg="#2D3748"  // TODO: Customize background color if needed
      color="white"
    >
      <AppHeader title="APP_DISPLAY_NAME" />

      {/* Main content area - TODO: Replace with your components */}
      <Box 
        textAlign="center" 
        flex="1" 
        display="flex" 
        flexDirection="column" 
        justifyContent="center"
        minH="0"
      >
        {/* TODO: Add your application components here */}
        <Box>
          <p>¡Bienvenido a APP_DISPLAY_NAME!</p>
          <p>TODO: Implement application functionality</p>
        </Box>
      </Box>
    </Box>
  );
}
EOF

# Replace placeholders in index.jsx
sed -i "s/APP_COMPONENT_NAME/$COMPONENT_NAME/g" "$APP_DIR/index.jsx"
sed -i "s/APP_DISPLAY_NAME/$APP_NAME/g" "$APP_DIR/index.jsx"

# Create components/index.js file
print_message "🧩 Creating components/index.js..." "$YELLOW"
cat > "$APP_DIR/components/index.js" << EOF
// Components barrel export for $APP_ID app
// TODO: Add component exports as you create them
// 
// Example:
// export { ExampleComponent } from "./ExampleComponent";
// export { AnotherComponent } from "./AnotherComponent";

// Placeholder export to avoid empty file
export {};
EOF

# Verify that everything was created correctly
print_message "✅ Verifying created files..." "$YELLOW"

REQUIRED_FILES=(
    "$APP_DIR/index.jsx"
    "$APP_DIR/config.js"
    "$APP_DIR/components/index.js"
)

for file in "${REQUIRED_FILES[@]}"; do
    if [ ! -f "$file" ]; then
        print_message "❌ Error: Could not create $file" "$RED"
        exit 1
    fi
done

# Show final summary
print_message "" ""
print_message "🎉 Application '$APP_ID' created successfully!" "$GREEN"
print_message "" ""
print_message "📋 Created structure:" "$BLUE"
print_message "   $APP_DIR/" "$NC"
print_message "   ├── index.jsx (main component)" "$NC"
print_message "   ├── config.js (app configuration)" "$NC"
print_message "   └── components/" "$NC"
print_message "       └── index.js (barrel exports)" "$NC"
print_message "" ""
print_message "📝 Next steps:" "$YELLOW"
print_message "1. Edit $APP_DIR/config.js to configure the icon and color" "$NC"
print_message "2. Implement the logic in $APP_DIR/index.jsx" "$NC"
print_message "3. Create components in $APP_DIR/components/ as needed" "$NC"
print_message "4. Update $APP_DIR/components/index.js with the exports" "$NC"
print_message "" ""
print_message "🚀 The application will be automatically available on the port!" "$GREEN"
