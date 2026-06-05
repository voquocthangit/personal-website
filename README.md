# personal-website

minimal personal site + blog. nuxt 3 + @nuxt/content. deployed on vercel.

## stack

- **nuxt 3** — vue framework, file-based routing
- **@nuxt/content** — drop a `.md` file in `content/blog/`, it's a post
- **vercel** — `nitro.preset = 'vercel'`, deploys with zero config

## run

```bash
npm install
npm run dev      # http://localhost:3000
```

## write a post

create a new file at `content/blog/<slug>.md`:

```md
---
title: my new post
date: 2026-06-10
description: one-line summary for og + meta
draft: false   # optional — set true to hide
---

post body in plain markdown.
```

it shows up automatically on `/` (recent 5) and `/blog` (all).

## structure

```
app.vue              # shell
layouts/default.vue  # header + footer
assets/css/main.css  # the whole theme (one file)
pages/
  index.vue          # home — intro + recent posts
  about.vue
  blog/
    index.vue        # list of all posts
    [...slug].vue    # individual post
content/blog/        # markdown posts
public/              # static files (favicon, images)
```

## deploy

push to github, import the repo on vercel — that's it. no config needed
(the `nitro.preset = 'vercel'` in `nuxt.config.ts` handles it).

## tweak the look

it's all in `assets/css/main.css`. the design tokens at the top
(`--bg`, `--fg`, `--accent`, `--font-mono`, `--font-serif`) drive the
whole site. change the accent color, change the vibe.
