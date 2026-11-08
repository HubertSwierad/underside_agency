export type AboutTile =
    | { type: 'text'; eyebrow?: string; title: string; body?: string; className?: string; email?: string; instagram?: string; facebook?: string; youtube?: string; legal?: string; company?: { name: string; href: string }; companyDescription?: string; copyright?: boolean }
    | { type: 'image'; src: string; alt: string; caption: string }
    | { type: 'localVideo'; src: string; poster: string; title: string; caption: string; aspectRatio: number; hasAudio?: boolean }
    | { type: 'youtubeVideo'; src: string; url: string; title: string; caption: string; linkLabel: string };

export const aboutTiles: AboutTile[] = [
  {
    type: 'text', title: 'Visuals that stay <br/> under your skin.',
    body: 'UNDERSIDE moves between image, sound and space. We bring an editorial sensibility, a precise hand and an instinct for the detail that makes each project unmistakably its own.'
  },
  { type: 'image', src: '/About/underside-team.jpg', alt: 'Creative collaborators reviewing photographs around a table in a dark studio', caption: 'UNDERSIDE. WE RISE TOGETHER.' },

  { type: 'text', title: 'Photography', body: 'From live performance and portraiture to fashion and brand imagery, we create photographs with presence. An editorial eye shapes every frame, with light, gesture and atmosphere refined in a quiet pursuit of perfection. Precise, never lifeless.' },
  { type: 'image', src: '/Portfolio/Horizon/cover.jpeg', alt: 'Festival performance photographed in warm stage light', caption: 'LIVE PERFORMANCES' },
  { type: 'image', src: '/Portfolio/Vali/workshops 2026/_NZ82384.jpg', alt: 'Vali Theater Lab participants moving together during a workshop', caption: 'EVENT DOCUMENTATION' },
  { type: 'image', src: '/Portfolio/Camila Lading/_NZ83345.jpg', alt: 'Camila Landing fashion campaign portrait with two models in expressive layered looks', caption: 'FASHION CAMPAIGNS' },
  { type: 'image', src: '/Portfolio/Horizon/E0081C03-722E-484D-933A-857F6D62EF38_1_102_o.jpeg', alt: 'Feunea performing live in vivid stage light', caption: 'ARTIST PORTRAITS' },
  { type: 'image', src: '/Portfolio/Wh/_NZ89013.jpg', alt: 'Freewheelin staff member pictured inside the shop', caption: 'BRAND PORTRAITURE' },

  { type: 'text',  title: 'Film', body: 'Movement changes the way a story is felt. We shape live moments, moving portraits and campaign films with close attention to rhythm, texture and atmosphere. Images with a pulse, a sense of place and an afterlife beyond the screen.' },
  { type: 'youtubeVideo', src: '/Portfolio/FASHION SHOW/watch?v=pepfv6cDHf8.jpg', url: 'https://www.youtube.com/watch?v=pepfv6cDHf8', title: 'VIA Fashion Show film', caption: 'AFTERMOVIE', linkLabel: 'WATCH ON YOUTUBE' },
  { type: 'localVideo', src: '/Portfolio/Vali/reels/reel_vali_1.mp4', poster: '/Portfolio/Vali/reels/reel_vali_1-poster.jpg', title: 'Vali Theater Lab reel', caption: 'SHORT-FORM', aspectRatio: 9 / 16 },
  { type: 'youtubeVideo', src: '/Portfolio/Vali/watch?v=kSmcqsy7MTA.png', url: 'https://www.youtube.com/watch?v=kSmcqsy7MTA', title: 'Vali Theater Lab campaign film', caption: 'CAMPAIGN FILM', linkLabel: 'WATCH ON YOUTUBE' },

  { type: 'text',  title: 'Creative Direction', body: 'We give ideas a visual world of their own. From identity and campaigns to artwork and music visuals, each element enters into conversation with the next. The result is considered, distinctive and full of feeling.' },
  { type: 'localVideo', src: '/About/horizon_logo.mp4', poster: '/Portfolio/Horizon/web/identity.jpg', title: 'Horizon visual identity', caption: 'BRAND IDENTITY', aspectRatio: 4 / 5, hasAudio:false},
  { type: 'image', src: '/About/creative-direction-campaign-design.jpg', alt: 'Creative direction and campaign design artwork', caption: 'CAMPAIGNS' },
  { type: 'image', src: '/About/creative-direction-cover.jpg', alt: 'Creative direction for music cover artwork', caption: 'ARTWORK' },
  { type: 'localVideo', src: '/About/creative-direction-music-visuals.mp4', poster: '/About/creative-direction-music-visuals-poster.jpg', title: 'Creative direction for music visuals', caption: 'MUSIC FILM', aspectRatio: 9 / 16 },

  { type: 'text',  title: 'Digital Experience', body: 'A digital presence can feel like a place with its own atmosphere. We design and build websites that carry the character of the people, ideas and culture behind them, then care for the details that keep them alive, from domains and hosting to ongoing support.' },
  { type: 'image', src: '/About/digital-expirience-website-development.jpg', alt: 'Festival website displayed on a laptop', caption: 'WEBSITE DESIGN, DEVELOPMENT & CARE' },
  {
    type: 'text',
    title: 'Begin a conversation.',
    body: 'Tell us what is taking shape. We can enter at any point, from the first image in your mind to the last detail on screen.',
    className: 'about-contact-slide',
    email: 'contact@underside.agency',
    instagram: 'https://www.instagram.com/underside.agency/',
    facebook: 'https://www.facebook.com/profile.php?id=61584588110824',
    youtube: 'https://www.youtube.com/@UNDERSIDEAGENCY',
    legal: 'UNDERSIDE is a brand of',
    company: {
      name: 'GoodNode Sp. z o.o.',
      href: 'https://goodnode.eu/'
    },
    companyDescription: 'a Polish limited liability company. Registered office: Demokratyczna 117, 93-348 Łódź, Poland. VAT: PL7292752531.',
    copyright: true,
  }
];
