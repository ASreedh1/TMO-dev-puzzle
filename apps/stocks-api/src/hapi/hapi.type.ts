export type HapiPluginConfig = {
  plugins: HapiPlugin[];
};

export interface HapiServerPlugin {
  name: string;
  version: string;
  register(server: any, options: any): Promise<void>;
}

export interface HapiPlugin {
  hapiPlugin: HapiServerPlugin;
  options?: {};
  routes?: { prefix: string };
}

export interface HapiHttpRequestConfig {
  url?: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  baseURL: string;
  headers?: {};
  params?: {};
  data?: any;
  timeout?: number;
}
