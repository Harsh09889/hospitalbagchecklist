import type { AccentName } from '../../lib/accents';

export interface PackItem {
  name: string;
  /** How many to pack. `Ask` means it depends on the hospital. */
  qty?: string;
  /** One short, practical reason or caveat. */
  note?: string;
}

export interface PackGroup {
  id: string;
  title: string;
  intro: string;
  accent: AccentName;
  items: PackItem[];
}

/* ------------------------------------------------------------------ *
 * Mom
 * ------------------------------------------------------------------ */

export const MOM_GROUPS: PackGroup[] = [
  {
    id: 'mom-labor',
    title: 'For labor',
    intro:
      'The bag you want within reach in the labor room. Keep it small and keep it separate — you may not want to unpack everything straight away.',
    accent: 'coral',
    items: [
      { name: 'Hospital and ID documents', qty: '1 folder', note: 'Keep originals and copies together' },
      { name: 'Loose nightdress or oversized T-shirt', qty: '1–2', note: 'Something you will not mind ruining' },
      { name: 'Comfortable robe or cardigan', qty: '1', note: 'Wards can be cold at night' },
      { name: 'Non-slip slippers or flip-flops', qty: '1 pair', note: 'Also useful for shared showers' },
      { name: 'Warm socks', qty: '2 pairs', note: 'Feet get cold during labor' },
      { name: 'Hair ties or a soft hair band', qty: '2–3' },
      { name: 'Lip balm', qty: '1', note: 'Breathing through contractions dries lips fast' },
      { name: 'Water bottle with a straw', qty: '1', note: 'Easier to sip lying down' },
      { name: 'Light snacks for after delivery', qty: 'A few', note: 'Check what your hospital allows during labor' },
      { name: 'Phone and a long charging cable', qty: '1 each', note: 'Sockets are rarely next to the bed' },
      { name: 'Your birth preferences, written down', qty: '1 copy', note: 'Simple bullet points beat a long document' },
      { name: 'Glasses or spare contact lenses', qty: '1', note: 'You may not be able to wear lenses in theatre' },
    ],
  },
  {
    id: 'mom-stay',
    title: 'For your hospital stay',
    intro:
      'Everything for the hours and days after birth. Pack this as a second bag so your partner can bring it in once you are settled.',
    accent: 'lavender',
    items: [
      { name: 'Nursing or feeding-friendly bras', qty: '2–3', note: 'Soft, wire-free and a size up is usually kindest' },
      { name: 'Comfortable pyjamas that open at the front', qty: '2', note: 'Front buttons make feeding much easier' },
      { name: 'High-waisted cotton underwear', qty: '5–6', note: 'Dark colours, and roomier than usual' },
      { name: 'Maternity pads', qty: '1–2 packs', note: 'Some hospitals provide these — worth asking first' },
      { name: 'Breast pads', qty: '1 pack' },
      { name: 'Nipple cream', qty: '1' },
      { name: 'Toiletries and a small towel', qty: '1 set', note: 'Travel sizes are plenty' },
      { name: 'Hairbrush, toothbrush and toothpaste', qty: '1 each' },
      { name: 'Any regular medication', qty: 'As prescribed', note: 'Tell your care team what you are taking' },
      { name: 'Towel and quick-dry hand towel', qty: '1–2', note: 'Ask whether towels are provided' },
      { name: 'Reusable water bottle', qty: '1', note: 'Feeding makes you very thirsty' },
      { name: 'Snacks you actually like', qty: 'A small box', note: 'Hospital kitchens close overnight' },
    ],
  },
  {
    id: 'mom-home',
    title: 'For going home',
    intro:
      'Pack one loose, comfortable outfit. You will likely still look and feel around six months pregnant, and that is completely normal.',
    accent: 'sage',
    items: [
      { name: 'Loose going-home outfit', qty: '1', note: 'Think maternity leggings and a soft top' },
      { name: 'Slip-on shoes', qty: '1 pair', note: 'Bending down is awkward for a while' },
      { name: 'A cardigan or jacket', qty: '1' },
      { name: 'Feeding-friendly top', qty: '1', note: 'You may need to feed before you leave' },
    ],
  },
];

/* ------------------------------------------------------------------ *
 * Baby
 * ------------------------------------------------------------------ */

