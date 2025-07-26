'use client';

import React from 'react';

interface CanvasControlsProps {
  zoom: number;
  onZoomChange: (zoom: number) => void;
  onResetView: () => void;
  onZoomToFit: () => void;
}

export default function CanvasControls({ zoom, onZoomChange, onResetView, onZoomToFit }: CanvasControlsProps) {
  
  const zoomIn = () => {
    const newZoom = Math.min(zoom * 1.2, 5);
    onZoomChange(newZoom);
  };

  const zoomOut = () => {
    const newZoom = Math.max(zoom / 1.2, 0.1);
    onZoomChange(newZoom);
  };

  const zoomToFit = () => {
    onZoomChange(1);
  };

  const saveCanvas = () => {
    const canvas = document.querySelector('canvas');
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = `beyaz-tahta-${new Date().toISOString().slice(0, 10)}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="absolute bottom-4 right-4 z-10 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 p-2">
      <div className="flex flex-col gap-1">
        
        {/* Zoom Controls */}
        <div className="flex flex-col gap-1">
          <button
            onClick={zoomIn}
            className="p-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-all duration-200 text-gray-700 flex items-center justify-center text-sm"
            title="Yakınlaştır"
          >
            🔍+
          </button>
          
          <div className="px-2 py-1 text-xs font-mono text-center text-gray-600 bg-gray-50 rounded min-w-[50px]">
            %{Math.round(zoom * 100)}
          </div>
          
          <button
            onClick={zoomOut}
            className="p-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-all duration-200 text-gray-700 flex items-center justify-center text-sm"
            title="Uzaklaştır"
          >
            🔍-
          </button>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-200"></div>

        {/* View Controls */}
        <div className="flex flex-col gap-1">
          <button
            onClick={zoomToFit}
            className="p-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-all duration-200 text-gray-700 flex items-center justify-center text-sm"
            title="Normal Boyut (%100)"
          >
            🎯
          </button>
          
          <button
            onClick={onZoomToFit}
            className="p-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-all duration-200 text-gray-700 flex items-center justify-center text-sm"
            title="İçeriğe Sığdır"
          >
            📐
          </button>
          
          <button
            onClick={onResetView}
            className="p-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-all duration-200 text-gray-700 flex items-center justify-center text-sm"
            title="Görünümü Sıfırla"
          >
            🏠
          </button>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-200"></div>

        {/* Export Controls */}
        <div className="flex flex-col gap-1">
          <button
            onClick={saveCanvas}
            className="p-2 bg-blue-100 hover:bg-blue-200 rounded-md transition-all duration-200 text-blue-700 flex items-center justify-center text-sm"
            title="PNG Olarak Kaydet"
          >
            💾
          </button>
        </div>

      </div>
    </div>
  );
} 