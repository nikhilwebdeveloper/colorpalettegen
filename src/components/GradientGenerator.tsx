import React, { useState } from 'react';
import { Copy, Check, RotateCw, Sparkles, Sliders } from 'lucide-react';
import { generateRandomHex } from '../utils/colorUtils';
import { motion } from 'motion/react';

interface GradientGeneratorProps {
  onCopySuccess: (message: string) => void;
}

const GRADIENT_PRESETS = [
  { name: 'Aurora Glow', colors: ['#FF007F', '#7F00FF'], angle: 135 },
  { name: 'Oceanic Breeze', colors: ['#00C9FF', '#92FE9D'], angle: 90 },
  { name: 'Sunset Peach', colors: ['#F9D423', '#FF4E50'], angle: 45 },
  { name: 'Nordic Forest', colors: ['#11998e', '#38ef7d'], angle: 180 },
  { name: 'Cyberpunk Neon', colors: ['#FCA5A5', '#B5179E', '#7209B7'], angle: 225 },
  { name: 'Cosmic Dust', colors: ['#03001e', '#7303c0', '#ec38bc'], angle: 135 }
];

export default function GradientGenerator({ onCopySuccess }: GradientGeneratorProps) {
  const [colors, setColors] = useState<string[]>(['#4F46E5', '#EC4899']);
  const [angle, setAngle] = useState<number>(135);
  const [type, setType] = useState<'linear' | 'radial'>('linear');
  const [copied, setCopied] = useState<string | null>(null);

  const gradientString = type === 'linear'
    ? `linear-gradient(${angle}deg, ${colors.join(', ')})`
    : `radial-gradient(circle, ${colors.join(', ')})`;

  const tailwindString = type === 'linear'
    ? `bg-gradient-to-r from-[${colors[0]}] to-[${colors[colors.length - 1]}]`
    : `bg-radial from-[${colors[0]}] to-[${colors[colors.length - 1]}]`;

  const handleGenerateRandom = () => {
    const count = colors.length;
    const newColors = Array(count).fill(null).map(() => generateRandomHex());
    setColors(newColors);
    const randAngle = Math.floor(Math.random() * 8) * 45; // 0, 45, 90, 135, etc.
    setAngle(randAngle);
  };

  const handleAddColor = () => {
    if (colors.length >= 5) {
      onCopySuccess('Maximum 5 colors allowed in gradients');
      return;
    }
    setColors([...colors, generateRandomHex()]);
  };

  const handleRemoveColor = (index: number) => {
    if (colors.length <= 2) {
      onCopySuccess('Minimum 2 colors are required');
      return;
    }
    setColors(colors.filter((_, i) => i !== index));
  };

  const handleColorChange = (index: number, val: string) => {
    const updated = [...colors];
    updated[index] = val.toUpperCase();
    setColors(updated);
  };

  const handleCopy = async (text: string, format: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(format);
      onCopySuccess(`Copied ${format.toUpperCase()} gradient code!`);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div id="gradient-generator-tool" className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full">
      {/* LEFT PANEL: Interactive Controls */}
      <div className="lg:col-span-5 flex flex-col space-y-6">
        <div className="bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-850 p-6 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-md font-bold text-neutral-800 dark:text-neutral-100 flex items-center space-x-2">
              <Sliders size={18} className="text-indigo-500" />
              <span>Gradient Settings</span>
            </h3>
            <button
              id="rand-gradient-btn"
              onClick={handleGenerateRandom}
              className="p-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-indigo-600 dark:text-indigo-400 rounded-lg transition-transform active:scale-90"
              title="Generate Random Gradient"
            >
              <RotateCw size={16} />
            </button>
          </div>

          {/* Types Selection */}
          <div className="space-y-4">
            <div>
              <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest block mb-2">Gradient Style</span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  id="style-linear-btn"
                  onClick={() => setType('linear')}
                  className={`py-2 px-4 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    type === 'linear'
                      ? 'bg-indigo-50 border-indigo-200 text-indigo-600 dark:bg-indigo-950/30 dark:border-indigo-900 dark:text-indigo-400'
                      : 'border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-850'
                  }`}
                >
                  Linear Direction
                </button>
                <button
                  id="style-radial-btn"
                  onClick={() => setType('radial')}
                  className={`py-2 px-4 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    type === 'radial'
                      ? 'bg-indigo-50 border-indigo-200 text-indigo-600 dark:bg-indigo-950/30 dark:border-indigo-900 dark:text-indigo-400'
                      : 'border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-850'
                  }`}
                >
                  Radial Focus
                </button>
              </div>
            </div>

            {/* Rotation angle indicator (Linear only) */}
            {type === 'linear' && (
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="font-bold text-neutral-400 uppercase tracking-widest">Angle Direction</span>
                  <span className="font-mono font-bold text-neutral-600 dark:text-neutral-300">{angle}°</span>
                </div>
                <input
                  id="angle-slider"
                  type="range"
                  min="0"
                  max="360"
                  value={angle}
                  onChange={(e) => setAngle(Number(e.target.value))}
                  className="w-full select-none cursor-pointer h-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-lg appearance-none accent-indigo-600"
                />
              </div>
            )}

            {/* Gradient Points Pins Editor list */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Color Nodes</span>
                <button
                  id="add-node-btn"
                  onClick={handleAddColor}
                  className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center space-x-1"
                >
                  <span>+ Add Node</span>
                </button>
              </div>

              <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
                {colors.map((color, idx) => (
                  <div key={idx} className="flex items-center space-x-2 bg-neutral-50 dark:bg-neutral-950 p-2 rounded-xl border border-neutral-100 dark:border-neutral-850">
                    <input
                      type="color"
                      value={color}
                      onChange={(e) => handleColorChange(idx, e.target.value)}
                      className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent shrink-0"
                    />
                    <input
                      type="text"
                      value={color}
                      onChange={(e) => handleColorChange(idx, e.target.value)}
                      placeholder="#FFFFFF"
                      maxLength={7}
                      className="w-full bg-transparent text-xs font-mono font-semibold uppercase focus:outline-hidden"
                    />
                    {colors.length > 2 && (
                      <button
                        onClick={() => handleRemoveColor(idx)}
                        className="text-neutral-400 hover:text-red-500 text-xs font-bold px-1.5 py-0.5 rounded-md hover:bg-red-50 dark:hover:bg-red-950/20"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CSS Codes Export Boxes */}
        <div className="bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-850 p-6 rounded-2xl shadow-sm space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-neutral-450 uppercase tracking-widest">CSS Output</span>
              <button
                id="copy-css-btn"
                onClick={() => handleCopy(`background: ${gradientString};`, 'css')}
                className="text-xs font-semibold text-indigo-500 hover:underline flex items-center space-x-1 cursor-pointer"
              >
                {copied === 'css' ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
                <span>{copied === 'css' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <pre className="bg-neutral-900 text-neutral-300 p-3 rounded-xl font-mono text-[11px] overflow-x-auto text-left">
              background: {gradientString};
            </pre>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-neutral-450 uppercase tracking-widest">Tailwind Class</span>
              <button
                id="copy-tw-btn"
                onClick={() => handleCopy(tailwindString, 'tw')}
                className="text-xs font-semibold text-indigo-500 hover:underline flex items-center space-x-1 cursor-pointer"
              >
                {copied === 'tw' ? <Check size={12} className="text-emerald-500" /> : <SlidingCodeCheckedIcon />}
                <span>{copied === 'tw' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <pre className="bg-neutral-900 text-neutral-300 p-3 rounded-xl font-mono text-[11px] overflow-x-auto text-left">
              {tailwindString}
            </pre>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL: Live Render & Presets */}
      <div className="lg:col-span-7 flex flex-col space-y-6">
        {/* Render card */}
        <div
          id="gradient-preview-canvas"
          style={{ background: gradientString }}
          className="w-full h-[320px] rounded-3xl shadow-xl flex flex-col items-center justify-center relative overflow-hidden border border-white/10"
        >
          {/* Neon overlay info */}
          <div className="bg-black/45 backdrop-blur-md border border-white/10 px-5 py-3 rounded-2xl text-center max-w-sm m-4 z-10 shadow-lg">
            <span className="text-[10px] text-neutral-300 uppercase tracking-widest font-bold">Dynamic Preset Applied</span>
            <div className="text-white font-mono text-sm font-semibold uppercase tracking-wider mt-1.5">
              {colors.join(' → ')}
            </div>
          </div>
        </div>

        {/* Quick click preset tray */}
        <div className="bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-850 p-6 rounded-2xl shadow-sm">
          <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest block mb-4 flex items-center gap-1">
            <Sparkles size={12} className="text-amber-500" />
            <span>Preset Library Palette</span>
          </span>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {GRADIENT_PRESETS.map((preset) => {
              const bgStr = `linear-gradient(${preset.angle}deg, ${preset.colors.join(', ')})`;
              return (
                <button
                  key={preset.name}
                  onClick={() => {
                    setColors(preset.colors);
                    setAngle(preset.angle);
                    setType('linear');
                    onCopySuccess(`Loaded Preset Gradient: ${preset.name}`);
                  }}
                  className="flex flex-col border border-neutral-150 dark:border-neutral-800/80 rounded-xl overflow-hidden hover:scale-[1.02] active:scale-95 transition-all text-left bg-neutral-50 dark:bg-neutral-950 cursor-pointer"
                  style={{ contentVisibility: 'auto' }}
                >
                  <div className="h-14 w-full" style={{ background: bgStr }} />
                  <div className="p-2">
                    <span className="text-[11px] font-bold text-neutral-700 dark:text-neutral-300 block truncate">{preset.name}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function SlidingCodeCheckedIcon() {
  return <Copy size={12} />;
}
