import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
    site: 'https://pseudata.dev',
    server: {
        host: true,
    },
    integrations: [
        starlight({
            title: 'Pseudata',
            head: [
                {
                    tag: 'link',
                    attrs: {
                        rel: 'alternate',
                        type: 'application/rss+xml',
                        title: 'Pseudata Blog',
                        href: '/rss.xml',
                    },
                },
            ],
            logo: {
                light: './public/logo-light.svg',
                dark: './public/logo-dark.svg',
                replacesTitle: false,
            },
            customCss: [
                './src/styles/custom.css',
            ],
            components: {
                Footer: './src/components/Footer.astro',
            },
            social: [
                {
                    icon: 'github',
                    label: 'GitHub',
                    href: 'https://github.com/pseudata/pseudata',
                },
            ],
            sidebar: [
                {
                    label: 'Start Here',
                    autogenerate: { directory: 'guides' },
                },
                {
                    label: 'Reference',
                    autogenerate: { directory: 'reference' },
                },
                {
                    label: 'Blog',
                    autogenerate: { directory: 'blog' },
                },
            ],
        }),
    ],
});
