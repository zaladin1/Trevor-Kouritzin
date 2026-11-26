import type { APIRoute } from 'astro';
import { SITE_INFO, SERVICES, PUBLICATIONS, ARTICLES } from '../../data/siteData';

export const GET: APIRoute = ({ site }) => {
  const baseUrl = (site?.toString() || SITE_INFO.siteUrl).replace(/\/$/, '');

  const payload = {
    schemaVersion: '1.0.0',
    generatedAt: new Date().toISOString(),
    person: {
      name: SITE_INFO.name,
      tagline: SITE_INFO.tagline,
      email: SITE_INFO.email,
      location: SITE_INFO.location,
      credentials: SITE_INFO.credentials,
      biography: SITE_INFO.bioParagraphs,
      socials: SITE_INFO.socials,
    },
    services: SERVICES.map((s) => ({
      id: s.id,
      title: s.title,
      category: s.category,
      price: s.price,
      currency: s.currency,
      format: s.format,
      url: `${baseUrl}/services#${s.id === 'zoom-consultation' ? 'consultation' : s.id}`,
    })),
    speakingFormats: SITE_INFO.speakingFormats,
    publications: PUBLICATIONS,
    articles: ARTICLES.map((a) => ({
      id: a.id,
      slug: a.slug,
      title: a.title,
      date: a.date,
      category: a.category,
      readTimeMinutes: a.readTimeMinutes,
      keyTakeaway: a.keyTakeaway,
      url: `${baseUrl}/articles/${a.slug}`,
      references: a.references,
    })),
  };

  return new Response(JSON.stringify(payload, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
