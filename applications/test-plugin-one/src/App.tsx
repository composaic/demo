import { DevContainer } from '@composaic/web';
import { config } from './config';
import { PluginDescriptor } from '@composaic/core';

const loadModule = async (pluginDescriptor: PluginDescriptor) => {
    const { package: pkg, module: moduleName } = pluginDescriptor;
    const module = await import(`./plugins/${pkg}/${moduleName}.ts`);
    return module;
};

function App() {
    return (
        <DevContainer loadModule={loadModule} config={config}></DevContainer>
    );
}

export default App;
