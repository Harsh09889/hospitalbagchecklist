/**
 * Single source of truth for brand, routing and navigation.
 *
 * Every internal link, breadcrumb, sitemap entry and JSON-LD node resolves
 * through `ROUTES`, so a URL only ever changes in one place.
 */

export const SITE = {
  name: 'Hospital Bag Checklist',
  shortName: 'babyhospitalbag',
  domain: 'babyhospitalbag.com',
  url: 'https://babyhospitalbag.com',
  tagline: 'Pregnancy preparation made simple.',
  description:
    'A simple hospital bag checklist for mom, baby and dad. Know exactly what to pack for labor, delivery and your hospital stay — without overpacking.',
  locale: 'en',
  twitter: '@babyhospitalbag',
} as const;

export const GA_MEASUREMENT_ID = 'G-BFEKCMV6Q1';

export interface RouteDef {
  /** Path with no trailing slash. */
  path: string;
  /** Short label used in navigation and breadcrumbs. */
  label: string;
  /** `<title>` for the page. */
  title: string;
  /** Meta description. */
  description: string;
  /** Primary keyword this page owns, plus the variants it absorbs. */
  keywords: string[];
}

export const ROUTES = {
  home: {
    path: '/',
    label: 'Home',
    title: 'Hospital Bag Checklist — What to Pack for Mom, Baby & Dad | Free Tool',
    description:
      'Free hospital bag checklist for mom, baby and dad. See what to pack in your hospital bag, hospital bag essentials, and when to pack — with a personalised tool and printable PDF.',
    keywords: [
      'hospital bag checklist',
      'what to pack in hospital bag',
      'hospital bag checklist for mom',
      'hospital bag',
      'hospital bag checklist for mom and baby',
      'hospital bag for mom',
      'hospital bag essentials',
      'what to pack in hospital bag for mom',
      'best hospital bag',
      'when to pack hospital bag',
      'pregnancy hospital bag checklist',
      'baby hospital bag checklist',
      'baby hospital bag',
      'hospital bag list',
      'hospital bag checklist for baby',
      'hospital bag for baby',
      'what to pack in hospital bag for baby',
      'hospital bag for mom and baby',
      'hospital bag packing list',
    ],
  },
  mom: {
    path: '/hospital-bag-checklist-for-mom',
    label: 'For Mom',
    title: "Hospital Bag Checklist for Mom — What Mom Needs to Pack",
    description:
      'A complete hospital bag checklist for mom: comfortable clothes, toiletries, documents and postpartum essentials for labor, delivery and recovery.',
    keywords: [
      'hospital bag checklist for mom',
      'mom hospital bag checklist',
      'maternity hospital bag checklist',
    ],
  },
  baby: {
    path: '/baby-hospital-bag-checklist',
    label: 'For Baby',
    title: 'Baby Hospital Bag Checklist — What Your Newborn Needs',
    description:
      "A baby hospital bag checklist covering newborn clothes, diapers, swaddles, muslins and the going-home outfit — plus what your hospital may already provide.",
    keywords: [
      'baby hospital bag checklist',
      'hospital bag checklist for baby',
      'newborn hospital bag checklist',
    ],
  },
  dad: {
    path: '/hospital-bag-checklist-for-dad',
    label: 'For Dad',
    title: "Hospital Bag Checklist for Dad & Partner — What to Pack",
    description:
      "A hospital bag checklist for dad and birth partners: documents, chargers, snacks, a change of clothes and everything you need for a long hospital stay.",
    keywords: [
      'hospital bag checklist for dad',
      'dad hospital bag checklist',
      'hospital bag checklist for partner',
    ],
  },
  momAndBaby: {
    path: '/hospital-bag-checklist-for-mom-and-baby',
    label: 'Mom & Baby',
    title: 'Hospital Bag Checklist for Mom and Baby — One Simple List',
    description:
      'One hospital bag checklist for mom, dad and baby. See what each person needs, how the bags split up and what to pack for the hospital stay.',
    keywords: [
      'hospital bag checklist for mom and baby',
      'hospital bag checklist for mom dad and baby',
      'hospital bag checklist for mom and dad',
    ],
  },
  labor: {
    path: '/hospital-bag-checklist-for-labor',
    label: 'For Labor',
    title: 'Hospital Bag Checklist for Labor & Delivery — What to Pack',
    description:
      'What to pack for labor, birth and delivery: comfort items for the labor room, documents, clothes and the essentials for the hours after your baby arrives.',
    keywords: [
      'hospital bag checklist for labor',
      'labor hospital bag checklist',
      'hospital bag checklist for birth',
      'birth hospital bag checklist',
      'delivery hospital bag checklist',
    ],
  },
  csection: {
    path: '/c-section-hospital-bag-checklist',
    label: 'C-Section',
    title: 'C-Section Hospital Bag Checklist — What to Pack for Surgery',
    description:
      'A C-section hospital bag checklist for a planned or unplanned cesarean: loose high-waisted clothes, longer-stay essentials and practical recovery items.',
    keywords: [
      'c section hospital bag checklist',
      'cesarean hospital bag checklist',
      'c section bag checklist',
    ],
  },
  pregnancy: {
    path: '/pregnancy-hospital-bag-checklist',
    label: 'When to Pack',
    title: 'Pregnancy Hospital Bag Checklist — When and What to Pack',
    description:
      'A pregnancy hospital bag checklist with a week-by-week packing timeline, what to ask your hospital and how to be ready well before your due date.',
    keywords: [
      'pregnancy hospital bag checklist',
      'hospital bag checklist pregnancy',
      'when to pack hospital bag',
    ],
  },
  pdf: {
    path: '/hospital-bag-checklist-pdf',
    label: 'Printable PDF',
    title: 'Printable Hospital Bag Checklist PDF — Free Download',
    description:
      'Download a free printable hospital bag checklist PDF for mom, baby and dad. Print it, stick it on the fridge or take it shopping with you.',
    keywords: [
      'hospital bag checklist pdf',
      'hospital bag checklist for mom and baby pdf',
      'printable hospital bag checklist',
    ],
  },
  generator: {
    path: '/checklist',
    label: 'My Checklist',
    title: 'Create My Hospital Bag Checklist',
    description:
      'Build a personalised hospital bag checklist based on your delivery plan, hospital stay and who you are packing for.',
    keywords: [],
  },
  about: {
    path: '/about-us',
    label: 'About Us',
    title: 'About Us — Hospital Bag Checklist',
    description:
      'Learn about Hospital Bag Checklist: a free tool and guide to help expecting parents pack for labor, delivery and the hospital stay.',
    keywords: ['about hospital bag checklist', 'hospital bag checklist'],
  },
  privacy: {
    path: '/privacy-policy',
    label: 'Privacy Policy',
    title: 'Privacy Policy — Hospital Bag Checklist',
    description:
      'How Hospital Bag Checklist handles your data: browser storage for your checklist, no accounts, and Google Analytics for aggregate site usage.',
    keywords: ['privacy policy', 'hospital bag checklist privacy'],
  },
  terms: {
    path: '/terms-and-conditions',
    label: 'Terms & Conditions',
    title: 'Terms & Conditions — Hospital Bag Checklist',
    description:
      'Terms of use for Hospital Bag Checklist. Informational content only — not medical advice.',
    keywords: ['terms and conditions', 'terms of use'],
  },
  contact: {
    path: '/contact-us',
    label: 'Contact Us',
    title: 'Contact Us — Hospital Bag Checklist',
    description:
      'Get in touch with Hospital Bag Checklist for feedback, corrections, or privacy questions.',
    keywords: ['contact hospital bag checklist'],
  },
} as const satisfies Record<string, RouteDef>;

