import { Plugin, PluginMetadata, ExtensionMetadata } from '@composaic/core';
export { RemoteExamplePage } from './RemoteExamplePage';
export { UserCardComponent } from '../components/UserCardComponent';

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

@ExtensionMetadata({
    plugin: '@composaic/views',
    id: 'components',
    className: 'TestPluginComponentExtension',
    meta: [
        {
            componentId: '@demo/user-card',
            componentClass: 'UserCardComponent',
            properties: {
                name: 'string',
                age: '?number',
                role: 'admin|user|guest',
                tags: 'string[]',
                isActive: 'boolean',
            },
        },
    ],
})
export class TestPluginComponentExtension {}
