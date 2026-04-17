import type { TechnologyNode, Sector, TimeframeConfig } from '../types';

export const defaultTimeframeConfig: TimeframeConfig = {
  shortLine: "ระยะสั้น",
  shortLegend: "ระยะสั้น 0 - 2 ปี",
  mediumLine: "ระยะกลาง",
  mediumLegend: "ระยะกลาง 3 - 5 ปี",
  longLine: "ระยะยาว",
  longLegend: "ระยะยาว 6 - 10 ปี"
};

export const sectorsV1: Sector[] = [
  { id: 'satellite_space', name: 'กลุ่ม Satellite and Space', color: '#1e293b' },
  { id: 'audiovisual_media', name: 'กลุ่ม Audiovisual media', color: '#1e293b' },
];

export const mockDataV1: TechnologyNode[] = [
  {
    id: 'ngso',
    name: 'NGSO, including LEO Satellites and Multi-Orbit model',
    categoryId: 'satellite_space',
    timeframe: '0-2',
    importance: 5,
    signals: ['Constellations expanding rapidly.'],
    implications: ['Global broadband availability.'],
    questions: ['Will LEO operators monopolize the sky?']
  },
  {
    id: 'connected_tv',
    name: 'Connected TV and Devices',
    categoryId: 'audiovisual_media',
    timeframe: '0-2',
    importance: 5,
    signals: ['CTV dominates viewing metrics.'],
    implications: ['Targeted ads bypass traditional broadcasting.'],
    questions: ['Will public broadcasting survive on CTV?']
  },
  {
    id: 'd2d',
    name: 'Satellite Direct-to-Device and Non-Terrestrial Network (NTN)',
    categoryId: 'satellite_space',
    timeframe: '3-5',
    importance: 4,
    signals: ['Mobile devices connecting directly to orbit.'],
    implications: ['Eradicates global dead zones.'],
    questions: ['How do telcos compete with direct-to-device models?']
  },
  {
    id: 'ai_av_media',
    name: 'AI for Audiovisual Media',
    categoryId: 'audiovisual_media',
    timeframe: '0-2',
    importance: 4,
    signals: ['Synthetically generated video tools are widespread.'],
    implications: ['Content generation becomes massively scalable.'],
    questions: ['How do audiences trust visual evidence anymore?']
  },
  {
    id: 'inter_satellite',
    name: 'Inter-satellite Communications (by Radio Spectrum or Laser)',
    categoryId: 'satellite_space',
    timeframe: '3-5',
    importance: 4,
    signals: ['Optical laser links deployed on newer satellites.'],
    implications: ['Sub-sea cable reliance decreases.'],
    questions: ['Can space backbone compete with fiber capacity?']
  },
  {
    id: 'satellite_iot',
    name: 'Satellite IoT',
    categoryId: 'satellite_space',
    timeframe: '0-2',
    importance: 4,
    signals: ['Massive IoT constellations targeting agriculture/logistics.'],
    implications: ['Seamless global asset tracking.'],
    questions: ['Will there be enough spectrum for millions of new IoT connections?']
  },
  {
    id: 'geo_blocking',
    name: 'Geo-blocking',
    categoryId: 'audiovisual_media',
    timeframe: '3-5',
    importance: 4,
    signals: ['Content rights fragmented across borders.'],
    implications: ['Consumers struggle to access global media libraries.'],
    questions: ['Will geo-blocking become obsolete via VPN and satellite tech?']
  },
  {
    id: 'esim',
    name: 'Earth Stations in Motion',
    categoryId: 'satellite_space',
    timeframe: '0-2',
    importance: 3,
    signals: ['Broadband connectivity on planes, ships, and trains.'],
    implications: ['Always-on connectivity everywhere.'],
    questions: ['How will spectrum be shared without interference on borders?']
  },
  {
    id: 'content_provenance',
    name: 'Content Provenance Technology',
    categoryId: 'audiovisual_media',
    timeframe: '3-5',
    importance: 4,
    signals: ['Digital watermarking and C2PA metadata integrated into news.'],
    implications: ['Creates a verified layer of information on the web.'],
    questions: ['Will unverified content be completely filtered out by default?']
  }
];

export const sectorsV2: Sector[] = [
  { id: 'satellite_space', name: 'กลุ่ม Satellite and Space', color: '#1e293b' },
];

export const mockDataV2: TechnologyNode[] = [
  ...mockDataV1.filter(node => node.categoryId !== 'audiovisual_media'),
  {
    id: 'vhts',
    name: 'GSO Satellite Broadband Internet (Very High Throughput Satellite - VHTS)',
    categoryId: 'satellite_space',
    timeframe: '0-2',
    importance: 4,
    signals: [],
    implications: [],
    questions: []
  }
];
