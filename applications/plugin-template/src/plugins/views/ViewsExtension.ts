import { Plugin } from '@composaic/core';
// @ts-expect-error this not working in VSC
import { ViewsExtensionPoint } from 'composaic/lib/plugins/views';
export { PluginTestComponent } from './PluginTestComponent';

export class ViewsExtensionPlugin extends Plugin {}

export class SimpleViewsExtension implements ViewsExtensionPoint {}
