'use client';

import React, { useState, useRef, useEffect } from 'react';
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
  onBackgroundColorChange?: (color: string) => void;
  backgroundColor?: string;
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
  isPanning = false,
  onBackgroundColorChange,
  backgroundColor = '#ffffff'
}: ToolbarProps) {
  
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showSizeInput, setShowSizeInput] = useState(false);
  const [showToolSelect, setShowToolSelect] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 16, y: 16 });
  const [isMinimized, setIsMinimized] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [dropdownPosition, setDropdownPosition] = useState({ x: 0, y: 0 });
  const toolbarRef = useRef<HTMLDivElement>(null);

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

  // Calculate dropdown position based on button position
  const calculateDropdownPosition = (buttonRef: HTMLElement) => {
    const rect = buttonRef.getBoundingClientRect();
    return {
      x: rect.left,
      y: rect.bottom + 8
    };
  };

  // Dragging functionality
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget || (e.target as HTMLElement).closest('[data-drag-handle]')) {
      setIsDragging(true);
      const rect = toolbarRef.current?.getBoundingClientRect();
      if (rect) {
        setDragOffset({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;
      
      // Keep toolbar within viewport bounds
      const maxX = window.innerWidth - (toolbarRef.current?.offsetWidth || 400);
      const maxY = window.innerHeight - (toolbarRef.current?.offsetHeight || 100);
      
      setPosition({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY))
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragOffset]);

  if (isMinimized) {
    return (
      <div
        ref={toolbarRef}
        style={{
          position: 'absolute',
          left: position.x,
          top: position.y,
          zIndex: 20,
          cursor: isDragging ? 'grabbing' : 'grab'
        }}
        onMouseDown={handleMouseDown}
        data-drag-handle
        className="bg-gradient-to-r from-white/95 via-white/98 to-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/50 p-2"
      >
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMinimized(false)}
            className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-300"
            title="Toolbar'ı Aç"
          >
            <span className="text-lg">🔧</span>
          </button>
          <div className="text-sm font-medium text-gray-700">
            {currentTool?.icon} {currentTool?.label}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={toolbarRef}
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        zIndex: 20,
        cursor: isDragging ? 'grabbing' : 'default'
      }}
      className="bg-gradient-to-r from-white/95 via-white/98 to-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/50"
    >
      {/* Single Row Layout - All Screen Sizes */}
      <div 
        className="p-3 cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        data-drag-handle
      >
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
          
          {/* Minimize Button - Same Row */}
          <button
            onClick={() => setIsMinimized(true)}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-300 flex-shrink-0"
            title="Küçült"
          >
            <span className="text-sm">➖</span>
          </button>

          {/* Action Buttons Group */}
          <div className="flex gap-1 border-r border-gray-200/70 pr-2 flex-shrink-0">
            <button
              onClick={onUndo}
              disabled={!canUndo}
              className={`p-2 rounded-lg transition-all duration-300 ${
                canUndo 
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-lg' 
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
              title="Geri Al"
            >
              <span className="text-sm">↶</span>
            </button>
            
            <button
              onClick={onRedo}
              disabled={!canRedo}
              className={`p-2 rounded-lg transition-all duration-300 ${
                canRedo 
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg' 
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
              title="İleri Al"
            >
              <span className="text-sm">↷</span>
            </button>
            
            <button
              onClick={onFileUpload}
              className="p-2 rounded-lg bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white shadow-lg"
              title="Dosya"
            >
              <span className="text-sm">📁</span>
            </button>
            
            <button
              onClick={onClear}
              className="p-2 rounded-lg bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white shadow-lg"
              title="Temizle"
            >
              <span className="text-sm">🗑️</span>
            </button>
          </div>

          {/* Pan/Scroll Tool */}
          <div className="flex gap-1 border-r border-gray-200/70 pr-2 flex-shrink-0">
            <button
              onClick={onPanMode}
              className={`p-2 rounded-lg transition-all duration-300 ${
                isPanning
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                  : 'bg-white/60 hover:bg-white/80 text-gray-700 border border-gray-200/50'
              }`}
              title="Taşı"
            >
              <span className="text-sm">✋</span>
            </button>
          </div>

          {/* Tool Selector */}
          <div className="flex gap-1 border-r border-gray-200/70 pr-2 flex-shrink-0">
            <div className="relative">
              <button
                onClick={(e) => {
                  const pos = calculateDropdownPosition(e.currentTarget);
                  setDropdownPosition(pos);
                  setShowToolSelect(!showToolSelect);
                }}
                onTouchStart={(e) => e.preventDefault()}
                onTouchEnd={(e) => {
                  e.preventDefault();
                  const pos = calculateDropdownPosition(e.currentTarget);
                  setDropdownPosition(pos);
                  setShowToolSelect(!showToolSelect);
                }}
                className="flex items-center gap-2 p-2 bg-white/60 hover:bg-white/80 rounded-lg border border-gray-200/50 transition-all duration-300 touch-manipulation"
                title="Araç"
              >
                <span className="text-sm">{currentTool?.icon}</span>
                <span className="text-xs text-gray-600">{showToolSelect ? '▲' : '▼'}</span>
              </button>
              
              {showToolSelect && (
                <div 
                  className="fixed p-4 bg-white rounded-xl shadow-2xl border border-gray-300 z-[9999] min-w-[200px] max-w-[300px]"
                  style={{
                    left: `${dropdownPosition.x}px`,
                    top: `${dropdownPosition.y}px`
                  }}
                >
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
                            onTouchStart={(e) => e.preventDefault()}
                            onTouchEnd={(e) => {
                              e.preventDefault();
                              setDrawingState(prev => ({ ...prev, tool: tool.id }));
                              setShowToolSelect(false);
                            }}
                            className={`p-2 rounded-lg transition-all duration-300 flex items-center gap-2 touch-manipulation ${
                              drawingState.tool === tool.id
                                ? `bg-gradient-to-r ${tool.gradient} text-white shadow-lg`
                                : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-200'
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
                            onTouchStart={(e) => e.preventDefault()}
                            onTouchEnd={(e) => {
                              e.preventDefault();
                              setDrawingState(prev => ({ ...prev, tool: tool.id }));
                              setShowToolSelect(false);
                            }}
                            className={`p-2 rounded-lg transition-all duration-300 flex items-center gap-1 touch-manipulation ${
                              drawingState.tool === tool.id
                                ? `bg-gradient-to-r ${tool.gradient} text-white shadow-lg`
                                : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-200'
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
                            onTouchStart={(e) => e.preventDefault()}
                            onTouchEnd={(e) => {
                              e.preventDefault();
                              setDrawingState(prev => ({ ...prev, tool: tool.id }));
                              setShowToolSelect(false);
                            }}
                            className={`p-2 rounded-lg transition-all duration-300 flex items-center gap-1 touch-manipulation ${
                              drawingState.tool === tool.id
                                ? `bg-gradient-to-r ${tool.gradient} text-white shadow-lg`
                                : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-200'
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
                            onTouchStart={(e) => e.preventDefault()}
                            onTouchEnd={(e) => {
                              e.preventDefault();
                              setDrawingState(prev => ({ ...prev, tool: tool.id }));
                              setShowToolSelect(false);
                            }}
                            className={`p-2 rounded-lg transition-all duration-300 flex items-center gap-2 touch-manipulation ${
                              drawingState.tool === tool.id
                                ? `bg-gradient-to-r ${tool.gradient} text-white shadow-lg`
                                : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-200'
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

          {/* Color Selection */}
          <div className="flex gap-1 border-r border-gray-200/70 pr-2 flex-shrink-0">
            <div className="relative">
              <button
                onClick={(e) => {
                  const pos = calculateDropdownPosition(e.currentTarget);
                  setDropdownPosition(pos);
                  setShowColorPicker(!showColorPicker);
                }}
                onTouchStart={(e) => e.preventDefault()}
                onTouchEnd={(e) => {
                  e.preventDefault();
                  const pos = calculateDropdownPosition(e.currentTarget);
                  setDropdownPosition(pos);
                  setShowColorPicker(!showColorPicker);
                }}
                className="flex items-center gap-2 p-2 bg-white/60 hover:bg-white/80 rounded-lg border border-gray-200/50 transition-all duration-300 touch-manipulation"
                title="Renk"
              >
                <div 
                  className="w-5 h-5 rounded border-2 border-white shadow"
                  style={{ backgroundColor: drawingState.color }}
                />
                <span className="text-xs text-gray-600">{showColorPicker ? '▲' : '▼'}</span>
              </button>
              
              {showColorPicker && (
                <div 
                  className="fixed p-4 bg-white rounded-xl shadow-2xl border border-gray-300 z-[9999] min-w-[180px] max-w-[250px]"
                  style={{
                    left: `${dropdownPosition.x}px`,
                    top: `${dropdownPosition.y}px`
                  }}
                >
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs font-bold text-gray-700 mb-2 block">Hızlı Renkler</label>
                      <div className="grid grid-cols-6 gap-1">
                        {quickColors.map((color) => (
                          <button
                            key={color}
                            onClick={() => {
                              setDrawingState(prev => ({ ...prev, color }));
                              setShowColorPicker(false);
                            }}
                            onTouchStart={(e) => e.preventDefault()}
                            onTouchEnd={(e) => {
                              e.preventDefault();
                              setDrawingState(prev => ({ ...prev, color }));
                              setShowColorPicker(false);
                            }}
                            className={`w-5 h-5 rounded border-2 transition-all duration-300 hover:scale-110 touch-manipulation ${
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
                        onChange={(e) => {
                          setDrawingState(prev => ({ ...prev, color: e.target.value }));
                        }}
                        className="w-full h-8 rounded border-2 border-gray-300 cursor-pointer bg-white"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Brush Size */}
          <div className="flex gap-1 border-r border-gray-200/70 pr-2 flex-shrink-0">
            <div className="relative">
              <button
                onClick={(e) => {
                  const pos = calculateDropdownPosition(e.currentTarget);
                  setDropdownPosition(pos);
                  setShowSizeInput(!showSizeInput);
                }}
                onTouchStart={(e) => e.preventDefault()}
                onTouchEnd={(e) => {
                  e.preventDefault();
                  const pos = calculateDropdownPosition(e.currentTarget);
                  setDropdownPosition(pos);
                  setShowSizeInput(!showSizeInput);
                }}
                className="flex items-center gap-2 p-2 bg-white/60 hover:bg-white/80 rounded-lg border border-gray-200/50 transition-all duration-300 touch-manipulation"
                title="Boyut"
              >
                <div className="w-5 h-5 rounded-full bg-gray-300 flex items-center justify-center">
                  <div 
                    className="rounded-full bg-gray-600"
                    style={{ 
                      width: Math.max(2, drawingState.size / 3), 
                      height: Math.max(2, drawingState.size / 3) 
                    }}
                  />
                </div>
                <span className="text-xs text-gray-600">{showSizeInput ? '▲' : '▼'}</span>
              </button>
              
              {showSizeInput && (
                <div 
                  className="fixed p-4 bg-white rounded-xl shadow-2xl border border-gray-300 z-[9999] min-w-[150px] max-w-[200px]"
                  style={{
                    left: `${dropdownPosition.x}px`,
                    top: `${dropdownPosition.y}px`
                  }}
                >
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs font-bold text-gray-700 mb-2 block">Hızlı Boyutlar</label>
                      <div className="grid grid-cols-2 gap-1">
                        {brushSizes.slice(0, 6).map((size) => (
                          <button
                            key={size}
                            onClick={() => {
                              setDrawingState(prev => ({ ...prev, size }));
                              setShowSizeInput(false);
                            }}
                            onTouchStart={(e) => e.preventDefault()}
                            onTouchEnd={(e) => {
                              e.preventDefault();
                              setDrawingState(prev => ({ ...prev, size }));
                              setShowSizeInput(false);
                            }}
                            className={`p-2 rounded-lg transition-all duration-300 flex items-center justify-center touch-manipulation ${
                              drawingState.size === size
                                ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                                : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-200'
                            }`}
                          >
                            <div 
                              className="rounded-full bg-current"
                              style={{ 
                                width: Math.max(2, size / 3), 
                                height: Math.max(2, size / 3) 
                              }}
                            />
                            <span className="ml-1 text-xs font-medium">{size}px</span>
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-xs font-bold text-gray-700 mb-2 block">Özel Boyut</label>
                      <input
                        type="number"
                        min="1"
                        max="100"
                        value={drawingState.size}
                        onChange={(e) => {
                          setDrawingState(prev => ({ 
                            ...prev, 
                            size: Math.max(1, Math.min(100, parseInt(e.target.value) || 1))
                          }));
                        }}
                        className="w-full px-2 py-1 text-sm rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
                        placeholder="Boyut"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Opacity */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="text-xs font-bold text-gray-700">Op</span>
            <div className="relative w-16">
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={drawingState.opacity}
                onChange={(e) => {
                  setDrawingState(prev => ({ 
                    ...prev, 
                    opacity: parseFloat(e.target.value) 
                  }));
                }}
                className="w-16 h-2 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full appearance-none cursor-pointer slider"
              />
              <div 
                className="absolute top-0 left-0 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full pointer-events-none transition-all duration-300"
                style={{ width: `${drawingState.opacity * 100}%` }}
              />
            </div>
            <span className="text-xs font-mono text-gray-600">%{Math.round(drawingState.opacity * 100)}</span>
          </div>

        </div>
      </div>

      {/* Click outside to close dropdowns */}
      {(showColorPicker || showSizeInput || showToolSelect) && (
        <div 
          className="fixed inset-0 z-[9998]" 
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