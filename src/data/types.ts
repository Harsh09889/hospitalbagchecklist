export type PersonType = 'mom' | 'baby' | 'partner';

export type CategoryId =
  | 'documents'
  | 'labor'
  | 'postpartum'
  | 'newborn'
  | 'partner'
  | 'tech';

export type BagId = 'labour' | 'mum' | 'baby' | 'partner';

export type ItemPriority = 'essential' | 'recommended' | 'optional' | 'hospital-provided';

export type DeliveryType = 'vaginal' | 'csection' | 'unsure';
export type StayDuration = 'overnight' | '2-3days' | 'extended';
export type Season = 'summer' | 'winter';
export type FeedingPlan = 'breastfeeding' | 'formula' | 'undecided';
export type HospitalType = 'public' | 'private' | 'homebirth';

export interface UserProfile {
  packingFor: PersonType[];
  dueDate?: string;
  deliveryType: DeliveryType;
  stayDuration: StayDuration;
  season: Season;
  feedingPlan: FeedingPlan;
  hospitalType: HospitalType;
}

export type ConditionEffect =
  | 'include'
  | 'exclude'
  | 'upgradePriority'
  | 'addQuantity';

export interface ItemCondition {
  type: 'deliveryType' | 'stayDuration' | 'season' | 'feedingPlan' | 'hospitalType' | 'packingFor';
  value: string;
  effect: ConditionEffect;
  extra?: string;
}

export interface MasterItem {
  id: string;
  name: string;
  category: CategoryId;
  priority: ItemPriority;
  quantity: string;
  whyNeeded: string;
  packTiming: string;
  defaultBag: BagId;
  applicableTo: PersonType[];
  conditions: ItemCondition[];
}

export interface PersonalizedItem extends MasterItem {
  checked: boolean;
  assignedBag: BagId;
  notes?: string;
  quantityOverride?: string;
}

export interface CustomItem {
  id: string;
  name: string;
  category: CategoryId;
  quantity?: string;
  assignedBag: BagId;
  checked: boolean;
  notes?: string;
}

export type BagIllustrationVariant = 'duffel' | 'tote' | 'small' | 'backpack';

export interface Bag {
  id: BagId;
  name: string;
  emoji: string;
  description: string;
  color: string;
  illustrationVariant: BagIllustrationVariant;
}

export type ViewFilter = 'all' | 'essential' | 'this-week' | 'optional';

export type ActivePanel = 'bag' | 'todo' | 'search' | 'more';

export type BagVisualState = 'empty' | 'quarter' | 'half' | 'threeQuarter' | 'complete';

export interface PackToastState {
  message: string;
  bagId?: BagId;
  itemId?: string;
}

export interface ChecklistState {
  profile: UserProfile;
  items: PersonalizedItem[];
  customItems: CustomItem[];
  bags: Bag[];
  createdAt: string;
}

export interface Category {
  id: CategoryId;
  name: string;
  emoji: string;
  description: string;
  color: 'pink' | 'teal' | 'lavender' | 'peach' | 'ochre' | 'mint';
}

export interface WizardStep {
  id: string;
  question: string;
  subtitle: string;
  type: 'multi' | 'single' | 'date';
  field: keyof UserProfile;
  options?: {
    value: string;
    label: string;
    description?: string;
    emoji?: string;
    color?: string;
  }[];
}

export type ChecklistItemView = PersonalizedItem | CustomItem;

export function isCustomItem(item: ChecklistItemView): item is CustomItem {
  return !('whyNeeded' in item);
}