export const BABY_GROUPS: PackGroup[] = [
  {
    id: 'baby-clothes',
    title: 'Clothes',
    intro:
      'Newborns go through more outfits than you expect, but you still do not need a suitcase. Two or three changes plus a going-home outfit covers most stays.',
    accent: 'butter',
    items: [
      { name: 'Bodysuits or vests', qty: '3–5', note: 'Envelope necks pull off downwards, not over the head' },
      { name: 'Sleepsuits or babygrows', qty: '3–5', note: 'Built-in feet save you packing socks' },
      { name: 'Going-home outfit', qty: '1', note: 'Pick newborn size and one size up — babies vary' },
      { name: 'Soft hat', qty: '1–2', note: 'Newborns lose heat through their heads quickly' },
      { name: 'Socks or booties', qty: '2 pairs' },
      { name: 'Scratch mittens', qty: '1–2 pairs', note: 'Optional, but handy for sharp little nails' },
      { name: 'Cardigan or jacket', qty: '1', note: 'Match it to the season and the trip home' },
    ],
  },
  {
    id: 'baby-care',
    title: 'Diapers and care',
    intro:
      'This is the part that varies most between hospitals. Many maternity units supply diapers and wipes for the stay — a quick phone call will tell you.',
    accent: 'sky',
    items: [
      { name: 'Newborn diapers', qty: 'Ask', note: 'Many hospitals provide these for the stay' },
      { name: 'Wipes or cotton wool', qty: '1 pack', note: 'Cotton wool and water is gentler on day-one skin' },
      { name: 'Muslin cloths', qty: '2–4', note: 'The single most-used item most parents pack' },
      { name: 'Swaddles or light blankets', qty: '2', note: 'Also useful for feeding cover and warmth' },
      { name: 'Barrier or nappy cream', qty: '1', note: 'Optional for a short stay' },
      { name: 'Feeding equipment', qty: 'As needed', note: 'If you plan to formula feed, ask what the ward supplies' },
    ],
  },
  {
    id: 'baby-home',
    title: 'For the trip home',
    intro:
      'The one thing you truly cannot improvise. If you are travelling home by car, most hospitals will not discharge you without an approved car seat.',
    accent: 'mint',
    items: [
      { name: 'Approved infant car seat', qty: '1', note: 'Fit and practise with it before your due date' },
      { name: 'Weather-appropriate outer layer', qty: '1', note: 'Thick coats do not belong under car seat straps' },
      { name: 'Blanket for the car seat', qty: '1', note: 'Tuck it over the straps, never underneath' },
      { name: 'Pram or carrier', qty: 'Optional', note: 'Leave it in the car until you need it' },
    ],
  },
];

/* ------------------------------------------------------------------ *
 * Dad / partner
 * ------------------------------------------------------------------ */

export const DAD_GROUPS: PackGroup[] = [
  {
    id: 'dad-essentials',
    title: 'Essentials',
    intro:
      'The practical things that make you useful rather than stranded. If you only pack one bag, make sure these are in it.',
    accent: 'sky',
    items: [
      { name: 'Phone and long charger', qty: '1 each', note: 'A power bank is even better' },
      { name: 'Wallet, ID and insurance card', qty: '1' },
      { name: 'Cash and small change', qty: 'Some', note: 'For parking, vending machines and taxis' },
      { name: 'Hospital paperwork and notes', qty: '1 folder', note: 'You will be the one handing these over' },
      { name: 'Car keys and parking details', qty: '1 set', note: 'Note the level and bay number' },
      { name: 'Contact list', qty: '1', note: 'Written down, in case your phone dies' },
      { name: 'Snacks and a water bottle', qty: 'Plenty', note: 'Labor can run through every mealtime' },
    ],
  },
  {
    id: 'dad-stay',
    title: 'For the stay',
    intro:
      'Labor is long and hospital chairs are not kind. Pack as if you are staying overnight, even if you expect to go home.',
    accent: 'coral',
    items: [
      { name: 'Change of clothes', qty: '1–2 sets', note: 'Layers — labor rooms run warm' },
      { name: 'Toiletries and deodorant', qty: '1 set' },
      { name: 'Comfortable shoes', qty: '1 pair', note: 'You will be on your feet more than you think' },
      { name: 'Any regular medication', qty: 'As prescribed' },
      { name: 'Glasses or contact lenses', qty: '1' },
      { name: 'Swim shorts or a spare T-shirt', qty: '1', note: 'If you might get into a birth pool or shower room' },
      { name: 'Something to pass the time', qty: '1', note: 'Headphones, a book or a downloaded playlist' },
      { name: 'Light jumper or blanket', qty: '1', note: 'Overnight wards get cold' },
    ],
  },
];

