import type { TechnologyNode, Sector } from '../types';

export const sectors: Sector[] = [
  { id: 'satellite_space', name: 'Satellite and Space', color: '#dc2626' }, // NBTC Red
  { id: 'audiovisual_media', name: 'Audiovisual Media', color: '#1e3a8a' }, // NBTC Blue
  { id: 'ai_network', name: 'AI & Network Infrastructure', color: '#6d28d9' }, // Purple
];

export const mockData: TechnologyNode[] = [
  {
    id: 'd2d',
    name: 'Satellite Direct-to-Device (D2D) and NTN',
    categoryId: 'satellite_space',
    timeframe: '0-2',
    importance: 5,
    signals: [
      'In 2026, Starlink is providing D2D services to over 13 million cellular users globally.',
      '3GPP Release 18 sets standards for 5G Advanced NTN integration.',
      'Major telcos partnering with LEO operators for dead-zone coverage.'
    ],
    implications: [
      'Creates a new market for hybrid satellite-cellular services.',
      'Challenges traditional terrestrial network operator models.',
      'Requires new spectrum licensing schemes (e.g., MSS/ATC integration).'
    ],
    questions: [
      'What if every smartphone becomes a satellite phone by default?',
      'How will regulatory bodies manage spectrum interference between terrestrial and space allocations?',
      'Will D2D decrease the need for rural cell tower deployment?'
    ]
  },
  {
    id: 'ai_av_media',
    name: 'AI for Audiovisual Media',
    categoryId: 'audiovisual_media',
    timeframe: '3-5',
    importance: 4,
    signals: [
      'Generative AI models are capable of creating photorealistic 4K video streams in real-time.',
      'Broadcasters adopting AI for automated multi-language dubbing and localization.',
      'Deepfake detection tools becoming standard in newsrooms.'
    ],
    implications: [
      'Dramatically lowers production costs for high-quality content.',
      'Increases risk of hyper-realistic misinformation (synthetic media).',
      'Potential disruption to voice actor and translator job markets.'
    ],
    questions: [
      'What if 80% of prime-time content is synthetically generated?',
      'How do we enforce copyright on AI-generated audiovisual content?',
      'Will personalized, real-time generated movies become the new standard?'
    ]
  },
  {
    id: 'leo_iot',
    name: 'Satellite IoT',
    categoryId: 'satellite_space',
    timeframe: '3-5',
    importance: 4,
    signals: [
      'Massive proliferation of low-cost IoT satellites.',
      'Global agricultural and maritime logistics relying heavily on space-based IoT.',
      'Standardization of LoRa over satellite.'
    ],
    implications: [
      'Enables true global asset tracking and remote monitoring.',
      'Increases competition in the narrow-band satellite sector.',
      'Space debris risks increase with large IoT constellations.'
    ],
    questions: [
      'What if every shipping container globally is tracked in real-time?',
      'How will this affect data sovereignty if sensor data routes through foreign satellites?',
      'Can LEO IoT enable predictive maintenance on an unprecedented global scale?'
    ]
  },
  {
    id: 'connected_tv',
    name: 'Connected TV and Devices',
    categoryId: 'audiovisual_media',
    timeframe: '0-2',
    importance: 5,
    signals: [
      'Smart TVs dominating household entertainment centers.',
      'Rise of interactive ad formats on CTV platforms.',
      'Integration of smart home hubs directly into CTV operating systems.'
    ],
    implications: [
      'Shift of advertising revenue from linear TV to CTV.',
      'Data privacy concerns regarding viewer behavior tracking.',
      'Fragmentation of content across numerous walled-garden OS ecosystems.'
    ],
    questions: [
      'What if CTV OS providers become the ultimate gatekeepers for all media?',
      'How do regulators ensure fair prominence for local public service broadcasters?',
      'Will personalized tracking on the big screen breach family privacy?'
    ]
  },
  {
    id: 'content_provenance',
    name: 'Content Provenance Technology',
    categoryId: 'audiovisual_media',
    timeframe: '6-10',
    importance: 3,
    signals: [
      'Development of C2PA standards for tracking media origins.',
      'Social media platforms starting to integrate watermarking and metadata checks.',
      'Legislative pushes for mandatory labeling of synthetic media.'
    ],
    implications: [
      'Establishes a chain of trust for digital media.',
      'May require significant infrastructure upgrades for content creators and distributors.',
      'Risk of "provenance divide" between authenticated and unauthenticated media spaces.'
    ],
    questions: [
      'What if unauthenticated media is entirely filtered out by platforms?',
      'Can cryptographic provenance withstand sophisticated tampering or quantum attacks?',
      'How do we ensure privacy for anonymous whistleblowers while tracking media origins?'
    ]
  },
];
