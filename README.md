http://localhost:3000/en/referenzen/newoneThis is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## GCP deployment

Production traffic stays on **ecommlab-new** for now. GCP is ready as a
standby target.

Deploy is **manual only**: GitHub Actions → **Deploy** → choose target
`ecommlab-new` (default) or `gcloud`. See [docs/deployment-gcp.md](docs/deployment-gcp.md).

## Environment variables

Create a `.env.local` (recommended for secrets) or use `.env.development` / `.env.production`.
On GCP, runtime secrets live in Secret Manager (not in the image).

### Cookiebot + Google Tag Manager (GTM)

- `NEXT_PUBLIC_SITE_URL`: Public base URL (e.g. `https://new.ecommlab.io`) for canonical/hreflang links
- `NEXT_PUBLIC_COOKIEBOT_ID`: Cookiebot CBID (domain group ID)
- `NEXT_PUBLIC_GTM_ID`: Google Tag Manager Container ID (e.g. `GTM-XXXXXXX`)

GTM (and therefore GA4 via GTM) is configured to load **only after Cookiebot consent** for category **Statistics**.

### Contact form (SMTP + Turnstile)

- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`, `CONTACT_TO`
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY`

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Server scripts (dev/prod start/stop)

On the server, from the project folder:

```bash
chmod +x scripts/server-start.sh scripts/server-stop.sh

# start dev (default port 3001; always without PM2)
./scripts/server-start.sh dev

# start prod (default port 3000; runs build before start; uses PM2 if available)
./scripts/server-start.sh prod

# stop dev/prod
./scripts/server-stop.sh dev
./scripts/server-stop.sh prod
```

Optional overrides:

- `PORT_DEV=3005 ./scripts/server-start.sh dev`
- `PORT_PROD=3002 ./scripts/server-start.sh prod`
