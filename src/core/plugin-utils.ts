import { PluginDescriptor } from '@composaic/core';
import navbarPluginDef from '../plugins/navbar/navbar-plugin.json';
import viewsPluginDef from '../plugins/views/views-plugin.json';

import * as navbar from '../plugins/navbar';
import * as views from '../plugins/views';

const pluginsMap = {
    [navbarPluginDef.package + '/' + navbarPluginDef.module]: navbar,
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
        { ...navbarPluginDef, loader: loadCorePlugin } as PluginDescriptor,
        { ...viewsPluginDef, loader: loadCorePlugin } as PluginDescriptor,
    ];
};
