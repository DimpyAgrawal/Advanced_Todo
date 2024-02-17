import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import pluginRewriteAll fromnpm install --save-dev vite-plugin-rewrite-all 'vite-pl'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
