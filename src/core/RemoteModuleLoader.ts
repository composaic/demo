import { importRemote } from 'module-federation-import-remote';
import { RemoteModule } from '@composaic/core';

// https://www.npmjs.com/package/module-federation-import-remote

/**
 * Loads a remote module.
 * @param remoteModule - The remote module to load.
 */
export const loadRemoteModule = async (
    remoteModule: RemoteModule
): Promise<object | undefined> => {
    const { url, name, bundleFile, moduleName } = remoteModule;

    try {
        return await importRemote({
            url,
            scope: name,
            module: moduleName,
            remoteEntryFileName: bundleFile,
        });
    } catch (error) {
        console.error(`Failed to load remote module ${name}: ${error.message}`);
        return undefined; // Handle the error appropriately
    }
};
