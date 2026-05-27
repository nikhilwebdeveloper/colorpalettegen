import React from 'react';
import { IPalette } from '../types';
import { X, Trash2, Bookmark, Star, Clock, Palette } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HistoryPanelProps {
  isOpen: boolean;
  onClose: () => void;
  savedPalettes: IPalette[];
  currentPaletteId: string;
  onLoadPalette: (palette: IPalette) => void;
  onSaveCurrent: () => void;
  onDeletePalette: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}

export default function HistoryPanel({
  isOpen,
  onClose,
  savedPalettes,
  currentPaletteId,
  onLoadPalette,
  onSaveCurrent,
  onDeletePalette,
  onToggleFavorite
}: HistoryPanelProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div id="history-panel-overlay" className="fixed inset-0 z-40 overflow-hidden">
        {/* Backdrop overlay */}
        <motion.div
          id="history-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/45 backdrop-blur-xs"
        />

        {/* Sidebar Frame */}
        <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            id="history-sidebar"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="w-xs sm:w-md max-w-full bg-white dark:bg-neutral-900 border-l border-neutral-100 dark:border-neutral-800 shadow-2xl h-full flex flex-col"
          >
            {/* Header */}
            <div id="history-header" className="p-6 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Clock className="text-indigo-600 dark:text-indigo-400" size={18} />
                <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-50 animate-pulse-slow">Palette History</h3>
              </div>
              <button
                id="close-history-btn"
                onClick={onClose}
                className="p-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500 rounded-lg transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Core Body Container */}
            <div id="history-body" className="flex-1 overflow-y-auto p-6 space-y-4">
              {/* Save Active Palette Button Card */}
              <div
                id="save-current-card"
                className="p-4 bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100/60 dark:border-indigo-900/40 rounded-2xl flex flex-col space-y-3"
              >
                <div>
                  <h4 className="text-sm font-semibold text-indigo-950 dark:text-indigo-200">Love this Palette?</h4>
                  <p className="text-xs text-indigo-600/80 dark:text-indigo-400/80 mt-1">
                    Save your current canvas configuration so you can return to it anytime.
                  </p>
                </div>
                <button
                  id="save-current-action-btn"
                  onClick={onSaveCurrent}
                  className="w-full flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white py-2 px-3 rounded-xl text-xs font-bold shadow-xs transition-all cursor-pointer"
                >
                  <Bookmark size={14} />
                  <span>Save Palette to History</span>
                </button>
              </div>

              {/* Saved Palettes List Section */}
              <div id="saved-list" className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-neutral-450 uppercase tracking-widest">
                    Your Saved Palettes ({savedPalettes.length})
                  </span>
                </div>

                {savedPalettes.length === 0 ? (
                  <div id="empty-history" className="text-center py-10 border border-dashed border-neutral-200 dark:border-neutral-800 rounded-2xl">
                    <Palette className="mx-auto text-neutral-300 dark:text-neutral-700 mb-2" size={24} />
                    <p className="text-sm text-neutral-500 font-medium">No palettes saved yet</p>
                    <p className="text-xs text-neutral-400 mt-1">Click the save panel above to start tracking!</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {savedPalettes.map((palette) => (
                      <div
                        id={`history-row-${palette.id}`}
                        key={palette.id}
                        className={`p-3 rounded-xl border transition-all duration-200 bg-neutral-50/50 dark:bg-neutral-900/50 ${
                          palette.id === currentPaletteId
                            ? 'border-indigo-500/80 dark:border-indigo-400 bg-indigo-50/10 dark:bg-indigo-950/10 shadow-xs'
                            : 'border-neutral-150 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700'
                        }`}
                      >
                        {/* Title and Favorites */}
                        <div className="flex items-center justify-between mb-2">
                          <button
                            id={`load-pal-btn-${palette.id}`}
                            onClick={() => onLoadPalette(palette)}
                            className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors uppercase cursor-pointer"
                          >
                            {palette.name || 'Untitled Palette'}
                          </button>

                          <div className="flex items-center space-x-1">
                            <button
                              id={`fav-pal-btn-${palette.id}`}
                              onClick={() => onToggleFavorite(palette.id)}
                              className={`p-1 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md transition-colors cursor-pointer ${
                                palette.favorite ? 'text-amber-500' : 'text-neutral-400 hover:text-amber-400'
                              }`}
                              title={palette.favorite ? 'Unfavorite' : 'Favorite'}
                            >
                              <Star size={13} fill={palette.favorite ? 'currentColor' : 'none'} />
                            </button>
                            <button
                              id={`del-pal-btn-${palette.id}`}
                              onClick={() => onDeletePalette(palette.id)}
                              className="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md text-neutral-400 hover:text-red-500 transition-colors cursor-pointer"
                              title="Delete palette"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </div>

                        {/* Colors blocks list row */}
                        <button
                          id={`pal-swatch-loader-${palette.id}`}
                          onClick={() => onLoadPalette(palette)}
                          className="flex w-full h-8 rounded-lg overflow-hidden cursor-pointer"
                          title="Click to load palette"
                        >
                          {palette.colors.map((color) => (
                            <div
                              key={color.id}
                              style={{ backgroundColor: color.hex }}
                              className="flex-1 h-full hover:scale-x-110 transition-transform"
                            />
                          ))}
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Footer informational */}
            <div id="history-footer" className="p-4 border-t border-neutral-100 dark:border-neutral-800 text-center">
              <span className="text-[10px] text-neutral-400 italic font-mono uppercase tracking-wider">
                stored locally on your device
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
