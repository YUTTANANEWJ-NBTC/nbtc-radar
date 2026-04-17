import type { TechnologyNode, Sector, TimeframeConfig } from '../types';

export const dataVersion = 1;

export const defaultTimeframeConfig: TimeframeConfig = {
  "shortLine": "ระยะสั้น",
  "shortLegend": "ระยะสั้น 0 - 2 ปี",
  "mediumLine": "ระยะกลาง",
  "mediumLegend": "ระยะกลาง 3 - 5 ปี",
  "longLine": "ระยะยาว",
  "longLegend": "ระยะยาว 6 - 10 ปี"
};

export const sectorsV1: Sector[] = [
  { id: 'satellite_space', name: 'กลุ่ม Satellite and Space', color: '#1e293b' },
  { id: 'audiovisual_media', name: 'กลุ่ม Audiovisual media', color: '#1e293b' },
];

export const mockDataV1: TechnologyNode[] = [
  {
    "id": "ngso",
    "name": "NGSO, including LEO Satellites and Multi-Orbit model",
    "categoryId": "satellite_space",
    "timeframe": "0-2",
    "importance": 5,
    "signals": [
      "Constellations expanding rapidly."
    ],
    "implications": [
      "Global broadband availability."
    ],
    "questions": [
      "Will LEO operators monopolize the sky?"
    ]
  },
  {
    "id": "connected_tv",
    "name": "Connected TV and Devices",
    "categoryId": "audiovisual_media",
    "timeframe": "0-2",
    "importance": 5,
    "signals": [
      "CTV dominates viewing metrics."
    ],
    "implications": [
      "Targeted ads bypass traditional broadcasting."
    ],
    "questions": [
      "Will public broadcasting survive on CTV?"
    ]
  },
  {
    "id": "d2d",
    "name": "Satellite Direct-to-Device and Non-Terrestrial Network (NTN)",
    "categoryId": "satellite_space",
    "timeframe": "3-5",
    "importance": 4,
    "signals": [
      "Mobile devices connecting directly to orbit."
    ],
    "implications": [
      "Eradicates global dead zones."
    ],
    "questions": [
      "How do telcos compete with direct-to-device models?"
    ]
  },
  {
    "id": "ai_av_media",
    "name": "AI for Audiovisual Media",
    "categoryId": "audiovisual_media",
    "timeframe": "0-2",
    "importance": 4,
    "signals": [
      "Synthetically generated video tools are widespread."
    ],
    "implications": [
      "Content generation becomes massively scalable."
    ],
    "questions": [
      "How do audiences trust visual evidence anymore?"
    ]
  },
  {
    "id": "inter_satellite",
    "name": "Inter-satellite Communications (by Radio Spectrum or Laser)",
    "categoryId": "satellite_space",
    "timeframe": "3-5",
    "importance": 4,
    "signals": [
      "Optical laser links deployed on newer satellites."
    ],
    "implications": [
      "Sub-sea cable reliance decreases."
    ],
    "questions": [
      "Can space backbone compete with fiber capacity?"
    ]
  },
  {
    "id": "satellite_iot",
    "name": "Satellite IoT",
    "categoryId": "satellite_space",
    "timeframe": "0-2",
    "importance": 4,
    "signals": [
      "Massive IoT constellations targeting agriculture/logistics."
    ],
    "implications": [
      "Seamless global asset tracking."
    ],
    "questions": [
      "Will there be enough spectrum for millions of new IoT connections?"
    ]
  },
  {
    "id": "geo_blocking",
    "name": "Geo-blocking",
    "categoryId": "audiovisual_media",
    "timeframe": "3-5",
    "importance": 4,
    "signals": [
      "Content rights fragmented across borders."
    ],
    "implications": [
      "Consumers struggle to access global media libraries."
    ],
    "questions": [
      "Will geo-blocking become obsolete via VPN and satellite tech?"
    ]
  },
  {
    "id": "esim",
    "name": "Earth Stations in Motion",
    "categoryId": "satellite_space",
    "timeframe": "0-2",
    "importance": 3,
    "signals": [
      "Broadband connectivity on planes, ships, and trains."
    ],
    "implications": [
      "Always-on connectivity everywhere."
    ],
    "questions": [
      "How will spectrum be shared without interference on borders?"
    ]
  },
  {
    "id": "content_provenance",
    "name": "Content Provenance Technology",
    "categoryId": "audiovisual_media",
    "timeframe": "3-5",
    "importance": 4,
    "signals": [
      "Digital watermarking and C2PA metadata integrated into news."
    ],
    "implications": [
      "Creates a verified layer of information on the web."
    ],
    "questions": [
      "Will unverified content be completely filtered out by default?"
    ]
  }
];

