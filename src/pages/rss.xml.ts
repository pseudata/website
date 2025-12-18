import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
    const docs = await getCollection('docs');

    // Filter for blog posts only
    const blogPosts = docs.filter((entry) => entry.id.startsWith('blog/'));

    // Sort by date (newest first)
    const sortedPosts = blogPosts.sort((a, b) => {
        const dateA = new Date((a.data as any).date || 0);
        const dateB = new Date((b.data as any).date || 0);
        return dateB.getTime() - dateA.getTime();
    });

    return rss({
        title: 'Pseudata Blog',
        description: 'Insights on cross-language mock data generation and deterministic testing',
        site: context.site?.toString() || 'https://pseudata.dev',
        items: sortedPosts.map((post) => ({
            title: post.data.title,
            pubDate: new Date((post.data as any).date || Date.now()),
            description: post.data.description || '',
            author: (post.data as any).author || 'Pseudata Team',
            link: `/blog/${post.id.replace('blog/', '').replace('.mdx', '')}/`,
        })),
        customData: `<language>en-us</language>`,
    });
}
