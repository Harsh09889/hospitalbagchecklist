import type { FaqEntry } from '../../lib/schema';

/**
 * Each page gets its own question set. Repeating the same FAQ block across
 * pages would compete with itself, so there is deliberately no overlap.
 */

export const HOME_FAQS: FaqEntry[] = [
  {
    question: 'What to pack in hospital bag?',
    answer:
      'Start with the essentials for three people: documents and loose comfortable clothes for mom, a few bodysuits and a going-home outfit for the baby, and snacks, chargers and a change of clothes for your partner. Add toiletries, maternity pads, slippers and a long phone charger for the ward stay. Most of what you need fits in two smaller bags rather than one oversized suitcase.',
  },
  {
    question: 'What to pack in hospital bag for mom?',
    answer:
      'Mom needs loose front-opening nightwear, high-waisted cotton underwear, nursing or sports bras, maternity pads, toiletries, slippers, a water bottle and a long phone charger. Pack a separate going-home outfit in maternity sizing — you will likely still need it on discharge day. Keep a small labor bag with just the items you want within reach during birth.',
  },
  {
    question: 'When to pack hospital bag?',
    answer:
      'Most parents aim to have bags ready around 36 weeks, or a few weeks before the due date. If you are expecting twins or have been told you may deliver early, pack sooner. Once packed, keep the bag somewhere easy to grab and do a quick weekly check on snacks, chargers and documents.',
  },
  {
    question: "What's a good hospital bag checklist?",
    answer:
      'A good checklist splits items by person — mom, baby and partner — and by moment: labor, the ward stay and going home. It includes quantities, flags what your hospital may already provide, and stays short enough to actually use. Use our free checklist tool to build a personalised list, or download the printable PDF if you prefer paper.',
  },
  {
    question: 'What to pack in hospital bag for baby?',
    answer:
      'Far less than most lists suggest. Three to five bodysuits and sleepsuits, a hat, socks, two to four muslin cloths, a swaddle or two and one going-home outfit cover a typical stay. If you are driving home, you will also need an approved infant car seat fitted before your due date.',
  },
  {
    question: 'What should a dad pack in a hospital bag?',
    answer:
      'Dad or the birth partner should pack the documents folder, phone and long charger or power bank, wallet and photo ID, cash for parking, plenty of snacks and water, a change of clothes, toiletries and comfortable shoes. Assume you may be there overnight even if you expect to go home the same day.',
  },
  {
    question: 'What to pack for a C section?',
    answer:
      'Pack the same core items as a vaginal birth, plus clothing that avoids your incision: high-waisted loose underwear, soft front-opening nightdresses, a dressing gown and slip-on shoes. Plan for a slightly longer stay with one or two extra sets of clothes and underwear. Ask your care team what to expect for recovery and feeding support.',
  },
  {
    question: 'What to pack for a 7 day hospital stay?',
    answer:
      'For a week-long stay, pack five to seven sets of front-opening nightwear, seven to ten pairs of high-waisted underwear, two packs of maternity pads, full toiletries and twice the snacks and chargers you would bring for a short stay. Add extra baby outfits and muslins, and make sure your partner has enough clothes for several nights. Ask your hospital what they supply so you are not duplicating towels or basic toiletries.',
  },
  {
    question: 'Hospital bag birth: what you actually need',
    answer:
      'In the labor room, parents consistently use a short list: documents, a loose nightdress or old T-shirt, warm socks, hair ties, lip balm, a water bottle with a straw, phone and long charger, and something to listen to. Most other packed items stay in the bigger bag until you move to the ward. Check with your unit about food and drink during labor.',
  },
  {
    question: 'What is the list of delivery items?',
    answer:
      'Delivery items fall into two groups: paperwork and comfort. For paperwork, bring photo ID, insurance details, maternity notes, birth preferences and a medication list in one folder. For comfort during labor and birth, pack a loose outfit, warm socks, hair ties, lip balm, a straw water bottle, phone charger and any personal items your hospital allows in the delivery room.',
  },
  {
    question: 'Do you wear a bra during labor?',
    answer:
      'Many people wear a soft sports bra or a nursing bra during labor for modesty and support, especially if you plan to use a birthing pool or move around. Others prefer a loose nightdress alone or a hospital gown. There is no single right answer — pick something comfortable that you do not mind getting messy, and ask your midwife what your unit recommends.',
  },
  {
    question: 'What is the 5-5-5 rule for postpartum recovery?',
    answer:
      'The 5-5-5 rule is a traditional postpartum guideline: roughly five days resting in bed, five days resting on or near the bed, and five days doing gentle activity around the bed before returning to normal routines. It is a reminder to recover slowly rather than a strict medical rule. Every birth is different, so follow the guidance of your doctor or midwife instead.',
  },
  {
    question: 'What is a pregnancy checklist?',
    answer:
      'A pregnancy checklist covers the practical tasks before birth: registering with your hospital, completing antenatal appointments, buying newborn essentials, installing a car seat and packing your hospital bags on time. A hospital bag checklist is one part of that wider list. Our pregnancy packing guide includes a week-by-week timeline so you know when to start and what to buy first.',
  },
];

