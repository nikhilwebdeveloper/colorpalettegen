import React, { useState, useRef, useEffect } from 'react';
import { IPaletteColor } from '../types';
import { getContrastColor, generateShadesAndTints, getColorName } from '../utils/colorUtils';
import { Lock, Unlock, Copy, ArrowLeft, ArrowRight, Palette, Layers, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PaletteBlockProps {
  key?: React.Key;
  color: IPaletteColor;
  index: number;
  totalCount: number;
  onToggleLock: (id: string) => void;
  onColorChange: (id: string, newHex: string) => void;
  onMove: (index: number, direction: 'left' | 'right') => void;
  onCopySuccess: (message: string) => void;
}

export default function PaletteBlock({
  color,
  index,
  totalCount,
  onToggleLock,
  onColorChange,
  onMove,
  onCopySuccess
}: PaletteBlockProps) {
  const [localHex, setLocalHex] = useState(color.hex);
  const [isEditingHex, setIsEditingHex] = useState(false);
  const [inputValue, setInputValue] = useState(color.hex);
  const [showShades, setShowShades] = useState(false);
  const [justCopied, setJustCopied] = useState(false);

  const shadesRef = useRef<HTMLDivElement>(null);
  const colorPickerRef = useRef<HTMLInputElement>(null);
  const parentTimerRef = useRef<any>(null);

  // Sync inputs with color prop changes
  useEffect(() => {
    setLocalHex(color.hex);
    setInputValue(color.hex);
  }, [color.hex]);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (parentTimerRef.current) {
        clearTimeout(parentTimerRef.current);
      }
    };
  }, []);

  // Close shades popover when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (shadesRef.current && !shadesRef.current.contains(e.target as Node)) {
        setShowShades(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const contrastColor = getContrastColor(localHex);
  const shadesLevels = generateShadesAndTints(localHex);

  const throttleParentUpdate = (newHex: string) => {
    if (parentTimerRef.current) {
      clearTimeout(parentTimerRef.current);
    }
    parentTimerRef.current = setTimeout(() => {
      onColorChange(color.id, newHex);
    }, 40);
  };

  const handleLocalColorChange = (newHex: string) => {
    setLocalHex(newHex);
    setInputValue(newHex);
    throttleParentUpdate(newHex);
  };

  const handleHexSubmit = () => {
    let cleanHex = inputValue.trim().toUpperCase();
    if (!cleanHex.startsWith('#')) {
      cleanHex = '#' + cleanHex;
    }
    
    // Hex Validation
    const regex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    if (regex.test(cleanHex)) {
      if (cleanHex.length === 4) {
        // Expand shorthand `#FFF` to `#FFFFFF`
        cleanHex = '#' + cleanHex[1] + cleanHex[1] + cleanHex[2] + cleanHex[2] + cleanHex[3] + cleanHex[3];
      }
      if (parentTimerRef.current) {
        clearTimeout(parentTimerRef.current);
      }
      setLocalHex(cleanHex);
      onColorChange(color.id, cleanHex);
    } else {
      // Revert to original
      setInputValue(localHex);
    }
    setIsEditingHex(false);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(localHex);
      setJustCopied(true);
      onCopySuccess(`Copied Hex ${localHex}`);
      setTimeout(() => setJustCopied(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <motion.div
      layout
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      id={`block-${color.id}`}
      style={{ backgroundColor: localHex }}
      className="relative flex flex-col items-center justify-between p-6 flex-1 h-[220px] md:h-auto md:min-h-[500px] outline-none group first:rounded-t-2xl md:first:rounded-t-none md:first:rounded-l-2xl last:rounded-b-2xl md:last:rounded-b-none md:last:rounded-r-2xl border-neutral-200 dark:border-neutral-800 transition-colors duration-150"
    >
      {/* 1. TOP BAR: Utilities & Info */}
      <div className="w-full flex items-center justify-between z-10">
        {/* Contrast indicator (Aa) */}
        <div
          id={`contrast-${color.id}`}
          style={{ 
            color: contrastColor,
            borderColor: contrastColor === '#FFFFFF' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)'
          }}
          className="flex items-center space-x-1 border rounded-lg px-2 py-1 text-xs font-semibold backdrop-blur-xs"
          title={`Contrast ratio readability indicator`}
        >
          <span>Aa</span>
          <span className="text-[10px] opacity-75">
            {contrastColor === '#FFFFFF' ? 'Dark text fits' : 'Light text fits'}
          </span>
        </div>

        {/* Lock/Unlock Button */}
        <button
          id={`lock-toggle-${color.id}`}
          onClick={() => onToggleLock(color.id)}
          style={{ color: contrastColor }}
          className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 active:scale-95 transition-all text-sm font-semibold cursor-pointer"
          title={color.locked ? 'Unlock Color' : 'Lock Color'}
        >
          {color.locked ? <Lock size={15} /> : <Unlock size={15} className="opacity-40 hover:opacity-100" />}
        </button>
      </div>

      {/* 2. CENTER: Hover Quick Copy Icon & Interaction */}
      <div className="flex flex-col items-center justify-center space-y-3 z-10 w-full">
        {/* Hidden screen color input caller */}
        <input
          type="color"
          ref={colorPickerRef}
          value={localHex}
          onChange={(e) => handleLocalColorChange(e.target.value.toUpperCase())}
          className="sr-only"
        />

        {/* Big copy button on hover, or trigger picker */}
        <div className="flex space-x-2 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200">
          <button
            id={`pick-color-btn-${color.id}`}
            onClick={() => colorPickerRef.current?.click()}
            style={{ 
              color: contrastColor,
              backgroundColor: contrastColor === '#FFFFFF' ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.4)',
              borderColor: contrastColor === '#FFFFFF' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'
            }}
            className="p-3.5 rounded-full backdrop-blur-md active:scale-90 border transition-transform cursor-pointer"
            title="Open Color Picker Picker"
          >
            <Palette size={18} />
          </button>

          <button
            id={`copy-hex-btn-${color.id}`}
            onClick={handleCopy}
            style={{ 
              color: contrastColor,
              backgroundColor: contrastColor === '#FFFFFF' ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.4)',
              borderColor: contrastColor === '#FFFFFF' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'
            }}
            className="p-3.5 rounded-full backdrop-blur-md active:scale-90 border transition-transform cursor-pointer"
            title="Copy Hex"
          >
            {justCopied ? <Check size={18} /> : <Copy size={18} />}
          </button>
        </div>
      </div>

      {/* 3. BOTTOM PANEL: Hex inputs, name tags, rearrangement actions */}
      <div className="w-full flex flex-col items-center space-y-3 z-10">
        <div className="text-center">
          {isEditingHex ? (
            <input
              id={`hex-input-edit-${color.id}`}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onBlur={handleHexSubmit}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleHexSubmit();
                if (e.key === 'Escape') {
                  setInputValue(localHex);
                  setIsEditingHex(false);
                }
              }}
              autoFocus
              className="w-20 rounded-md border text-center text-sm font-bold bg-white/70 backdrop-blur-md text-neutral-900 focus:outline-hidden focus:ring-1 focus:ring-indigo-500 py-1 shadow-xs"
            />
          ) : (
            <div className="flex items-center justify-center space-x-1">
              <button
                id={`hex-clickable-${color.id}`}
                onClick={() => setIsEditingHex(true)}
                style={{ color: contrastColor }}
                className="text-lg font-bold tracking-wider hover:opacity-80 transition-opacity uppercase cursor-pointer"
              >
                {localHex}
              </button>
            </div>
          )}
          <p
            id={`color-name-${color.id}`}
            style={{ color: contrastColor }}
            className="text-xs font-medium tracking-wide opacity-75 mt-0.5 pointer-events-none"
          >
            {getColorName(localHex)}
          </p>
        </div>

        {/* BOTTOM UTILITY BUTTONS */}
        <div className="flex space-x-2 w-full max-w-[150px] items-center justify-center">
          {/* Reorder Left */}
          {index > 0 && (
            <button
              id={`move-l-btn-${color.id}`}
              onClick={() => onMove(index, 'left')}
              style={{ color: contrastColor }}
              className="p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 disabled:opacity-20 transition-all cursor-pointer"
              title="Move Color Left"
            >
              <ArrowLeft size={14} />
            </button>
          )}

          {/* Shades Popover Trigger */}
          <div className="relative" ref={shadesRef}>
            <button
              id={`shades-trigger-${color.id}`}
              onClick={() => setShowShades(!showShades)}
              style={{ color: contrastColor }}
              className="p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-all text-xs font-semibold cursor-pointer flex items-center space-x-1"
              title="View Shades & Tints"
            >
              <Layers size={14} />
            </button>

            {/* Shades Floater Popover */}
            <AnimatePresence>
              {showShades && (
                <motion.div
                  id={`shades-grid-popover-${color.id}`}
                  initial={{ opacity: 0, y: 15, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 15, scale: 0.9 }}
                  style={{
                    bottom: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)'
                  }}
                  className="absolute mb-3 z-30 bg-white dark:bg-neutral-900 p-2.5 rounded-xl shadow-2xl border border-neutral-100 dark:border-neutral-800 flex gap-1 items-center justify-center max-w-[320px]"
                >
                  <div className="flex flex-col gap-1 w-full">
                    <span className="text-[10px] uppercase font-bold text-neutral-400 dark:text-neutral-500 block mb-1 hover:none text-center">
                      Variations
                    </span>
                    <div className="flex gap-1">
                      {shadesLevels.map((shadeLevelHex) => (
                        <button
                          id={`shade-opt-${shadeLevelHex.replace('#', '')}`}
                          key={shadeLevelHex}
                          onClick={() => {
                            onColorChange(color.id, shadeLevelHex);
                            setShowShades(false);
                          }}
                          style={{ backgroundColor: shadeLevelHex }}
                          className="w-5 h-8 rounded-md border border-black/5 hover:scale-110 active:scale-95 transition-transform relative group/shade shadow-xs cursor-pointer"
                          title={`Select variant ${shadeLevelHex}`}
                        >
                          <span className="sr-only">{shadeLevelHex}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Reorder Right */}
          {index < totalCount - 1 && (
            <button
              id={`move-r-btn-${color.id}`}
              onClick={() => onMove(index, 'right')}
              style={{ color: contrastColor }}
              className="p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 disabled:opacity-20 transition-all cursor-pointer"
              title="Move Color Right"
            >
              <ArrowRight size={14} />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