/* ------------------------------------------------------------------ *
 * Shared groups reused across pages
 * ------------------------------------------------------------------ */

export const DOCUMENT_GROUP: PackGroup = {
  id: 'documents',
  title: 'Documents and paperwork',
  intro:
    'The one section worth double-checking. Sort it early, keep it in one folder and let your partner know where it lives.',
  accent: 'lavender',
  items: [
    { name: 'Photo ID for both parents', qty: '1 each' },
    { name: 'Insurance card or scheme details', qty: '1' },
    { name: 'Hospital registration or booking papers', qty: '1' },
    { name: 'Maternity notes and scan reports', qty: 'All of them', note: 'Bring the full file, not just the latest' },
    { name: 'Blood test and screening results', qty: '1 set' },
    { name: 'Your written birth preferences', qty: '2 copies', note: 'One for you, one for your care team' },
    { name: 'List of medications and allergies', qty: '1' },
    { name: 'Emergency contact numbers', qty: '1', note: 'On paper as well as on your phone' },
  ],
};

export const LABOR_COMFORT_GROUP: PackGroup = {
  id: 'labor-comfort',
  title: 'Comfort in the labor room',
  intro:
    'Labor can be long and unpredictable. These are the small things people say made the biggest difference to how the room felt.',
  accent: 'butter',
  items: [
    { name: 'Water bottle with a sports cap', qty: '1', note: 'Sipping between contractions is easier than a glass' },
    { name: 'Lip balm', qty: '1' },
    { name: 'Hair tie', qty: '2–3' },
    { name: 'Handheld fan or cool spray', qty: '1', note: 'A common favourite, especially in warmer months' },
    { name: 'Warm socks', qty: '2 pairs' },
    { name: 'Downloaded playlist or podcast', qty: '1', note: 'Download it — hospital wifi is unreliable' },
    { name: 'Headphones', qty: '1' },
    { name: 'Massage oil or a tennis ball', qty: '1', note: 'For lower-back pressure, if you want it' },
    { name: 'Eye mask and earplugs', qty: '1 set', note: 'Wards rarely go fully dark or quiet' },
    { name: 'Energy snacks for your partner', qty: 'A few' },
  ],
};

export const CSECTION_GROUP: PackGroup = {
  id: 'csection-extras',
  title: 'Extras worth packing for a C-section',
  intro:
    'A cesarean is abdominal surgery, so the practical difference is mostly about clothing that avoids your incision and planning for a slightly longer stay.',
  accent: 'mint',
  items: [
    { name: 'High-waisted loose underwear', qty: '6–8', note: 'The waistband should sit well above the incision' },
    { name: 'Loose, soft nightdresses', qty: '2–3', note: 'Nothing that presses on your stomach' },
    { name: 'Dressing gown', qty: '1', note: 'Useful for short, supported walks along the ward' },
    { name: 'Slip-on shoes', qty: '1 pair', note: 'Bending and reaching is difficult at first' },
    { name: 'Extra days of clothing', qty: '+1–2 sets', note: 'Cesarean stays are often a little longer' },
    { name: 'Long phone charger', qty: '1', note: 'You may not be able to reach a distant socket' },
    { name: 'A small pillow for the car', qty: '1', note: 'Some people find it eases the seatbelt on the way home' },
    { name: 'Peppermint tea or capsules', qty: 'Optional', note: 'Ask your care team before taking anything' },
    { name: 'Written questions for your team', qty: '1 list', note: 'Recovery advice should come from your doctor or midwife' },
  ],
};

/* ------------------------------------------------------------------ *
 * Must-have vs nice-to-have
 * ------------------------------------------------------------------ */

export const MUST_PACK: string[] = [
  'Photo ID and insurance details',
  'Maternity notes and hospital paperwork',
  'Phone and a long charger',
  'Loose nightwear and a robe',
  'High-waisted underwear and maternity pads',
  'Toiletries and a toothbrush',
  'Baby bodysuits and sleepsuits',
  'Muslin cloths and swaddles',
  'Going-home outfits for you and baby',
  'An approved car seat',
];

