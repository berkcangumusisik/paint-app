'use client';

import React, { useState } from 'react';

interface StickyNote {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  text: string;
  color: string;
  fontSize: number;
}

interface StickyNotesProps {
  notes: StickyNote[];
  selectedNote: string | null;
  onNotesChange: (notes: StickyNote[]) => void;
  onSelectNote: (id: string | null) => void;
}

export default function StickyNotes({ notes, selectedNote, onNotesChange, onSelectNote }: StickyNotesProps) {
  const [isEditMode, setIsEditMode] = useState(false);

  const noteColors = [
    '#ffd700', // Sarı
    '#ffb3ba', // Pembe
    '#baffc9', // Yeşil
    '#bae1ff', // Mavi
    '#ffffba', // Açık sarı
    '#ffdfba', // Turuncu
    '#e0bbff', // Mor
    '#ffcccb'  // Açık kırmızı
  ];

  const updateNote = (id: string, updates: Partial<StickyNote>) => {
    onNotesChange(notes.map(note => 
      note.id === id ? { ...note, ...updates } : note
    ));
  };

  const deleteNote = (id: string) => {
    onNotesChange(notes.filter(note => note.id !== id));
    onSelectNote(null);
  };

  const selectedNoteData = notes.find(note => note.id === selectedNote);

  if (!selectedNote || !selectedNoteData) {
    return (
      <div className="absolute top-32 right-4 z-15 bg-gradient-to-br from-white/95 via-white/98 to-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/50 p-4 w-72">
        <div className="text-center text-gray-500">
          <div className="text-4xl mb-3 animate-bounce">📝</div>
          <div className="text-sm font-medium">Yapışkan not düzenlemek için</div>
          <div className="text-sm text-gray-400">bir not seçin</div>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute top-32 right-4 z-15 bg-gradient-to-br from-white/95 via-white/98 to-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/50 p-4 w-72">
      <div className="space-y-4">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200/50 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">📝</span>
            <h3 className="font-bold text-gray-800 text-lg">Yapışkan Not</h3>
          </div>
          <button
            onClick={() => deleteNote(selectedNote)}
            className="group p-2 text-red-500 hover:bg-red-50 rounded-xl transition-all duration-300 hover:scale-110 transform"
            title="Notu Sil"
          >
            <span className="text-lg group-hover:animate-pulse">🗑️</span>
          </button>
        </div>

        {/* Text Editor */}
        <div className="space-y-3">
          <label className="text-sm font-bold text-gray-700 uppercase tracking-wide flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            Metin
          </label>
          <textarea
            value={selectedNoteData.text}
            onChange={(e) => updateNote(selectedNote, { text: e.target.value })}
            className="w-full p-3 border-2 border-gray-200 hover:border-blue-300 focus:border-blue-500 rounded-xl text-sm resize-none transition-all duration-300 bg-white text-gray-800 shadow-inner"
            rows={4}
            placeholder="Not metninizi yazın..."
          />
        </div>

        {/* Color Picker */}
        <div className="space-y-3">
          <label className="text-sm font-bold text-gray-700 uppercase tracking-wide flex items-center gap-2">
            <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
            Renk
          </label>
          <div className="grid grid-cols-4 gap-2">
            {noteColors.map((color) => (
              <button
                key={color}
                onClick={() => updateNote(selectedNote, { color })}
                className={`group relative w-14 h-10 rounded-xl border-2 transition-all duration-300 hover:scale-110 transform hover:-translate-y-0.5 hover:shadow-lg ${
                  selectedNoteData.color === color
                    ? 'border-gray-600 ring-2 ring-blue-200 shadow-lg scale-105'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                style={{ backgroundColor: color }}
                title={color}
              >
                {selectedNoteData.color === color && (
                  <div className="absolute inset-0 rounded-xl bg-black/10 flex items-center justify-center">
                    <span className="text-white text-lg drop-shadow-lg">✓</span>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Font Size */}
        <div className="space-y-3">
          <label className="text-sm font-bold text-gray-700 uppercase tracking-wide flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            Yazı Boyutu: {selectedNoteData.fontSize}px
          </label>
          <div className="relative">
            <input
              type="range"
              min="10"
              max="24"
              value={selectedNoteData.fontSize}
              onChange={(e) => updateNote(selectedNote, { fontSize: parseInt(e.target.value) })}
              className="w-full h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full appearance-none cursor-pointer slider shadow-inner"
            />
            <div 
              className="absolute top-0 left-0 h-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full pointer-events-none transition-all duration-300"
              style={{ width: `${((selectedNoteData.fontSize - 10) / 14) * 100}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <span>10px</span>
            <span className="font-bold text-green-600">{selectedNoteData.fontSize}px</span>
            <span>24px</span>
          </div>
        </div>

        {/* Size Controls */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
              <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
              Genişlik
            </label>
            <input
              type="number"
              value={selectedNoteData.width}
              onChange={(e) => updateNote(selectedNote, { width: parseInt(e.target.value) })}
              className="w-full p-2 border-2 border-gray-200 hover:border-orange-300 focus:border-orange-500 rounded-lg text-sm transition-all duration-300 bg-white text-gray-800"
              min="100"
              max="400"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
              <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
              Yükseklik
            </label>
            <input
              type="number"
              value={selectedNoteData.height}
              onChange={(e) => updateNote(selectedNote, { height: parseInt(e.target.value) })}
              className="w-full p-2 border-2 border-gray-200 hover:border-orange-300 focus:border-orange-500 rounded-lg text-sm transition-all duration-300 bg-white text-gray-800"
              min="100"
              max="400"
            />
          </div>
        </div>

        {/* Position Controls */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
              <span className="w-2 h-2 bg-cyan-500 rounded-full"></span>
              X Pozisyon
            </label>
            <input
              type="number"
              value={Math.round(selectedNoteData.x)}
              onChange={(e) => updateNote(selectedNote, { x: parseInt(e.target.value) })}
              className="w-full p-2 border-2 border-gray-200 hover:border-cyan-300 focus:border-cyan-500 rounded-lg text-sm transition-all duration-300 bg-white text-gray-800"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
              <span className="w-2 h-2 bg-cyan-500 rounded-full"></span>
              Y Pozisyon
            </label>
            <input
              type="number"
              value={Math.round(selectedNoteData.y)}
              onChange={(e) => updateNote(selectedNote, { y: parseInt(e.target.value) })}
              className="w-full p-2 border-2 border-gray-200 hover:border-cyan-300 focus:border-cyan-500 rounded-lg text-sm transition-all duration-300 bg-white text-gray-800"
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-3 pt-3 border-t border-gray-200/50">
          <button
            onClick={() => onSelectNote(null)}
            className="flex-1 p-3 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white rounded-xl font-medium transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg"
          >
            Seçimi Kaldır
          </button>
        </div>

      </div>
    </div>
  );
} 