/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        display: ['Orbitron', 'sans-serif'],
        body: ['Syne', 'sans-serif'],
      },
      colors: {
        cyber: {
          bg: '#020817',
          panel: '#0a1628',
          border: '#1e3a5f',
          cyan: '#00f5ff',
          pink: '#ff0080',
          yellow: '#ffd700',
          green: '#00ff88',
          purple: '#9d4edd',
        }
      },
      animation: {
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'scan-line': 'scanLine 3s linear infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 5px #00f5ff, 0 0 20px #00f5ff40' },
          '50%': { boxShadow: '0 0 20px #00f5ff, 0 0 60px #00f5ff60' },
        },
        scanLine: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    }
  },
  plugins: []
}
