import youtubeCovers from './youtubeCovers.json';

export type WorkMedia =
  | { type: 'text'; title: string; body: string }
  | { type: 'image'; src: string; alt: string; caption?: string }
  | { type: 'youtube'; src: string; url: string; title: string; caption?: string }
  | { type: 'video'; src: string; title: string; poster?: string; sizeBytes?: number; aspectRatio?: number; hasAudio?: boolean; caption?: string };

export interface WorkProject {
  slug: string;
  title: string;
  year: string;
  cover: string;
  story: string;
  tags?: string[];
  media: WorkMedia[];
}

// The first slide uses title, year and story. The cover follows.
// Add text, photos and videos to media in the exact order they should appear.
// Text: { type: 'text', title: 'Photoshoot & atmosphere', body: 'Your section description.' }
// Image: { type: 'image', src: '/Portfolio/Project/photo.jpg', alt: 'Describe the photo' }
// YouTube: { type: 'youtube', src: '/Portfolio/Project/film-cover.jpg', url: 'https://www.youtube.com/watch?v=VIDEO_ID', title: 'Full project film' }
// Optional sizeBytes skips the size check; unknown sizes load only on Play if the check fails.
// Video: { type: 'video', src: '/Portfolio/Project/film.mp4', title: 'Project film', poster: '/Portfolio/Project/poster.jpg' }
export const projects: WorkProject[] = [
  {
    "slug": "horizon-festival",
    "title": "HORIZON FESTIVAL",
    "year": "2025/2026",
    "cover": "/Portfolio/Horizon/cover.jpeg",
    "story": "We gave Horizon’s electronic sound a visual presence through identity, photography and film. A distinct world beyond the big cities, built around the pull of gathering for music.",
    "media": [
      {
        "type": "text",
        "title": "Artists & atmosphere",
        "body": "Gestures at the decks, figures caught in light. Photographs that carry the presence of a set beyond its last track."
      },
      {
        "type": "image",
        "src": "/Portfolio/Horizon/7BD0A8D8-79A1-4050-9B00-16613FD95101_1_105_c.jpeg",
        "alt": "Two artists performing under yellow-green stage lights"
      },
      {
        "type": "image",
        "src": "/Portfolio/Horizon/02D21377-BF31-4EE8-A944-32D9CD8E31A6_1_105_c.jpeg",
        "alt": "DJ performing under red stage lights"
      },
      {
        "type": "image",
        "src": "/Portfolio/Horizon/6E65A3ED-5217-48BF-BAE2-986E1B574AB5_1_105_c.jpeg",
        "alt": "DJ framed by golden beams of light"
      },
      {
        "type": "image",
        "src": "/Portfolio/Horizon/2F3FBE59-5C9A-48DC-ADCF-624809A84267_1_102_o.jpeg",
        "alt": "Artist leaning over the decks under blue stage lighting"
      },
      {
        "type": "image",
        "src": "/Portfolio/Horizon/E27D6790-9470-4DF5-AF46-FAD4452E4C72_1_102_o.jpeg",
        "alt": "Artist mixing vinyl outdoors, framed by green foliage"
      },
      {
        "type": "image",
        "src": "/Portfolio/Horizon/74017F24-896A-4C93-857E-4E6DD9022ACD_1_105_c.jpeg",
        "alt": "Artist with dreadlocks performing against red and green lighting"
      },
      {
        "type": "image",
        "src": "/Portfolio/Horizon/D06662E5-5EBB-43FA-92A3-04D983721F85_1_105_c.jpeg",
        "alt": "Singer holding a microphone under blue stage lights"
      },
      {
        "type": "image",
        "src": "/Portfolio/Horizon/E0081C03-722E-484D-933A-857F6D62EF38_1_102_o.jpeg",
        "alt": "Vocalist performing under green and orange lighting"
      },
      {
        "type": "text",
        "title": "Inside the crowd",
        "body": "Dancing, conversations and pauses between sets. The small encounters that turn a crowd into a shared memory."
      },
      {
        "type": "image",
        "src": "/Portfolio/Horizon/F0BD32E6-8256-472B-910F-72FBC25FE65E_1_102_o.jpeg",
        "alt": "DJ performing at the decks under red stage lighting"
      },
      {
        "type": "image",
        "src": "/Portfolio/Horizon/066D6714-ACA1-49A4-959B-916D495806AC_1_105_c.jpeg",
        "alt": "Crowd silhouetted against a turquoise-lit stage"
      },
      {
        "type": "image",
        "src": "/Portfolio/Horizon/571CED53-1B1F-49EC-A16F-091BEFD3346C_1_102_o.jpeg",
        "alt": "Festival guests dancing in warm stage light"
      },
      {
        "type": "image",
        "src": "/Portfolio/Horizon/B935A41B-97C9-4C33-8D0D-9755A46EABE5_1_105_c.jpeg",
        "alt": "Guest wearing sunglasses on the dance floor"
      },
      {
        "type": "image",
        "src": "/Portfolio/Horizon/A0329C4E-E63D-4698-B4BE-53AD2D5B2D78_1_102_o.jpeg",
        "alt": "Festival guests talking in blue light"
      },
      {
        "type": "image",
        "src": "/Portfolio/Horizon/41C8ADA8-0DA0-4415-AE19-C469182EB7C6_1_102_o.jpeg",
        "alt": "Artist looking back from the decks in blue light"
      },
      {
        "type": "image",
        "src": "/Portfolio/Horizon/D22EA9AB-BE37-4565-A25F-B9CDDBE42A6D_1_105_c.jpeg",
        "alt": "Guest raising their arms against blue stage light"
      },
      {
        "type": "image",
        "src": "/Portfolio/Horizon/8030C0EA-E3A7-4386-A36F-E1E8482532F1_1_105_c.jpeg",
        "alt": "Guests smiling together in warm festival light"
      },
      {
        "type": "image",
        "src": "/Portfolio/Horizon/8CF5C626-07F4-4C10-8604-681AB65F12C1.jpeg",
        "alt": "View across the mixing desk toward the festival crowd"
      },
      {
        "type": "image",
        "src": "/Portfolio/Horizon/4BB972B5-ABCE-4826-AD1F-91A5E9B003BB_1_105_c.jpeg",
        "alt": "Artist and guests framed by warm stage lighting"
      },
      {
        "type": "text",
        "title": "Brand & art direction",
        "body": "One visual language across posters, portraits and screens, giving Horizon a recognisable world of its own."
      },
      {
        "type": "video",
        "src": "/About/horizon_logo.mp4",
        "poster": "/Portfolio/Horizon/web/identity.jpg",
        "title": "Horizon visual identity",
        "sizeBytes": 12378815,
        "aspectRatio": 4 / 5,
        "hasAudio": false
      },
      { type: 'image', src: '/About/creative-direction-campaign-design.jpg', alt: 'Creative direction and campaign design artwork'},

      {
        "type": "image",
        "src": "/Portfolio/Horizon/eeee.jpg",
        "alt": "Grid of Horizon Festival live photography"
      },
      {
        "type": "image",
        "src": "/Portfolio/Horizon/Post Portrait 3@1x.jpg",
        "alt": "Horizon Festival logo sticker on a laptop"
      },
      {
        "type": "image",
        "src": "/Portfolio/Horizon/Post Portrait@1x.jpg",
        "alt": "Horizon Festival social profile displayed on a phone"
      },
      {
        "type": "text",
        "title": "Introductory campaign",
        "body": "Sound, faces and atmosphere come together in a film that carries the anticipation of arriving at Horizon."
      },
      {
        "type": "youtube",
        "src": "/Portfolio/Horizon/watch?v=0USZvW7Ti4w.png",
        "url": "https://www.youtube.com/watch?v=0USZvW7Ti4w",
        "title": "Horizon Festival introductory campaign"
      }
    ],
    "tags": [
      "PHOTO",
      "BRAND DIRECTION",
      "ART DIRECTION",
      "VIDEO"
    ]
  },
  {
    "slug": "vali-theater-lab",
    "title": "VALI THEATER LAB",
    "year": "2025/2026",
    "cover": "/Portfolio/Vali/spectacl 2025/cover.jpg",
    "story": "Through Vali Theater Lab’s workshops and performances in 2025 and 2026, we photographed imagined worlds taking shape. Traces of movement, rehearsal and shared attention give the work a life beyond the stage.",
    "media": [
      {
        "type": "text",
        "title": "Campaign films",
        "body": "We created campaign films to showcase Vali Theater Lab’s work, bringing their creative process, performances and collective spirit to a wider audience."
      },
      {
        "type": "youtube",
        "src": "/Portfolio/Vali/watch?v=kSmcqsy7MTA.png",
        "url": "https://www.youtube.com/watch?v=kSmcqsy7MTA",
        "title": "Vali Theater Lab campaign film 1"
      },
      {
        "type": "youtube",
        "src": "/Portfolio/Vali/watch?v=SWup9xsqNM4.png",
        "url": "https://www.youtube.com/watch?v=SWup9xsqNM4",
        "title": "Vali Theater Lab campaign film 2"
      },
      {
        "type": "text",
        "title": "Performance 2025",
        "body": "Light, costume and gesture carry the story. Our photographs preserve fragments of a world briefly shared by performers and audience."
      },
      {
        "type": "image",
        "src": "/Portfolio/Vali/spectacl 2025/_NZ83411-Edit.jpg",
        "alt": "Performer silhouetted against a swirling blue projection"
      },
      {
        "type": "image",
        "src": "/Portfolio/Vali/spectacl 2025/_NZ83418.jpg",
        "alt": "Performer reaching upward against a blue projection"
      },
      {
        "type": "image",
        "src": "/Portfolio/Vali/spectacl 2025/_NZ83432-Edit.jpg",
        "alt": "Two performers beneath a projected heartbeat"
      },
      {
        "type": "image",
        "src": "/Portfolio/Vali/spectacl 2025/_NZ84734.jpg",
        "alt": "Performer addressing an audience indoors"
      },
      {
        "type": "image",
        "src": "/Portfolio/Vali/spectacl 2025/_NZ84749.jpg",
        "alt": "Costumed ensemble gathered in a tiled room"
      },
      {
        "type": "image",
        "src": "/Portfolio/Vali/spectacl 2025/_NZ84759.jpg",
        "alt": "Performer curled on a bed in soft light"
      },
      {
        "type": "image",
        "src": "/Portfolio/Vali/spectacl 2025/_NZ84814-2.jpg",
        "alt": "Performer wearing a top hat and white shirt"
      },
      {
        "type": "image",
        "src": "/Portfolio/Vali/spectacl 2025/_NZ84982.jpg",
        "alt": "Top-hatted performer with an audience behind"
      },
      {
        "type": "image",
        "src": "/Portfolio/Vali/spectacl 2025/_NZ84878.jpg",
        "alt": "Performer seated at a table in purple light"
      },
      {
        "type": "image",
        "src": "/Portfolio/Vali/spectacl 2025/_NZ84882.jpg",
        "alt": "Performer in a blue-lit room"
      },
      {
        "type": "image",
        "src": "/Portfolio/Vali/spectacl 2025/_NZ85131.jpg",
        "alt": "Performer leaning forward in a tall bright doorway"
      },
      {
        "type": "image",
        "src": "/Portfolio/Vali/spectacl 2025/_NZ85084.jpg",
        "alt": "Costumed performer on a red-curtained stage during the 2025 performance"
      },
      {
        "type": "image",
        "src": "/Portfolio/Vali/spectacl 2025/_NZ85254.jpg",
        "alt": "Performer seated before blue curtains"
      },
      {
        "type": "image",
        "src": "/Portfolio/Vali/spectacl 2025/_NZ85407.jpg",
        "alt": "Audience gathered before a blue-lit stage"
      },
      {
        "type": "text",
        "title": "Workshops 2026",
        "body": "Exercises, conversations and rehearsals reveal ideas still finding their form. A portrait of the collective work before the performance."
      },
      {
        "type": "image",
        "src": "/Portfolio/Vali/workshops 2026/_NZ82244.jpg",
        "alt": "Workshop space with a table and standing participants"
      },
      {
        "type": "image",
        "src": "/Portfolio/Vali/workshops 2026/_NZ82129.jpg",
        "alt": "Two participants standing before a projection"
      },
      {
        "type": "image",
        "src": "/Portfolio/Vali/workshops 2026/_NZ82355.jpg",
        "alt": "Group exploring movement in pairs"
      },
      {
        "type": "image",
        "src": "/Portfolio/Vali/workshops 2026/_NZ82184-2.jpg",
        "alt": "Participants collaborating closely in a movement exercise"
      },
      {
        "type": "image",
        "src": "/Portfolio/Vali/workshops 2026/_NZ82336.jpg",
        "alt": "Participant reaching outward during an exercise"
      },
      {
        "type": "image",
        "src": "/Portfolio/Vali/workshops 2026/_NZ82384.jpg",
        "alt": "Participant in red leaning into a movement exercise"
      },
      {
        "type": "image",
        "src": "/Portfolio/Vali/workshops 2026/_NZ82494.jpg",
        "alt": "Participants lying and sitting on a green rug"
      },
      {
        "type": "image",
        "src": "/Portfolio/Vali/workshops 2026/_NZ82577.jpg",
        "alt": "Costumed participants seated together during rehearsal"
      },
      {
        "type": "image",
        "src": "/Portfolio/Vali/workshops 2026/_NZ82637.jpg",
        "alt": "Participant watching through a partially open door"
      },
      {
        "type": "image",
        "src": "/Portfolio/Vali/workshops 2026/_NZ82644.jpg",
        "alt": "Two participants rehearsing together"
      },
      {
        "type": "image",
        "src": "/Portfolio/Vali/workshops 2026/_NZ82733.jpg",
        "alt": "Small group rehearsing in a dark room"
      },
      {
        "type": "image",
        "src": "/Portfolio/Vali/workshops 2026/_NZ82811.jpg",
        "alt": "Participants working around a lit table"
      },
      {
        "type": "text",
        "title": "Performance 2026",
        "body": "Rooms, corridors and outdoor spaces become a stage. We followed performers and audience through a familiar building transformed by theatre."
      },
      {
        "type": "image",
        "src": "/Portfolio/Vali/spectacl 2026/FremtidensPuls39.jpg",
        "alt": "Performers seated together in a bright room"
      },
      {
        "type": "image",
        "src": "/Portfolio/Vali/spectacl 2026/FremtidensPuls42.jpg",
        "alt": "Performer seen through a doorway by the audience"
      },
      {
        "type": "image",
        "src": "/Portfolio/Vali/spectacl 2026/FremtidensPuls47.jpg",
        "alt": "Audience watching a performance through a doorway"
      },
      {
        "type": "image",
        "src": "/Portfolio/Vali/spectacl 2026/FremtidensPuls43.jpg",
        "alt": "Performer on a staircase viewed from below"
      },
      {
        "type": "image",
        "src": "/Portfolio/Vali/spectacl 2026/FremtidensPuls68.jpg",
        "alt": "Audience gathered around an outdoor performance"
      },
      {
        "type": "image",
        "src": "/Portfolio/Vali/spectacl 2026/FremtidensPuls70.jpg",
        "alt": "Two masked performers leaning through a window"
      },
      {
        "type": "image",
        "src": "/Portfolio/Vali/spectacl 2026/FremtidensPuls50.jpg",
        "alt": "Performer in a pink jacket gesturing on stage"
      },
      {
        "type": "image",
        "src": "/Portfolio/Vali/spectacl 2026/FremtidensPuls52.jpg",
        "alt": "Performer seated before a blue projection"
      },
      {
        "type": "image",
        "src": "/Portfolio/Vali/spectacl 2026/FremtidensPuls57.jpg",
        "alt": "Performer framed by audience silhouettes"
      },
      {
        "type": "image",
        "src": "/Portfolio/Vali/spectacl 2026/FremtidensPuls100.jpg",
        "alt": "Performer standing beside a lit display"
      },
      {
        "type": "image",
        "src": "/Portfolio/Vali/spectacl 2026/FremtidensPuls103.jpg",
        "alt": "Costumed ensemble facing the audience"
      },
      {
        "type": "text",
        "title": "Reels",
        "body": "Short films capturing the movement, characters and atmosphere of Vali Theater Lab."
      },
      {
        "type": "video",
        "src": "/Portfolio/Vali/reels/reel_vali_1.mp4",
        "title": "Vali Theater Lab reel 1",
        "poster": "/Portfolio/Vali/reels/reel_vali_1-poster.jpg",
        "sizeBytes": 9382136,
        "aspectRatio": 0.5625,
        "hasAudio": true
      },
      {
        "type": "video",
        "src": "/Portfolio/Vali/reels/reel_vali_2.mp4",
        "title": "Vali Theater Lab reel 2",
        "poster": "/Portfolio/Vali/reels/reel_vali_2-poster.jpg",
        "sizeBytes": 19973523,
        "aspectRatio": 0.5625,
        "hasAudio": true
      },
      {
        "type": "video",
        "src": "/Portfolio/Vali/reels/reel_vali_glowup.mp4",
        "title": "Vali Theater Lab Glowup reel",
        "poster": "/Portfolio/Vali/reels/reel_vali_glowup-poster.jpg",
        "sizeBytes": 24126800,
        "aspectRatio": 0.5625,
        "hasAudio": true
      }
    ],
    "tags": [
      "PHOTO",
      "VIDEO"
    ]
  },
  {
    "slug": "camila-lading",
    "title": "CAMILA LADING",
    "year": "2026",
    "cover": "/Portfolio/Camila Lading/_NZ83345.jpg",
    "story": "An editorial fashion campaign for Camila Landing. Portraits trace the collection’s sculptural knitwear, reconstructed denim and the quiet confidence of the people wearing them.",
    "media": [
      {
        "type": "text",
        "title": "Collection portraits",
        "body": "Expressive styling, tactile layers and direct gazes bring the collection’s character into focus."
      },
      {
        "type": "image",
        "src": "/Portfolio/Camila Lading/_NZ82834.jpg",
        "alt": "Model in a sculptural burgundy knit and reconstructed denim"
      },
      {
        "type": "image",
        "src": "/Portfolio/Camila Lading/_NZ82881.jpg",
        "alt": "Two models wearing layered Camila Landing looks"
      },
      {
        "type": "image",
        "src": "/Portfolio/Camila Lading/_NZ83289.jpg",
        "alt": "Model in a plaid crop top, reconstructed denim and red boots against a wooden wall"
      },
      {
        "type": "image",
        "src": "/Portfolio/Camila Lading/Edit14.jpg",
        "alt": "Close portrait of two models wearing layered Camila Landing looks"
      },
      {
        "type": "image",
        "src": "/Portfolio/Camila Lading/_NZ82991.jpg",
        "alt": "Model in a burgundy knit and patchwork denim, photographed from above"
      },
      {
        "type": "image",
        "src": "/Portfolio/Camila Lading/_NZ83007.jpg",
        "alt": "Model in a layered green and plaid look"
      },
      {
        "type": "image",
        "src": "/Portfolio/Camila Lading/_NZ83154.jpg",
        "alt": "Two models in sculptural layered fashion against a bright backdrop"
      },
      {
        "type": "image",
        "src": "/Portfolio/Camila Lading/_NZ83354.jpg",
        "alt": "Full length portraits of two models wearing the collection"
      }
    ],
    "tags": [
      "FASHION",
      "CAMPAIGN",
      "PHOTO"
    ]
  },
  {
    "slug": "via-fashion-show",
    "title": "VIA FASHION SHOW",
    "year": "2025",
    "cover": "/Portfolio/FASHION SHOW/watch?v=pepfv6cDHf8.jpg",
    "story": "Silhouette, pace and atmosphere. Our film of the 2025 fashion show carries the designs beyond the runway, preserving their expression in motion.",
    "media": [],
    "tags": [
      "VIDEO"
    ]
  },
  {
    "slug": "freewheelin",
    "title": "FREEWHEELIN",
    "year": "2026",
    "cover": "/Portfolio/Wh/cover.jpg",
    "story": "From stockroom rituals to conversations across the counter, our photographs reveal the people and everyday care that give Freewheelin its character.",
    "media": [
      {
        "type": "text",
        "title": "The people & atmosphere",
        "body": "A conversation, a smile, movement through the aisles. Everyday encounters bring the shop’s character into focus."
      },
      {
        "type": "image",
        "src": "/Portfolio/Wh/_NZ88608.jpg",
        "alt": "Counter framed by colourful display objects"
      },
      {
        "type": "image",
        "src": "/Portfolio/Wh/_NZ88662.jpg",
        "alt": "Conversation across the shop counter"
      },
      {
        "type": "image",
        "src": "/Portfolio/Wh/_NZ88695.jpg",
        "alt": "Staff member smiling behind the counter"
      },
      {
        "type": "image",
        "src": "/Portfolio/Wh/_NZ88722.jpg",
        "alt": "Staff member arranging clothing by the shop window"
      },
      {
        "type": "image",
        "src": "/Portfolio/Wh/_NZ88726.jpg",
        "alt": "Staff member hanging a T-shirt on a clothing rail"
      },
      {
        "type": "image",
        "src": "/Portfolio/Wh/_NZ88747.jpg",
        "alt": "Staff member seen through display cabinets"
      },
      {
        "type": "image",
        "src": "/Portfolio/Wh/_NZ88795.jpg",
        "alt": "Customer standing near the shop displays"
      },
      {
        "type": "image",
        "src": "/Portfolio/Wh/_NZ89006.jpg",
        "alt": "Movement through the colourful shop interior"
      },
      {
        "type": "image",
        "src": "/Portfolio/Wh/_NZ88910.jpg",
        "alt": "Staff member selecting stock"
      },
      {
        "type": "image",
        "src": "/Portfolio/Wh/_NZ88955.jpg",
        "alt": "Close view of a parcel being sealed"
      },
      {
        "type": "text",
        "title": "The shop",
        "body": "Colour, objects and winding aisles form an invitation to explore. A first feel for Freewheelin before stepping inside."
      },
      {
        "type": "image",
        "src": "/Portfolio/Wh/_NZ88191.jpg",
        "alt": "Staff member outside the Freewheelin entrance"
      },
      {
        "type": "image",
        "src": "/Portfolio/Wh/_NZ88646.jpg",
        "alt": "Shop entrance with colourful artwork and clothing"
      },
      {
        "type": "image",
        "src": "/Portfolio/Wh/_NZ88644.jpg",
        "alt": "View along the shop floor and display cabinets"
      },
      {
        "type": "image",
        "src": "/Portfolio/Wh/_NZ88648.jpg",
        "alt": "Shelves and glass display cases inside Freewheelin"
      },
      {
        "type": "image",
        "src": "/Portfolio/Wh/_NZ88709.jpg",
        "alt": "Clothing and glass cabinets along the shop aisle"
      },
      {
        "type": "image",
        "src": "/Portfolio/Wh/_NZ88782.jpg",
        "alt": "Wide view of the shop interior"
      },
      {
        "type": "image",
        "src": "/Portfolio/Wh/_NZ89013.jpg",
        "alt": "View across the Freewheelin counter"
      },
      {
        "type": "text",
        "title": "Behind the counter",
        "body": "Selecting, sorting, packing. We brought the care behind each order into the shop’s visible story."
      },
      {
        "type": "image",
        "src": "/Portfolio/Wh/_NZ88433.jpg",
        "alt": "Staff member carrying boxes in the stockroom"
      },
      {
        "type": "image",
        "src": "/Portfolio/Wh/_NZ88331.jpg",
        "alt": "Staff packing an order together"
      },
      {
        "type": "image",
        "src": "/Portfolio/Wh/_NZ88447.jpg",
        "alt": "Overhead view of an order being packed"
      },
      {
        "type": "image",
        "src": "/Portfolio/Wh/_NZ88510.jpg",
        "alt": "Staff selecting products from the stockroom shelves"
      },
      {
        "type": "image",
        "src": "/Portfolio/Wh/_NZ88560.jpg",
        "alt": "Staff member working between stocked shelves"
      },
      {
        "type": "image",
        "src": "/Portfolio/Wh/_NZ88888.jpg",
        "alt": "Shipping label being prepared for an order"
      }
    ],
    "tags": [
      "PHOTO"
    ]
  },
  {
    "slug": "sektion",
    "title": "SEKTION",
    "year": "2025",
    "cover": "/Portfolio/Sektion/cover.jpg",
    "story": "Three gatherings, three rhythms. Through artists, crowds and shared spaces, our photographs trace the encounters that give Sektion’s scene its life.",
    "media": [
      {
        "type": "text",
        "title": "Event 01",
        "body": "Between the decks and the crowd, a room responds. We photographed the exchange that makes a night feel collective."
      },
      {
        "type": "image",
        "src": "/Portfolio/Sektion/EVENT_01/Sektion_Event_01_1.jpg",
        "alt": "Sektion Event 1 live atmosphere"
      },
      {
        "type": "image",
        "src": "/Portfolio/Sektion/EVENT_01/Sektion_Event_01_1a.jpg",
        "alt": "Sektion Event 1 live atmosphere"
      },
      {
        "type": "image",
        "src": "/Portfolio/Sektion/EVENT_01/Sektion_Event_01_2.jpeg",
        "alt": "Sektion Event 1 live atmosphere"
      },
      {
        "type": "image",
        "src": "/Portfolio/Sektion/EVENT_01/Sektion_Event_01_3.jpeg",
        "alt": "Sektion Event 1 live atmosphere"
      },
      {
        "type": "image",
        "src": "/Portfolio/Sektion/EVENT_01/Sektion_Event_01_4.jpeg",
        "alt": "Sektion Event 1 live atmosphere"
      },
      {
        "type": "image",
        "src": "/Portfolio/Sektion/EVENT_01/Sektion_Event_01_5.jpg",
        "alt": "Sektion Event 1 live atmosphere"
      },
      {
        "type": "image",
        "src": "/Portfolio/Sektion/EVENT_01/Sektion_Event_01_6.jpg",
        "alt": "Sektion Event 1 live atmosphere"
      },
      {
        "type": "image",
        "src": "/Portfolio/Sektion/EVENT_01/Sektion_Event_01_7.jpg",
        "alt": "Sektion Event 1 live atmosphere"
      },
      {
        "type": "image",
        "src": "/Portfolio/Sektion/EVENT_01/Sektion_Event_01_8.jpg",
        "alt": "Sektion Event 1 live atmosphere"
      },
      {
        "type": "text",
        "title": "Event 02",
        "body": "From daylight to evening, music and unhurried moments together shape a portrait of the gathering."
      },
      {
        "type": "image",
        "src": "/Portfolio/Sektion/EVENT_02/Sektion_Event_02_1.jpg",
        "alt": "Sektion Event 2 live atmosphere"
      },
      {
        "type": "image",
        "src": "/Portfolio/Sektion/EVENT_02/Sektion_Event_02_10.jpg",
        "alt": "Sektion Event 2 live atmosphere"
      },
      {
        "type": "image",
        "src": "/Portfolio/Sektion/EVENT_02/Sektion_Event_02_9.jpg",
        "alt": "Sektion Event 2 live atmosphere"
      },
      {
        "type": "image",
        "src": "/Portfolio/Sektion/EVENT_02/Sektion_Event_02_11.jpg",
        "alt": "Sektion Event 2 live atmosphere"
      },
      {
        "type": "image",
        "src": "/Portfolio/Sektion/EVENT_02/Sektion_Event_02_12.jpg",
        "alt": "Sektion Event 2 live atmosphere"
      },
      {
        "type": "image",
        "src": "/Portfolio/Sektion/EVENT_02/Sektion_Event_02_13.jpg",
        "alt": "Sektion Event 2 live atmosphere"
      },
      {
        "type": "image",
        "src": "/Portfolio/Sektion/EVENT_02/Sektion_Event_02_14.jpg",
        "alt": "Sektion Event 2 live atmosphere"
      },
      {
        "type": "image",
        "src": "/Portfolio/Sektion/EVENT_02/Sektion_Event_02_4.jpg",
        "alt": "Sektion Event 2 live atmosphere"
      },
      {
        "type": "image",
        "src": "/Portfolio/Sektion/EVENT_02/Sektion_Event_02_5.jpg",
        "alt": "Sektion Event 2 live atmosphere"
      },
      {
        "type": "image",
        "src": "/Portfolio/Sektion/EVENT_02/Sektion_Event_02_6.jpg",
        "alt": "Sektion Event 2 live atmosphere"
      },
      {
        "type": "image",
        "src": "/Portfolio/Sektion/EVENT_02/Sektion_Event_02_7.jpg",
        "alt": "Sektion Event 2 live atmosphere"
      },
      {
        "type": "image",
        "src": "/Portfolio/Sektion/EVENT_02/Sektion_Event_02_2.jpg",
        "alt": "Sektion Event 2 live atmosphere"
      },
      {
        "type": "image",
        "src": "/Portfolio/Sektion/EVENT_02/Sektion_Event_02_3.jpg",
        "alt": "Sektion Event 2 live atmosphere"
      },
      {
        "type": "image",
        "src": "/Portfolio/Sektion/EVENT_02/Sektion_Event_02_8.jpg",
        "alt": "Sektion Event 2 live atmosphere"
      },
      {
        "type": "text",
        "title": "Event 03",
        "body": "Behind the booth and across the dance floor, we followed the gestures and encounters that gave the night its character."
      },
      {
        "type": "image",
        "src": "/Portfolio/Sektion/EVENT_03/_NZ89972.jpg",
        "alt": "Sektion Event 03 live atmosphere"
      },
      {
        "type": "image",
        "src": "/Portfolio/Sektion/EVENT_03/_NZ89745.jpg",
        "alt": "Sektion Event 03 live atmosphere"
      },
      {
        "type": "image",
        "src": "/Portfolio/Sektion/EVENT_03/_NZ89773.jpg",
        "alt": "Sektion Event 03 live atmosphere"
      },
      {
        "type": "image",
        "src": "/Portfolio/Sektion/EVENT_03/_NZ89862.jpg",
        "alt": "Sektion Event 03 live atmosphere"
      },
      {
        "type": "image",
        "src": "/Portfolio/Sektion/EVENT_03/_NZ89867.jpg",
        "alt": "Sektion Event 03 live atmosphere"
      },
      {
        "type": "image",
        "src": "/Portfolio/Sektion/EVENT_03/_NZ89885.jpg",
        "alt": "Sektion Event 03 live atmosphere"
      },
      {
        "type": "image",
        "src": "/Portfolio/Sektion/EVENT_03/_NZ89896.jpg",
        "alt": "Sektion Event 03 live atmosphere"
      },
      {
        "type": "image",
        "src": "/Portfolio/Sektion/EVENT_03/_NZ89924.jpg",
        "alt": "Sektion Event 03 live atmosphere"
      },
      {
        "type": "image",
        "src": "/Portfolio/Sektion/EVENT_03/_NZ89997.jpg",
        "alt": "Sektion Event 03 live atmosphere"
      },
      {
        "type": "text",
        "title": "More Moments",
        "body": "A few more moments from a Sektion night, captured in the music, movement, and energy of the crowd."
      },
      {
        "type": "image",
        "src": "/Portfolio/Sektion/EXTRA/_NZ80892.jpg",
        "alt": "Sektion event crowd and live atmosphere"
      },
      {
        "type": "image",
        "src": "/Portfolio/Sektion/EXTRA/_NZ81527-Edit.jpg",
        "alt": "Sektion event portrait in the venue"
      },
      {
        "type": "image",
        "src": "/Portfolio/Sektion/EXTRA/_NZ81742.jpg",
        "alt": "Guest in sunglasses under red and green lighting at Sektion"
      }
    ],
    "tags": [
      "PHOTO"
    ]
  },
  {
    "slug": "herning-rocker",
    "title": "HERNING ROCKER",
    "year": "2025",
    "cover": "/Portfolio/Herning Rocker/cover.jpg",
    "story": "Raised hands, stage smoke, singers sharing the light. Our photographs of Herning Rocker hold the physical intensity of live music after the stage falls quiet.",
    "tags": [
      "PHOTO"
    ],
    "media": [
      {
        "type": "image",
        "src": "/Portfolio/Herning Rocker/_NZ80794-2.jpg",
        "alt": "Singer at a microphone surrounded by pink stage smoke"
      },
      {
        "type": "image",
        "src": "/Portfolio/Herning Rocker/_NZ81271.jpg",
        "alt": "Singer in sunglasses moving across a white stage"
      },
      {
        "type": "image",
        "src": "/Portfolio/Herning Rocker/_NZ81532.jpg",
        "alt": "Singer holding a microphone under white stage lights"
      },
      {
        "type": "image",
        "src": "/Portfolio/Herning Rocker/_NZ82153.jpg",
        "alt": "Performer in a white jacket singing under pink lights"
      },
      {
        "type": "image",
        "src": "/Portfolio/Herning Rocker/_NZ82207.jpg",
        "alt": "Two performers in white jackets on the stage steps"
      },
      {
        "type": "image",
        "src": "/Portfolio/Herning Rocker/_NZ82596.jpg",
        "alt": "Two singers performing under blue stage lights"
      },
      {
        "type": "image",
        "src": "/Portfolio/Herning Rocker/_NZ83230.jpg",
        "alt": "Singer raising a hand with a drummer behind him"
      },
      {
        "type": "image",
        "src": "/Portfolio/Herning Rocker/_NZ83352.jpg",
        "alt": "Singer at a microphone under blue and orange stage lights"
      }
    ]
  },
  {
    "slug": "sona",
    "title": "SONA",
    "year": "2026",
    "cover": "/Portfolio/Sona/cover.jpg",
    "story": "Hands on a mixer, ideas exchanged, music made together. Photography across three workshops and a film from the second bring Sona’s shared learning experience into view.",
    "media": [
      {
        "type": "text",
        "title": "Workshop 01",
        "body": "Hands on the mixer, ears on the music. We photographed the small experiments that make learning together visible."
      },
      {
        "type": "image",
        "src": "/Portfolio/Sona/SONA_Workshop_3_1.jpg",
        "alt": "Sona Workshop 1: participants, music and the atmosphere of the session, photograph 1"
      },
      {
        "type": "image",
        "src": "/Portfolio/Sona/SONA_Workshop_3_2.jpg",
        "alt": "Sona Workshop 1: participants, music and the atmosphere of the session, photograph 2"
      },
      {
        "type": "image",
        "src": "/Portfolio/Sona/SONA_Workshop_3_3.jpg",
        "alt": "Sona Workshop 1: participants, music and the atmosphere of the session, photograph 3"
      },
      {
        "type": "image",
        "src": "/Portfolio/Sona/SONA_Workshop_3_4.jpg",
        "alt": "Sona Workshop 1: participants, music and the atmosphere of the session, photograph 4"
      },
      {
        "type": "image",
        "src": "/Portfolio/Sona/SONA_Workshop_3_5.jpg",
        "alt": "Sona Workshop 1: participants, music and the atmosphere of the session, photograph 5"
      },
      {
        "type": "image",
        "src": "/Portfolio/Sona/SONA_Workshop_3_6.jpg",
        "alt": "Sona Workshop 1: participants collaborating at the decks"
      },
      {
        "type": "image",
        "src": "/Portfolio/Sona/SONA_Workshop_3_7.jpg",
        "alt": "Sona Workshop 1: participants, music and the atmosphere of the session, photograph 7"
      },
      {
        "type": "image",
        "src": "/Portfolio/Sona/SONA_Workshop_3_8.jpg",
        "alt": "Sona Workshop 1: participants, music and the atmosphere of the session, photograph 8"
      },
      {
        "type": "image",
        "src": "/Portfolio/Sona/SONA_Workshop_3_9.jpg",
        "alt": "Sona Workshop 1: participants, music and the atmosphere of the session, photograph 9"
      },
      {
        "type": "image",
        "src": "/Portfolio/Sona/SONA_Workshop_3_10.jpg",
        "alt": "Sona Workshop 1: participants, music and the atmosphere of the session, photograph 10"
      },
      {
        "type": "text",
        "title": "Workshop 02",
        "body": "At the decks and in the conversations around them, our photographs follow music becoming something shared."
      },
      {
        "type": "image",
        "src": "/Portfolio/Sona/SONA_Workshop_1_1.jpg",
        "alt": "Sona Workshop 2: participants, music and the atmosphere of the session, photograph 1"
      },
      {
        "type": "image",
        "src": "/Portfolio/Sona/SONA_Workshop_1_2.jpg",
        "alt": "Sona Workshop 2: participants, music and the atmosphere of the session, photograph 2"
      },
      {
        "type": "image",
        "src": "/Portfolio/Sona/SONA_Workshop_1_3.jpg",
        "alt": "Sona Workshop 2: participants, music and the atmosphere of the session, photograph 3"
      },
      {
        "type": "image",
        "src": "/Portfolio/Sona/SONA_Workshop_1_4.jpg",
        "alt": "Sona Workshop 2: participants, music and the atmosphere of the session, photograph 4"
      },
      {
        "type": "image",
        "src": "/Portfolio/Sona/SONA_Workshop_1_5.jpg",
        "alt": "Sona Workshop 2: participants, music and the atmosphere of the session, photograph 5"
      },
      {
        "type": "image",
        "src": "/Portfolio/Sona/SONA_Workshop_1_6.jpg",
        "alt": "Sona Workshop 2: participants, music and the atmosphere of the session, photograph 6"
      },
      {
        "type": "image",
        "src": "/Portfolio/Sona/SONA_Workshop_1_7.jpg",
        "alt": "Sona Workshop 2: participants, music and the atmosphere of the session, photograph 7"
      },
      {
        "type": "text",
        "title": "Workshop 03",
        "body": "Watching, questioning, trying again. We followed the exchanges through which the workshop’s learning took shape."
      },
      {
        "type": "image",
        "src": "/Portfolio/Sona/SONA_Workshop_2_1.jpg",
        "alt": "Sona Workshop 3: participants, music and the atmosphere of the session, photograph 1"
      },
      {
        "type": "image",
        "src": "/Portfolio/Sona/SONA_Workshop_2_2.jpg",
        "alt": "Sona Workshop 3: participants, music and the atmosphere of the session, photograph 2"
      },
      {
        "type": "image",
        "src": "/Portfolio/Sona/SONA_Workshop_2_3.jpg",
        "alt": "Sona Workshop 3: participants, music and the atmosphere of the session, photograph 3"
      },
      {
        "type": "image",
        "src": "/Portfolio/Sona/SONA_Workshop_2_4.jpg",
        "alt": "Sona Workshop 3: participants, music and the atmosphere of the session, photograph 4"
      },
      {
        "type": "image",
        "src": "/Portfolio/Sona/SONA_Workshop_2_5.jpg",
        "alt": "Sona Workshop 3: participants, music and the atmosphere of the session, photograph 5"
      },
      {
        "type": "image",
        "src": "/Portfolio/Sona/SONA_Workshop_2_6.jpg",
        "alt": "Sona Workshop 3: participants, music and the atmosphere of the session, photograph 6"
      },
      {
        "type": "text",
        "title": "Campaign",
        "body": "A film from the second workshop draws viewers into Sona through music, shared attention and the people at the decks."
      },
      {
        "type": "video",
        "src": "/Portfolio/Sona/web/workshop-01.mp4",
        "poster": "/Portfolio/Sona/web/workshop-01.jpg",
        "title": "Sona Workshop 01 film",
        "sizeBytes": 54200435,
        "aspectRatio": 1.7777777777777777,
        "hasAudio": true
      }
    ],
    "tags": [
      "PHOTO",
      "VIDEO"
    ]
  },
  {
    "slug": "nikita",
    "title": "NIKITA",
    "year": "2026",
    "cover": "/Portfolio/NIKITA/watch?v=BLn4uTtfIpU.jpg",
    "story": "We filmed Nikita’s performance through its gestures, movement and atmosphere, giving a fleeting presence lasting form and another space to be encountered.",
    "tags": [
      "VIDEO"
    ],
    "media": []
  }
];

// Covers named watch?v=VIDEO_ID.png are discovered on start/build and grouped by project folder.
for (const project of projects) {
  const folder = project.cover.split('/')[2];
  const covers = youtubeCovers.filter(cover => cover.folder === folder &&
    !project.media.some(media => media.type === 'youtube' && media.url === cover.url));
  if (covers.length) {
    if (covers.some(cover => cover.src !== project.cover)) {
      project.media.push({ type: 'text', title: 'Watch the film', body: 'Watch the full film on YouTube.' });
    }
    project.media.push(...covers.map(cover => ({
      type: 'youtube' as const, src: cover.src, url: cover.url, title: `${project.title} film`,
    })));
  }
}
