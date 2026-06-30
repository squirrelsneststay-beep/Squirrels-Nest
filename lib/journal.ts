/**
 * The Journal — short, local guide posts written in the cabin's voice. These
 * are content-SEO pages: they target what guests actually search ("places to
 * stay in Berkshire", "country pubs near Newbury", "North Wessex Downs walks")
 * and cross-link back to the cabin. Every place named here is real and was
 * checked against current sources before publishing.
 *
 * To add a post: append to JOURNAL_POSTS. The /journal index and
 * /journal/[slug] pages, the sitemap and the structured data all read from
 * this one array.
 */

export interface JournalSection {
  heading: string;
  body: string[];
}

export interface JournalPost {
  slug: string;
  title: string;
  /** One-line hook for the index cards. */
  excerpt: string;
  /** Search-result meta description (~150–160 chars). */
  metaDescription: string;
  /** ISO date, used for <time> and structured data. */
  date: string;
  /** Human label, e.g. "June 2026". */
  dateLabel: string;
  readMinutes: number;
  heroImage: string;
  heroAlt: string;
  keywords: string[];
  intro: string[];
  sections: JournalSection[];
}

export const JOURNAL_POSTS: JournalPost[] = [
  {
    slug: "a-slow-weekend-in-the-berkshire-countryside",
    title: "A Slow Weekend in the Berkshire Countryside",
    excerpt:
      "A morning on the Downs, a long pub lunch, an afternoon at Highclere, and a quiet evening back at the cabin. How we would spend two unhurried days.",
    metaDescription:
      "How to spend an unhurried weekend in the Berkshire countryside from Squirrels' Nest: a walk on the North Wessex Downs, a long pub lunch, Highclere Castle, and a quiet evening at the cabin.",
    date: "2026-06-21",
    dateLabel: "June 2026",
    readMinutes: 5,
    heroImage: "/images/squirrels-nest/sq-03.jpg",
    heroAlt:
      "Wisteria climbing the timber-clad country house at Squirrels' Nest in the Berkshire countryside",
    keywords: [
      "weekend in Berkshire",
      "Berkshire countryside getaway",
      "places to stay in Berkshire",
      "things to do near Newbury",
      "countryside retreat Berkshire",
    ],
    intro: [
      "There is a particular kind of weekend that the Berkshire countryside does well. No rushing, no long list of things you must see. Just a slow start, a good walk, a long lunch, and time to watch the light change over the fields.",
      "Squirrels' Nest sits on the quiet edge of West Berkshire, close to the Hampshire border and the North Wessex Downs. From the cabin door you are minutes from some of the loveliest corners of the county. Here is how we would spend two unhurried days.",
    ],
    sections: [
      {
        heading: "Saturday morning: out on the Downs",
        body: [
          "Start with the walk while the day is still cool. The North Wessex Downs rise just south of the cabin, and Walbury Hill is the obvious first stop. At 297 metres it is the highest chalk hill in England, and the view from the top runs for miles across the Kennet Valley. Park near the ridge, follow the old track along Gallows Down, and you will reach Combe Gibbet, a lone seventeenth-century gallows standing on an ancient burial mound. It is a strange and beautiful spot, and almost always empty.",
          "If you would rather keep things gentle, the Kennet and Avon Canal towpath is flat, shaded and easy underfoot. Pick it up at Kintbury and follow the water west, past locks and handsome brick bridges, with swans and moorhens for company.",
        ],
      },
      {
        heading: "A long lunch",
        body: [
          "By midday you will have earned a proper sit-down. The Dundas Arms in Kintbury stands right on the canal, on its own little lock island, and is a fine place to spend an afternoon. For something with rooms and rosettes, the Bunk Inn at Curridge does unhurried, generous food. We have gathered our favourites in a separate post if you would like the full list.",
        ],
      },
      {
        heading: "Saturday afternoon: Highclere and history",
        body: [
          "Highclere Castle, the real Downton Abbey, is only a short drive away. Beyond the house itself there is an Egyptian Exhibition of treasures collected by the fifth Earl of Carnarvon, who helped uncover Tutankhamun's tomb, and a thousand acres of parkland to wander.",
          "If you prefer your history quieter, Sandham Memorial Chapel at Burghclere holds a remarkable set of murals painted by Stanley Spencer after the First World War. Donnington Castle, just outside Newbury, is a ruined gatehouse on a hill with sweeping views and no entry fee.",
        ],
      },
      {
        heading: "Sunday: slow and local",
        body: [
          "Give Sunday to the small things. Newbury has a market on Tuesdays and Thursdays, a free local museum, and the canal running straight through the middle of town. Hungerford, a few minutes west, is known for its antique shops and its long Georgian high street.",
          "Then back to the cabin, boots off, kettle on, and the rest of the day to yourselves. That, really, is the whole point of a weekend out here.",
        ],
      },
    ],
  },
  {
    slug: "country-pubs-near-squirrels-nest",
    title: "Our Favourite Country Pubs Near the Cabin",
    excerpt:
      "From a Georgian inn on the canal at Kintbury to rosette-winning food and roaring fires, the pubs we send guests to. All an easy drive from the cabin.",
    metaDescription:
      "A short guide to the best country pubs near Squirrels' Nest and Newbury, from a Georgian inn on the canal at Kintbury to rosette-winning food in the West Berkshire villages.",
    date: "2026-06-24",
    dateLabel: "June 2026",
    readMinutes: 4,
    heroImage: "/images/squirrels-nest/sq-18.jpg",
    heroAlt:
      "A cosy corner at Squirrels' Nest, the kind of warmth you find in a Berkshire country pub",
    keywords: [
      "country pubs near Newbury",
      "best pubs Berkshire",
      "pubs near Highclere",
      "Kintbury Dundas Arms",
      "pub lunch Berkshire",
    ],
    intro: [
      "A good country pub is half the reason to come to Berkshire. The lanes around the cabin are dotted with them, from canal-side inns to village locals with proper fires and proper roasts.",
      "These are the ones we send guests to. All within an easy drive of Squirrels' Nest.",
    ],
    sections: [
      {
        heading: "The Dundas Arms, Kintbury",
        body: [
          "A Grade II listed Georgian inn on the banks of the Kennet, the Dundas Arms sits on its own lock island where the river and the canal meet. The look is relaxed country house, with deep colours and good bathrooms if you stay over, and the terrace by the water is the place to be on a warm afternoon. Walk in along the towpath and you will have earned your lunch twice over.",
        ],
      },
      {
        heading: "The Bunk Inn, Curridge",
        body: [
          "Tucked into the village of Curridge, the Bunk Inn is the one for a long, generous meal. It holds an AA four-star rating and two rosettes for its food, and has a handful of comfortable rooms. Unhurried, welcoming, and well worth booking ahead at the weekend.",
        ],
      },
      {
        heading: "The Crab & Boar, Chieveley",
        body: [
          "A rural inn in a lovely setting north of Newbury, the Crab and Boar is built for walkers. There are a small number of cosy, contemporary rooms, some with their own outdoor hot tubs, and the kind of food you want after a long day on the Downs.",
        ],
      },
      {
        heading: "The Pheasant and the Berkshire Arms",
        body: [
          "Two more worth knowing. The Pheasant is a beautifully refurbished inn looking out over the Berkshire Downs, all pale rooms and careful cooking. The Berkshire Arms keeps things simpler, with an honest menu of pub classics and a friendly welcome. Between them you will not go hungry.",
        ],
      },
      {
        heading: "A note on booking",
        body: [
          "Sunday lunch in particular fills up quickly out here, so it is always worth ringing ahead. Most of these are a ten to twenty minute drive from the cabin, and several sit right on a good walk if you would like to make a day of it.",
        ],
      },
    ],
  },
  {
    slug: "best-walks-north-wessex-downs",
    title: "Walks from the Doorstep: The North Wessex Downs",
    excerpt:
      "Three walks we come back to, from the highest chalk hill in England to a flat, easy amble by the canal. Big skies, ancient tracks, and not many people.",
    metaDescription:
      "Our favourite walks near Squirrels' Nest, from the highest chalk hill in England at Walbury Hill to Watership Down and the flat, easy Kennet and Avon canal towpath.",
    date: "2026-06-27",
    dateLabel: "June 2026",
    readMinutes: 5,
    heroImage: "/images/squirrels-nest/sq-30.jpg",
    heroAlt:
      "The countryside setting around Squirrels' Nest on the edge of the North Wessex Downs",
    keywords: [
      "walks near Newbury",
      "North Wessex Downs walks",
      "Walbury Hill walk",
      "Watership Down walk",
      "Kennet and Avon canal walk",
    ],
    intro: [
      "One of the joys of staying out here is how quickly you can be on a footpath. The North Wessex Downs, a protected landscape of chalk hills and big skies, begin just south of the cabin, and there is something to suit every pair of legs.",
      "Here are three walks we come back to, from a proper hill climb to a flat amble by the water.",
    ],
    sections: [
      {
        heading: "Walbury Hill and Combe Gibbet",
        body: [
          "If you only do one walk, make it this. Walbury Hill is the highest chalk hill in England at 297 metres, crowned by the ramparts of an Iron Age fort, and on a clear day the view stretches across three counties. From the ridge, an easy track leads along Gallows Down to Combe Gibbet, a tall wooden gallows standing alone on an ancient long barrow. The history is grim, the setting is glorious, and you will likely have it almost to yourself. The wind can be fierce on the top, so bring a layer.",
        ],
      },
      {
        heading: "Watership Down",
        body: [
          "Just over the Hampshire border lies Watership Down, the chalk ridge made famous by Richard Adams' novel. A circular walk from the lanes near Kingsclere climbs through old broad-leaf woodland and out onto open downland, with skylarks overhead in summer and far-reaching views in every direction. It is a steadier climb than Walbury, and every bit as rewarding.",
        ],
      },
      {
        heading: "The Kennet and Avon Canal",
        body: [
          "For an easy, flat walk with no map required, follow the Kennet and Avon Canal. The prettiest stretch runs west from Newbury through Kintbury towards Hungerford, past locks, swing bridges and eighteenth-century brickwork, with the Kennet Valley rolling away on either side. Around Hungerford Marsh the canal becomes a nature reserve where more than a hundred bird species have been recorded. Keep an eye out for the old pillboxes half-hidden in the bank, a reminder of when this quiet line of water was a planned last line of defence.",
        ],
      },
      {
        heading: "Closer to home",
        body: [
          "You do not have to go far at all. Footpaths thread the fields and woods right around the cabin. A short drive brings you to Donnington Castle, a ruined hilltop gatehouse with open grounds, or Greenham Common, a vast former airbase now returned to heathland and grazed by cattle. Both are free, open all year, and made for a slow morning stroll.",
        ],
      },
    ],
  },
  {
    slug: "highclere-castle-the-real-downton-abbey",
    title: "Highclere Castle: The Real Downton Abbey on Your Doorstep",
    excerpt:
      "The grand house from Downton Abbey is a short drive from the cabin, with a thousand acres of Capability Brown parkland and an Egyptian exhibition hiding a Tutankhamun story.",
    metaDescription:
      "A short guide to visiting Highclere Castle near Newbury, the real Downton Abbey: the house, the Capability Brown gardens, the Egyptian exhibition and its Tutankhamun connection, and how to book.",
    date: "2026-06-12",
    dateLabel: "June 2026",
    readMinutes: 4,
    heroImage: "/images/squirrels-nest/sq-08.jpg",
    heroAlt: "Country house grandeur near Squirrels' Nest, close to Highclere Castle in Berkshire",
    keywords: [
      "Highclere Castle",
      "real Downton Abbey",
      "visiting Highclere Castle",
      "Downton Abbey filming location",
      "things to do near Newbury",
    ],
    intro: [
      "If you have watched Downton Abbey, you already know what Highclere Castle looks like. The honey-coloured towers, the long drive, the sweeping lawns: it is all real, and it is barely twenty minutes from the cabin.",
      "It is one of the grandest days out in the area, and well worth planning a stay around. Here is what to expect.",
    ],
    sections: [
      {
        heading: "The house and the parkland",
        body: [
          "Highclere is the seat of the Earls of Carnarvon, and the present house was remodelled in the 1840s by Sir Charles Barry, the architect of the Houses of Parliament. The thousand acres of parkland around it were laid out by Capability Brown, England's greatest landscape gardener, and on a fine day the gardens alone are worth the trip. Wander up to the folly known as Jackdaws Castle, or simply find a bench and take in the view that millions have seen on screen.",
        ],
      },
      {
        heading: "The Egyptian exhibition",
        body: [
          "The real surprise at Highclere is downstairs. The fifth Earl of Carnarvon funded the search for the tomb of Tutankhamun, and it was his archaeologist, Howard Carter, who finally opened it in 1922. The cellars now hold an exhibition telling that story, from the early digs in 1906 to the moment Carter peered in and saw, in his own words, wonderful things. It is a genuinely gripping piece of history, hidden beneath a house most people come for the drawing room.",
        ],
      },
      {
        heading: "Planning your visit",
        body: [
          "Highclere opens to the public on selected dates, mainly over the Easter and summer holidays, with timed entry slots through the day. It is hugely popular and tickets sell out well ahead, so book before you travel rather than turning up on spec. Allow a few hours: the house, the exhibition and the gardens together make an easy half-day, and there is afternoon tea if you would like to linger.",
        ],
      },
    ],
  },
  {
    slug: "things-to-do-in-newbury",
    title: "Things to Do in Newbury, Our Nearest Town",
    excerpt:
      "The market town down the road: a free museum in a 17th-century cloth hall, an Elizabethan manor, the canal at the Wharf, racing, and a proper market three days a week.",
    metaDescription:
      "What to do in Newbury, the market town near Squirrels' Nest: the West Berkshire Museum, Shaw House, the Kennet and Avon Canal at the Wharf, Newbury Racecourse, Victoria Park and the markets.",
    date: "2026-06-07",
    dateLabel: "June 2026",
    readMinutes: 4,
    heroImage: "/images/squirrels-nest/sq-37.jpg",
    heroAlt: "A quiet corner of Squirrels' Nest, a short drive from the market town of Newbury",
    keywords: [
      "things to do in Newbury",
      "Newbury Berkshire",
      "West Berkshire Museum",
      "Shaw House Newbury",
      "Newbury market town",
    ],
    intro: [
      "Newbury is the nearest town to the cabin, and a good one. It grew rich on the wool trade five hundred years ago, sits on the Kennet and Avon Canal, and still has a proper market and a handsome old centre.",
      "It is the place to come for lunch, a rainy afternoon, or to stock the fridge. Here is what we would point you towards.",
    ],
    sections: [
      {
        heading: "The Wharf and the canal",
        body: [
          "Start at the Wharf, where the Kennet and Avon Canal runs through the middle of town. The free West Berkshire Museum sits right here, in a cloth hall built in 1627 and the old canal granary, telling the story of the town from the Civil War battles to the Greenham Common peace camp. From the Wharf you can pick up the towpath in either direction, or book a short narrowboat trip in summer.",
        ],
      },
      {
        heading: "Shaw House",
        body: [
          "On the edge of town stands Shaw House, a strikingly handsome Elizabethan manor finished in 1581 for a wealthy clothier and visited by Elizabeth the First herself. Recently restored, it opens at weekends through the warmer months, with afternoon teas, outdoor theatre and family events in the grounds.",
        ],
      },
      {
        heading: "Markets, racing and the arts",
        body: [
          "Newbury holds a street market on Tuesdays, Thursdays and Saturdays, good for local cheese, bread and flowers. The Corn Exchange in the Market Place is the town's arts centre, with film, comedy, theatre and music most weeks. And Newbury Racecourse, just south of the centre, holds flat and jump meetings through the year, often with live music on the bigger race days.",
        ],
      },
      {
        heading: "For families",
        body: [
          "If you have children with you, Victoria Park by the canal has a splash park, a boating pond and a bandstand in summer. The Living Rainforest, a short drive north at Hampstead Norreys, keeps a warm green glasshouse full of tropical plants and creatures, which is exactly where you want to be if the weather turns.",
        ],
      },
    ],
  },
  {
    slug: "a-rainy-day-in-west-berkshire",
    title: "A Rainy Day in West Berkshire",
    excerpt:
      "It does rain, even here. When it does: antiques in Hungerford, a farm-shop lunch, murals by a war artist, and a tropical glasshouse to warm up in.",
    metaDescription:
      "What to do on a rainy day near Squirrels' Nest in West Berkshire: Hungerford's antiques arcade, Cobbs Farm Shop, Sandham Memorial Chapel, the West Berkshire Museum, the Living Rainforest and Highclere Castle.",
    date: "2026-06-03",
    dateLabel: "June 2026",
    readMinutes: 4,
    heroImage: "/images/squirrels-nest/sq-25.jpg",
    heroAlt: "A warm, sheltered corner at Squirrels' Nest, made for a rainy West Berkshire afternoon",
    keywords: [
      "rainy day Berkshire",
      "indoor things to do Newbury",
      "Hungerford antiques",
      "things to do West Berkshire",
      "Cobbs Farm Shop",
    ],
    intro: [
      "Some of the best days here happen when it rains. The countryside does not stop being lovely, it just asks you to go indoors for a while, and there is plenty to fill an afternoon close to the cabin.",
      "Here is how we would spend a wet one.",
    ],
    sections: [
      {
        heading: "Antiques in Hungerford",
        body: [
          "Hungerford, a few minutes west, is one of the best antiques towns in the country. Hungerford Arcade is among the oldest and largest covered antiques markets anywhere, a warren of stalls you can lose an hour in whatever the weather, and the Georgian high street is lined with more shops, emporiums and good cafés.",
        ],
      },
      {
        heading: "A farm-shop lunch",
        body: [
          "Just outside Hungerford, Cobbs Farm Shop and Kitchen does a proper job of a rainy lunch: homegrown and local produce, a butchery and deli, and a café serving breakfast, lunch and Sunday roast. There is a play barn for children, so everyone is happy while the sky does its worst.",
        ],
      },
      {
        heading: "Murals and museums",
        body: [
          "For something quieter, Sandham Memorial Chapel at Burghclere holds Stanley Spencer's extraordinary cycle of murals, painted from his own experience of the First World War. It is small, intimate and entirely indoors. The free West Berkshire Museum in Newbury is another easy hour out of the rain, full of the town's long story.",
        ],
      },
      {
        heading: "Tropical and stately",
        body: [
          "If you have children, the Living Rainforest near Hampstead Norreys is the obvious answer, a warm glasshouse of tropical plants and creatures to wander while it pours outside. And Highclere Castle, the real Downton Abbey, is a grand way to spend a wet afternoon when it is open, with the house and its Egyptian exhibition both safely under cover.",
        ],
      },
    ],
  },
];

export function getJournalPost(slug: string): JournalPost | undefined {
  return JOURNAL_POSTS.find((p) => p.slug === slug);
}
