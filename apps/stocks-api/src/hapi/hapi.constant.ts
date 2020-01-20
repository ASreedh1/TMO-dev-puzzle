export const hapiConstant = {
  TIMEOUT: 10 * 1000,
  HOST: 'localhost',
  PORT: 3333,
  CACHE: {
    NAME: 'hapi_cache',
    HOST: '127.0.0.1',
    PORT: 6379,
    PARTITION: 'hapi_cached_data',
    EXPIRES_IN: 20 * 1000,
    TIMEOUT: 10 * 1000
  }
};
