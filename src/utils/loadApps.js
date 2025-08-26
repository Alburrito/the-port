// Cache glob patterns to avoid recreating them on every function call
const metadataModules = import.meta.glob("../apps/*/metadata.js");
const componentModules = import.meta.glob("../apps/*/index.jsx");

// Simple cache for loaded apps to avoid reloading them
const appCache = new Map();

// Function to load only app metadata (light for startup)
export async function loadAppConfigs() {
  const apps = [];

  for (const path in metadataModules) {
    try {
      const module = await metadataModules[path]();
      if (module.config) {
        apps.push(module.config);
      }
    } catch (error) {
      console.warn(`Error loading app metadata from ${path}:`, error);
    }
  }

  return apps;
}

// Function to load a specific app (metadata + component)
export async function loadApp(appId) {
  // Check cache first
  if (appCache.has(appId)) {
    return appCache.get(appId);
  }
  
  const metadataPath = `../apps/${appId}/metadata.js`;
  const componentPath = `../apps/${appId}/index.jsx`;

  // Verify that both files exist
  if (!metadataModules[metadataPath] || !componentModules[componentPath]) {
    throw new Error(`App "${appId}" not found or incomplete`);
  }

  try {
    // Loading both the metadata and the component
    const [metadataModule, componentModule] = await Promise.all([
      metadataModules[metadataPath](),
      componentModules[componentPath]()
    ]);

    const appData = {
      config: metadataModule.config,
      component: componentModule.default
    };

    // Cache the result for future use
    appCache.set(appId, appData);
    
    return appData;
  } catch (error) {
    console.error(`Error loading app "${appId}":`, error);
    throw error;
  }
}

// Function that checks if an app exists
// It searches for both metadata and main component files
export function appExists(appId) {
  const metadataPath = `../apps/${appId}/metadata.js`;
  const componentPath = `../apps/${appId}/index.jsx`;

  return Boolean(metadataModules[metadataPath] && componentModules[componentPath]);
}
