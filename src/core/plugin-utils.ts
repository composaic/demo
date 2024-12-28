import { PluginDescriptor } from '@composaic/core';
import loggerPluginDef from '../plugins/logger/logger-plugin.json';
import navbarPluginDef from '../plugins/navbar/navbar-plugin.json';
import signalsPluginDef from '../plugins/signals/signals-plugin.json';
import viewsPluginDef from '../plugins/views/views-plugin.json';

import * as logger from '../plugins/logger';
import * as navbar from '../plugins/navbar';
import * as signals from '../plugins/signals';
import * as views from '../plugins/views';

const pluginsMap = {
    [loggerPluginDef.package + '/' + loggerPluginDef.module]: logger,
    [navbarPluginDef.package + '/' + navbarPluginDef.module]: navbar,
    [signalsPluginDef.package + '/' + signalsPluginDef.module]: signals,
    [viewsPluginDef.package + '/' + viewsPluginDef.module]: views,
};

export const loadCorePlugin = async (
    pluginDescriptor: PluginDescriptor
): Promise<object | undefined> => {
    return Promise.resolve(
        pluginsMap[`${pluginDescriptor.package}/${pluginDescriptor.module}`]
    );
};

export const getCorePluginDefinitions = (): PluginDescriptor[] => {
    return [
        { ...loggerPluginDef, loader: loadCorePlugin } as PluginDescriptor,
        { ...navbarPluginDef, loader: loadCorePlugin } as PluginDescriptor,
        { ...signalsPluginDef, loader: loadCorePlugin } as PluginDescriptor,
        { ...viewsPluginDef, loader: loadCorePlugin } as PluginDescriptor,
    ];
};
