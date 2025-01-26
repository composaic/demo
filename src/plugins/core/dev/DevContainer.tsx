import React from 'react';
import { FC, useEffect, useRef, useState } from 'react';
import { BrowserRouter, Routes } from 'react-router-dom';
import { Configuration, init, PluginDescriptor } from '@composaic/core';

import { Navbar } from '../../../../../web/src/menu/Navbar';
import { getRoutes } from '../../../../../web/src/menu/menu-utils';
import ErrorBoundary from './ErrorBoundary';
import { addLocalPlugins } from '@composaic/core';

interface DevContainerProps {
    getCorePluginDefinitions: () => PluginDescriptor[];
    loadModule(pluginDescriptor: PluginDescriptor): Promise<object | undefined>;
    config: Configuration;
}

export const DevContainer: FC<DevContainerProps> = ({
    getCorePluginDefinitions,
    loadModule,
    config,
}) => {
    const [routes, setRoutes] = useState<JSX.Element[]>([]);
    const menuItemsLoaded = useRef(false);

    useEffect(() => {
        if (!menuItemsLoaded.current) {
            menuItemsLoaded.current = true;
            init({
                getCorePluginDefinitions: () => {
                    return getCorePluginDefinitions();
                },
                addLocalPlugins: async () => {
                    await addLocalPlugins(loadModule);
                },
                // FIXME: remote module loading in dev container not supported as yet
                loadRemoteModule: async () => Promise.resolve({}),
                config,
            })
                .then(() => {
                    getRoutes().then((generatedRoutes) => {
                        setRoutes(generatedRoutes);
                    });
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    }, []);

    return (
        <BrowserRouter>
            <div>
                <Navbar />
                <ErrorBoundary fallback={<div>Something went wrong</div>}>
                    <Routes>{routes}</Routes>
                </ErrorBoundary>
            </div>
        </BrowserRouter>
    );
};
