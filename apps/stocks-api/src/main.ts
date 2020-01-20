import { HapiPluginConfig } from './hapi/hapi.type';
import { stocksPlugin } from './app/plugin/stocks.plugin';
import { start } from './hapi/hapi.server';

const hapiPluginConfig: HapiPluginConfig = {
  plugins: [
    {
      hapiPlugin: stocksPlugin,
      options: {
        enableBrowserCache: true
      },
      routes: {
        prefix: '/api/v1.0/stocks'
      }
    }
  ]
};

start(hapiPluginConfig);
