'use client';

import React, { useCallback } from 'react';

interface MediaUploaderProps {
  onFileUpload: (files: FileList) => void;
}

export default function MediaUploader({ onFileUpload }: MediaUploaderProps) {
  
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      onFileUpload(files);
    }
  }, [onFileUpload]);

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className="absolute inset-0 pointer-events-none"
    >
      {/* Drag overlay will appear when dragging files */}
      <div className="hidden drag-over:flex absolute inset-0 bg-blue-500/20 backdrop-blur-sm z-50 items-center justify-center">
        <div className="bg-white rounded-2xl shadow-2xl p-8 border-2 border-dashed border-blue-500 text-center">
          <div className="text-6xl mb-4">📁</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Dosyaları Buraya Bırakın</h2>
          <p className="text-gray-600">Resim ve PDF dosyalarını destekliyoruz</p>
          <div className="mt-4 text-sm text-gray-500">
            <div>Desteklenen formatlar:</div>
            <div>JPG, PNG, GIF, PDF</div>
          </div>
        </div>
      </div>
    </div>
  );
} 