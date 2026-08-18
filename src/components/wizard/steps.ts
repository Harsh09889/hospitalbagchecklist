import type { WizardStep } from '../data/types';

export const WIZARD_STEPS: WizardStep[] = [
  {
    id: 'packing-for',
    question: 'Who are you packing for?',
    subtitle: 'Select all that apply — we\'ll personalize items for each person.',
    type: 'multi',
    field: 'packingFor',
    options: [
      { value: 'mom', label: 'Mom / Birthing Parent', emoji: '🤰', description: 'Labor, delivery & recovery essentials', color: 'bg-brand-pink' },
      { value: 'baby', label: 'Baby', emoji: '👶', description: 'Newborn clothes, swaddles & going-home outfit', color: 'bg-brand-peach' },
      { value: 'partner', label: 'Support Partner / Dad', emoji: '🧑‍🍼', description: 'Snacks, clothes & overnight supplies', color: 'bg-brand-ochre' },
    ],
  },
  {
    id: 'due-date',
    question: 'When is your due date?',
    subtitle: 'We\'ll show what to focus on each week as you prepare.',
    type: 'date',
    field: 'dueDate',
  },
  {
    id: 'delivery-type',
    question: 'What type of delivery?',
    subtitle: 'This helps us include the right recovery items.',
    type: 'single',
    field: 'deliveryType',
    options: [
      { value: 'vaginal', label: 'Vaginal Delivery', emoji: '💪', description: 'Natural birth', color: 'bg-brand-lavender' },
      { value: 'csection', label: 'Planned C-Section', emoji: '🏥', description: 'Scheduled cesarean', color: 'bg-brand-teal' },
      { value: 'unsure', label: 'Unsure / Flexible', emoji: '🤷', description: 'Pack for both scenarios', color: 'bg-brand-mint' },
    ],
  },
  {
    id: 'stay-duration',
    question: 'Expected hospital stay?',
    subtitle: 'Longer stays need more clothes, snacks, and supplies.',
    type: 'single',
    field: 'stayDuration',
    options: [
      { value: 'overnight', label: 'Overnight / 24 hrs', emoji: '🌙', description: 'Quick discharge', color: 'bg-brand-mint' },
      { value: '2-3days', label: '2–3 Days', emoji: '📅', description: 'Standard stay', color: 'bg-brand-lavender' },
      { value: 'extended', label: 'Extended Stay', emoji: '🏨', description: '4+ days or complications', color: 'bg-brand-teal' },
    ],
  },
  {
    id: 'season',
    question: 'Season / Climate?',
    subtitle: 'Baby layers and clothing depend heavily on weather.',
    type: 'single',
    field: 'season',
    options: [
      { value: 'summer', label: 'Summer / Hot', emoji: '☀️', description: 'Light layers, sun protection', color: 'bg-brand-peach' },
      { value: 'winter', label: 'Winter / Cold', emoji: '❄️', description: 'Warm layers, caps, booties', color: 'bg-brand-teal' },
    ],
  },
  {
    id: 'feeding-plan',
    question: 'Feeding plan?',
    subtitle: 'We\'ll add nursing or formula supplies accordingly.',
    type: 'single',
    field: 'feedingPlan',
    options: [
      { value: 'breastfeeding', label: 'Breastfeeding', emoji: '🤱', description: 'Nursing bras, pads, cream', color: 'bg-brand-pink' },
      { value: 'formula', label: 'Bottle / Formula', emoji: '🍼', description: 'Bottles, formula, sterilizer', color: 'bg-brand-ochre' },
      { value: 'undecided', label: 'Undecided', emoji: '🤔', description: 'Pack for both options', color: 'bg-brand-lavender' },
    ],
  },
  {
    id: 'hospital-type',
    question: 'Hospital type?',
    subtitle: 'Public and private hospitals provide different supplies.',
    type: 'single',
    field: 'hospitalType',
    options: [
      { value: 'public', label: 'Public Hospital', emoji: '🏛️', description: 'Bring more of your own supplies', color: 'bg-brand-teal' },
      { value: 'private', label: 'Private Hospital', emoji: '✨', description: 'More items provided', color: 'bg-brand-pink' },
      { value: 'homebirth', label: 'Home Birth / Birth Center', emoji: '🏠', description: 'Transfer bag essentials', color: 'bg-brand-mint' },
    ],
  },
];
