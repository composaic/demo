import { Plugin } from '@composaic/core';
import { PluginMetadata, ExtensionMetadata } from '@composaic/core';

// TODO: Replace with proper import once logger types are exported properly
interface LogMessage {
    level: string;
    message: string;
    timestamp: Date;
    subSystemName: string;
}

interface LoggerExtensionPoint {
    getSubSystemName(): string;
    setLogCallback(log: (message: LogMessage) => void): void;
}

let idCounter = 0;

@ExtensionMetadata({
    plugin: '@composaic/logger',
    id: 'logger',
    className: 'SimpleLoggerExtension',
})
export class SimpleLoggerExtension implements LoggerExtensionPoint {
    objId = 0;
    constructor() {
        idCounter += 1;
        this.objId = idCounter;
    }
    log?: (message: LogMessage) => void;
    getSubSystemName(): string {
        return 'Test Plugin';
    }
    setLogCallback(log: (message: LogMessage) => void): void {
        this.log = log;
        console.log(
            `SimpleLoggerExtension setLogCallback called (ID=${this.objId})`
        );
        this.log({
            level: 'info',
            message: `Hello from SimpleLoggerExtension`,
            timestamp: new Date(),
            subSystemName: this.getSubSystemName(),
        });
    }
}

@PluginMetadata({
    plugin: '@composaic-tests/simple-logger',
    version: '1.0',
    description: 'Simple extension for the Composaic Logger Plugin',
    package: 'simplelogger',
    module: 'SimpleLogger',
})
export class SimpleLoggerPlugin extends Plugin {
    extension?: SimpleLoggerExtension;
    async start() {
        super.start();
        // @ts-expect-error - resolution not working
        this.extension = this.getExtensionImpl('@composaic/logger', 'logger');
    }
    log(message: string) {
        if (this.extension !== undefined) {
            this.extension.log!({
                level: 'info',
                message,
                timestamp: new Date(),
                subSystemName: this.extension.getSubSystemName(),
            });
        }
    }
}
