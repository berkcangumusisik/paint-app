'use client';

import React, { useState, useRef, useEffect } from 'react';

interface TextToolProps {
  isActive: boolean;
  color: string;
  size: number;
  onTextAdd: (text: string, x: number, y: number, color: string, size: number) => void;
  onCancel: () => void;
}

export default function TextTool({ isActive, color, size, onTextAdd, onCancel }: TextToolProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState('');
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (!isActive) return;
    
    const rect = (e.target as HTMLCanvasElement).getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setIsEditing(true);
    setText('');
  };

  const handleSubmit = () => {
    if (text.trim()) {
      onTextAdd(text, position.x, position.y, color, size);
    }
    setIsEditing(false);
    setText('');
    onCancel();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setText('');
      onCancel();
    }
  };

  if (!isActive) return null;

  return (
    <>
      {isEditing && (
        <input
          ref={inputRef}
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyPress}
          onBlur={handleSubmit}
          className="absolute border-2 border-blue-500 rounded px-2 py-1 bg-white shadow-lg z-20"
          style={{
            left: position.x,
            top: position.y,
            color: color,
            fontSize: `${size + 10}px`,
            minWidth: '100px'
          }}
          placeholder="Type text..."
        />
      )}
    </>
  );
} 