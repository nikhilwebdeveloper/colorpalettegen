import React, { useState, useEffect } from 'react';
import { Copy, Check, Hash, RefreshCcw } from 'lucide-react';
import { hexToRgb, rgbToHsl, hslToHex } from '../utils/colorUtils';
import { motion } from 'motion/react';

interface ColorConverterProps {
  onCopySuccess: (message: string) => void;
}

export default function ColorConverter({ onCopySuccess }: ColorConverterProps) {
  const [hex, setHex] = useState<string>('#4F46E5');
  const [rgb, setRgb] = useState({ r: 79, g: 70, b: 229 });
  const [hsl, setHsl] = useState({ h: 243, s: 75, l: 59 });
  const [cmyk, setCmyk] = useState({ c: 65, m: 69, y: 0, k: 10 });
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Helper: RGB to CMYK
  const rgbToCmyk = (r: number, g: number, b: number) => {
    let c = 1 - (r / 255);
    let m = 1 - (g / 255);
    let y = 1 - (b / 255);
    let k = Math.min(c, m, y);

    if (k === 1) {
      return { c: 0, m: 0, y: 0, k: 100 };
    }

    c = Math.round(((c - k) / (1 - k)) * 100);
    m = Math.round(((m - k) / (1 - k)) * 100);
    y = Math.round(((y - k) / (1 - k)) * 100);
    k = Math.round(k * 100);

    return { c, m, y, k };
  };

  // Helper: CMYK to RGB
  const cmykToRgb = (c: number, m: number, y: number, k: number) => {
    c /= 100;
    m /= 100;
    y /= 100;
    k /= 100;

    const r = Math.round(255 * (1 - c) * (1 - k));
    const g = Math.round(255 * (1 - m) * (1 - k));
    const b = Math.round(255 * (1 - y) * (1 - k));

    return { r, g, b };
  };

  const handleHexChange = (val: string) => {
    setHex(val);
    let cleanHex = val.trim();
    if (!cleanHex.startsWith('#')) {
      cleanHex = '#' + cleanHex;
    }
    const regex = /^#([A-Fa-f0-9]{6})$/;
    if (regex.test(cleanHex)) {
      const parsedRgb = hexToRgb(cleanHex);
      if (parsedRgb) {
        setRgb(parsedRgb);
        const parsedHsl = rgbToHsl(parsedRgb.r, parsedRgb.g, parsedRgb.b);
        setHsl(parsedHsl);
        setCmyk(rgbToCmyk(parsedRgb.r, parsedRgb.g, parsedRgb.b));
      }
    }
  };

  const updateFromRgb = (updatedRgb: { r: number; g: number; b: number }) => {
    setRgb(updatedRgb);
    const convertedHex = '#' + [updatedRgb.r, updatedRgb.g, updatedRgb.b].map(x => {
      const hexStr = x.toString(16);
      return hexStr.length === 1 ? '0' + hexStr : hexStr;
    }).join('').toUpperCase();
    setHex(convertedHex);
    setHsl(rgbToHsl(updatedRgb.r, updatedRgb.g, updatedRgb.b));
    setCmyk(rgbToCmyk(updatedRgb.r, updatedRgb.g, updatedRgb.b));
  };

  const updateFromHsl = (updatedHsl: { h: number; s: number; l: number }) => {
    setHsl(updatedHsl);
    const convertedHex = hslToHex(updatedHsl.h, updatedHsl.s, updatedHsl.l);
    setHex(convertedHex);
    const parsedRgb = hexToRgb(convertedHex);
    if (parsedRgb) {
      setRgb(parsedRgb);
      setCmyk(rgbToCmyk(parsedRgb.r, parsedRgb.g, parsedRgb.b));
    }
  };

  const updateFromCmyk = (updatedCmyk: { c: number; m: number; y: number; k: number }) => {
    setCmyk(updatedCmyk);
    const rRgb = cmykToRgb(updatedCmyk.c, updatedCmyk.m, updatedCmyk.y, updatedCmyk.k);
    setRgb(rRgb);
    const convertedHex = '#' + [rRgb.r, rRgb.g, rRgb.b].map(x => {
      const hexStr = x.toString(16);
      return hexStr.length === 1 ? '0' + hexStr : hexStr;
    }).join('').toUpperCase();
    setHex(convertedHex);
    setHsl(rgbToHsl(rRgb.r, rRgb.g, rRgb.b));
  };

  const handleCopy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(label);
      onCopySuccess(`Copied ${label} conversion!`);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const rgbString = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  const hslString = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
  const cmykString = `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`;

  return (
    <div id="color-converter-tool" className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full">
      {/* INPUT FIELDS COLUMN */}
      <div className="lg:col-span-6 flex flex-col space-y-6">
        <div className="bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-850 p-6 rounded-2xl shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-md font-bold text-neutral-800 dark:text-neutral-100 flex items-center space-x-2">
              <RefreshCcw size={16} className="text-indigo-500" />
              <span>Format Inputs</span>
            </h3>
            <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Sync Active</span>
          </div>

          {/* HEX INPUT */}
          <div>
            <label htmlFor="conv-hex" className="text-xs font-bold text-neutral-400 uppercase tracking-widest block mb-1">HEX String</label>
            <div className="flex">
              <div className="bg-neutral-100 dark:bg-neutral-800 border border-neutral-250 dark:border-neutral-700 px-3 flex items-center justify-center rounded-l-xl text-neutral-500">
                <Hash size={14} />
              </div>
              <input
                id="conv-hex"
                type="text"
                value={hex}
                onChange={(e) => handleHexChange(e.target.value)}
                maxLength={7}
                placeholder="#FFAA00"
                className="flex-1 bg-white dark:bg-neutral-950 border-y border-r border-neutral-250 dark:border-neutral-700 text-sm font-semibold rounded-r-xl px-4 py-2 focus:outline-hidden"
              />
              <button
                id="copy-hex-btn"
                onClick={() => handleCopy(hex, 'HEX')}
                className="ml-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 p-2 text-neutral-450 hover:text-indigo-600 rounded-xl transition-colors shrink-0"
              >
                {copiedField === 'HEX' ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
              </button>
            </div>
          </div>

          {/* RGB INPUTS */}
          <div>
            <label htmlFor="conv-rgb-r" className="text-xs font-bold text-neutral-400 uppercase tracking-widest block mb-1">RGB (Red, Green, Blue)</label>
            <div className="flex items-center gap-2">
              <div className="flex-1 flex bg-white dark:bg-neutral-950 border border-neutral-250 dark:border-neutral-700 rounded-xl overflow-hidden focus-within:ring-1 focus-within:ring-indigo-500">
                <span className="text-[10px] font-bold text-neutral-400 dark:text-neutral-500 bg-neutral-100 dark:bg-neutral-800 px-2.5 flex items-center justify-center">R</span>
                <input
                  id="conv-rgb-r"
                  type="number"
                  min="0"
                  max="255"
                  value={rgb.r}
                  onChange={(e) => updateFromRgb({ ...rgb, r: Math.min(255, Math.max(0, Number(e.target.value))) })}
                  className="w-full text-xs font-semibold p-2 bg-transparent text-center focus:outline-hidden"
                />
              </div>

              <div className="flex-1 flex bg-white dark:bg-neutral-950 border border-neutral-250 dark:border-neutral-700 rounded-xl overflow-hidden focus-within:ring-1 focus-within:ring-indigo-500">
                <span className="text-[10px] font-bold text-neutral-400 dark:text-neutral-500 bg-neutral-100 dark:bg-neutral-800 px-2.5 flex items-center justify-center">G</span>
                <input
                  type="number"
                  min="0"
                  max="255"
                  value={rgb.g}
                  onChange={(e) => updateFromRgb({ ...rgb, g: Math.min(255, Math.max(0, Number(e.target.value))) })}
                  className="w-full text-xs font-semibold p-2 bg-transparent text-center focus:outline-hidden"
                />
              </div>

              <div className="flex-1 flex bg-white dark:bg-neutral-950 border border-neutral-250 dark:border-neutral-700 rounded-xl overflow-hidden focus-within:ring-1 focus-within:ring-indigo-500">
                <span className="text-[10px] font-bold text-neutral-400 dark:text-neutral-500 bg-neutral-100 dark:bg-neutral-800 px-2.5 flex items-center justify-center">B</span>
                <input
                  type="number"
                  min="0"
                  max="255"
                  value={rgb.b}
                  onChange={(e) => updateFromRgb({ ...rgb, b: Math.min(255, Math.max(0, Number(e.target.value))) })}
                  className="w-full text-xs font-semibold p-2 bg-transparent text-center focus:outline-hidden"
                />
              </div>

              <button
                onClick={() => handleCopy(rgbString, 'RGB')}
                className="hover:bg-neutral-100 dark:hover:bg-neutral-800 p-2 text-neutral-450 hover:text-indigo-600 rounded-xl transition-colors shrink-0"
              >
                {copiedField === 'RGB' ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
              </button>
            </div>
          </div>

          {/* HSL INPUTS */}
          <div>
            <label htmlFor="conv-hsl-h" className="text-xs font-bold text-neutral-400 uppercase tracking-widest block mb-1">HSL (Hue, Sat, Light)</label>
            <div className="flex items-center gap-2">
              <div className="flex-1 flex bg-white dark:bg-neutral-950 border border-neutral-250 dark:border-neutral-700 rounded-xl overflow-hidden focus-within:ring-1 focus-within:ring-indigo-500">
                <span className="text-[10px] font-bold text-neutral-400 dark:text-neutral-500 bg-neutral-100 dark:bg-neutral-800 px-2 flex items-center justify-center">H°</span>
                <input
                  id="conv-hsl-h"
                  type="number"
                  min="0"
                  max="360"
                  value={hsl.h}
                  onChange={(e) => updateFromHsl({ ...hsl, h: Math.min(360, Math.max(0, Number(e.target.value))) })}
                  className="w-full text-xs font-semibold p-2 bg-transparent text-center focus:outline-hidden"
                />
              </div>

              <div className="flex-1 flex bg-white dark:bg-neutral-950 border border-neutral-250 dark:border-neutral-700 rounded-xl overflow-hidden focus-within:ring-1 focus-within:ring-indigo-500">
                <span className="text-[10px] font-bold text-neutral-400 dark:text-neutral-500 bg-neutral-100 dark:bg-neutral-800 px-2 flex items-center justify-center">S%</span>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={hsl.s}
                  onChange={(e) => updateFromHsl({ ...hsl, s: Math.min(100, Math.max(0, Number(e.target.value))) })}
                  className="w-full text-xs font-semibold p-2 bg-transparent text-center focus:outline-hidden"
                />
              </div>

              <div className="flex-1 flex bg-white dark:bg-neutral-950 border border-neutral-250 dark:border-neutral-700 rounded-xl overflow-hidden focus-within:ring-1 focus-within:ring-indigo-500">
                <span className="text-[10px] font-bold text-neutral-400 dark:text-neutral-500 bg-neutral-100 dark:bg-neutral-800 px-2 flex items-center justify-center">L%</span>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={hsl.l}
                  onChange={(e) => updateFromHsl({ ...hsl, l: Math.min(100, Math.max(0, Number(e.target.value))) })}
                  className="w-full text-xs font-semibold p-2 bg-transparent text-center focus:outline-hidden"
                />
              </div>

              <button
                onClick={() => handleCopy(hslString, 'HSL')}
                className="hover:bg-neutral-100 dark:hover:bg-neutral-800 p-2 text-neutral-450 hover:text-indigo-600 rounded-xl transition-colors shrink-0"
              >
                {copiedField === 'HSL' ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
              </button>
            </div>
          </div>

          {/* CMYK INPUTS */}
          <div>
            <label htmlFor="conv-cmyk-c" className="text-xs font-bold text-neutral-400 uppercase tracking-widest block mb-1">CMYK (Cyan, Mag, Yellow, Key)</label>
            <div className="flex items-center gap-1.5">
              {['C', 'M', 'Y', 'K'].map((key) => {
                const lowKey = key.toLowerCase() as 'c' | 'm' | 'y' | 'k';
                return (
                  <div key={key} className="flex-1 flex bg-white dark:bg-neutral-950 border border-neutral-250 dark:border-neutral-700 rounded-xl overflow-hidden focus-within:ring-1 focus-within:ring-indigo-500">
                    <span className="text-[10px] font-bold text-neutral-400 dark:text-neutral-500 bg-neutral-100 dark:bg-neutral-800 px-2.5 flex items-center justify-center">{key}</span>
                    <input
                      id={lowKey === 'c' ? "conv-cmyk-c" : undefined}
                      type="number"
                      min="0"
                      max="100"
                      value={cmyk[lowKey]}
                      onChange={(e) => updateFromCmyk({ ...cmyk, [lowKey]: Math.min(100, Math.max(0, Number(e.target.value))) })}
                      className="w-full text-xs font-semibold p-1.5 bg-transparent text-center focus:outline-hidden"
                    />
                  </div>
                );
              })}

              <button
                onClick={() => handleCopy(cmykString, 'CMYK')}
                className="hover:bg-neutral-100 dark:hover:bg-neutral-800 p-2 text-neutral-450 hover:text-indigo-600 rounded-xl transition-colors shrink-0"
              >
                {copiedField === 'CMYK' ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* VISUAL LAYOUT PREVIEW (RIGHT) */}
      <div className="lg:col-span-6 flex flex-col justify-between">
        <div className="bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-850 p-6 rounded-2xl shadow-sm flex flex-col items-center justify-center flex-1 space-y-6">
          
          {/* Output Blocks display color */}
          <div
            id="converter-swatch-box"
            style={{ backgroundColor: hex }}
            className="w-44 h-44 rounded-3xl shadow-xl border border-white/20 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end justify-center pb-4">
              <span className="text-white font-mono font-bold tracking-wider text-sm select-all uppercase">{hex}</span>
            </div>
          </div>

          <div className="text-center">
            <h4 className="font-bold text-neutral-800 dark:text-neutral-200">Color Conversion Hub</h4>
            <p className="text-xs text-neutral-500 max-w-sm mt-1">
              Adjust sliders or input parameters. Watch hexadecimal structures map instantly to standard CSS codes.
            </p>
          </div>

          {/* Interactive Quick-Pick Presets */}
          <div className="w-full border-t border-neutral-100 dark:border-neutral-850 pt-4 flex justify-center gap-2">
            {[
              { label: 'Ultramarine', color: '#1B03A3' },
              { label: 'Mint Cool', color: '#5DFDCB' },
              { label: 'Sunset Glow', color: '#FF7F50' },
              { label: 'Velvet Plum', color: '#6A0572' }
            ].map((preset) => (
              <button
                key={preset.label}
                onClick={() => handleHexChange(preset.color)}
                className="flex items-center space-x-1.5 py-1 px-2.5 bg-neutral-50 dark:bg-neutral-950 hover:bg-neutral-100 dark:hover:bg-neutral-800 border border-neutral-150 dark:border-neutral-850 rounded-lg text-[11px] font-semibold text-neutral-600 dark:text-neutral-300 transition-colors cursor-pointer"
                style={{ contentVisibility: 'auto' }}
              >
                <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: preset.color }} />
                <span>{preset.label}</span>
              </button>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
