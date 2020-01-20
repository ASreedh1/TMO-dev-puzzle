import { Server } from 'hapi';
import { HapiPluginConfig, HapiPlugin } from './hapi.type';
import { hapiConstant } from './hapi.constant';
import CatboxMemory from '@hapi/catbox-memory';
import { environment } from '../environments/environment';

const server = new Server({
  port: hapiConstant.PORT,
  host: hapiConstant.HOST,
  debug: environment.production ? { request: ['error'] } : {},
  cache: [
    {
      name: hapiConstant.CACHE.NAME,
      provider: {
        constructor: CatboxMemory,
        options: {
          partition: hapiConstant.CACHE.PARTITION,
          host: hapiConstant.CACHE.HOST,
          port: hapiConstant.CACHE.PORT,
          database: 0
        }
      }
    }
  ]
});

export const start = async function(hapiPluginConfig: HapiPluginConfig) {
  try {
    // register multiple plugins
    const plugins: Promise<void>[] = hapiPluginConfig.plugins.reduce(
      (res: Promise<void>[], plugin: HapiPlugin) => {
        let hapiPlugin = { plugin: plugin.hapiPlugin };

        if (plugin.options) {
          hapiPlugin = { ...hapiPlugin, ...{ options: plugin.options } };
        }

        if (plugin.routes) {
          hapiPlugin = { ...hapiPlugin, ...{ routes: plugin.routes } };
        }
        res.push(server.register(hapiPlugin));
        return res;
      },
      []
    );

    await Promise.all(plugins);

    await server.start();

    console.log('Server running on %s', server.info.uri);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
