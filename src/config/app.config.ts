import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  nodeEnv: process.env.NODE_ENV,
  name: process.env.APP_NAME,
  workingDirectory: process.env.PWD || process.cwd(),
  frontendDomain: process.env.FRONTEND_DOMAIN,
  backendDomain: process.env.BACKEND_DOMAIN,
  port: parseInt(process.env.APP_PORT || process.env.PORT, 10) || 3000,
  apiPrefix: process.env.API_PREFIX || 'api',
  swaggerBasePath: process.env.SWAGGER_BASE_PATH || '',
  fallbackLanguage: process.env.APP_FALLBACK_LANGUAGE || 'en',
  EMC_ACCOUNTS_HOST: process.env.EMC_ACCOUNTS_HOST,
  EMC_ACCOUNTS_PORT: parseInt(process.env.EMC_ACCOUNTS_PORT, 10) || 8001,
}));
