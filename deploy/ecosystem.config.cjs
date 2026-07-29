/**
 * pm2-Konfiguration für die ecommlab Homepage (Deploy auf geteilten Hosts).
 *
 * WICHTIG: Diese Datei beschreibt AUSSCHLIESSLICH die App "ecommlab-prod".
 * Alle pm2-Befehle des Deploy-Skripts referenzieren diese Config bzw. den
 * App-Namen — andere Dienste auf dem Host (mydev-ai, etoro-agent,
 * ec-healthcheck-*) werden dadurch nie angefasst.
 */

module.exports = {
  apps: [
    {
      name: 'ecommlab-prod',
      cwd: '/var/www/ecommlab-relaunch',
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
};
