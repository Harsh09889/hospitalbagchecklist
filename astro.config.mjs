// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://babyhospitalbag.com',
  trailingSlash: 'never',
  integrations: [
    react(),
    sitemap({
      // The generator is a tool, not a content page — keep it out of the index.
      filter: (page) =>
        !page.includes('/checklist') &&
        !page.includes('/404') &&
        !page.includes('/500'),
      changefreq: 'monthly',
      lastmod: new Date(),
      serialize(item) {
        const { origin, pathname } = new URL(item.url);
        // The homepage is the authority page for "hospital bag checklist".
        if (pathname === '/' || pathname === '') {
          return { ...item, url: `${origin}/`, priority: 1.0, changefreq: 'weekly' };
        }
        const legalPaths = ['/about-us', '/privacy-policy', '/terms-and-conditions', '/contact-us'];
        if (legalPaths.includes(pathname)) {
          return { ...item, priority: 0.5, changefreq: 'yearly' };
        }
        return { ...item, priority: 0.8 };
      },
    }),
  ],
  build: {
    // Emit /page.html rather than /page/index.html so trailingSlash: never resolves on static hosts.
    format: 'file',
  },
  image: {
    responsiveStyles: true,
    layout: 'constrained',
  },
  redirects: {
    // Consolidated into the homepage, which is the authority page for "hospital bag checklist".
    '/hospital-bag-checklist': '/',
    '/hospital-bag-checklist-for-mom-and-baby-pdf': '/hospital-bag-checklist-pdf',
    '/hospital-bag-checklist-for-baby': '/baby-hospital-bag-checklist',
    '/labor-hospital-bag-checklist': '/hospital-bag-checklist-for-labor',
    '/delivery-hospital-bag-checklist': '/hospital-bag-checklist-for-labor',
    '/hospital-bag-checklist-for-birth': '/hospital-bag-checklist-for-labor',
    '/maternity-hospital-bag-checklist': '/hospital-bag-checklist-for-mom',
    '/hospital-bag-checklist-for-mom-dad-and-baby': '/hospital-bag-checklist-for-mom-and-baby',
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
