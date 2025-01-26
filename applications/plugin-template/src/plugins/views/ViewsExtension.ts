import { Plugin } from '@composaic/core';
import { ViewsExtensionPoint } from '@composaic/web';
import { ViewDefinition } from '@composaic/web/dist/types/plugins/views';
export { PluginTestComponent } from './PluginTestComponent';

export class ViewsExtensionPlugin extends Plugin {}

export class SimpleViewsExtension implements ViewsExtensionPoint {
    // FIXME this needs to be reviewed, as views are served from metainfo
    getViewDefinitions(): ViewDefinition[] {
        return [];
    }
}
