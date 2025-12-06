// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import rehypeExternalLinks from 'rehype-external-links';
import remarkToc from 'remark-toc';
import mermaid from 'astro-mermaid';

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