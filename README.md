# The Port

Application hub with React Router and dynamic component loading.

## What is this?

A webpage that contains multiple mini-applications. Each app lives in `src/apps/[name]/` and loads dynamically when you navigate to `/app/name`.

### Main features:
- **Smart filters**: By category, platform, and status
- **Device detection**: Automatically selects the appropriate platform (mobile/tablet/desktop)
- **Real-time search**: Find apps by name
- **On-demand loading**: Only loads code when you need it

## Tech Stack

- **React 19** + **React Router 7**
- **Chakra UI 3** for components
- **Vite 7** for development and build

## File Structure

```
src/
├── App.jsx                     # Main router + filter logic
├── main.jsx                    # Entry point
├── apps/                       # 👈 All applications go here
│   └── [app-name]/
│       ├── index.jsx           # Main component
│       ├── metadata.js         # Configuration and metadata
│       └── components/         # App-specific components
├── components/                 # Shared components
├── hooks/                      # Custom hooks
├── utils/                      # Utilities
└── create-app.sh              # 👈 Script to create new apps
```

## Create a New App

### Option 1: Automatic script (recommended)

```bash
# Give permissions (first time only)
chmod +x create-app.sh

# Create app
./create-app.sh calculator
```

This generates:
- `src/apps/calculator/index.jsx`
- `src/apps/calculator/metadata.js` 
- `src/apps/calculator/components/`

### Option 2: Manual

1. Create folder in `src/apps/my-app/`
2. Create `index.jsx` with the main component
3. Create `metadata.js` with configuration
4. (Optional) Create `components/` for internal components

## App Configuration

Each app needs a `metadata.js`:

```javascript
import { MdCalculate } from "react-icons/md";

export const config = {
  id: "calculator",                     // Unique ID (kebab-case)
  name: "Calculator",                   // Display name
  description: "Basic calculator",      // Brief description
  categories: ["tools"],                // Available categories below
  dateAdded: "2025-08-25",             // Creation date
  lastUpdated: "2025-08-25",           // Last update
  author: "ajburri",                   // Your name
  isFeatured: false,                   // Featured app
  platforms: ["mobile", "tablet", "desktop"], // Supported platforms
  version: "1.0.0",                    // Semantic version
  status: "beta",                      // Available statuses below
  color: "teal",                       // Theme color
  icon: MdCalculate                    // Icon from react-icons/md
};
```

### Available categories:
- `tools` - Tools
- `games` - Games  
- `education` - Education
- `media` - Multimedia
- `music` - Music
- `development` - Development

### Available statuses:
- `active` - Production ready
- `beta` - In testing
- `archived` - Archived/deprecated
- `maintenance` - Under maintenance

## Main Component Structure

Your `index.jsx` must export a function by default:

```javascript
export default function MyApp({ backButtonHeightVh }) {
  return (
    <Box 
      minH="100vh" 
      pt={`${backButtonHeightVh}vh`}  // Space for the back button
      overflow="auto"
    >
      {/* Your interface here */}
    </Box>
  );
}
```

## Filter System

Filtering works automatically based on each app's configuration:

### Device detection
- **Mobile**: Automatically filters apps with `mobile` support
- **Tablets**: Automatically filters apps with `tablet` support  
- **Desktop**: Automatically filters apps with `desktop` support

### Available filters
- **Search**: By app name
- **Category**: tools, games, education, etc.
- **Platform**: mobile, tablet, desktop
- **Status**: active, beta, archived, maintenance

## How It Works Internally

1. **Initial load**: Reads all `metadata.js` from `src/apps/`
2. **Navigation**: Going to `/app/name` dynamically imports the component
3. **Filters**: Applied in real-time over loaded metadata
4. **Error handling**: If something fails, shows an error page

## Useful Commands

```bash
# Development
npm run dev

# Development with access from other devices
npm run dev:host

# Production build  
npm run build

# Linting
npm run lint
```

## Development Notes

- App IDs must be unique and in kebab-case format
- Apps are completely independent from each other
- Routing is handled automatically
- Errors in one app don't affect the rest
- You can use any additional library within a specific app

## If you come back in 2 years...

1. **To add an app**: Use `./create-app.sh app-name`
2. **To modify filters**: Look in `App.jsx` 
3. **To change device detection**: Check `hooks/useDeviceDetection.js`
4. **To understand an existing app**: Review its `metadata.js` first
5. **If something breaks**: Apps are isolated, the problem will be in its specific folder
