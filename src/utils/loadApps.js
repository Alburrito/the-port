// Cache glob patterns to avoid recreating them on every function call
const metadataModules = import.meta.glob("../apps/*/metadata.js");
const appModules = import.meta.glob("../apps/*/index.jsx");

// Function to load only app metadata (light for startup)
export async function loadAppConfigs() {
  const apps = [];

  for (const path in metadataModules) {
    try {
      const module = await metadataModules[path]();
      if (module.metadata) {
        apps.push(module.metadata);
      }
    } catch (error) {
      console.warn(`Error loading app metadata from ${path}:`, error);
    }
  }

  return apps;
}

// Function to load a specific app with its metadata and component
export async function loadApp(appId) {
  const path = Object.keys(metadataModules).find(path => path.includes(`/${appId}/`));
  
  if (!path) {
    throw new Error(`App ${appId} not found`);
  }
  
  try {
    // Load metadata
    const metadataModule = await metadataModules[path]();
    const metadata = metadataModule.metadata;
    
    // Load app component
    const appPath = path.replace('/metadata.js', '/index.jsx');
    const appModule = await appModules[appPath]();
    
    return {
      metadata,
      component: appModule.default
    };
  } catch (error) {
    console.error(`Error loading app ${appId}:`, error);
    throw error;
  }
}

// Function that checks if an app exists
// It searches for both metadata and main component files
export function appExists(appId) {
  const metadataPath = `../apps/${appId}/metadata.js`;
  const componentPath = `../apps/${appId}/index.jsx`;

  return Boolean(metadataModules[metadataPath] && appModules[componentPath]);
}
