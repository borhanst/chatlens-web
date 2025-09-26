/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_GOOGLE_CLIENT_ID: string
  readonly VITE_AUTH_COOKIE_NAME: string
  readonly VITE_APP_NAME: string
  readonly VITE_AUTHORIZATION_TOKEN_TYPE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}