export type RouteKey = keyof typeof ROUTES;

export const CONTACT_EMAIL = 'contact@babyhospitalbag.com';

/** Legal and company pages. */
export const LEGAL_ROUTE_KEYS = ['about', 'privacy', 'terms', 'contact'] as const satisfies readonly RouteKey[];

/** Content pages only — excludes the generator app. */
export const CONTENT_ROUTE_KEYS = [
  'mom',
  'baby',
  'dad',
  'momAndBaby',
  'labor',
  'csection',
  'pregnancy',
  'pdf',
] as const satisfies readonly RouteKey[];

export const PRIMARY_CTA = {
  label: 'Create My Checklist',
  href: ROUTES.generator.path,
} as const;

export interface NavItem {
  href: string;
  label: string;
  children?: { href: string; label: string; description: string }[];
}

export const NAV_ITEMS: NavItem[] = [
  { href: ROUTES.mom.path, label: 'For Mom' },
  { href: ROUTES.baby.path, label: 'For Baby' },
  { href: ROUTES.dad.path, label: 'For Dad' },
  {
    href: ROUTES.pregnancy.path,
    label: 'Guides',
    children: [
      {
        href: ROUTES.pregnancy.path,
        label: 'When to pack your bag',
        description: 'A week-by-week packing timeline',
      },
      {
        href: ROUTES.labor.path,
        label: 'Packing for labor',
        description: 'What you actually use in the labor room',
      },
      {
        href: ROUTES.csection.path,
        label: 'C-section checklist',
        description: 'Planning for surgery and a longer stay',
      },
      {
        href: ROUTES.momAndBaby.path,
        label: 'Mom, baby & dad together',
        description: 'One list, split across three bags',
      },
    ],
  },
  { href: ROUTES.pdf.path, label: 'Printable' },
];

export const FOOTER_COLUMNS = [
  {
    heading: 'Checklists',
    links: [
      { href: ROUTES.home.path, label: 'Hospital Bag Checklist' },
      { href: ROUTES.mom.path, label: "Mom's Checklist" },
      { href: ROUTES.baby.path, label: "Baby's Checklist" },
      { href: ROUTES.dad.path, label: "Dad's Checklist" },
      { href: ROUTES.momAndBaby.path, label: 'Mom, Baby & Dad' },
    ],
  },
  {
    heading: 'Guides',
    links: [
      { href: ROUTES.pregnancy.path, label: 'When to Pack Your Bag' },
      { href: ROUTES.labor.path, label: 'What to Pack for Labor' },
      { href: ROUTES.csection.path, label: 'C-Section Checklist' },
      { href: ROUTES.pdf.path, label: 'Printable PDF' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { href: ROUTES.generator.path, label: 'Create My Checklist' },
      { href: `${ROUTES.home.path}#faq`, label: 'Frequently Asked Questions' },
      { href: `${ROUTES.home.path}#hospital`, label: 'Questions for Your Hospital' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { href: ROUTES.about.path, label: 'About Us' },
      { href: ROUTES.contact.path, label: 'Contact Us' },
      { href: ROUTES.privacy.path, label: 'Privacy Policy' },
      { href: ROUTES.terms.path, label: 'Terms & Conditions' },
    ],
  },
] as const;

export const MEDICAL_DISCLAIMER =
  'This site is for general information only and is not medical advice. Every hospital and every pregnancy is different — always follow the guidance of your doctor, midwife or maternity unit.';

/** Absolute URL for canonicals, OG tags and structured data. */
export function absoluteUrl(path: string): string {
  if (path === '/') return `${SITE.url}/`;
  return `${SITE.url}${path.startsWith('/') ? path : `/${path}`}`;
}
