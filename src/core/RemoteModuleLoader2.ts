import { RemoteModule } from '@composaic/core';
import { loadRemote } from '@module-federation/runtime';

/**
 * Loads a remote module.
 * @param remoteModule - The remote module to load.
 */
export const loadRemoteModule = async (
    remoteModule: RemoteModule
): Promise<object | undefined> => {
    const { name, moduleName } = remoteModule;

    // FIXME - adjust return type to match MF typing
    return loadRemote(`${name}/${moduleName}`) as Promise<object | undefined>;
};
