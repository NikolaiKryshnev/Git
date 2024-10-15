import { PUBLIC_API_KEY } from '../environment.js';
import { openApiPaths } from './routes/index.js';

const LB_DNS = process.env.LB_DNS;

export const genereateOpenApiSpec = () => ({
  openapi: '3.1.0',
  info: {
    title: 'Aztec Scan API',
    version: '0.2.0',
    description:
      'API for exploring Aztec Network. Please note that this is a work in progress and the API is subject to change.',
  },
  servers: [
    {
      url: process.env.API_URL || `http://${LB_DNS}/api`,
    },
  ],
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  paths: openApiPaths,
});
