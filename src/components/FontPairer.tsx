import React, { useState, useEffect } from 'react';
import { Copy, Check, Type, RotateCw, AlignLeft } from 'lucide-react';
import { motion } from 'motion/react';

interface FontPairerProps {
  onCopySuccess: (message: string) => void;
}

interface FontCombination {
  name: string;
  headerFont: string;
  headerUrl: string;
  bodyFont: string;
  bodyUrl: string;
  description: string;
}

const PRESET_PAIRINGS: FontCombination[] = [
  {
    name: 'Modern Tech / Clean',
    headerFont: 'Space Grotesk',
    headerUrl: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&display=swap',
    bodyFont: 'Inter',
    bodyUrl: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap',
    description: 'Crisp, structured sans-serif headings paired with clean, highly legible body typography.'
  },
  {
    name: 'Elegant / Literary Editorial',
    headerFont: 'Playfair Display',
    headerUrl: 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&display=swap',
    bodyFont: 'Lora',
    bodyUrl: 'https://fonts.googleapis.com/css2?family=Lora:wght@400;500&display=swap',
    description: 'Sophisticated serif heading with premium traditional body text. High-class storytelling.'
  },
  {
    name: 'Vibrant Display / Editorial',
    headerFont: 'Syne',
    headerUrl: 'https://fonts.googleapis.com/css2?family=Syne:wght@700;800&display=swap',
    bodyFont: 'Cormorant Garamond',
    bodyUrl: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500&display=swap',
    description: 'Extravagant, wide display font with delicate, luxurious serif paragraphs.'
  },
  {
    name: 'Terminal Hack / Technical',
    headerFont: 'JetBrains Mono',
    headerUrl: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@700&display=swap',
    bodyFont: 'Fira Code',
    bodyUrl: 'https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500&display=swap',
    description: 'Calculated, monospaced tech aesthetics. Great for consoles, specs sheets, and documentation.'
  }
];

