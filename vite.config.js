import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(() => {
  const isGitHubActions = process.env.GITHUB_ACTIONS === 'true'

  return {
    base: isGitHubActions ? '/dsavisualizer/' : '/',
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:3001',
          changeOrigin: true,
        }
      }
    }
  }
})
