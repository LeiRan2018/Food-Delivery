import { ENV } from './../core/env.config';

interface AuthConfig {
  CLIENT_ID: string;
  CLIENT_DOMAIN: string;
  AUDIENCE: string;
  REDIRECT: string;
  SCOPE: string;
  NAMESPACE: string;
};

export const AUTH_CONFIG: AuthConfig = {
  CLIENT_ID: 'Vriuvhx6rY6rmnuQWDTDwKJ7KwSUT7h8',
  CLIENT_DOMAIN: 'blog2018.auth0.com', // e.g., kmaida.auth0.com
  AUDIENCE: 'http://localhost:3000/api/', // e.g., http://localhost:8083/api/
  REDIRECT: `${ENV.BASE_URI}/callback`,
  SCOPE: 'openid profile email',
  NAMESPACE: 'http://myapp.com/roles'
};