'use client';

import { useEffect } from 'react';

interface KeyboardShortcutsProps {
  onUndo: () => void;
  onRedo: () => void;
  onClear: () => void;
  onResetView: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

export default function KeyboardShortcuts({
  onUndo,
  onRedo,
  onClear,
  onResetView,
  canUndo,
  canRedo
}: KeyboardShortcutsProps) {
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent shortcuts when typing in input fields
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (e.ctrlKey || e.metaKey) {
        switch (e.key.toLowerCase()) {
          case 'z':
            e.preventDefault();
            if (e.shiftKey && canRedo) {
              onRedo();
            } else if (canUndo) {
              onUndo();
            }
            break;
          case 'y':
            e.preventDefault();
            if (canRedo) {
              onRedo();
            }
            break;
          case 'delete':
            e.preventDefault();
            if (confirm('Tüm çizimleri silmek istediğinizden emin misiniz?')) {
              onClear();
            }
            break;
          case 's':
            e.preventDefault();
            // Save canvas
            const canvas = document.querySelector('canvas');
            if (canvas) {
              const link = document.createElement('a');
              link.download = `beyaz-tahta-${new Date().toISOString().slice(0, 10)}.png`;
              link.href = canvas.toDataURL();
              link.click();
            }
            break;
        }
      } else {
        switch (e.key) {
          case 'Home':
            e.preventDefault();
            onResetView();
            break;
          case 'Escape':
            e.preventDefault();
            // Clear any active selections or modes
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onUndo, onRedo, onClear, onResetView, canUndo, canRedo]);

  return null; // This component doesn't render anything
} 