export type Timeframe = '0-2' | '3-5' | '6-10';

export type Importance = 1 | 2 | 3 | 4 | 5; // 1: Least Important, 5: Most Important

export interface TimeframeConfig {
  shortLine: string;
  shortLegend: string;
  mediumLine: string;
  mediumLegend: string;
  longLine: string;
  longLegend: string;
}

export interface TechnologyNode {
  id: string;
  name: string;
  categoryId: string; // Refers to Sector
  timeframe: Timeframe;
  importance: Importance;
  signals: string[];      // Signals: What's Known?
  implications: string[]; // Implications: So what?
  questions: string[];    // Futures Questions: What If?
  customX?: number;       // Custom X position overlay
  customY?: number;       // Custom Y position overlay
}

export interface Sector {
  id: string;
  name: string;
  color: string;
}
