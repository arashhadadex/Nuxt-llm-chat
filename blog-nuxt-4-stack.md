# Building on the Edge: Nuxt 4, NuxtHub, Nuxt UI, and MDC

I spent this session setting up a new Nuxt project on Cloudflare's Edge, combining Nuxt 4, NuxtHub, Nuxt UI, and Nuxt MDC. Here's what I did, what each piece brings to the stack, and where things stand.

## The Stack

| Package | Role | Version |
|---|---|---|
| [Nuxt](https://nuxt.com) | Vue framework, SSR/SSG | `^4.6.4` |
| [NuxtHub](https://hub.nuxt.com) | Cloudflare Workers deployment, KV, D1, Blob, analytics | `^0.9.0` |
| [Nuxt UI](https://ui.nuxt.com) | Headless Vue components styled with Tailwind | `4.13.0` |
| [Nuxt MDC](https://mdc.nuxt.com) | Markdown + Vue components in `.md` pages | (added via module) |

## Step 1: Initialize with Nuxthub

I started from the [Hello Edge](https://github.com/nuxt-hub/hello-edge) NuxtHub starter and ran:

```bash
npx nuxthub init cf-playground
```

I answered `y` to the prompts. This scaffolded a Nuxt 4 app configured for Cloudflare Workers, with `@nuxthub/core` installed and a `hub: {}` block in `nuxt.config.ts`. The result is an app ready to deploy to 275+ Cloudflare locations with a single command:

```bash
npx nuxthub deploy
```

## Step 2: Add Nuxt UI

Next, I installed the UI component library:

```bash
npx nuxi module add ui
```

This added `@nuxt/ui` to `dependencies` and registered it in `nuxt.config.ts`:

```ts
modules: ['@nuxthub/core', '@nuxt/eslint', '@nuxt/ui'],
```

With Tailwind CSS already configured, I now have access to `UButton`, `USlider`, `UInput`, and the rest of the Nuxt UI component set out of the box.

## Step 3: Add Nuxt MDC

I also ran:

```bash
npx nuxi module add mdc
```

The intent was to add `@nuxtjs/mdc` so I can author content in Markdown while embedding Vue components directly in `.md` files. (As of this writing, I'm verifying the module landed in `node_modules/@nuxtjs/` and is registered in `nuxt.config.ts`.)

## What the Project Looks Like Now

The app is a minimal Nuxt 4 starter:

- `app/index.vue` — a parameter input form with `temperature`, `topP`, and `maxTokens` sliders
- `app/pages/index.vue` — the home page showing the `helloText` runtime config value with a random color
- `server/api/ping.ts` — a simple server route returning `'pong'`
- `nuxt.config.ts` — Nuxt 4 compatibility mode, Nuxthub and Nuxt UI modules configured

## Why This Combo Works

- **Nuxt 4** gives you the latest framework features with the `compatibilityVersion: 4` future flag.
- **NuxtHub** handles deployment, serverless functions, and storage on Cloudflare without managing infrastructure.
- **Nuxt UI** provides accessible, themeable components so you don't build form controls from scratch.
- **Nuxt MDC** lets you write content-first pages in Markdown while dropping in interactive Vue components where needed.

## Next Steps

1. Verify `@nuxtjs/mdc` is installed and registered in `nuxt.config.ts`.
2. Add an MDC content page (e.g., `content/blog/hello.md`) and render it.
3. Deploy with `npx nuxthub deploy` and check the logs in [NuxtHub Admin](https://admin.hub.nuxt.com).

If you're starting a content site or a small SaaS on the Edge, this stack gets you from zero to deployed in minutes.