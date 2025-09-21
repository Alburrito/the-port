import { FiTool, FiBook, FiImage, FiMusic, FiCode } from "react-icons/fi";

// Allowed categories for apps
export const APP_CATEGORIES = [
  { value: "tools", label: "Herramientas", icon: FiTool },
  { value: "games", label: "Juegos", icon: FiBook },
  { value: "education", label: "Educación", icon: FiBook },
  { value: "media", label: "Media", icon: FiImage },
  { value: "music", label: "Música", icon: FiMusic },
  { value: "development", label: "Desarrollo", icon: FiCode },
];

// Supported platforms
export const APP_PLATFORMS = [
  "mobile",
  "tablet",
  "desktop",
];

// Possible status values
export const APP_STATUS = [
  "active", // Indicates the app is currently in use and supported
  "maintenance", // Indicates the app is undergoing maintenance
  "archived", // Indicates the app is no longer actively maintained
  "beta", // Indicates the app is in beta testing
  "experimental", // Indicates the app is experimental and may change
  "deprecated", // Indicates the app is no longer recommended for use
];

// Main color options (Chakra UI palette)
export const APP_COLORS = [
  "red",
  "teal",
  "blue",
  "green",
  "orange",
  "purple",
  "pink",
  "yellow",
  "gray",
];