export const MOM_FAQS: FaqEntry[] = [
  {
    question: 'How many outfits does mom need in her hospital bag?',
    answer:
      'For a typical two to three day stay, two sets of front-opening pyjamas, five to six pairs of high-waisted underwear and one loose going-home outfit is plenty. If you are staying longer or having a C-section, add an extra set or two.',
  },
  {
    question: 'What should I wear during labor?',
    answer:
      'Most people prefer a loose nightdress or an oversized old T-shirt they will not mind ruining, plus warm socks. Hospitals will also offer you a gown. Pick something you can move in and are comfortable being examined in.',
  },
  {
    question: 'What size clothes should I pack for going home?',
    answer:
      'Pack the maternity sizing you have been wearing in your third trimester. It is very normal to still look around six months pregnant on the day you leave, so soft leggings and a loose top are far more comfortable than pre-pregnancy jeans.',
  },
  {
    question: 'Do I need to pack my own towels and toiletries?',
    answer:
      'Many hospitals provide towels, but plenty do not, and shared bathrooms are common. Travel-sized toiletries, a small towel, a toothbrush and dry shampoo cover most needs. Ask your maternity unit what is supplied before you pack the bulky items.',
  },
  {
    question: 'What is the most commonly forgotten item for mom?',
    answer:
      'A long phone charger. Hospital sockets are often nowhere near the bed, and a standard one-metre cable will not reach. A power bank is an even safer bet. Lip balm and a water bottle with a straw are close behind.',
  },
];

export const BABY_FAQS: FaqEntry[] = [
  {
    question: 'What size clothes should I bring for my newborn?',
    answer:
      'Pack mostly newborn size, but bring one outfit in the next size up as well. Birth weight is hard to predict, and having both means the going-home photo is not a struggle.',
  },
  {
    question: 'Do I need to wash baby clothes before the hospital?',
    answer:
      'Most parents wash and dry everything before packing, using a gentle non-biological detergent. It removes any storage residue and means the clothes are soft and ready to wear straight from the bag.',
  },
  {
    question: 'How many muslin cloths should I pack?',
    answer:
      'Two to four is plenty for a short stay, and they are consistently one of the most-used items parents pack. They double as burp cloths, feeding cover, a clean surface and a light layer.',
  },
  {
    question: 'Does my baby need a car seat to leave the hospital?',
    answer:
      'If you are travelling home by car, you will almost certainly need an approved infant car seat, and many hospitals will not discharge you without one. Fit it and practise using it well before your due date rather than in the car park.',
  },
  {
    question: 'Should I pack bottles and formula?',
    answer:
      'It depends on your feeding plans and your hospital. Some units supply formula and sterilised bottles, others ask you to bring your own. Check ahead, and speak to your midwife or doctor about feeding decisions.',
  },
];

export const DAD_FAQS: FaqEntry[] = [
  {
    question: 'Does dad need his own hospital bag?',
    answer:
      'A small separate bag is worth it. It keeps your things from getting mixed up with mom and baby, and it means you can grab it quickly if you need to head home for something. A backpack is usually easier than a duffel.',
  },
  {
    question: 'Can dad stay overnight at the hospital?',
    answer:
      'Policies vary widely between hospitals and even between wards. Some allow a birth partner to stay throughout, others have visiting hours. Ask before your due date so you know whether to pack for an overnight stay.',
  },
  {
    question: 'What should dad wear to the hospital?',
    answer:
      'Comfortable layers and shoes you can be on your feet in. Labor rooms are often kept warm while corridors and overnight wards are cold, so a T-shirt plus a jumper works better than one heavy top.',
  },
  {
    question: 'What is the most useful thing a birth partner can pack?',
    answer:
      'Food, a power bank and cash. Hospital kitchens close, phone batteries drain fast during a long labor, and parking machines are not always card-friendly. Being the person who solves those problems is genuinely helpful.',
  },
  {
    question: 'Should dad be in charge of the paperwork?',
    answer:
      'It usually helps. Keep the documents folder in your bag and know what is in it, so mom does not have to think about admin during labor. Confirm you both know where the folder lives before the day arrives.',
  },
];

export const MOM_AND_BABY_FAQS: FaqEntry[] = [
  {
    question: 'Can I pack one bag for mom and baby together?',
    answer:
      'You can, but most parents find two or three smaller bags easier to work with. Mom and baby items get used at different moments, and a smaller labor bag is much simpler to carry into the delivery room.',
  },
  {
    question: 'How should we split the bags between us?',
    answer:
      'A common split is a small labor bag that stays with mom, a larger stay bag with clothes and toiletries, a baby bag, and a compact bag for the birth partner. Label them so anyone can find things without unpacking everything.',
  },
  {
    question: 'How many bags is too many?',
    answer:
      'Three or four modest bags is usually the practical limit, especially if space in the labor room is restricted. If you cannot carry it all in one trip, it is worth leaving the non-essentials in the car.',
  },
  {
    question: 'Should we pack duplicates of anything?',
    answer:
      'Chargers are the one thing worth duplicating, since both of you will be using your phones heavily. Beyond that, one set of toiletries and one folder of documents shared between you is enough.',
  },
];

