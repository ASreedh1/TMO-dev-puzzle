import { HapiServerPlugin, HapiHttpRequestConfig } from '../../hapi/hapi.type';
import { hapiConstant } from '../../hapi/hapi.constant';
import { HapiHttpService } from '../../hapi/hapi-http.service';
import { environment } from '../../environments/environment';
import { pluginConstant } from './plugin.constant';

export const stocksPlugin: HapiServerPlugin = {
  name: pluginConstant.PLUGINS.STOCK_PLUGIN.NAME,
  version: '1.0.0',
  register: async function(server, options) {
    server.method('getStocksPrice', getStocksPrice, {
      cache: {
        cache: hapiConstant.CACHE.NAME,
        expiresIn: hapiConstant.CACHE.EXPIRES_IN, // caching for x secs
        generateTimeout: hapiConstant.CACHE.TIMEOUT, // wait for x secs to timeout
        getDecoratedValue: true
      }
    });
    server.route({
      method: 'GET',
      path: '/chart/{symbol}/{period}',
      handler: async function(request, h): Promise<any> {
        try {
          const { symbol, period } = request.params;
          const { value, cached } = await server.methods.getStocksPrice(
            symbol,
            period
          );
          const response = h.response(value);
          if (options.enableBrowserCache) {
            const lastModified = cached ? new Date(cached.stored) : new Date();
            response.header('Last-modified', lastModified.toUTCString());
          }
          return response;
        } catch (error) {
          return error;
        }
      }
    });
  }
};

async function getStocksPrice(symbol: string, period: string): Promise<any> {
  return await HapiHttpService.callApi(createRequest(symbol, period));
}

function createRequest(symbol, period): HapiHttpRequestConfig {
  const baseUrl = `${environment.apiURL}/${
    pluginConstant.API_PATH.STOCKS
  }/${symbol}/chart/${period}?token=${environment.apiKey}`;

  return {
    method: 'GET',
    baseURL: baseUrl,
    params: {},
    timeout: hapiConstant.TIMEOUT
  };
}
