/**
 * pm2-Konfiguration für die ecommlab Homepage (CloudPanel Site-User).
 *
 * Beschreibt AUSSCHLIESSLICH die App "ecommlab-prod". Pfade werden aus
 * dem Ort dieser Datei abgeleitet (CloudPanel: /home/ecomde/htdocs/ecommlab.de).
 */

const path = require('node:path')
const ROOT = path.resolve(__dirname, '..')

module.exports = {
  apps: [
    {
      name: 'ecommlab-prod',
      cwd: ROOT,
      script: './node_modules/next/dist/bin/next',
      args: 'start -H 0.0.0.0 -p 3000',
      interpreter: 'none',
      exec_mode: 'fork',
      instances: 1,
      max_restarts: 10,
      restart_delay: 5000,
      max_memory_restart: '700M',
      autorestart: true,
      env: {
        NODE_ENV: 'production',
        PORT: '3000',
      },
    },
  ],
}
