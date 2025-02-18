import { Plugin, PluginMetadata } from '@composaic/core';
export { RemoteExamplePage } from './RemoteExamplePage';

@PluginMetadata({
    plugin: '@composaic/demo-navbar',
    version: '0.1.0',
    description: 'Demo Navbar Plugin',
    module: 'NavbarExtension',
    package: '@composaic/demo-plugins',
})
export class NavbarExtensionPlugin extends Plugin {}

export class NavbarItemExtension {
    // TODO remove this as it's not needed
}
