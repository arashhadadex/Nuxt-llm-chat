# LLM Chat Playground

A minimal Nuxt 4 LLM chat playground deployed on Cloudflare Pages using Workers AI.

**Live demo:** https://nuxt-llm-chat.arashhadadsoleymanii.workers.dev

## Models

- `@cf/meta/llama-3.1-8b-instruct`
- `@cf/meta/llama-3.2-3b-instruct`

Other models were removed because they are deprecated or unavailable on this Workers AI account.

## Setup

Make sure to install the dependencies with [pnpm](https://pnpm.io/installation#using-corepack):

```bash
pnpm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
pnpm dev
```

## Environment Variables

Set these on Cloudflare Pages (Production):

| Variable | Description |
|---|---|
| `WORKERS_AI_ACCOUNT_ID` | Your Cloudflare Workers AI account ID |
| `WORKERS_AI_API_TOKEN` | Your Cloudflare Workers AI API token |

## Production

Build the application:

```bash
pnpm build
```

The site deploys automatically to Cloudflare Pages on push to `main`.

## Tech Stack

- [Nuxt 4](https://nuxt.com)
- [Nuxt UI](https://ui.nuxt.com)
- [@nuxtjs/mdc](https://github.com/nuxt-modules/mdc)
- Cloudflare Workers AI