export const LABOR_FAQS: FaqEntry[] = [
  {
    question: 'What actually gets used in the labor room?',
    answer:
      'Parents consistently report the same short list: a water bottle, lip balm, hair ties, warm socks, a phone charger and something to listen to. Most of what people pack for labor stays in the bag.',
  },
  {
    question: 'Can I eat and drink during labor?',
    answer:
      'This varies between hospitals and depends on your individual circumstances, so ask your maternity unit in advance. Pack snacks for after delivery either way — you may be hungry at a time when the hospital kitchen is closed.',
  },
  {
    question: 'How long should I pack for?',
    answer:
      'Pack for the length of stay your hospital typically expects, then add a spare set of clothes. Vaginal births often mean one to two nights and a C-section is often longer, but your unit can give you a realistic range.',
  },
  {
    question: 'When should I take my bag to the hospital?',
    answer:
      'Take the small labor bag in with you and leave the larger bag in the car. Your partner can bring it up once you have been admitted and moved to a room, which saves carrying everything through triage.',
  },
  {
    question: 'What if labor starts before I have packed?',
    answer:
      'Focus on the essentials: documents, phone and charger, one change of clothes for you, a going-home outfit for the baby and a car seat. Everything else can be brought in later by a partner or family member.',
  },
];

export const CSECTION_FAQS: FaqEntry[] = [
  {
    question: 'How is a C-section hospital bag different?',
    answer:
      'The contents are broadly the same, with two practical adjustments: clothing that does not sit on your incision, and enough for a slightly longer stay. High-waisted loose underwear and soft nightdresses are the items people most often wish they had packed.',
  },
  {
    question: 'What should I wear after a C-section?',
    answer:
      'Loose, soft and high-waisted. Nightdresses that open at the front, underwear with a waistband well above the incision, and a dressing gown for walking on the ward. Avoid anything with a tight or low waistband.',
  },
  {
    question: 'How long will I stay in hospital after a cesarean?',
    answer:
      'Cesarean stays are commonly longer than after a vaginal birth, but the exact length depends on you, your baby and your hospital. Ask your doctor or midwife what to expect so you can pack the right number of changes.',
  },
  {
    question: 'Should I pack for a C-section if mine is not planned?',
    answer:
      'It is worth adding a few items just in case, since some cesareans are unplanned. An extra pack of high-waisted underwear and one spare set of loose clothing covers most of the difference without overpacking.',
  },
  {
    question: 'What should I ask my care team before a planned C-section?',
    answer:
      'Ask about arrival time and fasting instructions, how long you are likely to stay, what you can bring into theatre, whether your partner can stay overnight, and what support you will have with feeding and moving around.',
  },
];

export const PREGNANCY_FAQS: FaqEntry[] = [
  {
    question: 'Is 36 weeks too late to pack a hospital bag?',
    answer:
      'For most pregnancies 36 weeks is a common and reasonable target, and some guidance suggests being ready around three weeks before your due date. If you are expecting twins or have been told you may deliver early, pack sooner.',
  },
  {
    question: 'What should I buy first?',
    answer:
      'Start with the things you cannot borrow or improvise: maternity pads, nursing bras, newborn clothes and a car seat. Toiletries and snacks can wait until the last couple of weeks.',
  },
  {
    question: 'Where should I keep the bag once it is packed?',
    answer:
      'Somewhere you can grab it without thinking — by the front door, at the bottom of the stairs or in the car boot. The important part is that your partner knows exactly where it is and what is in it.',
  },
  {
    question: 'What should I check on the bag each week?',
    answer:
      'Snacks, chargers and documents. Snacks get eaten, chargers get borrowed for other devices and paperwork gets taken out for appointments. A quick weekly look keeps the bag genuinely ready.',
  },
  {
    question: 'Do I need a separate bag ready for an early delivery?',
    answer:
      'Not a separate bag, but it helps to pack in an order that works early. Keep documents, one change of clothes for you and a newborn outfit at the top so a partly packed bag is still useful if plans change.',
  },
];

export const PDF_FAQS: FaqEntry[] = [
  {
    question: 'Is the printable hospital bag checklist free?',
    answer:
      'Yes. You can print the full checklist for mom, baby and dad straight from your browser at no cost, and there is nothing to sign up for.',
  },
  {
    question: 'What is included in the printable checklist?',
    answer:
      'It covers mom for labor, the hospital stay and going home, baby clothes and care items, the birth partner list, documents and paperwork, and a short list of questions to ask your hospital.',
  },
  {
    question: 'Can I print it on one page?',
    answer:
      'The full checklist is designed to print cleanly across two pages at normal scale. If you want it on one sheet, set your print scale to around 70 percent or print the section you need most.',
  },
  {
    question: 'Can I share the checklist with my partner?',
    answer:
      'Yes. Print a second copy for your partner, or simply send them the link. Many parents keep one copy on the fridge and one in the hospital bag itself.',
  },
];
