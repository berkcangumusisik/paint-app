'use client';

import React, { useState } from 'react';

interface ColorPaletteProps {
  currentColor: string;
  onColorChange: (color: string) => void;
}

export default function ColorPalette({ currentColor, onColorChange }: ColorPaletteProps) {
  const [showCustomPicker, setShowCustomPicker] = useState(false);

  const presetColors = [
    '#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF',
    '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500', '#800080',
    '#FFC0CB', '#A52A2A', '#808080', '#C0C0C0', '#000080',
    '#008000', '#800000', '#808000', '#FF6347', '#4169E1',
    '#32CD32', '#FFD700', '#DC143C', '#00CED1', '#FF1493',
    '#1E90FF', '#FF8C00', '#9400D3', '#00FA9A', '#FF69B4'
  ];

  return (
    <div className="absolute top-4 left-80 z-10 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 p-3 w-56">
      <div className="space-y-2">
        
        {/* Current Color Display */}
        <div className="flex items-center gap-2">
          <div 
            className="w-6 h-6 rounded-md border-2 border-gray-300 shadow-sm"
            style={{ backgroundColor: currentColor }}
          />
          <div className="text-sm">
            <div className="font-semibold text-gray-700">Seçili Renk</div>
            <div className="text-gray-500 text-xs font-mono">{currentColor.toUpperCase()}</div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-200"></div>

        {/* Preset Colors */}
        <div>
          <label className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1 block">
            Hazır Renkler
          </label>
          <div className="grid grid-cols-6 gap-1">
            {presetColors.map((color, index) => (
              <button
                key={`${color}-${index}`}
                onClick={() => onColorChange(color)}
                className={`w-6 h-6 rounded-md border-2 transition-all duration-200 hover:scale-110 hover:shadow-md ${
                  currentColor === color
                    ? 'border-blue-500 ring-1 ring-blue-200'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
        </div>

        {/* Custom Color Picker */}
        <div>
          <button
            onClick={() => setShowCustomPicker(!showCustomPicker)}
            className="w-full p-2 bg-gray-100 hover:bg-gray-200 rounded-md text-sm font-medium text-gray-700 transition-all duration-200 flex items-center justify-center gap-2"
          >
            🎨 Özel Renk
            <span className={`transition-transform duration-200 text-xs ${showCustomPicker ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </button>
          
          {showCustomPicker && (
            <div className="mt-2 p-2 bg-gray-50 rounded-md">
              <input
                type="color"
                value={currentColor}
                onChange={(e) => onColorChange(e.target.value)}
                className="w-full h-8 rounded-md border border-gray-300 cursor-pointer"
                title="Özel renk seç"
              />
              <div className="mt-2">
                <input
                  type="text"
                  value={currentColor}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^#[0-9A-Fa-f]{0,6}$/.test(value)) {
                      onColorChange(value);
                    }
                  }}
                  className="w-full px-2 py-1 text-xs font-mono bg-white border border-gray-300 rounded text-center"
                  placeholder="#000000"
                />
              </div>
            </div>
          )}
        </div>

        {/* Quick Access Colors */}
        <div>
          <label className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1 block">
            Hızlı Erişim
          </label>
          <div className="flex gap-1">
            {['#000000', '#FF0000', '#00FF00', '#0000FF'].map((color) => (
              <button
                key={color}
                onClick={() => onColorChange(color)}
                className={`w-7 h-7 rounded-full border-2 transition-all duration-200 hover:scale-110 hover:shadow-md ${
                  currentColor === color
                    ? 'border-blue-500 ring-1 ring-blue-200'
                    : 'border-gray-300'
                }`}
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
} 