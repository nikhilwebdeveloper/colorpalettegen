import React, { useState } from 'react';
import { Copy, Check, RotateCw, Sparkles, Wand2 } from 'lucide-react';
import { hexToRgb, rgbToHsl, hslToHex, generateRandomHex } from '../utils/colorUtils';
import { motion } from 'motion/react';

interface TintShadeGeneratorProps {
  onCopySuccess: (message: string) => void;
}

export default function TintShadeGenerator({ onCopySuccess }: TintShadeGeneratorProps) {
  const [baseColor, setBaseColor] = useState<string>('#6366F1');
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const getTintsAndShades = (hex: string) => {
    const rgb = hexToRgb(hex);
    if (!rgb) return { tints: [], shades: [] };
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

    const tints: string[] = [];
    const shades: string[] = [];

    // Tints (lighter: L ranges from original up to 96%)
    const lStep = (96 - hsl.l) / 10;
    for (let i = 1; i <= 10; i++) {
      const l = Math.min(98, hsl.l + (lStep * i));
      tints.push(hslToHex(hsl.h, hsl.s, l));
    }

    // Shades (darker: L ranges from original down to 6%)
    const dStep = (hsl.l - 6) / 10;
    for (let i = 1; i <= 10; i++) {
      const l = Math.max(4, hsl.l - (dStep * i));
      shades.push(hslToHex(hsl.h, hsl.s, l));
    }

    return { tints: tints.reverse(), shades }; // reverse tints to display lighter first (left to right)
  };

  const { tints, shades } = getTintsAndShades(baseColor);

  const handleCopySingle = async (hexCode: string) => {
    try {
      await navigator.clipboard.writeText(hexCode);
      setCopiedHex(hexCode);
      onCopySuccess(`Copied: ${hexCode}`);
      setTimeout(() => setCopiedHex(null), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleRandomBase = () => {
    const rand = generateRandomHex();
    setBaseColor(rand);
    onCopySuccess('New random base color applied!');
  };

  return (
    <div id="tint-shade-generator-tool" className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full">
      {/* BASE COLOR SELECTOR COLUMN */}
      <div className="lg:col-span-4 flex flex-col space-y-6">
        <div className="bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-850 p-6 rounded-2xl shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-md font-bold text-neutral-800 dark:text-neutral-100 flex items-center space-x-2">
              <Wand2 size={16} className="text-indigo-500" />
              <span>Base Configuration</span>
            </h3>
            <button
              id="rand-base-btn"
              onClick={handleRandomBase}
              className="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded text-neutral-450 hover:text-indigo-600 transition-colors"
              title="Generate Random Base"
            >
              <RotateCw size={14} className="animate-spin-slow" />
            </button>
          </div>

          <div>
            <label htmlFor="base-color-input" className="text-xs font-bold text-neutral-400 uppercase tracking-widest block mb-2">Select Primary Base</label>
            <div className="flex items-center space-x-3 bg-neutral-50 dark:bg-neutral-950 p-3 rounded-xl border border-neutral-150 dark:border-neutral-850">
              <input
                id="base-color-picker"
                type="color"
                value={baseColor}
                onChange={(e) => setBaseColor(e.target.value.toUpperCase())}
                className="w-12 h-12 rounded-lg cursor-pointer border-0 bg-transparent shrink-0"
              />
              <div className="flex-1">
                <input
                  id="base-color-input"
                  type="text"
                  value={baseColor}
                  onChange={(e) => setBaseColor(e.target.value)}
                  maxLength={7}
                  className="w-full bg-transparent font-mono font-bold text-sm tracking-wider uppercase text-neutral-800 dark:text-neutral-100 focus:outline-hidden"
                />
                <span className="text-[10px] text-neutral-400 block mt-0.5 uppercase tracking-wider font-semibold">Scale Seed</span>
              </div>
            </div>
          </div>

          <div className="border-t border-neutral-100 dark:border-neutral-850 pt-4 text-xs text-neutral-500 font-medium leading-relaxed">
            Clicking on any generated variation block below will instantly copy its high-fidelity hexadecimal value back to your clipboard helper.
          </div>
        </div>
      </div>

      {/* TINTS & SHADES VIEW COLUMN */}
      <div className="lg:col-span-8 flex flex-col space-y-6">
        
        {/* TINTS CARD */}
        <div className="bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-850 p-6 rounded-2xl shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-neutral-450 uppercase tracking-widest flex items-center space-x-1">
              <Sparkles size={12} className="text-amber-500" />
              <span>Light Tints (Lighter Blends)</span>
            </span>
            <span className="text-[10px] bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 px-20 py-0.5 rounded-full font-bold">+ White mix</span>
          </div>

          <div id="tints-swatch-strip" className="flex h-16 w-full rounded-xl overflow-hidden border border-black/5">
            {tints.map((hexItem) => (
              <button
                id={`tint-${hexItem.replace('#', '')}`}
                key={hexItem}
                onClick={() => handleCopySingle(hexItem)}
                style={{ backgroundColor: hexItem }}
                className="flex-1 h-full hover:scale-y-110 active:scale-95 transition-all relative group flex items-end justify-center pb-2 cursor-pointer"
                title={`Copy Tint: ${hexItem}`}
              >
                <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/75 px-1.5 py-0.5 rounded text-[9px] font-mono font-bold text-white uppercase absolute bottom-8 z-10 select-none shadow-md">
                  {copiedHex === hexItem ? '✓' : hexItem}
                </span>
                <span className="sr-only">{hexItem}</span>
              </button>
            ))}
          </div>
        </div>

        {/* SHADES CARD */}
        <div className="bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-850 p-6 rounded-2xl shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-neutral-450 uppercase tracking-widest flex items-center space-x-1">
              <Sparkles size={12} className="text-indigo-500" />
              <span>Dark Shades (Darker Blends)</span>
            </span>
            <span className="text-[10px] bg-indigo-50 dark:bg-indigo-950/20 text-indigo-600 px-20 py-0.5 rounded-full font-bold">+ Black mix</span>
          </div>

          <div id="shades-swatch-strip" className="flex h-16 w-full rounded-xl overflow-hidden border border-black/5">
            {shades.map((hexItem) => (
              <button
                id={`shade-${hexItem.replace('#', '')}`}
                key={hexItem}
                onClick={() => handleCopySingle(hexItem)}
                style={{ backgroundColor: hexItem }}
                className="flex-1 h-full hover:scale-y-110 active:scale-95 transition-all relative group flex items-end justify-center pb-2 cursor-pointer"
                title={`Copy Shade: ${hexItem}`}
              >
                <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/75 px-1.5 py-0.5 rounded text-[9px] font-mono font-bold text-white uppercase absolute bottom-8 z-10 select-none shadow-md">
                  {copiedHex === hexItem ? '✓' : hexItem}
                </span>
                <span className="sr-only">{hexItem}</span>
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
