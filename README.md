# The Port - Technical Documentation

## Architecture Overview

### Router-Based Application Hub
Multi-app container using React Router for navigation and dynamic component loading. Implements lazy loading pattern for performance optimization and modular app management.

### Core Components

```
App.jsx                 # Main router + landing page
├── AppLoader()         # Dynamic component loader
├── Landing Page        # App discovery interface
└── Error Boundaries    # Route-level error handling
```

## Dynamic Loading System

### Configuration-Based App Registry
```javascript
// App discovery process
1. loadAppConfigs() → App metadata loading
2. Dynamic import() → Component lazy loading on demand
3. Error boundaries → Loading failure handling
```

### Loading Phases
| Phase | Trigger | Data Loaded | Performance Impact |
|-------|---------|-------------|-------------------|
| Initial | App mount | Config files only | Minimal (metadata) |
| Navigation | Route change | Component code | Single app loading |
| Error | Load failure | Error components | Graceful degradation |

### Error Recovery System
- **Graceful Degradation**: Error pages with navigation
- **Back Navigation**: Always available return path
- **Error Context**: Specific error information display
- **State Isolation**: App errors don't affect router state

## Routing Architecture

### Route Structure
```
/                   → Landing page (app grid)
/app/:appId         → Dynamic app loader
/*                  → 404 fallback
```

### Parameter Flow
```javascript
URL: /app/roulette
  ↓
useParams() → { appId: "roulette" }
  ↓
useAppLoader(appId) → Component loading
  ↓
<Component /> → App rendering
```

## Component Loading Hook

### useAppLoader Implementation
```javascript
// State management for async loading
const [loading, setLoading] = useState(true);
const [component, setComponent] = useState(null);
const [config, setConfig] = useState(null);
const [error, setError] = useState(null);

// TODO: Explain hook functionality
```

### Error Classification System
- **Not Found**: App ID doesn't exist in registry
- **Load Error**: Import failure or component error
- **Config Error**: Missing or invalid configuration

## Layout System

### Viewport Management
```javascript
// Full viewport layout with flexbox
minH="100vh" maxH="100vh" display="flex" flexDirection="column"

// Fixed header + flexible content
├── Header (fixed height)     # Navigation bar
└── Content (flex: 1)         # App rendering area
```

### Back Navigation Integration
```javascript
// Consistent header across all apps
<BackToPortButton />
// Height constant passed to apps
<Component backButtonHeightVh={BACK_BUTTON_HEIGHT_VH} />
```

## State Management

### App Registry State
```javascript
const [apps, setApps] = useState([]);      // Configuration array
const [loading, setLoading] = useState(true); // Initial load state
```

### Configuration Structure
```javascript
{
  id: string,        // Unique identifier for routing
  name: string,      // Display name for UI
  color: string,     // Chakra UI color palette
  icon: Component    // React component reference
}
```

## File Structure

```
src/
├── App.jsx                    # Main application component
├── main.jsx                   # Application entry point
├── apps/                      # Individual applications
│   └── *
├── components/                # Shared components
│   ├── BackToPortButton.jsx   # Navigation component
│   ├── ErrorPages.jsx         # Error boundary components
│   ├── LoadingSpinner.jsx     # Loading state component
│   └── provider.jsx           # Theme/context providers
├── hooks/                     # Custom React hooks
│   └── useAppLoader.js        # Dynamic loading hook
└── utils/                     # Utility functions
    ├── loadApps.js            # App configuration loader
    └── randomUtils.js         # Shared random utilities
```

## Technology Stack

### Core Dependencies
- **React 19**: Component system + hooks
- **React Router 7**: SPA routing
- **Chakra UI 3**: Component library + theming
- **Vite 7**: Build system + dev server

### Build Configuration
```javascript
// TODO: when build is ready
```

## Development Workflow

### Adding New Apps
1. Create app directory in `src/apps/`
2. Implement `index.jsx` with default export
3. Add configuration in `config.js`

### Component Requirements
```javascript
// Required app component interface
export default function AppComponent({ backButtonHeightVh }) {
  // App implementation with height consideration
  // for fixed header layout
}
```
