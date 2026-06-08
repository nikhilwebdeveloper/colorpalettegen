import React, { useState } from 'react';
import { Copy, Check, RotateCw, Settings2, SlidersHorizontal } from 'lucide-react';
import { motion } from 'motion/react';

interface BoxShadowGeneratorProps {
  onCopySuccess: (message: string) => void;
}

export default function BoxShadowGenerator({ onCopySuccess }: BoxShadowGeneratorProps) {
  const [offsetX, setOffsetX] = useState<number>(0);
  const [offsetY, setOffsetY] = useState<number>(12);
  const [blur, setBlur] = useState<number>(24);
  const [spread, setSpread] = useState<number>(-4);
  const [opacity, setOpacity] = useState<number>(15);
  const [shadowColor, setShadowColor] = useState<string>('#3B82F6');
  const [boxColor, setBoxColor] = useState<string>('#FFFFFF');
  const [canvasBg, setCanvasBg] = useState<string>('#F3F4F6');
  const [inset, setInset] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // Convert Hex color to RGBA for shadow transparency
  const hexToRgba = (hex: string, op: number) => {
    let shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    let fullHex = hex.replace(shorthandRegex, (_, r, g, b) => r + r + g + g + b + b);
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex);
    if (!result) return 'rgba(0, 0, 0, 0.15)';
    const r = parseInt(result[1], 16);
    const g = parseInt(result[2], 16);
    const b = parseInt(result[3], 16);
    return `rgba(${r}, ${g}, ${b}, ${op / 100})`;
  };

  const shadowString = `${inset ? 'inset ' : ''}${offsetX}px ${offsetY}px ${blur}px ${spread}px ${hexToRgba(shadowColor, opacity)}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`box-shadow: ${shadowString};`);
      setCopied(true);
      onCopySuccess('Copied Box Shadow CSS!');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const handlePreset = (type: 'subtle' | 'aggressive' | 'neon' | 'inner') => {
    switch (type) {
      case 'subtle':
        setOffsetX(0);
        setOffsetY(4);
        setBlur(20);
        setSpread(-2);
        setOpacity(8);
        setShadowColor('#000000');
        setInset(false);
        break;
      case 'aggressive':
        setOffsetX(0);
        setOffsetY(20);
        setBlur(40);
        setSpread(-10);
        setOpacity(25);
        setShadowColor('#111827');
        setInset(false);
        break;
      case 'neon':
        setOffsetX(0);
        setOffsetY(0);
        setBlur(30);
        setSpread(5);
        setOpacity(60);
        setShadowColor('#6366F1');
        setInset(false);
        break;
      case 'inner':
        setOffsetX(5);
        setOffsetY(5);
        setBlur(15);
        setSpread(0);
        setOpacity(20);
        setShadowColor('#000000');
        setInset(true);
        break;
    }
    onCopySuccess(`Preset shadow applied!`);
  };

  return (
    <div id="box-shadow-generator-tool" className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full">
      {/* CONTROLS COLUMN (LEFT) */}
      <div className="lg:col-span-5 flex flex-col space-y-6">
        <div className="bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-850 p-6 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-md font-bold text-neutral-800 dark:text-neutral-100 flex items-center space-x-2">
              <SlidersHorizontal size={18} className="text-indigo-500" />
              <span>Adjustment Sliders</span>
            </h3>
            <button
              id="reset-shadow-btn"
              onClick={() => {
                setOffsetX(0);
                setOffsetY(10);
                setBlur(25);
                setSpread(-5);
                setOpacity(15);
                setShadowColor('#000000');
              }}
              className="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-850 rounded text-neutral-450 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
              title="Reset Shadow"
            >
              <RotateCw size={14} />
            </button>
          </div>

          <div className="space-y-4">
            {/* Horizontal Position */}
            <div>
              <div className="flex justify-between text-xs mb-1.5 font-bold text-neutral-400">
                <span>Horizontal Position</span>
                <span className="font-mono">{offsetX}px</span>
              </div>
              <input
                type="range"
                min="-50"
                max="50"
                value={offsetX}
                onChange={(e) => setOffsetX(Number(e.target.value))}
                className="w-full cursor-pointer h-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-lg appearance-none accent-indigo-600"
              />
            </div>

            {/* Vertical Position */}
            <div>
              <div className="flex justify-between text-xs mb-1.5 font-bold text-neutral-400">
                <span>Vertical Position</span>
                <span className="font-mono">{offsetY}px</span>
              </div>
              <input
                type="range"
                min="-50"
                max="50"
                value={offsetY}
                onChange={(e) => setOffsetY(Number(e.target.value))}
                className="w-full cursor-pointer h-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-lg appearance-none accent-indigo-600"
              />
            </div>

            {/* Blur */}
            <div>
              <div className="flex justify-between text-xs mb-1.5 font-bold text-neutral-400">
                <span>Blur Intensity</span>
                <span className="font-mono">{blur}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={blur}
                onChange={(e) => setBlur(Number(e.target.value))}
                className="w-full cursor-pointer h-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-lg appearance-none accent-indigo-600"
              />
            </div>

            {/* Spread */}
            <div>
              <div className="flex justify-between text-xs mb-1.5 font-bold text-neutral-400">
                <span>Spread Radius</span>
                <span className="font-mono">{spread}px</span>
              </div>
              <input
                type="range"
                min="-30"
                max="50"
                value={spread}
                onChange={(e) => setSpread(Number(e.target.value))}
                className="w-full cursor-pointer h-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-lg appearance-none accent-indigo-600"
              />
            </div>

            {/* Opacity */}
            <div>
              <div className="flex justify-between text-xs mb-1.5 font-bold text-neutral-400">
                <span>Shadow Opacity</span>
                <span className="font-mono">{opacity}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={opacity}
                onChange={(e) => setOpacity(Number(e.target.value))}
                className="w-full cursor-pointer h-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-lg appearance-none accent-indigo-600"
              />
            </div>

            {/* Inset Switch */}
            <div className="flex items-center justify-between border-t border-neutral-100 dark:border-neutral-850 pt-4">
              <span className="text-xs font-bold text-neutral-450 uppercase tracking-widest">Inner Shadow</span>
              <button
                onClick={() => setInset(!inset)}
                className={`w-11 h-6 rounded-full transition-colors relative focus:outline-hidden ${inset ? 'bg-indigo-600' : 'bg-neutral-200 dark:bg-neutral-800'}`}
              >
                <span className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform ${inset ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>
          </div>
        </div>

        {/* CSS Codes */}
        <div className="bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-850 p-6 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-neutral-450 uppercase tracking-widest">box-shadow Output</span>
            <button
              onClick={handleCopy}
              className="text-xs font-semibold text-indigo-500 hover:underline flex items-center space-x-1 cursor-pointer"
            >
              {copied ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
          <pre className="bg-neutral-900 text-neutral-300 p-3.5 rounded-xl font-mono text-[11px] overflow-x-auto text-left whitespace-pre-wrap leading-relaxed select-all">
            box-shadow: {shadowString};
          </pre>
        </div>
      </div>

      {/* RENDER CANVAS (RIGHT) */}
      <div className="lg:col-span-7 flex flex-col space-y-6">
        {/* Render area */}
        <div
          id="shadow-canvas-frame"
          className="w-full h-[320px] rounded-3xl flex flex-col items-center justify-center relative border border-neutral-150 dark:border-neutral-850 overflow-hidden"
          style={{ backgroundColor: canvasBg }}
        >
          {/* Main card with active shadow */}
          <div
            id="shadow-preview-box"
            style={{
              boxShadow: shadowString,
              backgroundColor: boxColor
            }}
            className="w-40 h-40 rounded-3xl transition-colors duration-150 flex items-center justify-center border border-black/5"
          >
            <span className="text-xs font-bold font-mono tracking-wider text-neutral-400 select-none">Preview Box</span>
          </div>

          {/* Color pickers inside canvas to simplify workspace */}
          <div className="absolute bottom-4 left-4 right-4 flex justify-between gap-2">
            {/* Box Color */}
            <div className="flex items-center bg-white/70 dark:bg-neutral-900/80 backdrop-blur-md py-1.5 px-3 rounded-xl border border-black/5 space-x-1 text-[11px] font-bold">
              <span>Card:</span>
              <input
                type="color"
                value={boxColor}
                onChange={(e) => setBoxColor(e.target.value)}
                className="w-4 h-4 rounded-md cursor-pointer border-0 bg-transparent shrink-0"
              />
            </div>

            {/* Shadow Color */}
            <div className="flex items-center bg-white/70 dark:bg-neutral-900/80 backdrop-blur-md py-1.5 px-3 rounded-xl border border-black/5 space-x-1 text-[11px] font-bold">
              <span>Shadow:</span>
              <input
                type="color"
                value={shadowColor}
                onChange={(e) => setShadowColor(e.target.value)}
                className="w-4 h-4 rounded-md cursor-pointer border-0 bg-transparent shrink-0"
              />
            </div>

            {/* Canvas BG */}
            <div className="flex items-center bg-white/70 dark:bg-neutral-900/80 backdrop-blur-md py-1.5 px-3 rounded-xl border border-black/5 space-x-1 text-[11px] font-bold">
              <span>Bg:</span>
              <input
                type="color"
                value={canvasBg}
                onChange={(e) => setCanvasBg(e.target.value)}
                className="w-4 h-4 rounded-md cursor-pointer border-0 bg-transparent shrink-0"
              />
            </div>
          </div>
        </div>

        {/* Quick click preset styles */}
        <div className="bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-850 p-6 rounded-2xl shadow-sm">
          <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest block mb-4">
            Pre-defined Shadow Types
          </span>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { id: 'subtle', name: 'Subtle Floating' },
              { id: 'aggressive', name: 'Ambient Depth' },
              { id: 'neon', name: 'Cyber Neon' },
              { id: 'inner', name: 'Deep Inset' }
            ].map((preset) => (
              <button
                key={preset.id}
                onClick={() => handlePreset(preset.id as any)}
                className="py-2.5 px-3 bg-neutral-50 dark:bg-neutral-950 hover:bg-neutral-100 dark:hover:bg-neutral-850 border border-neutral-150 dark:border-neutral-800 rounded-xl text-xs font-semibold text-neutral-700 dark:text-neutral-300 tracking-wide transition-all active:scale-95 cursor-pointer text-center"
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
