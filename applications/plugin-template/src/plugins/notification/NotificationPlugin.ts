import { Plugin } from '@composaic/core';
// @ts-expect-error this not working in VSC
import { SignalsExtensionPoint } from 'composaic/lib/plugins/signals';

export class NotificationPlugin extends Plugin {}

export class NotificationExtension implements SignalsExtensionPoint {}

export const handleNotification = ({ message }: { message: string }) => {
    console.log(`Notification: ${message}`);
};
