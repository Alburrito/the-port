// Cache glob patterns to avoid recreating them on every function call
const configModules = import.meta.glob("../apps/*/config.js");
const componentModules = import.meta.glob("../apps/*/index.jsx");

// Simple cache for loaded apps to avoid reloading them
const appCache = new Map();

// Function to load only app configurations (light for startup)
export async function loadAppConfigs() {
  const apps = [];

  for (const path in configModules) {
    try {
      const module = await configModules[path]();
      if (module.config) {
        apps.push(module.config);
      }
    } catch (error) {
      console.warn(`Error loading app config from ${path}:`, error);
    }
  }

  return apps;
}

// Function to load a specific app (configuration + component)
export async function loadApp(appId) {
  // Check cache first
  if (appCache.has(appId)) {
    return appCache.get(appId);
  }
  
  const configPath = `../apps/${appId}/config.js`;
  const componentPath = `../apps/${appId}/index.jsx`;

  // Verify that both files exist
  if (!configModules[configPath] || !componentModules[componentPath]) {
    throw new Error(`App "${appId}" not found or incomplete`);
  }

  try {
    // Loading both the config and the component
    const [configModule, componentModule] = await Promise.all([
      configModules[configPath](),
      componentModules[componentPath]()
    ]);

    const appData = {
      config: configModule.config,
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
// It searches for both config and main component files
export function appExists(appId) {
  const configPath = `../apps/${appId}/config.js`;
  const componentPath = `../apps/${appId}/index.jsx`;

  return Boolean(configModules[configPath] && componentModules[componentPath]);
}
