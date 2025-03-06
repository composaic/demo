import { Plugin } from '@composaic/core';
import { PluginMetadata, ExtensionMetadata } from '@composaic/core';
import { ViewsExtensionPoint } from '@composaic/web';
import { ViewDefinition } from '@composaic/web/dist/types/plugins/views';
export { PluginTestComponent } from './PluginTestComponent';

@PluginMetadata({
    package: 'views',
    module: 'ViewsExtension',
    plugin: '@composaic-tests/views',
    version: '1.0',
    description: 'Extension for the @composaic/views plugin',
    load: 'deferred',
})
export class ViewsExtensionPlugin extends Plugin {}

@ExtensionMetadata({
    plugin: '@composaic/views',
    id: 'views',
    className: 'SimpleViewsExtension',
    meta: [
        {
            container: 'sample.container',
            components: [
                {
                    slot: 'detail',
                    component: 'PluginTestComponent',
                },
            ],
        },
    ],
})
export class SimpleViewsExtension implements ViewsExtensionPoint {
    // FIXME this needs to be reviewed, as views are served from metainfo
    getViewDefinitions(): ViewDefinition[] {
        return [];
    }
}
