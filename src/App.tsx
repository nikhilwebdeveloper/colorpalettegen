/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { IPalette, IPaletteColor, ColorHarmony } from './types';
import { 
  generateHarmonyPalette, 
  generateRandomHex, 
  getColorName 
} from './utils/colorUtils';
import PaletteBlock from './components/PaletteBlock';
import ExportModal from './components/ExportModal';
import HistoryPanel from './components/HistoryPanel';

// Import New Sub-tools
import GradientGenerator from './components/GradientGenerator';
import BoxShadowGenerator from './components/BoxShadowGenerator';
import ColorConverter from './components/ColorConverter';
import FontPairer from './components/FontPairer';
import TintShadeGenerator from './components/TintShadeGenerator';
import AboutPage from './components/AboutPage';
import PrivacyPage from './components/PrivacyPage';
import ContactPage from './components/ContactPage';
import BlogPage from './components/BlogPage';

import { 
  Sparkles, 
  Plus, 
  Minus, 
  RotateCw, 
  Download, 
  Bookmark, 
  History, 
  Sun, 
  Moon, 
  Layers, 
  Edit2, 
  Keyboard,
  Wand2,
  RefreshCcw,
  Type,
  Maximize2,
  BookOpen,
  Info,
  ShieldCheck,
  Mail
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Pre-designed elegant layouts to seed history and give the design immediate visual rhythm
const PRESET_PALETTES: IPalette[] = [
  {
    id: 'preset-sunset-dream',
    name: 'Sunset Dream',
    createdAt: Date.now() - 50000,
    favorite: true,
    colors: [
      { id: '1', hex: '#E76F51', locked: false, name: 'Sunset Terracotta' },
      { id: '2', hex: '#F4A261', locked: false, name: 'Sandy Gold' },
      { id: '3', hex: '#E9C46A', locked: false, name: 'Mustard Satin' },
      { id: '4', hex: '#2A9D8F', locked: false, name: 'Deep Aqua' },
      { id: '5', hex: '#264653', locked: false, name: 'Navy' }
    ]
  },
  {
    id: 'preset-nordic-breeze',
    name: 'Nordic Breeze',
    createdAt: Date.now() - 40000,
    favorite: false,
    colors: [
      { id: '1', hex: '#293241', locked: false, name: 'Midnight Navy' },
      { id: '2', hex: '#3D5A80', locked: false, name: 'Storm Blue' },
      { id: '3', hex: '#98C1D9', locked: false, name: 'Sky Blue' },
      { id: '4', hex: '#E0FBFC', locked: false, name: 'Ice Water' },
      { id: '5', hex: '#EE6C4D', locked: false, name: 'Sunset Terracotta' }
    ]
  },
  {
    id: 'preset-minimalist-forest',
    name: 'Desert Sage',
    createdAt: Date.now() - 30000,
    favorite: false,
    colors: [
      { id: '1', hex: '#6B705C', locked: false, name: 'Warm Olive' },
      { id: '2', hex: '#A5A58D', locked: false, name: 'Desert Sage' },
      { id: '3', hex: '#DDBDF1', locked: false, name: 'Lilac Cloud' },
      { id: '4', hex: '#FFE4E1', locked: false, name: 'Misty Rose' },
      { id: '5', hex: '#FAF0E6', locked: false, name: 'Linen' }
    ]
  }
];

type ActiveToolTab = 'palette' | 'gradient' | 'shadow' | 'converter' | 'fonts' | 'tints' | 'about' | 'privacy' | 'contact' | 'blog';

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const pathMap: Record<string, ActiveToolTab> = {
    '/': 'palette',
    '/gradient': 'gradient',
    '/shadow': 'shadow',
    '/converter': 'converter',
    '/fonts': 'fonts',
    '/tints': 'tints',
    '/about': 'about',
    '/privacy': 'privacy',
    '/contact': 'contact',
    '/blog': 'blog',
    '/palette': 'palette'
  };

  const toolMap: Record<ActiveToolTab, string> = {
    palette: '/',
    gradient: '/gradient',
    shadow: '/shadow',
    converter: '/converter',
    fonts: '/fonts',
    tints: '/tints',
    about: '/about',
    privacy: '/privacy',
    contact: '/contact',
    blog: '/blog'
  };

  const activeTool = pathMap[location.pathname] || 'palette';
  const setActiveTool = (tool: ActiveToolTab) => {
    navigate(toolMap[tool]);
  };
  const [harmony, setHarmony] = useState<ColorHarmony>('random');
  const [paletteName, setPaletteName] = useState('Aesthetic Palette');
  const [isEditingName, setIsEditingName] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Modal / Toggles State
  const [showExport, setShowExport] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  
  // Palette Canvas state
  const [palette, setPalette] = useState<IPalette>({
    id: 'canvas-active',
    name: 'Aesthetic Palette',
    createdAt: Date.now(),
    colors: []
  });

  // History states
  const [savedPalettes, setSavedPalettes] = useState<IPalette[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Initialize Palette & Saved lists
  useEffect(() => {
    // 1. Get history from localStorage
    const cachedHistory = localStorage.getItem('spectral-history');
    if (cachedHistory) {
      try {
        setSavedPalettes(JSON.parse(cachedHistory));
      } catch (e) {
        setSavedPalettes(PRESET_PALETTES);
      }
    } else {
      setSavedPalettes(PRESET_PALETTES);
      localStorage.setItem('spectral-history', JSON.stringify(PRESET_PALETTES));
    }

    // 2. Load dark mode system setting
    const cachedDark = localStorage.getItem('spectral-theme');
    if (cachedDark === 'dark' || (!cachedDark && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }

    // 3. Generate initial seed palette
    const initialColors = generateHarmonyPalette('random', [], 5);
    setPalette({
      id: `current-${Date.now()}`,
      name: 'Aesthetic Palette',
      colors: initialColors,
      createdAt: Date.now()
    });
  }, []);

  // Keyboard generator listener (Spacebar) - Palette Only
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeTool !== 'palette') return;

      const activeEl = document.activeElement;
      if (activeEl && (
        activeEl.tagName === 'INPUT' || 
        activeEl.tagName === 'TEXTAREA' || 
        activeEl.getAttribute('contenteditable') === 'true'
      )) {
        return;
      }

      if (e.code === 'Space') {
        e.preventDefault();
        handleGenerate();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [palette, harmony, activeTool]);

  // Handle Generate triggers
  const handleGenerate = () => {
    const nextColors = generateHarmonyPalette(harmony, palette.colors, palette.colors.length || 5);
    setPalette(prev => ({
      ...prev,
      colors: nextColors
    }));
    triggerToast('Fresh palette generated!');
  };

  // Toast indicator helper
  const triggerToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Toggle color lock state
  const toggleColorLock = (id: string) => {
    setPalette(prev => ({
      ...prev,
      colors: prev.colors.map(color => 
        color.id === id ? { ...color, locked: !color.locked } : color
      )
    }));
  };

  // Change individual color manually
  const handleColorChange = (id: string, newHex: string) => {
    setPalette(prev => ({
      ...prev,
      colors: prev.colors.map(color => 
        color.id === id ? { ...color, hex: newHex.toUpperCase(), name: getColorName(newHex) } : color
      )
    }));
  };

  // Move palette block order
  const handleMoveColor = (index: number, direction: 'left' | 'right') => {
    const nextColors = [...palette.colors];
    const targetIdx = direction === 'left' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= nextColors.length) return;

    // Swap items
    const temp = nextColors[index];
    nextColors[index] = nextColors[targetIdx];
    nextColors[targetIdx] = temp;

    setPalette(prev => ({
      ...prev,
      colors: nextColors
    }));
  };

  // Sync theme selection back to DOM
  const handleToggleTheme = () => {
    const targetDarkState = !isDarkMode;
    setIsDarkMode(targetDarkState);
    if (targetDarkState) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('spectral-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('spectral-theme', 'light');
    }
  };

  // Increase color column length
  const addColorColumn = () => {
    if (palette.colors.length >= 8) {
      triggerToast('Maximum 8 colors supported');
      return;
    }
    const hex = generateRandomHex();
    const newColor: IPaletteColor = {
      id: `color-${Date.now()}`,
      hex,
      locked: false,
      name: getColorName(hex)
    };
    setPalette(prev => ({
      ...prev,
      colors: [...prev.colors, newColor]
    }));
    triggerToast('Added custom color column');
  };

  // Decrease color column length
  const removeColorColumn = () => {
    if (palette.colors.length <= 2) {
      triggerToast('Minimum 2 colors required');
      return;
    }
    // Delete the last color block that is not locked
    let targetIdx = -1;
    for (let i = palette.colors.length - 1; i >= 0; i--) {
      if (!palette.colors[i].locked) {
        targetIdx = i;
        break;
      }
    }

    const removeIdx = targetIdx !== -1 ? targetIdx : palette.colors.length - 1;
    setPalette(prev => ({
      ...prev,
      colors: prev.colors.filter((_, idx) => idx !== removeIdx)
    }));
    triggerToast('Removed color column');
  };

  // Save palette to history
  const handleSaveToHistory = () => {
    // Validate if already tracking
    const exists = savedPalettes.some(p => 
      p.colors.map(c => c.hex).join('') === palette.colors.map(c => c.hex).join('')
    );
    if (exists) {
      triggerToast('This exact palette is already saved');
      return;
    }

    const newSavedItem: IPalette = {
      id: `saved-${Date.now()}`,
      name: paletteName.trim() || 'Aesthetic Palette',
      colors: palette.colors.map(c => ({ ...c, locked: false })), // unlock on save
      createdAt: Date.now(),
      favorite: false
    };

    const nextHistory = [newSavedItem, ...savedPalettes];
    setSavedPalettes(nextHistory);
    localStorage.setItem('spectral-history', JSON.stringify(nextHistory));
    triggerToast('Palette saved to history!');
  };

  // Restore history palette to canvas
  const handleLoadPalette = (selected: IPalette) => {
    setPalette({
      id: `current-${Date.now()}`,
      colors: selected.colors.map(c => ({ ...c, locked: false })),
      name: selected.name,
      createdAt: Date.now()
    });
    setPaletteName(selected.name || 'Aesthetic Palette');
    setActiveTool('palette');
    triggerToast(`Loaded "${selected.name || 'Saved Palette'}"`);
  };

  // Delete saved history color
  const handleDeletePalette = (id: string) => {
    const nextHistory = savedPalettes.filter(p => p.id !== id);
    setSavedPalettes(nextHistory);
    localStorage.setItem('spectral-history', JSON.stringify(nextHistory));
    triggerToast('Palette deleted from history');
  };

  // Bookmark / Favorite
  const handleToggleFavorite = (id: string) => {
    const nextHistory = savedPalettes.map(p => 
      p.id === id ? { ...p, favorite: !p.favorite } : p
    );
    setSavedPalettes(nextHistory);
    localStorage.setItem('spectral-history', JSON.stringify(nextHistory));
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 flex flex-col font-sans transition-colors duration-200">
      
      {/* HEADER SECTION */}
      <header id="app-header" className="border-b border-neutral-150 dark:border-neutral-900 bg-white dark:bg-neutral-950 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 z-20 shadow-xs">
        
        {/* Dynamic Logo Title */}
        <div className="flex items-center space-x-2.5 w-full sm:w-auto">
          <span className="text-2xl select-none">🎨</span>
          <div className="flex flex-col">
            <h1 className="text-md font-bold text-neutral-900 dark:text-neutral-100 tracking-tight leading-none">
              Design Color
            </h1>
            <span className="text-[10px] text-neutral-450 uppercase tracking-widest mt-1">
              Minimalist Creative Workspace
            </span>
          </div>
        </div>

        {/* TOP TOOL SELECTION CHIPS - Mobile Touch targets & high contrast design */}
        <div id="sub-tool-navigation" className="flex flex-wrap gap-1 bg-neutral-100 dark:bg-neutral-900/55 p-1 rounded-2xl border border-neutral-200/50 dark:border-neutral-800/40 w-full sm:w-auto overflow-x-auto justify-center">
          {[
            { id: 'palette', label: 'Palettes', icon: Layers },
            { id: 'gradient', label: 'Gradients', icon: Wand2 },
            { id: 'shadow', label: 'Shadows', icon: Maximize2 },
            { id: 'converter', label: 'Converter', icon: RefreshCcw },
            { id: 'fonts', label: 'Fonts', icon: Type },
            { id: 'tints', label: 'Tints', icon: Sparkles },
            { id: 'blog', label: 'Blog', icon: BookOpen }
          ].map((tab) => {
            const Icon = tab.icon;
            const isTabActive = activeTool === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTool(tab.id as ActiveToolTab)}
                className={`flex items-center space-x-1.5 py-1.5 px-3 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  isTabActive
                    ? 'bg-white dark:bg-neutral-800 text-indigo-600 dark:text-indigo-400 shadow-xs border border-black/5 dark:border-neutral-700'
                    : 'text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 border border-transparent'
                }`}
              >
                <Icon size={12} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Top bar right utilities */}
        <div id="header-utilities" className="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto">
          {/* Theme Switcher Toggle */}
          <button
            id="theme-toggler"
            onClick={handleToggleTheme}
            className="p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-850 text-neutral-600 dark:text-neutral-350 transition-all cursor-pointer shadow-xs active:scale-95"
            title={isDarkMode ? 'Activate Light Theme' : 'Activate Dark Theme'}
          >
            {isDarkMode ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          {/* History Icon Trigger */}
          <button
            id="history-panel-trigger"
            onClick={() => setShowHistory(true)}
            className="flex items-center space-x-2 py-2.5 px-4 rounded-xl bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-850 text-neutral-600 dark:text-neutral-350 transition-all cursor-pointer shadow-xs active:scale-95 text-xs font-semibold"
          >
            <History size={15} />
            <span className="hidden xs:inline">History ({savedPalettes.length})</span>
          </button>
        </div>

      </header>

      {/* RENDER THE RELEVANT WORKSPACE HEADER PANEL ONLY FOR PALETTE VIEW */}
      {activeTool === 'palette' && (
        <div id="toolbar-card" className="bg-white dark:bg-neutral-950 border-b border-neutral-150 dark:border-neutral-900 p-4 sticky top-0 z-10 shadow-xs">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Harmony Mode Dropdown */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <label htmlFor="harmony-select" className="text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest flex items-center space-x-1">
                <Layers size={12} />
                <span>Color Harmony</span>
              </label>
              <div className="relative">
                <select
                  id="harmony-select"
                  value={harmony}
                  onChange={(e) => setHarmony(e.target.value as ColorHarmony)}
                  className="appearance-none bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 text-sm font-semibold rounded-xl pl-4 pr-10 py-2 w-full sm:w-52 focus:outline-hidden focus:ring-1 focus:ring-indigo-500 shadow-xs cursor-pointer"
                >
                  <option value="random">Random Scheme</option>
                  <option value="analogous">Analogous Tone</option>
                  <option value="monochromatic">Monochromatic Scale</option>
                  <option value="triadic">Triadic Triangle</option>
                  <option value="complementary">Complementary Balance</option>
                  <option value="split-complementary">Split Complementary</option>
                  <option value="tetradic">Tetradic Harmony</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-neutral-400">
                  <Sparkles size={14} className="text-indigo-500 animate-pulse" />
                </div>
              </div>
            </div>

            {/* Core Generation Controls */}
            <div className="flex flex-wrap items-center gap-2">
              
              {/* Columns Resizers Buttons */}
              <div className="flex items-center bg-neutral-100 dark:bg-neutral-900 rounded-xl p-1 border border-neutral-200 dark:border-neutral-800">
                <button
                  id="column-remover-btn"
                  onClick={removeColorColumn}
                  className="p-2 hover:bg-white dark:hover:bg-neutral-800 rounded-lg text-neutral-600 dark:text-neutral-300 transition-colors disabled:opacity-25 cursor-pointer"
                  disabled={palette.colors.length <= 2}
                  title="Remove Color Column"
                >
                  <Minus size={14} />
                </button>
                <span className="text-xs font-bold px-3 text-neutral-700 dark:text-neutral-300 min-w-[50px] text-center">
                  {palette.colors.length} Cols
                </span>
                <button
                  id="column-adder-btn"
                  onClick={addColorColumn}
                  className="p-2 hover:bg-white dark:hover:bg-neutral-800 rounded-lg text-neutral-600 dark:text-neutral-300 transition-colors disabled:opacity-25 cursor-pointer"
                  disabled={palette.colors.length >= 8}
                  title="Add Color Column"
                >
                  <Plus size={14} />
                </button>
              </div>

              {/* Quick Favorites Save Toggler */}
              <button
                id="save-history-quick"
                onClick={handleSaveToHistory}
                className="flex items-center space-x-2 py-2.5 px-3.5 bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-850 text-neutral-600 dark:text-neutral-350 rounded-xl font-semibold transition-all shadow-xs active:scale-95 text-xs cursor-pointer"
                title="Save active to favorites list"
              >
                <Bookmark size={14} />
                <span className="hidden sm:inline">Save Palette</span>
              </button>

              {/* Core Generate trigger button */}
              <button
                id="generator-action-btn"
                onClick={handleGenerate}
                className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-semibold py-2.5 px-5 rounded-xl text-xs shadow-md shadow-indigo-500/15 cursor-pointer transition-all"
              >
                <RotateCw size={14} className="animate-spin-slow" />
                <span>Generate Colors</span>
              </button>

              {/* Export Panel Trigger */}
              <button
                id="palette-export-action"
                onClick={() => setShowExport(true)}
                className="flex items-center space-x-2 py-2.5 px-4 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl text-xs cursor-pointer shadow-xs active:scale-95 transition-all"
              >
                <Download size={14} />
                <span>Export CSS/TW</span>
              </button>

            </div>
          </div>
        </div>
      )}

      {/* CORE WORKSPACE CONTENT AREA WITH TAB-SWITCH CONSTRAINTS */}
      <main id="studio-main-arena" className="flex-1 flex flex-col p-4 md:p-8 max-w-7xl w-full mx-auto justify-center bg-transparent">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTool}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="w-full flex-1 flex flex-col h-full"
          >
            {activeTool === 'palette' && (
              <div className="flex-1 flex flex-col justify-center">
                
                {/* Palette name block display on Palette mode */}
                <div className="flex items-center space-x-2 mb-4 px-1">
                  <span className="text-xs uppercase font-bold tracking-widest text-neutral-400">Current Design:</span>
                  <span className="text-xs font-semibold text-neutral-600 dark:text-neutral-300 italic">{paletteName}</span>
                </div>

                <div 
                  id="color-grid-frame"
                  className="w-full flex flex-col md:flex-row h-auto md:min-h-[520px] shadow-2xl rounded-2xl border border-neutral-150 dark:border-neutral-900 bg-white dark:bg-neutral-950 overflow-hidden"
                >
                  {palette.colors.length === 0 ? (
                    <div id="loader-fallback" className="flex flex-col items-center justify-center flex-1 h-[400px]">
                      <div className="h-10 w-10 border-4 border-t-indigo-600 border-indigo-100 dark:border-indigo-950/40 rounded-full animate-spin"></div>
                      <p className="text-xs text-neutral-450 mt-4 uppercase tracking-wider font-semibold">Creating Canvas...</p>
                    </div>
                  ) : (
                    palette.colors.map((color, index) => (
                      <PaletteBlock
                        key={color.id}
                        color={color}
                        index={index}
                        totalCount={palette.colors.length}
                        onToggleLock={toggleColorLock}
                        onColorChange={handleColorChange}
                        onMove={handleMoveColor}
                        onCopySuccess={triggerToast}
                      />
                    ))
                  )}
                </div>

                {/* Spacebar hotkey tooltip information indicator */}
                <div id="keyboard-prompt" className="hidden md:flex items-center justify-center space-x-2 text-neutral-400 dark:text-neutral-600 mt-6 text-xs pointer-events-none">
                  <Keyboard size={14} />
                  <span>Press the</span>
                  <kbd className="bg-white dark:bg-neutral-900 px-2 py-0.5 border border-neutral-200 dark:border-neutral-800 rounded-md shadow-xs font-semibold text-[10px] text-neutral-500">
                    SPACEBAR
                  </kbd>
                  <span>on your keyboard to generate an entirely new palette, locking your favorites!</span>
                </div>
              </div>
            )}

            {activeTool === 'gradient' && (
              <div className="flex-1">
                <div className="mb-6">
                  <h2 className="text-xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50">Gradient Maker</h2>
                  <p className="text-xs text-neutral-500 mt-1">Blend clean color tones on the canvas with immediate support for CSS linear property and tailwind presets.</p>
                </div>
                <GradientGenerator onCopySuccess={triggerToast} />
              </div>
            )}

            {activeTool === 'shadow' && (
              <div className="flex-1">
                <div className="mb-6">
                  <h2 className="text-xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50">Box Shadow Generator</h2>
                  <p className="text-xs text-neutral-500 mt-1">Generate modern layout boxes soft ambient shadows with direct offsets, sliders, and color match keys.</p>
                </div>
                <BoxShadowGenerator onCopySuccess={triggerToast} />
              </div>
            )}

            {activeTool === 'converter' && (
              <div className="flex-1">
                <div className="mb-6">
                  <h2 className="text-xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50">Color Multi-Converter</h2>
                  <p className="text-xs text-neutral-500 mt-1 font-medium">Map hexadecimal values automatically to CSS standard RGB, HSL, and printer-ready CMYK variables.</p>
                </div>
                <ColorConverter onCopySuccess={triggerToast} />
              </div>
            )}

            {activeTool === 'fonts' && (
              <div className="flex-1">
                <div className="mb-6">
                  <h2 className="text-xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50">Typography Font Pairer</h2>
                  <p className="text-xs text-neutral-500 mt-1 font-medium">Experiment with display headings and body block ratios. Copy clean theme definitions for tailwind.</p>
                </div>
                <FontPairer onCopySuccess={triggerToast} />
              </div>
            )}

            {activeTool === 'tints' && (
              <div className="flex-1">
                <div className="mb-6">
                  <h2 className="text-xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50">Tints & Shades Scale</h2>
                  <p className="text-xs text-neutral-500 mt-1 font-medium">Seed a starting color and get a complete scale of high-fidelity tensive light and dark ranges instantly.</p>
                </div>
                <TintShadeGenerator onCopySuccess={triggerToast} />
              </div>
            )}

            {activeTool === 'blog' && (
              <div className="flex-1">
                <BlogPage />
              </div>
            )}

            {activeTool === 'about' && (
              <div className="flex-1">
                <AboutPage />
              </div>
            )}

            {activeTool === 'privacy' && (
              <div className="flex-1">
                <PrivacyPage />
              </div>
            )}

            {activeTool === 'contact' && (
              <div className="flex-1">
                <ContactPage />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* HISTORIC DRAWER OVERLAY PANEL */}
      <HistoryPanel
        isOpen={showHistory}
        onClose={() => setShowHistory(false)}
        savedPalettes={savedPalettes}
        currentPaletteId={palette.id}
        onLoadPalette={(pal) => {
          handleLoadPalette(pal);
          setShowHistory(false);
        }}
        onSaveCurrent={handleSaveToHistory}
        onDeletePalette={handleDeletePalette}
        onToggleFavorite={handleToggleFavorite}
      />

      {/* EXPORT COMPLETED DIALOG */}
      <ExportModal
        isOpen={showExport}
        onClose={() => setShowExport(false)}
        palette={palette}
        paletteName={paletteName}
      />

      {/* NOTIFICATION FLOATING TOASTS OVERLAY */}
      <AnimatePresence>
        {toastMessage && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-55 pointer-events-none">
            <motion.div
              id="feedback-toast"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              className="bg-neutral-900/90 text-neutral-100 text-xs font-semibold py-3 px-6 rounded-xl border border-neutral-800 shadow-2xl backdrop-blur-md flex items-center space-x-2 whitespace-nowrap"
            >
              <span>{toastMessage}</span>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* PREMIUM SITE FOOTER SECTION FOR ADSENSE REGISTRATION COMPLIANCE */}
      <footer id="studio-product-footer" className="mt-8 border-t border-neutral-150 dark:border-neutral-900 bg-white dark:bg-neutral-950 px-6 py-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-2">
            <span className="text-xl select-none">🎨</span>
            <span className="text-xs font-bold text-neutral-500 uppercase tracking-widest">
              Design Color Suite
            </span>
          </div>

          {/* Quick Footer Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-neutral-450 dark:text-neutral-550">
            <button 
              onClick={() => { setActiveTool('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className={`hover:text-indigo-600 transition-colors cursor-pointer ${activeTool === 'about' ? 'text-indigo-500' : ''}`}
            >
              About Us
            </button>
            <span>•</span>
            <button 
              onClick={() => { setActiveTool('privacy'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className={`hover:text-indigo-600 transition-colors cursor-pointer ${activeTool === 'privacy' ? 'text-indigo-500' : ''}`}
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button 
              onClick={() => { setActiveTool('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className={`hover:text-indigo-600 transition-colors cursor-pointer ${activeTool === 'contact' ? 'text-indigo-500' : ''}`}
            >
              Contact Us
            </button>
            <span>•</span>
            <button 
              onClick={() => { setActiveTool('blog'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className={`hover:text-indigo-600 transition-colors cursor-pointer ${activeTool === 'blog' ? 'text-indigo-500' : ''}`}
            >
              Articles Hub
            </button>
          </div>

          <p className="text-[10px] font-mono text-neutral-400 select-none">
            © 2026 Nikhil. All rights reserved.
          </p>
        </div>
      </footer>

    </div>
  );
}
