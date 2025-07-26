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
  // Yapışkan not düzenleme alanı kaldırıldı
  return null;
} 