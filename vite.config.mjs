import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'import.meta.env.VITE_OPENWEATHER_KEY': JSON.stringify(env.VITE_OPENWEATHER_KEY)
    }
  };
});