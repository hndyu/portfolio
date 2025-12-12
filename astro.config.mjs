// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import rehypeExternalLinks from 'rehype-external-links';
import remarkToc from 'remark-toc';
import mermaid from 'astro-mermaid';
import astroBrokenLinksChecker from 'astro-broken-link-checker';

// https://astro.build/config
export default defineConfig({
  site: 'https://portfolio-4ng.pages.dev',
  integrations: [
    mermaid({
      theme: 'default',
      autoTheme: true
    }),
    mdx(),
    sitemap(),
    astroBrokenLinksChecker({
      logFilePath: 'broken-links.log', // Optional: specify the log file path
      checkExternalLinks: false, // Optional: check external links (currently, caching to disk is not supported, and it is slow)
      throwError: true // Optional: throw an error to fail the build if broken links are found. Defaults to false.
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    syntaxHighlight: {
      type: 'shiki',
      excludeLangs: ['mermaid', 'math'],
    },
    remarkPlugins: [
      [remarkToc,
        {
          heading: "目次",
        }
      ]
    ],
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          target: '_blank', // 外部リンクを新しいタブで開く
          rel: ['noopener', 'noreferrer'], // セキュリティ対策
          content: { type: 'text', value: '↗' }, // 外部リンクアイコン（オプション）
        },
      ],
    ],
  },
});