export interface IPaletteColor {
  id: string;
  hex: string;
  locked: boolean;
  name?: string;
}

export interface IPalette {
  id: string;
  colors: IPaletteColor[];
  createdAt: number;
  name?: string;
  favorite?: boolean;
}

export type ColorHarmony = 
  | 'random' 
  | 'analogous' 
  | 'monochromatic' 
  | 'triadic' 
  | 'complementary' 
  | 'split-complementary'
  | 'tetradic';

export type ExportFormat = 'css' | 'tailwind' | 'json' | 'svg' | 'png';
