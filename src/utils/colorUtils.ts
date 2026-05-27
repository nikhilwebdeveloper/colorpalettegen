import { IPaletteColor, ColorHarmony } from '../types';

// Convert HEX to RGB
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const fullHex = hex.replace(shorthandRegex, (_, r, g, b) => r + r + g + g + b + b);
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

// Convert RGB to HSL
export function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return { 
    h: Math.round(h * 360), 
    s: Math.round(s * 100), 
    l: Math.round(l * 100) 
  };
}

// Convert HSL to HEX
export function hslToHex(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const r = l - a * Math.max(-1, Math.min(k(n) - 3, 9 - k(n), 1));
    return Math.round(255 * r).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
}

// Generate random Hex color
export function generateRandomHex(): string {
  const chars = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += chars[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Relative luminance for WCAG accessibility
export function getLuminance(hex: string): number {
  const rgb = hexToRgb(hex);
  if (!rgb) return 0;
  const parts = [rgb.r, rgb.g, rgb.b].map(v => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * parts[0] + 0.7152 * parts[1] + 0.0722 * parts[2];
}

export function getContrastColor(hex: string): '#000000' | '#FFFFFF' {
  const luminance = getLuminance(hex);
  return luminance > 0.45 ? '#000000' : '#FFFFFF';
}

// Basic shades and tints generator helper
export function generateShadesAndTints(hex: string): string[] {
  const rgb = hexToRgb(hex);
  if (!rgb) return Array(9).fill(hex);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const shades: string[] = [];
  
  // Create 9 points: 10%, 20%, 30%, 40%, 50%, 60%, 70%, 80%, 90% lightness
  for (let l = 10; l <= 90; l += 10) {
    shades.push(hslToHex(hsl.h, hsl.s, l));
  }
  return shades;
}

// Color Names Dictionary for basic matching
const COLOR_NAMES: { hex: string; name: string }[] = [
  { hex: '#000000', name: 'Ink' },
  { hex: '#FFFFFF', name: 'Chalk' },
  { hex: '#FF0000', name: 'Crimson' },
  { hex: '#00FF00', name: 'Lime' },
  { hex: '#0000FF', name: 'Cobalt' },
  { hex: '#FFFF00', name: 'Canary' },
  { hex: '#00FFFF', name: 'Cyan' },
  { hex: '#FF00FF', name: 'Magenta' },
  { hex: '#808080', name: 'Slate Gray' },
  { hex: '#C0C0C0', name: 'Silver' },
  { hex: '#800000', name: 'Maroon' },
  { hex: '#808000', name: 'Olive' },
  { hex: '#008000', name: 'Forest Green' },
  { hex: '#800080', name: 'Plum' },
  { hex: '#008080', name: 'Teal' },
  { hex: '#000080', name: 'Navy' },
  { hex: '#FF3366', name: 'Rose Red' },
  { hex: '#FF9900', name: 'Saffron' },
  { hex: '#33CC66', name: 'Emerald' },
  { hex: '#3399FF', name: 'Sky Blue' },
  { hex: '#9933FF', name: 'Amethyst' },
  { hex: '#FF66B2', name: 'Blush Pink' },
  { hex: '#66E0FF', name: 'Electric Turquoise' },
  { hex: '#F5F5DC', name: 'Oatmeal' },
  { hex: '#E6E6FA', name: 'Periwinkle' },
  { hex: '#FFE4E1', name: 'Misty Rose' },
  { hex: '#FAF0E6', name: 'Linen' },
  { hex: '#1E1E24', name: 'Charcoal' },
  { hex: '#2A9D8F', name: 'Deep Aqua' },
  { hex: '#E76F51', name: 'Coral Terracotta' },
  { hex: '#F4A261', name: 'Sandy Gold' },
  { hex: '#E7C169', name: 'Mustard Satin' },
  { hex: '#6B705C', name: 'Warm Olive' },
  { hex: '#A5A58D', name: 'Desert Sage' },
  { hex: '#DDBDF1', name: 'Lilac Cloud' },
  { hex: '#9B5DE5', name: 'Vibrant Amethyst' },
  { hex: '#F15BB5', name: 'Hot Pink' },
  { hex: '#EE6C4D', name: 'Sunset Terracotta' },
  { hex: '#293241', name: 'Midnight Navy' },
  { hex: '#3D5A80', name: 'Storm Blue' },
  { hex: '#E0FBFC', name: 'Ice Water' }
];

// Approximate name of a color using euclidean distance in RGB space
export function getColorName(hex: string): string {
  const currentRgb = hexToRgb(hex);
  if (!currentRgb) return 'Custom';

  let minDistance = Infinity;
  let closestName = 'Custom';

  for (const item of COLOR_NAMES) {
    const itemRgb = hexToRgb(item.hex);
    if (!itemRgb) continue;

    const dist = Math.sqrt(
      Math.pow(currentRgb.r - itemRgb.r, 2) +
      Math.pow(currentRgb.g - itemRgb.g, 2) +
      Math.pow(currentRgb.b - itemRgb.b, 2)
    );

    if (dist < minDistance) {
      minDistance = dist;
      closestName = item.name;
    }
  }

  // If match is exact, use it. Otherwise, return relative descriptors
  return closestName;
}

// Generate Palette based on select harmony
export function generateHarmonyPalette(harmony: ColorHarmony, lockedColors: IPaletteColor[], size: number = 5): IPaletteColor[] {
  // If we have some locked colors, we should try to align the rest of the generated colors or preserve them.
  // Setup the list of colors:
  const colors: IPaletteColor[] = Array(size).fill(null).map((_, i) => ({
    id: `color-${i}`,
    hex: '#FFFFFF',
    locked: false,
    name: 'Custom'
  }));

  // Populate actual locked colors
  lockedColors.forEach((locked, index) => {
    if (index < size) {
      colors[index] = { ...locked };
    }
  });

  // Base seed color is either the first locked color or a random new color
  const seedItem = colors.find(c => c.locked);
  const baseHex = seedItem ? seedItem.hex : generateRandomHex();
  const baseRgb = hexToRgb(baseHex)!;
  const baseHsl = rgbToHsl(baseRgb.r, baseRgb.g, baseRgb.b);

  switch (harmony) {
    case 'analogous': {
      // Step hue by 15-30 degrees
      for (let i = 0; i < size; i++) {
        if (!colors[i].locked) {
          const h = (baseHsl.h + (i - Math.floor(size / 2)) * 25 + 360) % 360;
          const hex = hslToHex(h, baseHsl.s, baseHsl.l);
          colors[i] = {
            id: `color-${Date.now()}-${i}`,
            hex,
            locked: false,
            name: getColorName(hex)
          };
        }
      }
      break;
    }
    case 'monochromatic': {
      // Vary lightness between 15% and 85%
      for (let i = 0; i < size; i++) {
        if (!colors[i].locked) {
          const l = Math.max(10, Math.min(95, 15 + i * (70 / (size - 1))));
          // Vary saturation slightly as well to keep it rich
          const s = Math.max(10, Math.min(100, baseHsl.s - 10 + (i * 3)));
          const hex = hslToHex(baseHsl.h, s, l);
          colors[i] = {
            id: `color-${Date.now()}-${i}`,
            hex,
            locked: false,
            name: getColorName(hex)
          };
        }
      }
      break;
    }
    case 'triadic': {
      // Step hue by 120 and 240 degrees etc
      for (let i = 0; i < size; i++) {
        if (!colors[i].locked) {
          let h = baseHsl.h;
          if (i === 1) h = (baseHsl.h + 120) % 360;
          else if (i === 2) h = (baseHsl.h + 240) % 360;
          else if (i === 3) h = (baseHsl.h + 60) % 360; // secondary high points
          else if (i === 4) h = (baseHsl.h + 180) % 360; // split point
          
          const hex = hslToHex(h, baseHsl.s, baseHsl.l);
          colors[i] = {
            id: `color-${Date.now()}-${i}`,
            hex,
            locked: false,
            name: getColorName(hex)
          };
        }
      }
      break;
    }
    case 'complementary': {
      // High contrast direct reverse hue
      for (let i = 0; i < size; i++) {
        if (!colors[i].locked) {
          let h = baseHsl.h;
          let l = baseHsl.l;
          let s = baseHsl.s;

          if (i === 0) {
            // Seed
          } else if (i === 1) {
            l = Math.max(15, baseHsl.l - 20); // Dark base
          } else if (i === 2) {
            h = (baseHsl.h + 180) % 360; // Pure Complement
          } else if (i === 3) {
            h = (baseHsl.h + 180) % 360;
            l = Math.max(15, baseHsl.l - 25); // Dark complement
          } else {
            l = Math.min(90, baseHsl.l + 30); // Bright Tint
          }

          const hex = hslToHex(h, s, l);
          colors[i] = {
            id: `color-${Date.now()}-${i}`,
            hex,
            locked: false,
            name: getColorName(hex)
          };
        }
      }
      break;
    }
    case 'split-complementary': {
      for (let i = 0; i < size; i++) {
        if (!colors[i].locked) {
          let h = baseHsl.h;
          if (i === 1) h = (baseHsl.h + 150) % 360;
          else if (i === 2) h = (baseHsl.h + 210) % 360;
          else if (i === 3) h = (baseHsl.h + 30) % 360;
          else if (i === 4) h = (baseHsl.h + 180) % 360;

          const hex = hslToHex(h, baseHsl.s, baseHsl.l);
          colors[i] = {
            id: `color-${Date.now()}-${i}`,
            hex,
            locked: false,
            name: getColorName(hex)
          };
        }
      }
      break;
    }
    case 'tetradic': {
      for (let i = 0; i < size; i++) {
        if (!colors[i].locked) {
          let h = baseHsl.h;
          if (i === 1) h = (baseHsl.h + 90) % 360;
          else if (i === 2) h = (baseHsl.h + 180) % 360;
          else if (i === 3) h = (baseHsl.h + 270) % 360;
          else h = (baseHsl.h + 45) % 360;

          const hex = hslToHex(h, baseHsl.s, baseHsl.l);
          colors[i] = {
            id: `color-${Date.now()}-${i}`,
            hex,
            locked: false,
            name: getColorName(hex)
          };
        }
      }
      break;
    }
    case 'random':
    default: {
      for (let i = 0; i < size; i++) {
        if (!colors[i].locked) {
          const hex = generateRandomHex();
          colors[i] = {
            id: `color-${Date.now()}-${i}`,
            hex,
            locked: false,
            name: getColorName(hex)
          };
        }
      }
    }
  }

  // Fill in any that remain unassigned/broken
  for (let i = 0; i < size; i++) {
    if (!colors[i] || !colors[i].hex) {
      const hex = generateRandomHex();
      colors[i] = {
        id: `color-fallback-${i}`,
        hex,
        locked: false,
        name: getColorName(hex)
      };
    }
  }

  return colors;
}

// Convert palette colors to CSS Variables output
export function paletteToCSS(colors: IPaletteColor[]): string {
  let output = '/* CSS Custom Properties */\n';
  output += ':root {\n';
  colors.forEach((c, idx) => {
    const varName = `--color-palette-${idx + 1}`;
    output += `  ${varName}: ${c.hex}; /* ${c.name || 'Color'} */\n`;
  });
  output += '}\n\n';
  
  output += '/* Usage Example */\n';
  output += '.palette-container {\n';
  colors.forEach((c, idx) => {
    output += `  /* background-color: var(--color-palette-${idx + 1}); */\n`;
  });
  output += '}';
  return output;
}

// Convert palette colors to Tailwind Config output
export function paletteToTailwind(colors: IPaletteColor[], name: string = 'custom-palette'): string {
  let output = '/* Tailwind CSS v4+ Theme Variables */\n';
  output += '@theme {\n';
  colors.forEach((c, idx) => {
    output += `  --color-${name}-${idx + 1}00: ${c.hex};\n`;
  });
  output += '}\n\n';

  output += '/* Tailwind CSS v3 Config Object */\n';
  output += 'module.exports = {\n';
  output += '  theme: {\n';
  output += '    extend: {\n';
  output += '      colors: {\n';
  output += `        '${name}': {\n`;
  colors.forEach((c, idx) => {
    output += `          '${(idx + 1) * 100}': '${c.hex}',\n`;
  });
  output += '        }\n';
  output += '      }\n';
  output += '    }\n';
  output += '  }\n';
  output += '}';
  return output;
}

// Convert palette colors to SVG file format
export function paletteToSVG(colors: IPaletteColor[]): string {
  const width = 800;
  const height = 400;
  const colWidth = width / colors.length;
  
  let rects = '';
  let labels = '';
  
  colors.forEach((c, idx) => {
    const x = idx * colWidth;
    rects += `  <rect x="${x}" y="0" width="${colWidth}" height="${height - 100}" fill="${c.hex}" />\n`;
    
    // Text container color
    const textFill = getContrastColor(c.hex);
    labels += `  <!-- Label inside block -->\n`;
    labels += `  <text x="${x + colWidth/2}" y="${(height-100)/2}" fill="${textFill}" font-family="system-ui, sans-serif" font-weight="bold" font-size="16" text-anchor="middle" dominant-baseline="central">${c.hex}</text>\n`;
    labels += `  <text x="${x + colWidth/2}" y="${(height-100)/2 + 25}" fill="${textFill}" font-family="system-ui, sans-serif" font-size="12" text-anchor="middle" dominant-baseline="central">${c.name || 'Custom'}</text>\n`;
  });
  
  // Legend at the bottom
  let footerBg = '<rect x="0" y="300" width="800" height="100" fill="#1e1e24" />\n';
  let footerText = `<text x="40" y="355" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="bold" font-size="20">Color Palette Generator</text>\n`;
  footerText += `<text x="760" y="355" fill="#a5a58d" font-family="system-ui, sans-serif" font-size="14" text-anchor="end">Created with AI Studio</text>\n`;

  return `<?xml version="1.0" standalone="no"?>
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
${rects}
${labels}
${footerBg}
${footerText}
</svg>`;
}