export default function FontPairer({ onCopySuccess }: FontPairerProps) {
  const [activePreset, setActivePreset] = useState<number>(0);
  const [previewText, setPreviewText] = useState<string>(
    'Typography is the craft of organizing text layout elements to reveal semantic structure. Good font pairing builds direct rhythm, guiding the eye across blocks and margins with absolute ease.'
  );
  const [headerSize, setHeaderSize] = useState<number>(36);
  const [bodySize, setBodySize] = useState<number>(14);
  const [lineHeight, setLineHeight] = useState<number>(1.6);
  const [copied, setCopied] = useState<boolean>(false);

  // Dynamic Google Font Injection
  useEffect(() => {
    const preset = PRESET_PAIRINGS[activePreset];
    const linkIdHeader = 'font-pair-header-link';
    const linkIdBody = 'font-pair-body-link';

    // Remove existing link attributes
    document.getElementById(linkIdHeader)?.remove();
    document.getElementById(linkIdBody)?.remove();

    // Add new ones
    const hLink = document.createElement('link');
    hLink.id = linkIdHeader;
    hLink.rel = 'stylesheet';
    hLink.href = preset.headerUrl;
    document.head.appendChild(hLink);

    const bLink = document.createElement('link');
    bLink.id = linkIdBody;
    bLink.rel = 'stylesheet';
    bLink.href = preset.bodyUrl;
    document.head.appendChild(bLink);

    return () => {
      document.getElementById(linkIdHeader)?.remove();
      document.getElementById(linkIdBody)?.remove();
    };
  }, [activePreset]);

  const currentPairing = PRESET_PAIRINGS[activePreset];

  const handleCopyTailwind = async () => {
    const configStr = `/* Tailwind CSS v4 Theme variables */
@theme {
  --font-display: "${currentPairing.headerFont}", sans-serif;
  --font-sans: "${currentPairing.bodyFont}", sans-serif;
}

/* Google Fonts Imports */
@import url('${currentPairing.headerUrl}');
@import url('${currentPairing.bodyUrl}');`;
    try {
      await navigator.clipboard.writeText(configStr);
      setCopied(true);
      onCopySuccess('Copied Font Configuration Code!');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div id="font-pairer-tool" className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full">
      {/* SELECTION DRAWER */}
      <div className="lg:col-span-5 flex flex-col space-y-6">
        <div className="bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-850 p-6 rounded-2xl shadow-sm">
          <span className="text-xs font-bold text-neutral-450 uppercase tracking-widest block mb-4">Preset Pairings</span>
          <div className="space-y-3">
            {PRESET_PAIRINGS.map((preset, idx) => (
              <button
                key={preset.name}
                onClick={() => {
                  setActivePreset(idx);
                  onCopySuccess(`Loaded ${preset.name} fonts!`);
                }}
                className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer block ${
                  activePreset === idx
                    ? 'border-indigo-500 bg-indigo-50/10 dark:bg-indigo-950/20'
                    : 'border-neutral-150 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 bg-neutral-50/20 dark:bg-neutral-900/40'
                }`}
                style={{ contentVisibility: 'auto' }}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-bold text-neutral-850 dark:text-neutral-200">{preset.name}</span>
                  <span className="text-[10px] bg-neutral-100 dark:bg-neutral-800 text-neutral-500 px-2 py-0.5 rounded-md font-mono font-bold">Preset {idx + 1}</span>
                </div>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400 font-medium leading-relaxed">{preset.description}</p>
                <div className="flex gap-2 mt-3 text-[10px] font-mono text-neutral-400">
                  <span>Display: {preset.headerFont}</span>
                  <span>•</span>
                  <span>Body: {preset.bodyFont}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Adjust Typography sizing details */}
        <div className="bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-850 p-6 rounded-2xl shadow-sm space-y-4">
          <div className="flex justify-between items-center text-xs font-bold text-neutral-450 uppercase tracking-widest">
            <span>Live Typography Controls</span>
            <button
              onClick={() => {
                setHeaderSize(36);
                setBodySize(14);
                setLineHeight(1.6);
              }}
              className="hover:text-indigo-600 text-neutral-400 cursor-pointer"
            >
              <RotateCw size={12} />
            </button>
          </div>

          {/* Heading size */}
          <div>
            <div className="flex justify-between text-xs mb-1 font-bold text-neutral-500">
              <span>Header Scale</span>
              <span className="font-mono">{headerSize}px</span>
            </div>
            <input
              type="range"
              min="20"
              max="72"
              value={headerSize}
              onChange={(e) => setHeaderSize(Number(e.target.value))}
              className="w-full cursor-pointer h-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-lg appearance-none accent-indigo-600"
            />
          </div>

          {/* Paragraph size */}
          <div>
            <div className="flex justify-between text-xs mb-1 font-bold text-neutral-500">
              <span>Body Font Size</span>
              <span className="font-mono">{bodySize}px</span>
            </div>
            <input
              type="range"
              min="10"
              max="24"
              value={bodySize}
              onChange={(e) => setBodySize(Number(e.target.value))}
              className="w-full cursor-pointer h-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-lg appearance-none accent-indigo-600"
            />
          </div>

          {/* Line Height */}
          <div>
            <div className="flex justify-between text-xs mb-1 font-bold text-neutral-500">
              <span>Line Height</span>
              <span className="font-mono">{lineHeight}</span>
            </div>
            <input
              type="range"
              min="1.2"
              max="2.2"
              step="0.1"
              value={lineHeight}
              onChange={(e) => setLineHeight(Number(e.target.value))}
              className="w-full cursor-pointer h-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-lg appearance-none accent-indigo-600"
            />
          </div>
        </div>
      </div>

      {/* TYPOGRAPHY PREVIEW CANVAS COLUMN */}
      <div className="lg:col-span-7 flex flex-col space-y-6">
        {/* Living preview board */}
        <div id="pairer-preview-arena" className="p-8 bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-850 rounded-2xl shadow-sm space-y-6 flex-1 flex flex-col justify-between">
          <div className="space-y-4">
            <span className="text-[10px] bg-neutral-100 dark:bg-neutral-800 font-bold uppercase py-1 px-3 text-neutral-450 tracking-wider rounded-md inline-block">
              Interactive Display Layout
            </span>

            {/* Live Heading */}
            <h2
              style={{
                fontFamily: `'${currentPairing.headerFont}', sans-serif`,
                fontSize: `${headerSize}px`,
                fontWeight: 'bold',
                lineHeight: 1.1
              }}
              className="text-neutral-900 dark:text-neutral-50 tracking-tight cursor-default"
            >
              The Quick Brown Fox Jumps Over It
            </h2>

            {/* Editable Paragraph text */}
            <div className="pt-2">
              <label htmlFor="font-pair-textarea" className="sr-only">Editable Paragraph text</label>
              <textarea
                id="font-pair-textarea"
                value={previewText}
                onChange={(e) => setPreviewText(e.target.value)}
                style={{
                  fontFamily: `'${currentPairing.bodyFont}', sans-serif`,
                  fontSize: `${bodySize}px`,
                  lineHeight: lineHeight
                }}
                className="w-full bg-transparent border-0 outline-hidden tracking-normal p-0 text-neutral-600 dark:text-neutral-300 resize-none h-[140px] focus:ring-0 leading-relaxed text-left"
              />
            </div>
          </div>

          {/* Quick theme variables output block */}
          <div className="border-t border-neutral-100 dark:border-neutral-850 pt-6 flex items-center justify-between gap-4">
            <div className="flex items-center space-x-2 text-xs font-semibold text-neutral-400">
              <AlignLeft size={14} />
              <span>Tailwind Custom Pair Output code is ready!</span>
            </div>

            <button
              id="pair-export-tw-btn"
              onClick={handleCopyTailwind}
              className="flex items-center space-x-1.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-semibold py-2 px-3.5 rounded-xl text-xs transition-transform cursor-pointer shadow-sm"
            >
              {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
              <span>{copied ? 'Copied' : 'Copy theme Config'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
