import type { APIRoute } from 'astro';
import { ARTICLES, SITE_INFO } from '../data/siteData';

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export const GET: APIRoute = ({ site }) => {
  const baseUrl = (site?.toString() || SITE_INFO.siteUrl).replace(/\/$/, '');

  const itemsXml = ARTICLES.map((article) => {
    const url = `${baseUrl}/articles/${article.slug}`;
    return `
    <item>
      <title>${escapeXml(article.title)}</title>
      <link>${escapeXml(url)}</link>
      <guid isPermaLink="true">${escapeXml(url)}</guid>
      <pubDate>${new Date(`${article.date}T12:00:00Z`).toUTCString()}</pubDate>
      <category>${escapeXml(article.category)}</category>
      <description>${escapeXml(article.excerpt)}</description>
    </item>`;
  }).join('');

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_INFO.name)} — Evidence-Based Research Articles</title>
    <link>${escapeXml(baseUrl)}</link>
    <description>${escapeXml(SITE_INFO.heroHeadline)}</description>
    <language>en-us</language>
    <atom:link href="${escapeXml(`${baseUrl}/rss.xml`)}" rel="self" type="application/rss+xml" />${itemsXml}
  </channel>
</rss>`;

  return new Response(rss.trim(), {
    status: 200,
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
