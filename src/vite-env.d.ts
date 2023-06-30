/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />
interface ImportMetaEnv {
  VITE_BACKEND_URL: string;
  // ... more env variables if you have
}

interface ImportMeta {
  env: ImportMetaEnv;
}
