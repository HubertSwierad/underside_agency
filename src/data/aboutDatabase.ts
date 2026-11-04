export type AboutTile =
  | { type: 'text'; eyebrow?: string; title: string; body?: string; className?: string; email?: string; instagram?: string; facebook?: string; youtube?: string; legal?: string; company?: { name: string; href: string }; companyDescription?: string; copyright?: boolean }
  | { type: 'image'; src: string; alt: string; caption: string }
  | { type: 'localVideo'; src: string; poster: string; title: string; caption: string; sizeBytes: number; aspectRatio: number; hasAudio?: boolean }
  | { type: 'youtubeVideo'; src: string; url: string; title: string; caption: string; linkLabel: string };

export const aboutTiles: AboutTile[] = [
  {
    type: 'text', title: 'Visuals that stay <br/> under your skin.',
    body: 'We understand artists and what their work needs. Together, we create photographs, films and experiences that complement your vision and carry it further.'
  },
  { type: 'image', src: '/About/underside-team.jpg', alt: 'Creative collaborators reviewing photographs around a table in a dark studio', caption: 'UNDERSIDE. WE RISE TOGETHER.' },

  { type: 'text', title: 'Photography', body: 'You make the work. We photograph live shows, workshops, artists and fashion campaigns with an editorial eye for movement, feeling and atmosphere.' },
  { type: 'image', src: '/Portfolio/Horizon/cover.jpeg', alt: 'Festival performance photographed in warm stage light', caption: 'LIVE PERFORMANCES' },
  { type: 'image', src: '/Portfolio/Vali/workshops 2026/_NZ82384.jpg', alt: 'Vali Theater Lab participants moving together during a workshop', caption: 'EVENT DOCUMENTATION' },
  { type: 'image', src: '/Portfolio/Camila Lading/_NZ83345.jpg', alt: 'Camila Landing fashion campaign portrait with two models in expressive layered looks', caption: 'FASHION CAMPAIGNS' },
  { type: 'image', src: '/Portfolio/Horizon/E0081C03-722E-484D-933A-857F6D62EF38_1_102_o.jpeg', alt: 'Feunea performing live in vivid stage light', caption: 'ARTIST PORTRAITS' },
  { type: 'image', src: '/Portfolio/Wh/_NZ89013.jpg', alt: 'Freewheelin staff member pictured inside the shop', caption: 'BRAND PORTRAITURE' },

  { type: 'text',  title: 'Film', body: 'You bring the story. We shape it into films and short-form pieces that carry its feeling beyond the moment.' },
  { type: 'youtubeVideo', src: '/Portfolio/FASHION SHOW/watch?v=pepfv6cDHf8.jpg', url: 'https://www.youtube.com/watch?v=pepfv6cDHf8', title: 'VIA Fashion Show film', caption: 'AFTERMOVIE', linkLabel: 'WATCH ON YOUTUBE' },
  { type: 'localVideo', src: '/Portfolio/Vali/reels/reel_vali_1.mp4', poster: '/Portfolio/Vali/reels/reel_vali_1-poster.jpg', title: 'Vali Theater Lab reel', caption: 'SHORT-FORM', sizeBytes: 9382136, aspectRatio: 9 / 16 },
  { type: 'youtubeVideo', src: '/Portfolio/Vali/watch?v=kSmcqsy7MTA.png', url: 'https://www.youtube.com/watch?v=kSmcqsy7MTA', title: 'Vali Theater Lab campaign film', caption: 'CAMPAIGN FILM', linkLabel: 'WATCH ON YOUTUBE' },

  { type: 'text',  title: 'Creative Direction', body: 'You bring the vision. We find its visual language and carry it across campaigns, music and moving image. From first idea to final detail.' },
  { type: 'localVideo', src: '/About/horizon_logo.mp4', poster: '/Portfolio/Horizon/web/identity.jpg', title: 'Horizon visual identity', caption: 'BRAND IDENTITY', sizeBytes: 12378815, aspectRatio: 4 / 5, hasAudio:false},
  { type: 'image', src: '/About/creative-direction-campaign-design.jpg', alt: 'Creative direction and campaign design artwork', caption: 'CAMPAIGNS' },
  { type: 'image', src: '/About/creative-direction-cover.jpg', alt: 'Creative direction for music cover artwork', caption: 'ARTWORK' },
  { type: 'localVideo', src: '/About/creative-direction-music-visuals.mp4', poster: '/About/creative-direction-music-visuals-poster.jpg', title: 'Creative direction for music visuals', caption: 'MUSIC FILM', sizeBytes: 23314162, aspectRatio: 9 / 16 },

  { type: 'text',  title: 'Digital Experience', body: 'You focus on your work. We design, build and look after the digital side from websites to hosting, domains and ongoing support.' },
  { type: 'image', src: '/About/digital-expirience-website-development.jpg', alt: 'Festival website displayed on a laptop', caption: 'WEBSITE DESIGN, DEVELOPMENT & CARE' },
  {
    type: 'text',
    title: 'Begin a conversation.',
    body: 'Bring us one part of the process, or entrust us with the whole project. Tell us what you’re envisioning.',
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