export const NICE_TO_HAVE: string[] = [
  'Eye mask and earplugs',
  'Your own pillow',
  'Handheld fan',
  'Feeding pillow',
  'Dry shampoo',
  'Downloaded shows or a book',
  'A camera other than your phone',
  'Snacks beyond the first day',
  'Bluetooth speaker',
  'Something soft from home',
];

/* ------------------------------------------------------------------ *
 * Timeline and hospital questions
 * ------------------------------------------------------------------ */

export interface TimelineStep {
  week: string;
  title: string;
  body: string;
  accent: AccentName;
}

export const PACKING_TIMELINE: TimelineStep[] = [
  {
    week: '32 weeks',
    title: 'Make your list',
    body: 'Write down what you already own and what you still need. Nothing needs buying yet — this is just the shopping list.',
    accent: 'sky',
  },
  {
    week: '34 weeks',
    title: 'Buy the remaining essentials',
    body: 'Pick up maternity pads, nursing bras, newborn clothes and toiletries. Wash and dry anything that touches the baby.',
    accent: 'lavender',
  },
  {
    week: '36 weeks',
    title: 'Pack the bags',
    body: 'Split things into a small labor bag and a larger stay bag. Show your partner exactly where each one is.',
    accent: 'coral',
  },
  {
    week: '37 weeks +',
    title: 'Keep it ready to go',
    body: 'Leave the bags by the door or in the car. Top up snacks and chargers, and keep your documents in the same folder.',
    accent: 'mint',
  },
];

export interface HospitalQuestion {
  question: string;
  why: string;
}

export const HOSPITAL_QUESTIONS: HospitalQuestion[] = [
  {
    question: 'Do you provide diapers and wipes for the baby?',
    why: 'This is the single biggest difference between hospitals, and it changes what you pack.',
  },
  {
    question: 'Do you provide baby clothes, or should we bring our own?',
    why: 'Some wards dress babies in hospital-issue clothing for the whole stay.',
  },
  {
    question: 'Are maternity pads and towels supplied?',
    why: 'If they are, you can leave a bulky pack at home.',
  },
  {
    question: 'What can I bring into the labor room?',
    why: 'Space is limited and some units restrict bags, food or equipment.',
  },
  {
    question: 'How long is a typical stay after a vaginal birth or a C-section?',
    why: 'It tells you how many changes of clothing to pack.',
  },
  {
    question: 'Can my partner stay overnight?',
    why: 'If not, your partner does not need an overnight bag at the hospital.',
  },
  {
    question: 'Is there a fridge, a kettle or somewhere to store food?',
    why: 'Decides whether snacks need to be shelf-stable.',
  },
  {
    question: 'Where should we park, and what are the arrival instructions at night?',
    why: 'Worth knowing before you need it at 3am.',
  },
];

/* ------------------------------------------------------------------ *
 * Homepage checklist preview
 * ------------------------------------------------------------------ */

export interface PreviewSection {
  label: string;
  accent: AccentName;
  items: { name: string; qty: string; checked: boolean }[];
}

export const PREVIEW_SECTIONS: PreviewSection[] = [
  {
    label: 'Mom',
    accent: 'lavender',
    items: [
      { name: 'Comfortable nightwear', qty: '2', checked: true },
      { name: 'Nursing bras', qty: '2–3', checked: true },
      { name: 'High-waisted underwear', qty: '5–6', checked: true },
      { name: 'Maternity pads', qty: '1–2 packs', checked: false },
      { name: 'Toiletries and towel', qty: '1 set', checked: false },
    ],
  },
  {
    label: 'Baby',
    accent: 'butter',
    items: [
      { name: 'Bodysuits and sleepsuits', qty: '3–5', checked: true },
      { name: 'Muslin cloths', qty: '2–4', checked: true },
      { name: 'Swaddles', qty: '2', checked: false },
      { name: 'Diapers', qty: 'Ask', checked: false },
    ],
  },
  {
    label: 'Dad',
    accent: 'sky',
    items: [
      { name: 'Long phone charger', qty: '1', checked: true },
      { name: 'Snacks and water', qty: 'Plenty', checked: false },
      { name: 'Change of clothes', qty: '1–2', checked: false },
    ],
  },
];
