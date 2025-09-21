// Cache glob patterns to avoid recreating them on every function call
const metadataModules = import.meta.glob("../apps/*/metadata.js");
const appModules = import.meta.glob("../apps/*/index.jsx");

/**
 * Loads the configuration of all available apps.
 * Optimized for the portal's initial load, only fetches metadata.
 * 
 * @async
 * @returns {Promise<Array<Object>>} List of metadata for all available apps
 */
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

/**
 * Loads a specific app with its metadata and main component.
 *
 * @async
 * @param {string} appId - Unique identifier for the app to load
 * @returns {Promise<Object>} Object with the app's component and metadata
 * @throws {Error} If the app does not exist or cannot be loaded
 */
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
    const appPath = path.replace("/metadata.js", "/index.jsx");
    const appModule = await appModules[appPath]();
    
    return {
      metadata,
      component: appModule.default,
    };
  } catch (error) {
    console.error(`Error loading app ${appId}:`, error);
    throw error;
  }
}

/**
 * Checks if an app exists by verifying the presence of its required files.
 * Searches for both the metadata file and the main component.
 *
 * @param {string} appId - Unique identifier for the app to check
 * @returns {boolean} `true` if the app exists, `false` otherwise
 */
export function appExists(appId) {
  const metadataPath = `../apps/${appId}/metadata.js`;
  const componentPath = `../apps/${appId}/index.jsx`;

  return Boolean(metadataModules[metadataPath] && appModules[componentPath]);
}
