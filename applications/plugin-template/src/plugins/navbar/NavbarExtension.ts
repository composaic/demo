import { Plugin } from '@composaic/core';
import { PluginMetadata, ExtensionMetadata } from '@composaic/core';
export { RemoteExamplePage } from './RemoteExamplePage';
export { UserCardComponent } from '../components/UserCardComponent';

@PluginMetadata({
    package: 'navbar',
    module: 'NavbarExtension',
    plugin: '@composaic-tests/navbar',
    version: '1.0',
    description: 'Extension for the @composaic/navbar plugin',
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
                    label: 'Remote Example',
                    path: '/remoteexample',
                    component: 'RemoteExamplePage',
                },
            ],
        },
    ],
})
export class NavbarItemExtension {
    // Implementation will be added later
}

// @ExtensionMetadata({
//     plugin: '@composaic/views',
//     id: 'components',
//     className: 'SampleComponentExtension',
//     meta: [
//         {
//             componentId: '@demo/user-card',
//             componentClass: 'UserCardComponent',
//             properties: {
//                 name: 'string',
//                 age: '?number',
//                 role: 'admin|user|guest',
//                 tags: 'string[]',
//                 isActive: 'boolean',
//             },
//         },
//     ],
// })
export class SampleComponentExtension {}