export const sectorsV2: Sector[] = [
  { id: 'satellite_space', name: 'กลุ่ม Satellite and Space', color: '#1e293b' },
];

export const mockDataV2: TechnologyNode[] = [
  {
    "id": "ngso",
    "name": "NGSO, including LEO Satellites and Multi-Orbit model",
    "categoryId": "satellite_space",
    "timeframe": "0-2",
    "importance": 5,
    "signals": [
      "Thaicom has partnered with Amazon Leo to launch and distribute low Earth orbit (LEO) satellite broadband services in Thailand by 2027.",
      "An analyst warns of too many low Earth orbit (LEO) satellite constellations, while projecting Starlink could reach 18 million global customers by the end of 2026.",
      "The FCC has granted SpaceX approval to launch an additional 7,500 second-generation Starlink satellites to further expand its global broadband network. [2026]"
    ],
    "implications": [
      "Technology: Expands high-speed, low-latency internet to remote areas and drives new innovations, though it may have limited area traffic capacity",
      "Business & Competition: Serves as a supplementary network that boosts broadband market competition, but risks forming an oligopoly among a few major providers",
      "Social: Bridges the digital divide and supports emergency communications, while facing challenges like high service costs, national security, cyber risks, and space debris",
      "Other Sectors: Enhances operational efficiency for industries like agriculture and fisheries, and aids the government in disaster risk monitoring"
    ],
    "questions": [
      "Will LEO operators monopolize the sky?",
      "Technology: Expands high-speed, low-latency internet to remote areas and drives new innovations, though it may have limited area traffic capacity"
    ]
  },
  {
    "id": "d2d",
    "name": "Satellite Direct-to-Device and Non-Terrestrial Network (NTN)",
    "categoryId": "satellite_space",
    "timeframe": "3-5",
    "importance": 4,
    "signals": [
      "UK's Ofcom has approved a Direct-to-Device regulatory framework, enabling standard mobile phones to connect directly to satellites [2025]",
      "Starlink Mobile unveiled plans for V2 satellites to deliver 5G-like direct-to-cell voice, data, and video connectivity by mid-2027.",
      "AST SpaceMobile will launch its BlueBird 7 satellite on April 19 to deliver 4G/5G broadband directly to everyday smartphones."
    ],
    "implications": [
      "Eradicates global dead zones.",
      "Technology Impact: New service innovations such as satellite voice, SMS, internet, and emergency communications for regular end-user devices , and potential frequency interference between D2D satellite networks and terrestrial IMT networks",
      "Market Competition Impact: Limited business opportunities leading to oligopoly market risks , debates on market boundaries between satellite and terrestrial networks , and new market entrants altering telecommunication competition dynamics",
      "Social Impact: Expanded telecommunication coverage and digital divide reduction in remote or disaster-stricken areas , regulatory challenges due to the novelty of the technology and limited use case data , and national security concerns regarding cross-border data flow without local gateways",
      "Impact on Other Sectors: Operational benefits and enhanced connectivity for the tourism industry, emergency management, and rural development activities in remote areas"
    ],
    "questions": [
      "How do telcos compete with direct-to-device models?"
    ],
    "customX": 255.74914936319234,
    "customY": 252.26485008352222
  },
  {
    "id": "inter_satellite",
    "name": "Inter-satellite Communications (by Radio Spectrum or Laser)",
    "categoryId": "satellite_space",
    "timeframe": "3-5",
    "importance": 4,
    "signals": [
      "The global optical inter-satellite links (OISL) market is projected to surge to $2.0 billion by 2030, driven by major commercial constellations like Starlink and government defense programs adopting laser communications for high-speed, secure data transfer in space.",
      "JAXA and NEC successfully demonstrated a 1.8 Gbps optical data transmission over 40,000 km between a LEO Earth observation satellite and a GEO relay satellite using their LUCAS laser system.",
      "Chinese researchers achieved a 1 Gbps data transmission from a geostationary satellite 36,000 km away using a mere 2-watt laser, overcoming atmospheric distortion to deliver speeds faster than typical Starlink connections."
    ],
    "implications": [
      "Technology Impact: Local gateway dependency reduction, satellite network cost reduction, data latency reduction, network stability enhancement, and potential International Internet Gateway (IIG) and Satellite VPN services",
      "Market Competition Impact: Decreased demand for traditional gateway providers, new partnerships between gateway and satellite communication providers, and loss of competitiveness for smaller satellite companies",
      "Social Impact: National security concerns and cross-border data monitoring challenges"
    ],
    "questions": [
      "Can space backbone compete with fiber capacity?"
    ],
    "customX": 578.7016875888906,
    "customY": 248.51931781188645
  },
  {
    "id": "satellite_iot",
    "name": "Satellite IoT",
    "categoryId": "satellite_space",
    "timeframe": "0-2",
    "importance": 4,
    "signals": [
      "Vodafone IoT Partners with Skylo to Deliver Global Satellite IoT Connectivity",
      "Plan-S boosts Türkiye's IoT satellite network with four new launches",
      "Deutsche Telekom launches world’s first multi-orbit IoT roaming"
    ],
    "implications": [
      "Technology: Enhances remote IoT connectivity and drives new innovations like asset tracking and early warnings.",
      "Business & Competition: Stimulates the wireless communication chip market and sparks competition debates with terrestrial IoT.",
      "Social: Aids government disaster management and farmers' livelihoods, but may shift employment away from manual labor.",
      "Other Sectors: Improves efficiency in logistics and maritime tourism, but risks disadvantaging small businesses due to high initial investments."
    ],
    "questions": [
      "Will there be enough spectrum for millions of new IoT connections?"
    ],
    "customX": 459.2334267324445,
    "customY": 306.6202506054127
  },
  {
    "id": "esim",
    "name": "Earth Stations in Motion       (ESIM)",
    "categoryId": "satellite_space",
    "timeframe": "0-2",
    "importance": 3,
    "signals": [
      "WestJet and TELUS collaborate to provide passengers with free inflight Wi-Fi powered by Starlink's satellite network",
      "Qatar Airways is introducing complimentary, high-speed Starlink Wi-Fi with speeds up to 500 Mbps on select B777 and A350 flights.",
      "IEC Telecom has expanded its presence in Southeast Asia by launching an office in Malaysia as an authorized Starlink reseller to provide high-speed satellite internet to remote communities, businesses, and the maritime sector."
    ],
    "implications": [
      "Technology Impact: Satellite internet coverage and efficiency expansion for land, maritime, and aeronautical vehicles, and new service innovations like real-time vehicle tracking, fleet management, and autonomous drone communicatio",
      "Market Competition Impact: Increased competition in the vehicular satellite internet market, and potential direct competition between GSO and NGSO satellite internet providers",
      "Social Impact: Enhanced internet access in remote areas, emergency communication support for rescue vehicles, continuous connectivity for travelers, cross-border legal jurisdiction challenges, and national security and cybersecurity risks without local gateways",
      "Impact on Other Sectors: Service capability enhancements for airlines and cruise ships, and economic value growth for the regional aviation and maritime logistics industries"
    ],
    "questions": [
      "How will spectrum be shared without interference on borders?"
    ],
    "customX": 453.7975712241387,
    "customY": 431.68024214626695
  },
  {
    "id": "vhts",
    "name": "GSO Satellite Broadband                           (Very High Throughput Satellite - VHTS)  ",
    "categoryId": "satellite_space",
    "timeframe": "0-2",
    "importance": 4,
    "signals": [
      "Türksat to leverage capacity on Eutelsat’s KONNECT VHTS satellite for in-flight connectivity over Europe",
      "ViaSat-3 F2, second of three ultra-high-capacity satellites Boeing is building for global network operator Viasat, launched via United Launch Alliance’s Atlas V"
    ],
    "implications": [],
    "questions": [],
    "customX": 459.8597049190141,
    "customY": 478.36754803054885
  }
];

