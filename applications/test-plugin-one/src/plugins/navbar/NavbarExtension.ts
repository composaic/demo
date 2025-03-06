import { Plugin, PluginMetadata, ExtensionMetadata } from '@composaic/core';
export { RemoteExamplePage } from './RemoteExamplePage';

@PluginMetadata({
    plugin: '@composaic-tests-one/navbar',
    version: '1.0',
    description: 'Extension for the @composaic/navbar plugin',
    module: 'NavbarExtension',
    package: 'navbar',
    load: 'deferred',
})
export class NavbarExtensionPlugin extends Plugin {}

@ExtensionMetadata({
    plugin: '@composaic/navbar',
    id: 'navbarItem',
    className: 'NavbarItemExtension',
    meta: [
        {
            id: 'test.RemoteExamples',
            label: 'Remote Examples',
            mountAt: 'root.Profile',
            children: [
                {
                    label: 'Test Plugin One',
                    path: '/remoteexample1',
                    component: 'RemoteExamplePage',
                },
            ],
        },
    ],
})
export class NavbarItemExtension {}
