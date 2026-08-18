import type { Category } from './types';

export const CATEGORIES: Category[] = [
  {
    id: 'documents',
    name: 'Important Documents & Medical Records',
    emoji: '📄',
    description: 'IDs, insurance, birth plan, and hospital paperwork',
    color: 'pink',
  },
  {
    id: 'labor',
    name: 'Labor & Delivery Comfort Essentials',
    emoji: '🧘',
    description: 'Items to keep you comfortable during labor',
    color: 'teal',
  },
  {
    id: 'postpartum',
    name: 'Postpartum Care & Recovery (Mom)',
    emoji: '🤱',
    description: 'Recovery supplies for after delivery',
    color: 'lavender',
  },
  {
    id: 'newborn',
    name: 'Newborn Essentials & Going-Home Outfit',
    emoji: '👶',
    description: 'Everything baby needs for the hospital and trip home',
    color: 'peach',
  },
  {
    id: 'partner',
    name: 'Partner / Support Person Bag',
    emoji: '🧑‍🍼',
    description: 'Essentials for your support person',
    color: 'ochre',
  },
  {
    id: 'tech',
    name: 'Tech, Entertainment & Snacks',
    emoji: '🔌',
    description: 'Chargers, snacks, and things to pass the time',
    color: 'mint',
  },
];

export const CATEGORY_COLOR_CLASSES: Record<Category['color'], string> = {
  pink: 'bg-brand-pink text-on-primary',
  teal: 'bg-brand-teal text-on-dark',
  lavender: 'bg-brand-lavender text-ink',
  peach: 'bg-brand-peach text-ink',
  ochre: 'bg-brand-ochre text-ink',
  mint: 'bg-brand-mint text-ink',
};

export function getCategoryById(id: string) {
  return CATEGORIES.find((category) => category.id === id);
}
