export interface AITool {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  features: string[];
  pricing: string;
  website: string;
  image: string;
  rating: number;
  bestFor: string[];
  limitations: string[];
  tips: Tip[];
  shortcuts?: Shortcut[];
  howToUse: HowToStep[];
}

export interface Tip {
  title: string;
  description: string;
}

export interface Shortcut {
  keys: string;
  description: string;
}

export interface HowToStep {
  step: number;
  title: string;
  description: string;
}

export type Category = {
  id: string;
  name: string;
  description: string;
  icon: string;
};
