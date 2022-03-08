import axios, { AxiosRequestHeaders } from 'axios';

const intelipostApi = axios.create({
  baseURL: process.env.INTELIPOST_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'api-key': process.env.INTELIPOST_API_KEY || '',
    platform: process.env.INTELIPOST_API_PLATFORM || '',
    'platform-version': process.env.INTELIPOST_API_PLATFORM_VERSION || '',
    plugin: process.env.INTELIPOST_API_PLUGIN || '',
    'plugin-version': process.env.INTELIPOST_API_PLUGIN_VERSION || '',
  } as AxiosRequestHeaders,
});

export { intelipostApi };
