/**
 * JSON-LD builders. Every node carries an @id built from the canonical URL so
 * the graph on each page references one shared WebSite/Organization entity
 * instead of redeclaring it.
 */

import { SITE, CONTACT_EMAIL, ROUTES, absoluteUrl } from '../config/site';

type Json = Record<string, unknown>;

const ORG_ID = `${SITE.url}/#organization`;
const SITE_ID = `${SITE.url}/#website`;

export function organizationSchema(): Json {
  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    logo: {
      '@type': 'ImageObject',
      url: absoluteUrl('/favicon.svg'),
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: CONTACT_EMAIL,
      url: absoluteUrl(ROUTES.contact.path),
    },
  };
}

export function webSiteSchema(): Json {
  return {
    '@type': 'WebSite',
    '@id': SITE_ID,
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    inLanguage: 'en',
    publisher: { '@id': ORG_ID },
  };
}

export function webPageSchema(options: {
  url: string;
  name: string;
  description: string;
  breadcrumbId?: string;
}): Json {
  return {
    '@type': 'WebPage',
    '@id': `${options.url}#webpage`,
    url: options.url,
    name: options.name,
    description: options.description,
    isPartOf: { '@id': SITE_ID },
    inLanguage: 'en',
    ...(options.breadcrumbId ? { breadcrumb: { '@id': options.breadcrumbId } } : {}),
  };
}

export function breadcrumbSchema(
  url: string,
  trail: { name: string; path: string }[],
): Json {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${url}#breadcrumb`,
    itemListElement: trail.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

export interface FaqEntry {
  question: string;
  answer: string;
}

export function faqSchema(url: string, faqs: FaqEntry[]): Json {
  return {
    '@type': 'FAQPage',
    '@id': `${url}#faq`,
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * A packing checklist is a list of things, so ItemList is the honest mapping.
 * HowTo would imply ordered steps that must be performed in sequence.
 */
export function itemListSchema(options: {
  url: string;
  name: string;
  description: string;
  items: string[];
}): Json {
  return {
    '@type': 'ItemList',
    '@id': `${options.url}#checklist`,
    name: options.name,
    description: options.description,
    numberOfItems: options.items.length,
    itemListOrder: 'https://schema.org/ItemListUnordered',
    itemListElement: options.items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item,
    })),
  };
}

export function articleSchema(options: {
  url: string;
  headline: string;
  description: string;
  datePublished: string;
  dateModified: string;
}): Json {
  return {
    '@type': 'Article',
    '@id': `${options.url}#article`,
    headline: options.headline,
    description: options.description,
    datePublished: options.datePublished,
    dateModified: options.dateModified,
    inLanguage: 'en',
    isPartOf: { '@id': `${options.url}#webpage` },
    mainEntityOfPage: { '@id': `${options.url}#webpage` },
    author: { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
  };
}

export function webApplicationSchema(): Json {
  return {
    '@type': 'WebApplication',
    '@id': `${absoluteUrl('/checklist')}#app`,
    name: 'Hospital Bag Checklist Generator',
    applicationCategory: 'HealthApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    url: absoluteUrl('/checklist'),
    isPartOf: { '@id': SITE_ID },
    publisher: { '@id': ORG_ID },
  };
}

/** Wraps nodes into a single @graph document. */
export function buildGraph(nodes: Json[]): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': nodes,
  });
}
