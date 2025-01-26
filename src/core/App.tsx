import React, { useEffect, useRef, useState } from 'react';
import { Routes } from 'react-router-dom';
import { init, PluginManager } from '@composaic/core';
import { Navbar, getRoutes } from '@composaic/web';
import { config } from '../config';
import ErrorBoundary from './ErrorBoundary';
import { loadRemoteModule } from './RemoteModuleLoader';
import { getPluginModule as getWebPluginModule } from '@composaic/web';

// Initalise Plugin Framework
// we do not await the init since we have receive notification further plugins are added, we can start the app init straight away
init({
    getPluginModules: () => [getWebPluginModule()],
    config,
    loadRemoteModule: loadRemoteModule,
});

export const App: React.FC = () => {
    const [routes, setRoutes] = useState<JSX.Element[]>([]);

    useEffect(() => {
        const updateUI = () => {
            getRoutes().then((generatedRoutes) => {
                setRoutes(generatedRoutes);
            });
        };
        updateUI();
        const pluginIds = ['@composaic/navbar'];
        const updatePlugins = async () => {
            console.log('[App] notification received for @composaic/navbar');
            pluginIds.map(async (id) => {
                updateUI();
            });
        };
        // Register the listener
        const unsubscribe =
            PluginManager.getInstance().registerPluginChangeListener(
                pluginIds,
                updatePlugins
            );
        return () => {
            unsubscribe;
        };
    }, []);
    return (
        <ErrorBoundary fallback={<div>Something went wrong</div>}>
            <Navbar />
            <Routes>{routes}</Routes>
        </ErrorBoundary>
    );
};
