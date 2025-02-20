import { Plugin } from '@composaic/core';
import { PluginMetadata, ExtensionMetadata } from '@composaic/core';

interface SignalsExtensionPoint {
    // Marker interface for signal extension point
}

@PluginMetadata({
    plugin: '@composaic-tests/notification',
    version: '1.0',
    description: 'Extension for the @composaic/signals plugin',
    package: 'notification',
    module: 'NotificationPlugin',
})
export class NotificationPlugin extends Plugin {}

@ExtensionMetadata({
    plugin: '@composaic/signals',
    id: 'signals',
    className: 'NotificationExtension',
    meta: [
        {
            signal: 'notification',
            handler: 'handleNotification',
        },
    ],
})
export class NotificationExtension implements SignalsExtensionPoint {}

export const handleNotification = ({ message }: { message: string }) => {
    console.log(`Notification: ${message}`);
};
