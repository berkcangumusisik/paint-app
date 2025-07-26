'use client';

import React, { useState } from 'react';
import { DrawingState, Tool } from './Whiteboard';

interface ToolbarProps {
  drawingState: DrawingState;
  setDrawingState: React.Dispatch<React.SetStateAction<DrawingState>>;
  onUndo: () => void;
  onRedo: () => void;
  onClear: () => void;
  onFileUpload: () => void;
  canUndo: boolean;
  canRedo: boolean;
  onPanMode?: () => void;
  isPanning?: boolean;
}

export default function Toolbar({ 
  drawingState, 
  setDrawingState, 
  onUndo, 
  onRedo, 
  onClear,
  onFileUpload,
  canUndo,
  canRedo,
  onPanMode,
  isPanning = false
}: ToolbarProps) {
  
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showSizeInput, setShowSizeInput] = useState(false);
  const [showToolSelect, setShowToolSelect] = useState(false);

  const tools: { id: Tool; icon: string; label: string; category: string; gradient?: string }[] = [
    { id: 'seç', icon: '🎯', label: 'Seç', category: 'selection', gradient: 'from-purple-500 to-pink-500' },
    { id: 'kalem', icon: '🖊️', label: 'Kalem', category: 'drawing', gradient: 'from-blue-500 to-indigo-600' },
    { id: 'kurşun', icon: '✏️', label: 'Kurşun', category: 'drawing', gradient: 'from-gray-500 to-gray-600' },
    { id: 'marker', icon: '🖍️', label: 'Marker', category: 'drawing', gradient: 'from-yellow-400 to-orange-500' },
    { id: 'silgi', icon: '🧽', label: 'Silgi', category: 'drawing', gradient: 'from-red-400 to-pink-500' },
    { id: 'çizgi', icon: '📏', label: 'Çizgi', category: 'shapes', gradient: 'from-emerald-400 to-cyan-500' },
    { id: 'dikdörtgen', icon: '⬜', label: 'Dikdörtgen', category: 'shapes', gradient: 'from-blue-400 to-blue-600' },
    { id: 'daire', icon: '⭕', label: 'Daire', category: 'shapes', gradient: 'from-green-400 to-emerald-600' },
    { id: 'elips', icon: '🥚', label: 'Elips', category: 'shapes', gradient: 'from-amber-400 to-orange-600' },
    { id: 'üçgen', icon: '🔺', label: 'Üçgen', category: 'shapes', gradient: 'from-red-400 to-rose-600' },
    { id: 'yıldız', icon: '⭐', label: 'Yıldız', category: 'shapes', gradient: 'from-yellow-400 to-amber-600' },
    { id: 'kalp', icon: '❤️', label: 'Kalp', category: 'shapes', gradient: 'from-pink-400 to-rose-600' },
    { id: 'ok', icon: '➡️', label: 'Ok', category: 'shapes', gradient: 'from-indigo-400 to-purple-600' },
    { id: 'yapışkan-not', icon: '📝', label: 'Not', category: 'other', gradient: 'from-lime-400 to-green-600' }
  ];

  const brushSizes = [1, 2, 3, 5, 8, 12, 16, 24, 32, 48];

  const quickColors = [
    '#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF',
    '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500', '#800080',
    '#FFC0CB', '#A52A2A', '#808080', '#C0C0C0'
  ];

  const groupedTools = {
    selection: tools.filter(t => t.category === 'selection'),
    drawing: tools.filter(t => t.category === 'drawing'),
    shapes: tools.filter(t => t.category === 'shapes'),
    other: tools.filter(t => t.category === 'other')
  };

  const currentTool = tools.find(t => t.id === drawingState.tool);

  return (
    <div className="absolute top-4 left-4 right-4 z-20 bg-gradient-to-r from-white/95 via-white/98 to-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/50 p-4">
      {/* Desktop Layout */}
      <div className="hidden lg:flex items-center gap-4">
        
        {/* Action Buttons Group */}
        <div className="flex gap-2 border-r border-gray-200/70 pr-4">
          <button
            onClick={onUndo}
            disabled={!canUndo}
            className={`group relative p-3 rounded-xl transition-all duration-300 ${
              canUndo 
                ? 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5' 
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
            title="Geri Al (Ctrl+Z)"
          >
            <span className="text-lg">↶</span>
            <span className="ml-2 text-sm font-medium">Geri Al</span>
          </button>
          
          <button
            onClick={onRedo}
            disabled={!canRedo}
            className={`group relative p-3 rounded-xl transition-all duration-300 ${
              canRedo 
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5' 
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
            title="İleri Al (Ctrl+Y)"
          >
            <span className="text-lg">↷</span>
            <span className="ml-2 text-sm font-medium">İleri Al</span>
          </button>
          
          <button
            onClick={onFileUpload}
            className="p-3 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            title="Resim/PDF Yükle"
          >
            <span className="text-lg">📁</span>
            <span className="ml-2 text-sm font-medium">Dosya</span>
          </button>
          
          <button
            onClick={onClear}
            className="p-3 rounded-xl bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            title="Tümünü Temizle"
          >
            <span className="text-lg">🗑️</span>
            <span className="ml-2 text-sm font-medium">Temizle</span>
          </button>
        </div>

        {/* Pan/Scroll Tool */}
        <div className="flex gap-2 border-r border-gray-200/70 pr-4">
          <button
            onClick={onPanMode}
            className={`p-3 rounded-xl transition-all duration-300 ${
              isPanning
                ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg ring-2 ring-white/50'
                : 'bg-white/60 hover:bg-white/80 text-gray-700 hover:shadow-lg border border-gray-200/50'
            }`}
            title="Taşıma/Kaydırma (Alt+Click)"
          >
            <span className="text-lg">✋</span>
            <span className="ml-2 text-sm font-medium">Taşı</span>
          </button>
        </div>

        {/* Tool Selector */}
        <div className="flex gap-2 border-r border-gray-200/70 pr-4">
          <div className="relative">
            <button
              onClick={() => setShowToolSelect(!showToolSelect)}
              className="group flex items-center gap-3 p-3 bg-white/60 hover:bg-white/80 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 border border-gray-200/50"
              title="Araç Seç"
            >
              <span className="text-lg">{currentTool?.icon}</span>
              <div className="flex flex-col items-start">
                <span className="text-sm font-bold text-gray-700">Araç</span>
                <span className="text-xs text-gray-500">{currentTool?.label}</span>
              </div>
              <span className="text-xs text-gray-400 group-hover:text-gray-600">
                {showToolSelect ? '▲' : '▼'}
              </span>
            </button>
            
            {showToolSelect && (
              <div className="absolute top-full left-0 mt-3 p-4 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/50 z-30 min-w-[280px]">
                <div className="space-y-4">
                  {/* Selection Tools */}
                  <div>
                    <label className="text-sm font-bold text-gray-700 mb-3 block flex items-center gap-2">
                      <span className="w-3 h-3 bg-purple-500 rounded-full"></span>
                      Seçim Araçları
                    </label>
                    <div className="grid grid-cols-1 gap-2">
                      {groupedTools.selection.map((tool) => (
                        <button
                          key={tool.id}
                          onClick={() => {
                            setDrawingState(prev => ({ ...prev, tool: tool.id }));
                            setShowToolSelect(false);
                          }}
                          className={`p-3 rounded-lg transition-all duration-300 flex items-center gap-3 ${
                            drawingState.tool === tool.id
                              ? `bg-gradient-to-r ${tool.gradient} text-white shadow-lg`
                              : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-200'
                          }`}
                        >
                          <span className="text-lg">{tool.icon}</span>
                          <span className="text-sm font-medium">{tool.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Drawing Tools */}
                  <div>
                    <label className="text-sm font-bold text-gray-700 mb-3 block flex items-center gap-2">
                      <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                      Çizim Araçları
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {groupedTools.drawing.map((tool) => (
                        <button
                          key={tool.id}
                          onClick={() => {
                            setDrawingState(prev => ({ ...prev, tool: tool.id }));
                            setShowToolSelect(false);
                          }}
                          className={`p-3 rounded-lg transition-all duration-300 flex items-center gap-2 ${
                            drawingState.tool === tool.id
                              ? `bg-gradient-to-r ${tool.gradient} text-white shadow-lg`
                              : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-200'
                          }`}
                        >
                          <span className="text-lg">{tool.icon}</span>
                          <span className="text-sm font-medium">{tool.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Shape Tools */}
                  <div>
                    <label className="text-sm font-bold text-gray-700 mb-3 block flex items-center gap-2">
                      <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                      Şekil Araçları
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {groupedTools.shapes.map((tool) => (
                        <button
                          key={tool.id}
                          onClick={() => {
                            setDrawingState(prev => ({ ...prev, tool: tool.id }));
                            setShowToolSelect(false);
                          }}
                          className={`p-3 rounded-lg transition-all duration-300 flex items-center gap-2 ${
                            drawingState.tool === tool.id
                              ? `bg-gradient-to-r ${tool.gradient} text-white shadow-lg`
                              : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-200'
                          }`}
                        >
                          <span className="text-lg">{tool.icon}</span>
                          <span className="text-sm font-medium">{tool.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Other Tools */}
                  <div>
                    <label className="text-sm font-bold text-gray-700 mb-3 block flex items-center gap-2">
                      <span className="w-3 h-3 bg-orange-500 rounded-full"></span>
                      Diğer Araçlar
                    </label>
                    <div className="grid grid-cols-1 gap-2">
                      {groupedTools.other.map((tool) => (
                        <button
                          key={tool.id}
                          onClick={() => {
                            setDrawingState(prev => ({ ...prev, tool: tool.id }));
                            setShowToolSelect(false);
                          }}
                          className={`p-3 rounded-lg transition-all duration-300 flex items-center gap-3 ${
                            drawingState.tool === tool.id
                              ? `bg-gradient-to-r ${tool.gradient} text-white shadow-lg`
                              : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-200'
                          }`}
                        >
                          <span className="text-lg">{tool.icon}</span>
                          <span className="text-sm font-medium">{tool.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Color Selection */}
        <div className="flex gap-2 border-r border-gray-200/70 pr-4">
          <div className="relative">
            <button
              onClick={() => setShowColorPicker(!showColorPicker)}
              className="group flex items-center gap-3 p-3 bg-white/60 hover:bg-white/80 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 border border-gray-200/50"
              title="Renk Seç"
            >
              <div 
                className="w-8 h-8 rounded-lg border-2 border-white shadow-lg"
                style={{ backgroundColor: drawingState.color }}
              />
              <div className="flex flex-col items-start">
                <span className="text-sm font-bold text-gray-700">Renk</span>
                <span className="text-xs text-gray-500 font-mono">{drawingState.color.toUpperCase()}</span>
              </div>
              <span className="text-xs text-gray-400 group-hover:text-gray-600 transition-colors">
                {showColorPicker ? '▲' : '▼'}
              </span>
            </button>
            
            {showColorPicker && (
              <div className="absolute top-full left-0 mt-3 p-4 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/50 z-30 min-w-[250px]">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-bold text-gray-700 mb-3 block">Hızlı Renkler</label>
                    <div className="grid grid-cols-7 gap-2">
                      {quickColors.map((color) => (
                        <button
                          key={color}
                          onClick={() => {
                            setDrawingState(prev => ({ ...prev, color }));
                            setShowColorPicker(false);
                          }}
                          className={`w-8 h-8 rounded-lg border-2 transition-all duration-300 hover:scale-110 ${
                            drawingState.color === color
                              ? 'border-blue-500 ring-2 ring-blue-200 scale-110'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-bold text-gray-700 mb-3 block">Özel Renk</label>
                    <input
                      type="color"
                      value={drawingState.color}
                      onChange={(e) => setDrawingState(prev => ({ ...prev, color: e.target.value }))}
                      className="w-full h-12 rounded-xl border-2 border-gray-300 cursor-pointer bg-white"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Brush Size */}
        <div className="flex gap-2 border-r border-gray-200/70 pr-4">
          <div className="relative">
            <button
              onClick={() => setShowSizeInput(!showSizeInput)}
              className="group flex items-center gap-3 p-3 bg-white/60 hover:bg-white/80 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 border border-gray-200/50"
              title="Boyut Seç"
            >
              <div 
                className="rounded-full bg-current"
                style={{ 
                  width: `${Math.min(drawingState.size + 4, 16)}px`, 
                  height: `${Math.min(drawingState.size + 4, 16)}px` 
                }}
              />
              <div className="flex flex-col items-start">
                <span className="text-sm font-bold text-gray-700">Boyut</span>
                <span className="text-xs text-gray-500 font-mono">{drawingState.size}px</span>
              </div>
              <span className="text-xs text-gray-400 group-hover:text-gray-600">
                {showSizeInput ? '▲' : '▼'}
              </span>
            </button>
            
            {showSizeInput && (
              <div className="absolute top-full left-0 mt-3 p-4 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/50 z-30 min-w-[220px]">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-bold text-gray-700 mb-3 block">Hızlı Boyutlar</label>
                    <div className="grid grid-cols-5 gap-2">
                      {brushSizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => {
                            setDrawingState(prev => ({ ...prev, size }));
                            setShowSizeInput(false);
                          }}
                          className={`p-3 rounded-lg border transition-all duration-300 hover:scale-110 flex items-center justify-center ${
                            drawingState.size === size
                              ? 'border-blue-500 ring-2 ring-blue-200 scale-110 bg-blue-50'
                              : 'border-gray-300 hover:border-gray-400 bg-white'
                          }`}
                          title={`${size}px`}
                        >
                          <div 
                            className="rounded-full bg-current"
                            style={{ 
                              width: `${Math.min(size + 2, 12)}px`, 
                              height: `${Math.min(size + 2, 12)}px` 
                            }}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-bold text-gray-700 mb-3 block">Özel Boyut (px)</label>
                    <input
                      type="number"
                      min="1"
                      max="100"
                      value={drawingState.size}
                      onChange={(e) => setDrawingState(prev => ({ 
                        ...prev, 
                        size: Math.max(1, Math.min(100, parseInt(e.target.value) || 1))
                      }))}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
                      placeholder="Boyut"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Opacity */}
        <div className="flex items-center gap-3">
          <span className="text-sm font-bold text-gray-700">Şeffaflık</span>
          <div className="relative">
            <input
              type="range"
              min="0.1"
              max="1"
              step="0.1"
              value={drawingState.opacity}
              onChange={(e) => setDrawingState(prev => ({ 
                ...prev, 
                opacity: parseFloat(e.target.value) 
              }))}
              className="w-24 h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full appearance-none cursor-pointer slider"
            />
            <div 
              className="absolute top-0 left-0 h-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full pointer-events-none transition-all duration-300"
              style={{ width: `${drawingState.opacity * 100}%` }}
            />
          </div>
          <span className="text-sm font-mono text-gray-600 min-w-[40px]">%{Math.round(drawingState.opacity * 100)}</span>
        </div>

      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden">
        {/* Main Tools Row */}
        <div className="flex items-center gap-2 mb-3 overflow-x-auto pb-2">
          {/* Action Buttons */}
          <div className="flex gap-2 border-r border-gray-200/70 pr-3">
            <button
              onClick={onUndo}
              disabled={!canUndo}
              className={`p-2.5 rounded-lg transition-all duration-300 ${
                canUndo 
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg' 
                  : 'bg-gray-100 text-gray-400'
              }`}
              title="Geri Al"
            >
              <span className="text-lg">↶</span>
            </button>
            
            <button
              onClick={onRedo}
              disabled={!canRedo}
              className={`p-2.5 rounded-lg transition-all duration-300 ${
                canRedo 
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg' 
                  : 'bg-gray-100 text-gray-400'
              }`}
              title="İleri Al"
            >
              <span className="text-lg">↷</span>
            </button>
            
            <button
              onClick={onFileUpload}
              className="p-2.5 rounded-lg bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-lg"
              title="Dosya"
            >
              <span className="text-lg">📁</span>
            </button>
            
            <button
              onClick={onClear}
              className="p-2.5 rounded-lg bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-lg"
              title="Temizle"
            >
              <span className="text-lg">🗑️</span>
            </button>
          </div>

          {/* Pan Tool */}
          <div className="flex gap-2 border-r border-gray-200/70 pr-3">
            <button
              onClick={onPanMode}
              className={`p-2.5 rounded-lg transition-all duration-300 ${
                isPanning
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                  : 'bg-white/60 text-gray-700 border border-gray-200/50'
              }`}
              title="Taşı"
            >
              <span className="text-lg">✋</span>
            </button>
          </div>

          {/* Tool Selector */}
          <div className="flex gap-2 border-r border-gray-200/70 pr-3">
            <div className="relative">
              <button
                onClick={() => setShowToolSelect(!showToolSelect)}
                className="flex items-center gap-2 p-2.5 bg-white/60 rounded-lg border border-gray-200/50"
                title="Araç"
              >
                <span className="text-lg">{currentTool?.icon}</span>
                <span className="text-xs text-gray-600">{showToolSelect ? '▲' : '▼'}</span>
              </button>
              
              {showToolSelect && (
                <div className="absolute top-full left-0 mt-2 p-3 bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl border border-white/50 z-30 min-w-[200px]">
                  <div className="space-y-3">
                    {/* Selection */}
                    <div>
                      <label className="text-xs font-bold text-gray-700 mb-2 block">Seçim</label>
                      <div className="grid grid-cols-1 gap-1">
                        {groupedTools.selection.map((tool) => (
                          <button
                            key={tool.id}
                            onClick={() => {
                              setDrawingState(prev => ({ ...prev, tool: tool.id }));
                              setShowToolSelect(false);
                            }}
                            className={`p-2 rounded border transition-all duration-300 flex items-center gap-2 ${
                              drawingState.tool === tool.id
                                ? 'border-blue-500 bg-blue-50 text-blue-700'
                                : 'border-gray-300 hover:border-gray-400 bg-white'
                            }`}
                          >
                            <span className="text-sm">{tool.icon}</span>
                            <span className="text-xs font-medium">{tool.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Drawing */}
                    <div>
                      <label className="text-xs font-bold text-gray-700 mb-2 block">Çizim</label>
                      <div className="grid grid-cols-2 gap-1">
                        {groupedTools.drawing.map((tool) => (
                          <button
                            key={tool.id}
                            onClick={() => {
                              setDrawingState(prev => ({ ...prev, tool: tool.id }));
                              setShowToolSelect(false);
                            }}
                            className={`p-2 rounded border transition-all duration-300 flex items-center gap-1 ${
                              drawingState.tool === tool.id
                                ? 'border-blue-500 bg-blue-50 text-blue-700'
                                : 'border-gray-300 hover:border-gray-400 bg-white'
                            }`}
                          >
                            <span className="text-sm">{tool.icon}</span>
                            <span className="text-xs font-medium">{tool.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Shapes */}
                    <div>
                      <label className="text-xs font-bold text-gray-700 mb-2 block">Şekiller</label>
                      <div className="grid grid-cols-3 gap-1">
                        {groupedTools.shapes.map((tool) => (
                          <button
                            key={tool.id}
                            onClick={() => {
                              setDrawingState(prev => ({ ...prev, tool: tool.id }));
                              setShowToolSelect(false);
                            }}
                            className={`p-2 rounded border transition-all duration-300 flex items-center gap-1 ${
                              drawingState.tool === tool.id
                                ? 'border-blue-500 bg-blue-50 text-blue-700'
                                : 'border-gray-300 hover:border-gray-400 bg-white'
                            }`}
                          >
                            <span className="text-sm">{tool.icon}</span>
                            <span className="text-xs font-medium">{tool.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Other */}
                    <div>
                      <label className="text-xs font-bold text-gray-700 mb-2 block">Diğer</label>
                      <div className="grid grid-cols-1 gap-1">
                        {groupedTools.other.map((tool) => (
                          <button
                            key={tool.id}
                            onClick={() => {
                              setDrawingState(prev => ({ ...prev, tool: tool.id }));
                              setShowToolSelect(false);
                            }}
                            className={`p-2 rounded border transition-all duration-300 flex items-center gap-2 ${
                              drawingState.tool === tool.id
                                ? 'border-blue-500 bg-blue-50 text-blue-700'
                                : 'border-gray-300 hover:border-gray-400 bg-white'
                            }`}
                          >
                            <span className="text-sm">{tool.icon}</span>
                            <span className="text-xs font-medium">{tool.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Settings Row */}
        <div className="flex items-center gap-3">
          {/* Color */}
          <div className="relative">
            <button
              onClick={() => setShowColorPicker(!showColorPicker)}
              className="flex items-center gap-2 p-2.5 bg-white/60 rounded-lg border border-gray-200/50"
              title="Renk"
            >
              <div 
                className="w-6 h-6 rounded border-2 border-white shadow-lg"
                style={{ backgroundColor: drawingState.color }}
              />
              <span className="text-xs text-gray-600">{showColorPicker ? '▲' : '▼'}</span>
            </button>
            
            {showColorPicker && (
              <div className="absolute top-full left-0 mt-2 p-3 bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl border border-white/50 z-30 min-w-[200px]">
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-bold text-gray-700 mb-2 block">Hızlı Renkler</label>
                    <div className="grid grid-cols-7 gap-1">
                      {quickColors.map((color) => (
                        <button
                          key={color}
                          onClick={() => {
                            setDrawingState(prev => ({ ...prev, color }));
                            setShowColorPicker(false);
                          }}
                          className={`w-6 h-6 rounded border transition-all duration-300 hover:scale-110 ${
                            drawingState.color === color
                              ? 'border-blue-500 ring-2 ring-blue-200 scale-110'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-xs font-bold text-gray-700 mb-2 block">Özel Renk</label>
                    <input
                      type="color"
                      value={drawingState.color}
                      onChange={(e) => setDrawingState(prev => ({ ...prev, color: e.target.value }))}
                      className="w-full h-8 rounded border-2 border-gray-300 cursor-pointer bg-white"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Size */}
          <div className="relative">
            <button
              onClick={() => setShowSizeInput(!showSizeInput)}
              className="flex items-center gap-2 p-2.5 bg-white/60 rounded-lg border border-gray-200/50"
              title="Boyut"
            >
              <div 
                className="rounded-full bg-current"
                style={{ 
                  width: `${Math.min(drawingState.size + 2, 12)}px`, 
                  height: `${Math.min(drawingState.size + 2, 12)}px` 
                }}
              />
              <span className="text-xs font-bold text-gray-600">{drawingState.size}px</span>
              <span className="text-xs text-gray-600">{showSizeInput ? '▲' : '▼'}</span>
            </button>
            
            {showSizeInput && (
              <div className="absolute top-full left-0 mt-2 p-3 bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl border border-white/50 z-30 min-w-[180px]">
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-bold text-gray-700 mb-2 block">Hızlı Boyutlar</label>
                    <div className="grid grid-cols-5 gap-1">
                      {brushSizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => {
                            setDrawingState(prev => ({ ...prev, size }));
                            setShowSizeInput(false);
                          }}
                          className={`p-2 rounded border transition-all duration-300 hover:scale-110 flex items-center justify-center ${
                            drawingState.size === size
                              ? 'border-blue-500 ring-2 ring-blue-200 scale-110 bg-blue-50'
                              : 'border-gray-300 hover:border-gray-400 bg-white'
                          }`}
                          title={`${size}px`}
                        >
                          <div 
                            className="rounded-full bg-current"
                            style={{ 
                              width: `${Math.min(size + 2, 12)}px`, 
                              height: `${Math.min(size + 2, 12)}px` 
                            }}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-xs font-bold text-gray-700 mb-2 block">Özel Boyut (px)</label>
                    <input
                      type="number"
                      min="1"
                      max="100"
                      value={drawingState.size}
                      onChange={(e) => setDrawingState(prev => ({ 
                        ...prev, 
                        size: Math.max(1, Math.min(100, parseInt(e.target.value) || 1))
                      }))}
                      className="w-full px-2 py-1 text-sm rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
                      placeholder="Boyut"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Opacity */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gray-600">%{Math.round(drawingState.opacity * 100)}</span>
            <div className="relative">
              <input
                type="range"
                min="0.1"
                max="1"
                step="0.1"
                value={drawingState.opacity}
                onChange={(e) => setDrawingState(prev => ({ 
                  ...prev, 
                  opacity: parseFloat(e.target.value) 
                }))}
                className="w-16 h-2 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full appearance-none cursor-pointer slider"
              />
              <div 
                className="absolute top-0 left-0 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full pointer-events-none transition-all duration-300"
                style={{ width: `${drawingState.opacity * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Click outside to close dropdowns */}
      {(showColorPicker || showSizeInput || showToolSelect) && (
        <div 
          className="fixed inset-0 z-10" 
          onClick={() => {
            setShowColorPicker(false);
            setShowSizeInput(false);
            setShowToolSelect(false);
          }}
        />
      )}
    </div>
  );
} 