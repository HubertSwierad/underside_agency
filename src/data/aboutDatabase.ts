export type AboutTile =
    | { type: 'text'; eyebrow?: string; title: string; body?: string; className?: string; email?: string; instagram?: string; facebook?: string; youtube?: string; legal?: string; company?: { name: string; href: string }; companyDescription?: string; copyright?: boolean }
    | { type: 'image'; src: string; alt: string; caption: string }
    | { type: 'localVideo'; src: string; poster: string; title: string; caption: string; aspectRatio: number; hasAudio?: boolean }
    | { type: 'youtubeVideo'; src: string; url: string; title: string; caption: string; linkLabel: string };

export const aboutTiles: AboutTile[] = [
  {
    type: 'text', title: 'Visuals that stay <br/> under your skin.',
    body: 'UNDERSIDE is an independent creative agency for music, culture and independent brands. It shapes visual worlds with a distinct point of view, carrying each idea through the images, films and digital spaces people encounter.'
  },
  { type: 'image', src: '/About/hubert.jpg', alt: 'Hubert Świerad working with photographic prints in a studio', caption: 'HUBERT ŚWIERAD ▪ FOUNDER & CREATIVE DIRECTOR' },
  { type: 'text', title: 'Presence in the frame', body: 'A portrait, a performance or a campaign begins with attention to what is already there: gesture, light and atmosphere. Each image stays close to the character of the person, place or moment.' },
  { type: 'image', src: '/Portfolio/Horizon/cover.jpeg', alt: 'Festival performance photographed in warm stage light', caption: 'LIVE PERFORMANCES' },
  { type: 'image', src: '/Portfolio/Vali/workshops 2026/_NZ82384.jpg', alt: 'Vali Theater Lab participants moving together during a workshop', caption: 'EVENT DOCUMENTATION' },
  { type: 'image', src: '/Portfolio/Camila Lading/_NZ83345.jpg', alt: 'Camila Lading fashion campaign portrait with two models in expressive layered looks', caption: 'FASHION CAMPAIGNS' },
  { type: 'image', src: '/Portfolio/Horizon/E0081C03-722E-484D-933A-857F6D62EF38_1_102_o.jpeg', alt: 'Feunea performing live in vivid stage light', caption: 'ARTIST PORTRAITS' },
  { type: 'image', src: '/Portfolio/Wh/_NZ89013.jpg', alt: 'Freewheelin staff member pictured inside the shop', caption: 'BRAND PORTRAITURE' },

  { type: 'text',  title: 'In motion', body: 'Music, movement and atmosphere shape films that preserve the energy of a live moment and give it a life beyond the room.' },
  { type: 'youtubeVideo', src: '/Portfolio/FASHION SHOW/watch?v=pepfv6cDHf8.jpg', url: 'https://www.youtube.com/watch?v=pepfv6cDHf8', title: 'VIA Fashion Show film', caption: 'AFTERMOVIE', linkLabel: 'WATCH ON YOUTUBE' },
  { type: 'localVideo', src: '/Portfolio/Vali/reels/reel_vali_1.mp4', poster: '/Portfolio/Vali/reels/reel_vali_1-poster.jpg', title: 'Vali Theater Lab reel', caption: 'SHORT-FORM', aspectRatio: 9 / 16 },
  { type: 'youtubeVideo', src: '/Portfolio/Vali/watch?v=kSmcqsy7MTA.png', url: 'https://www.youtube.com/watch?v=kSmcqsy7MTA', title: 'Vali Theater Lab campaign film', caption: 'CAMPAIGN FILM', linkLabel: 'WATCH ON YOUTUBE' },

  { type: 'text',  title: 'One visual language', body: 'Identity, artwork and campaigns belong to the same world. A clear creative direction keeps each expression connected while letting the character of the project lead.' },
  { type: 'localVideo', src: '/About/horizon_logo.mp4', poster: '/Portfolio/Horizon/web/identity.jpg', title: 'Horizon visual identity', caption: 'BRAND IDENTITY', aspectRatio: 4 / 5, hasAudio:false},
  { type: 'image', src: '/About/creative-direction-campaign-design.jpg', alt: 'Creative direction and campaign design artwork', caption: 'CAMPAIGNS' },
  { type: 'image', src: '/About/creative-direction-cover.jpg', alt: 'Creative direction for music cover artwork', caption: 'ARTWORK' },
  { type: 'localVideo', src: '/About/creative-direction-music-visuals.mp4', poster: '/About/creative-direction-music-visuals-poster.jpg', title: 'Creative direction for music visuals', caption: 'MUSIC FILM', aspectRatio: 9 / 16 },

  { type: 'text',  title: 'The world, online', body: 'A website extends a project into a space of its own. Its visual language carries through to the details, in an experience made to be explored and understood.' },
  { type: 'image', src: '/About/digital-expirience-website-development.jpg', alt: 'Festival website displayed on a laptop', caption: 'DIGITAL EXPERIENCE' },
  {
    type: 'text',
    title: 'Begin a conversation.',
    body: 'Have a project taking shape? Get in touch to discuss what it needs.',
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
