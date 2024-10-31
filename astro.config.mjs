// @ts-check
import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';

import react from '@astrojs/react';

import mdx from '@astrojs/mdx';

import vercel from '@astrojs/vercel/serverless';

// https://astro.build/config
export default defineConfig({
  output: 'server',

  integrations: [
    tailwind({applyBaseStyles: false}),
    react(),
    mdx({
      syntaxHighlight: 'shiki',
      shikiConfig:
      {
        themes: {
          light: "github-light",
          dark: "github-dark-default"
        },
        wrap: false,
      },
    })
  ],

  // Change this if you're planning to deploy somewhere else.
  adapter: vercel({
    webAnalytics: { enabled: true }
  })
});