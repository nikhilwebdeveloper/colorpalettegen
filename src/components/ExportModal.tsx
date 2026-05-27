import React, { useState } from 'react';
import { IPalette, ExportFormat } from '../types';
import { paletteToCSS, paletteToTailwind, paletteToSVG } from '../utils/colorUtils';
import { X, Copy, Check, Download, FileJson, FileCode, Hash, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  palette: IPalette;
  paletteName: string;
}

export default function ExportModal({ isOpen, onClose, palette, paletteName }: ExportModalProps) {
  const [activeTab, setActiveTab] = useState<ExportFormat>('css');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const hexOnlyString = palette.colors.map(c => c.hex).join(', ');

  const getCodeContent = () => {
    switch (activeTab) {
      case 'css':
        return paletteToCSS(palette.colors);
      case 'tailwind':
        return paletteToTailwind(palette.colors, paletteName.toLowerCase().replace(/\s+/g, '-'));
      case 'json':
        return JSON.stringify(
          palette.colors.map((c, idx) => ({
            name: c.name || `Color ${idx + 1}`,
            hex: c.hex,
            locked: false
          })),
          null,
          2
        );
      case 'svg':
        return paletteToSVG(palette.colors);
      default:
        return hexOnlyString;
    }
  };

  const codeString = getCodeContent();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleDownloadSVG = () => {
    const svgContent = paletteToSVG(palette.colors);
    const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${paletteName.toLowerCase().replace(/\s+/g, '-')}-palette.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <AnimatePresence>
      <div id="export-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          id="export-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-neutral-900/60 backdrop-blur-xs"
        />

        {/* Modal Panel */}
        <motion.div
          id="export-panel"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', duration: 0.4 }}
          className="relative w-full max-w-2xl bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl border border-neutral-100 dark:border-neutral-800 overflow-hidden z-10 flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div id="modal-header" className="flex items-center justify-between p-6 border-b border-neutral-100 dark:border-neutral-800">
            <div>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-50">Export Palette</h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-450 mt-1">Export designs in formats tailored for developers and designers</p>
            </div>
            <button
              id="close-modal-btn"
              onClick={onClose}
              className="p-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg text-neutral-500 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Quick Palette Preview */}
          <div id="modal-preview-bar" className="px-6 py-4 bg-neutral-50 dark:bg-neutral-900/50 flex">
            {palette.colors.map(color => (
              <div
                key={color.id}
                style={{ backgroundColor: color.hex }}
                className="h-10 flex-1 first:rounded-l-lg last:rounded-r-lg shadow-inner relative group"
                title={`${color.name}: ${color.hex}`}
              >
                <span className="sr-only">{color.hex}</span>
              </div>
            ))}
          </div>

          {/* Tabs Navigation */}
          <div id="modal-tabs" className="flex border-b border-neutral-100 dark:border-neutral-800 px-6 bg-white dark:bg-neutral-900 justify-start space-x-2">
            {[
              { id: 'css', label: 'CSS Variables', icon: FileCode },
              { id: 'tailwind', label: 'Tailwind Config', icon: Globe },
              { id: 'json', label: 'JSON Array', icon: FileJson },
              { id: 'svg', label: 'Vector SVG', icon: Download }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  id={`tab-${tab.id}`}
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as ExportFormat)}
                  className={`flex items-center space-x-2 py-3.5 px-3 text-sm font-medium border-b-2 transition-all cursor-pointer ${
                    isActive
                      ? 'border-indigo-600 dark:border-indigo-400 text-indigo-600 dark:text-indigo-400'
                      : 'border-transparent text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
                  }`}
                >
                  <Icon size={15} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Content Area */}
          <div id="modal-body" className="flex-1 p-6 overflow-y-auto bg-neutral-50 dark:bg-neutral-950/40">
            {activeTab === 'svg' ? (
              <div id="svg-export-preview" className="flex flex-col items-center justify-center py-6 text-center space-y-4">
                <div className="p-4 bg-indigo-50 dark:bg-indigo-950/30 rounded-full text-indigo-600 dark:text-indigo-400">
                  <Download size={36} className="animate-bounce" />
                </div>
                <div>
                  <h4 className="font-semibold text-neutral-800 dark:text-neutral-200">Download Vector Asset</h4>
                  <p className="text-xs text-neutral-500 max-w-md mt-1">
                    An SVG file contains high-resolution layout blocks of this palette with the Hex values and color names. Perfect for imports directly into Figma, Illustrator, or Sketch.
                  </p>
                </div>
                <button
                  id="download-svg-btn"
                  onClick={handleDownloadSVG}
                  className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-medium px-5 py-2.5 rounded-xl shadow-lg shadow-indigo-500/10 dark:shadow-indigo-950/30 transition-all cursor-pointer text-sm"
                >
                  <Download size={16} />
                  <span>Download SVG File</span>
                </button>
              </div>
            ) : (
              <div id="code-block-container" className="relative">
                {/* Actions */}
                <div className="absolute right-3 top-3 z-10 flex space-x-2">
                  <button
                    id="copy-code-btn"
                    onClick={handleCopy}
                    className="flex items-center space-x-1 px-3 py-1.5 bg-neutral-900/85 hover:bg-neutral-950 text-white rounded-lg text-xs font-semibold backdrop-blur-xs transition-all shadow-md active:scale-95 cursor-pointer max-w-fit"
                  >
                    {copied ? (
                      <>
                        <Check size={13} className="text-emerald-400" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={13} />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Code Window */}
                <pre
                  id="code-box"
                  className="p-4 bg-neutral-900 text-neutral-200 rounded-xl overflow-x-auto text-xs font-mono leading-relaxed border border-neutral-850 shadow-inner max-h-[300px] text-left"
                >
                  <code>{codeString}</code>
                </pre>
              </div>
            )}
          </div>

          {/* Footer */}
          <div id="modal-footer" className="p-6 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-end bg-white dark:bg-neutral-900 space-x-3">
            <button
              id="close-action-btn"
              onClick={onClose}
              className="px-4 py-2 border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-xl text-sm font-semibold hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
