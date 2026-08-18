/**
 * Long-form SEO copy for the homepage — focused on the checklist tool.
 * Kept in data so the Astro component stays presentational.
 */

export type SeoBlock =
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'p'; html: string };

export const HOME_SEO_BLOCKS: SeoBlock[] = [
  {
    type: 'h2',
    text: 'A free hospital bag checklist tool built for real births',
  },
  {
    type: 'p',
    html: `Most parents start with the same question: <strong>what to pack in a hospital bag</strong>? Search for a <strong>hospital bag list</strong> and you will find dozens of pages suggesting eighty or ninety items — clothes for every scenario, gadgets you will never open and a suitcase that is impossible to carry from the car park. Our <strong>hospital bag checklist</strong> takes a different approach. Instead of one overwhelming list, you get a practical <strong>hospital bag packing list</strong> split by who it is for, when you will need it and what your hospital may already provide.`,
  },
  {
    type: 'h3',
    text: 'Personalised lists for mom, baby and partner',
  },
  {
    type: 'p',
    html: `The checklist generator asks six quick questions — who you are packing for, your due date, delivery type, expected stay, season and feeding plans — then builds a tailored list in under two minutes. You receive separate bags for labor, your ward stay, the baby and your partner, so everyone knows their responsibility. The <a href="/hospital-bag-checklist-for-mom">hospital bag checklist for mom</a> covers comfortable clothes, toiletries and recovery essentials. The <a href="/baby-hospital-bag-checklist">baby hospital bag checklist</a> keeps newborn packing realistic. And the combined <a href="/hospital-bag-checklist-for-mom-and-baby">hospital bag checklist for mom and baby</a> view brings it all together in one place, including a dedicated partner list. Whether you need a <strong>hospital bag for mom</strong>, a <strong>hospital bag for baby</strong> or a single <strong>hospital bag for mom and baby</strong>, the tool adapts to your situation rather than forcing you through a generic template.`,
  },
  {
    type: 'h3',
    text: 'Hospital bag essentials — without the nursery',
  },
  {
    type: 'p',
    html: `Every item on our list comes with a suggested quantity and a plain-English reason, so you are not guessing how many bodysuits to bring or whether you really need that fourth swaddle. We flag items your maternity unit may already supply — diapers, mesh underwear, basic toiletries — which saves you from carrying things you will never use. The result is a focused set of <strong>hospital bag essentials</strong> for birth: what you actually need during labor, delivery and the first days afterwards, not a wholesale move of the nursery to the ward. If you want to see <strong>what to pack in a hospital bag for mom</strong> or <strong>what to pack in a hospital bag for baby</strong> before building your own list, each section on this page links to a dedicated guide with full item breakdowns.`,
  },
  {
    type: 'h3',
    text: 'When to pack your hospital bag',
  },
  {
    type: 'p',
    html: `Timing matters as much as contents. Most pregnancy guides suggest having your bag ready a few weeks before your due date — many parents aim for around 36 weeks. If you have been advised you may deliver early, pack sooner. Our <a href="/pregnancy-hospital-bag-checklist">pregnancy hospital bag checklist</a> includes a week-by-week packing timeline, questions to ask your hospital before you start and practical tips for being ready well before labor begins. Knowing <strong>when to pack a hospital bag</strong> removes one more source of last-minute stress.`,
  },
  {
    type: 'h3',
    text: 'Print, tick off, or build your list in minutes',
  },
  {
    type: 'p',
    html: `Once your list is ready, tick items off as you pack and watch your progress. Everything saves locally in your browser — no account, no email sign-up. Prefer paper? Download our free <a href="/hospital-bag-checklist-pdf">printable hospital bag checklist PDF</a> or print directly from the tool. You can also browse the <a href="/baby-hospital-bag-checklist">baby hospital bag checklist</a> and other guides on this site if you want to read before you build. <a href="/checklist">Create your personalised hospital bag checklist</a> now and have a complete, printable <strong>hospital bag packing list</strong> in a couple of minutes.`,
  },
  {
    type: 'p',
    html: `One last practical note: choosing the <strong>best hospital bag</strong> is simpler than the product reviews make it sound. A medium-sized wheeled duffel or a roomy backpack with a separate documents pouch works well for most stays. Pack two smaller bags inside — one for labor and one for the ward — rather than trying to fit everything into a single compartment. The bag itself matters less than having a clear, realistic list of what goes inside it.`,
  },
];
