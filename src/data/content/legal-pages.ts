import { CONTACT_EMAIL, ROUTES } from '../../config/site';

export const LEGAL_UPDATED = '2026-08-18';

export const ABOUT_LEAD =
  'Hospital Bag Checklist is a free guide and packing tool for expecting parents. We help you figure out what to pack for labor, delivery and your hospital stay — without overpacking.';

export const PRIVACY_LEAD =
  'We keep things simple. This site does not require an account, and we do not sell your personal information. Here is what we collect and how we use it.';

export const TERMS_LEAD =
  'By using Hospital Bag Checklist, you agree to these terms. Please read them carefully — especially the medical disclaimer.';

export const CONTACT_LEAD =
  'Have a question, spotted an error, or need help with a privacy request? Send us an email and we will get back to you.';

/** Shared copy snippets referenced across legal pages. */
export const LEGAL_LINKS = {
  privacy: ROUTES.privacy.path,
  terms: ROUTES.terms.path,
  contact: ROUTES.contact.path,
  about: ROUTES.about.path,
  home: ROUTES.home.path,
  faq: `${ROUTES.home.path}#faq`,
  email: CONTACT_EMAIL,
} as const;
