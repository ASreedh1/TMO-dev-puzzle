import axios from 'axios';
import { HapiHttpRequestConfig } from './hapi.type';

export class HapiHttpService {
  public static async callApi(request: HapiHttpRequestConfig): Promise<any> {
    try {
      return await axios.request(request).then(response => {
        return response.data;
      });
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
