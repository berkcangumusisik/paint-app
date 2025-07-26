'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import Toolbar from './Toolbar';
import CanvasControls from './CanvasControls';
import WelcomeScreen from './WelcomeScreen';
import KeyboardShortcuts from './KeyboardShortcuts';
import StickyNotes from './StickyNotes';
import MediaUploader from './MediaUploader';
import { ShapeData, drawShape, isShapeTool } from './ShapeDrawing';

export type Tool = 'kalem' | 'kurşun' | 'marker' | 'silgi' | 'dikdörtgen' | 'daire' | 'ok' | 'çizgi' | 'yazı' | 'seç' | 'yapışkan-not' | 'üçgen' | 'yıldız' | 'kalp' | 'elips';

export interface DrawingState {
  tool: Tool;
  color: string;
  size: number;
  opacity: number;
}

interface Point {
  x: number;
  y: number;
}

interface DrawingPath {
  tool: Tool;
  color: string;
  size: number;
  opacity: number;
  points: Point[];
}

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

interface MediaElement {
  id: string;
  type: 'image' | 'pdf';
  x: number;
  y: number;
  width: number;
  height: number;
  data: string; // base64 data
  name: string;
}

type DrawingElement = DrawingPath | ShapeData | StickyNote | MediaElement;

export default function Whiteboard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentPath, setCurrentPath] = useState<Point[]>([]);
  const [currentShape, setCurrentShape] = useState<ShapeData | null>(null);
  const [elements, setElements] = useState<DrawingElement[]>([]);
  const [undoStack, setUndoStack] = useState<DrawingElement[][]>([]);
  const [redoStack, setRedoStack] = useState<DrawingElement[][]>([]);
  
  const [drawingState, setDrawingState] = useState<DrawingState>({
    tool: 'kalem',
    color: '#000000',
    size: 3,
    opacity: 1
  });

  const [zoom, setZoom] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [lastPanPoint, setLastPanPoint] = useState<Point>({ x: 0, y: 0 });
  const [showGrid, setShowGrid] = useState(true);
  const [showWelcome, setShowWelcome] = useState(true);
  const [stickyNotes, setStickyNotes] = useState<StickyNote[]>([]);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [isPanMode, setIsPanMode] = useState(false);

  // Canvas setup
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      redrawCanvas();
    };

    // Mouse pozisyonuna göre zoom
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      // Zoom öncesi dünya koordinatları
      const worldX = (mouseX - panOffset.x * zoom) / zoom;
      const worldY = (mouseY - panOffset.y * zoom) / zoom;

      const delta = e.deltaY > 0 ? 0.9 : 1.1;
      const newZoom = Math.min(Math.max(zoom * delta, 0.1), 5);

      // Zoom sonrası dünya koordinatları aynı kalacak şekilde pan ayarla
      const newPanX = (mouseX - worldX * newZoom) / newZoom;
      const newPanY = (mouseY - worldY * newZoom) / newZoom;

      setZoom(newZoom);
      setPanOffset({ x: newPanX, y: newPanY });
    };

    canvas.addEventListener('wheel', handleWheel, { passive: false });
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    return () => {
      canvas.removeEventListener('wheel', handleWheel);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [zoom, panOffset]);

  const redrawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Apply transformations
    ctx.save();
    ctx.scale(zoom, zoom);
    ctx.translate(panOffset.x, panOffset.y);

    // Draw grid
    if (showGrid) {
      drawGrid(ctx, canvas.width / zoom, canvas.height / zoom);
    }

    // Draw all elements
    elements.forEach(element => {
      if ('points' in element && Array.isArray(element.points)) {
        // Drawing path
        if (element.points.length < 2) return;
        
        ctx.globalAlpha = element.opacity;
        ctx.strokeStyle = element.color;
        ctx.lineWidth = element.size;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        if (element.tool === 'silgi') {
          ctx.globalCompositeOperation = 'destination-out';
        } else if (element.tool === 'marker') {
          ctx.globalCompositeOperation = 'multiply';
          ctx.globalAlpha = element.opacity * 0.3;
        } else {
          ctx.globalCompositeOperation = 'source-over';
        }

        ctx.beginPath();
        ctx.moveTo(element.points[0].x, element.points[0].y);
        
        // Smooth curve for pen tools
        if (element.tool === 'kalem' || element.tool === 'kurşun') {
          for (let i = 1; i < element.points.length - 1; i++) {
            const xc = (element.points[i].x + element.points[i + 1].x) / 2;
            const yc = (element.points[i].y + element.points[i + 1].y) / 2;
            ctx.quadraticCurveTo(element.points[i].x, element.points[i].y, xc, yc);
          }
        } else {
          for (let i = 1; i < element.points.length; i++) {
            ctx.lineTo(element.points[i].x, element.points[i].y);
          }
        }
        
        ctx.stroke();
      } else if ('type' in element && typeof element.type === 'string' && 'startPoint' in element && 'endPoint' in element) {
        // Shape - güvenlik kontrolü ekledik
        const shapeElement = element as ShapeData;
        if (shapeElement.startPoint && shapeElement.endPoint) {
          drawShape(ctx, shapeElement);
        }
      } else if ('data' in element) {
        // Media element
        const mediaElement = element as MediaElement;
        const img = new Image();
        img.onload = () => {
          ctx.globalAlpha = 1;
          ctx.globalCompositeOperation = 'source-over';
          ctx.drawImage(img, mediaElement.x, mediaElement.y, mediaElement.width, mediaElement.height);
          
          // Selection border
          if (selectedElement === mediaElement.id) {
            ctx.strokeStyle = '#3b82f6';
            ctx.lineWidth = 2;
            ctx.setLineDash([5, 5]);
            ctx.strokeRect(mediaElement.x, mediaElement.y, mediaElement.width, mediaElement.height);
            ctx.setLineDash([]);
          }
        };
        img.src = mediaElement.data;
      }
    });

    // Draw sticky notes
    stickyNotes.forEach(note => {
      ctx.globalAlpha = 0.9;
      ctx.globalCompositeOperation = 'source-over';
      
      // Note background
      ctx.fillStyle = note.color;
      ctx.fillRect(note.x, note.y, note.width, note.height);
      
      // Note border
      ctx.strokeStyle = '#00000020';
      ctx.lineWidth = 1;
      ctx.strokeRect(note.x, note.y, note.width, note.height);
      
      // Note text
      ctx.fillStyle = '#000000';
      ctx.font = `${note.fontSize}px Arial`;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      
      const words = note.text.split(' ');
      const lines = [];
      let currentLine = '';
      
      words.forEach(word => {
        const testLine = currentLine + word + ' ';
        const metrics = ctx.measureText(testLine);
        if (metrics.width > note.width - 10 && currentLine !== '') {
          lines.push(currentLine);
          currentLine = word + ' ';
        } else {
          currentLine = testLine;
        }
      });
      lines.push(currentLine);
      
      lines.forEach((line, index) => {
        ctx.fillText(line.trim(), note.x + 5, note.y + 5 + (index * note.fontSize * 1.2));
      });
      
      // Selection border
      if (selectedElement === note.id) {
        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.strokeRect(note.x, note.y, note.width, note.height);
        ctx.setLineDash([]);
      }
    });

    // Draw current shape preview
    if (currentShape && currentShape.startPoint && currentShape.endPoint) {
      drawShape(ctx, currentShape, true);
    }

    ctx.restore();
  }, [elements, stickyNotes, currentShape, zoom, panOffset, showGrid, selectedElement]);

  const drawGrid = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const gridSize = 20;
    ctx.strokeStyle = '#f0f0f0';
    ctx.lineWidth = 0.5;
    ctx.globalAlpha = 0.3;
    ctx.globalCompositeOperation = 'source-over';

    for (let x = 0; x <= width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    for (let y = 0; y <= height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  };

  const getMousePos = (e: React.MouseEvent<HTMLCanvasElement>): Point => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    return {
      x: (e.clientX - rect.left - panOffset.x * zoom) / zoom,
      y: (e.clientY - rect.top - panOffset.y * zoom) / zoom
    };
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (e.button === 1 || (e.button === 0 && e.altKey) || isPanMode) {
      setIsPanning(true);
      setLastPanPoint({ x: e.clientX, y: e.clientY });
      return;
    }

    const point = getMousePos(e);

    if (drawingState.tool === 'yapışkan-not') {
      const newNote: StickyNote = {
        id: Date.now().toString(),
        x: point.x,
        y: point.y,
        width: 200,
        height: 150,
        text: 'Yeni not...',
        color: '#ffd700',
        fontSize: 14
      };
      setStickyNotes(prev => [...prev, newNote]);
      setSelectedElement(newNote.id);
      return;
    }

    if (drawingState.tool === 'seç') {
      for (const note of stickyNotes) {
        if (point.x >= note.x && point.x <= note.x + note.width &&
            point.y >= note.y && point.y <= note.y + note.height) {
          setSelectedElement(note.id);
          return;
        }
      }
      
      for (const element of elements) {
        if ('data' in element) {
          const mediaElement = element as MediaElement;
          if (point.x >= mediaElement.x && point.x <= mediaElement.x + mediaElement.width &&
              point.y >= mediaElement.y && point.y <= mediaElement.y + mediaElement.height) {
            setSelectedElement(mediaElement.id);
            return;
          }
        }
      }
      
      setSelectedElement(null);
      return;
    }

    setIsDrawing(true);

    if (isShapeTool(drawingState.tool)) {
      setCurrentShape({
        type: drawingState.tool,
        startPoint: point,
        endPoint: point,
        color: drawingState.color,
        size: drawingState.size,
        opacity: drawingState.opacity
      });
    } else {
      setCurrentPath([point]);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isPanning) {
      const deltaX = e.clientX - lastPanPoint.x;
      const deltaY = e.clientY - lastPanPoint.y;
      setPanOffset(prev => ({
        x: prev.x + deltaX / zoom,
        y: prev.y + deltaY / zoom
      }));
      setLastPanPoint({ x: e.clientX, y: e.clientY });
      return;
    }

    if (!isDrawing) return;

    const point = getMousePos(e);

    if (isShapeTool(drawingState.tool) && currentShape) {
      setCurrentShape(prev => prev ? { ...prev, endPoint: point } : null);
    } else {
      setCurrentPath(prev => [...prev, point]);

      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.save();
      ctx.scale(zoom, zoom);
      ctx.translate(panOffset.x, panOffset.y);

      ctx.globalAlpha = drawingState.opacity;
      ctx.strokeStyle = drawingState.color;
      ctx.lineWidth = drawingState.size;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      if (drawingState.tool === 'silgi') {
        ctx.globalCompositeOperation = 'destination-out';
      } else if (drawingState.tool === 'marker') {
        ctx.globalCompositeOperation = 'multiply';
        ctx.globalAlpha = drawingState.opacity * 0.3;
      } else {
        ctx.globalCompositeOperation = 'source-over';
      }

      if (currentPath.length > 1) {
        const prevPoint = currentPath[currentPath.length - 2];
        ctx.beginPath();
        ctx.moveTo(prevPoint.x, prevPoint.y);
        ctx.lineTo(point.x, point.y);
        ctx.stroke();
      }

      ctx.restore();
    }
  };

  const handleMouseUp = () => {
    if (isPanning) {
      setIsPanning(false);
      return;
    }

    if (!isDrawing) return;

    setIsDrawing(false);
    
    setUndoStack(prev => [...prev, elements]);
    setRedoStack([]);

    if (isShapeTool(drawingState.tool) && currentShape && currentShape.startPoint && currentShape.endPoint) {
      setElements(prev => [...prev, currentShape]);
      setCurrentShape(null);
    } else if (currentPath.length > 1) {
      const newPath: DrawingPath = {
        tool: drawingState.tool,
        color: drawingState.color,
        size: drawingState.size,
        opacity: drawingState.opacity,
        points: currentPath
      };
      setElements(prev => [...prev, newPath]);
    }
    
    setCurrentPath([]);
  };

  const handleFileUpload = (files: FileList) => {
    Array.from(files).forEach(file => {
      if (file.type.startsWith('image/') || file.type === 'application/pdf') {
        const reader = new FileReader();
        reader.onload = (e) => {
          const newMedia: MediaElement = {
            id: Date.now().toString() + Math.random(),
            type: file.type.startsWith('image/') ? 'image' : 'pdf',
            x: 100,
            y: 100,
            width: 300,
            height: 200,
            data: e.target?.result as string,
            name: file.name
          };
          setElements(prev => [...prev, newMedia]);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const undo = () => {
    if (undoStack.length === 0) return;
    
    const previousState = undoStack[undoStack.length - 1];
    setRedoStack(prev => [elements, ...prev]);
    setElements(previousState);
    setUndoStack(prev => prev.slice(0, -1));
  };

  const redo = () => {
    if (redoStack.length === 0) return;
    
    const nextState = redoStack[0];
    setUndoStack(prev => [...prev, elements]);
    setElements(nextState);
    setRedoStack(prev => prev.slice(1));
  };

  const clearCanvas = () => {
    setUndoStack(prev => [...prev, elements]);
    setRedoStack([]);
    setElements([]);
    setStickyNotes([]);
  };

  const resetView = () => {
    setZoom(1);
    setPanOffset({ x: 0, y: 0 });
  };

  const zoomToSelection = () => {
    if (elements.length === 0 && stickyNotes.length === 0) return;

    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;

    elements.forEach(element => {
      if ('points' in element && Array.isArray(element.points)) {
        element.points.forEach(point => {
          minX = Math.min(minX, point.x);
          minY = Math.min(minY, point.y);
          maxX = Math.max(maxX, point.x);
          maxY = Math.max(maxY, point.y);
        });
      } else if ('x' in element && 'y' in element) {
        minX = Math.min(minX, element.x);
        minY = Math.min(minY, element.y);
        maxX = Math.max(maxX, element.x + (element.width || 0));
        maxY = Math.max(maxY, element.y + (element.height || 0));
      }
    });

    stickyNotes.forEach(note => {
      minX = Math.min(minX, note.x);
      minY = Math.min(minY, note.y);
      maxX = Math.max(maxX, note.x + note.width);
      maxY = Math.max(maxY, note.y + note.height);
    });

    if (minX === Infinity) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const padding = 50;
    const contentWidth = maxX - minX + padding * 2;
    const contentHeight = maxY - minY + padding * 2;
    
    const scaleX = canvas.width / contentWidth;
    const scaleY = canvas.height / contentHeight;
    const newZoom = Math.min(scaleX, scaleY, 2);

    const centerX = (minX + maxX) / 2;
    const centerY = (minY + maxY) / 2;

    setZoom(newZoom);
    setPanOffset({
      x: (canvas.width / newZoom / 2) - centerX,
      y: (canvas.height / newZoom / 2) - centerY
    });
  };

  useEffect(() => {
    redrawCanvas();
  }, [redrawCanvas]);

  return (
    <div className="h-screen w-full overflow-hidden relative bg-transparent">
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*,application/pdf"
        onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
        className="hidden"
      />

      <KeyboardShortcuts
        onUndo={undo}
        onRedo={redo}
        onClear={clearCanvas}
        onResetView={resetView}
        canUndo={undoStack.length > 0}
        canRedo={redoStack.length > 0}
      />

      {showWelcome && (
        <WelcomeScreen onClose={() => setShowWelcome(false)} />
      )}

      <Toolbar 
        drawingState={drawingState}
        setDrawingState={setDrawingState}
        onUndo={undo}
        onRedo={redo}
        onClear={clearCanvas}
        onFileUpload={() => fileInputRef.current?.click()}
        canUndo={undoStack.length > 0}
        canRedo={redoStack.length > 0}
        onPanMode={() => setIsPanMode(!isPanMode)}
        isPanning={isPanMode}
      />

      <CanvasControls 
        zoom={zoom}
        onZoomChange={setZoom}
        onResetView={resetView}
        onZoomToFit={zoomToSelection}
      />

      <StickyNotes
        notes={stickyNotes}
        selectedNote={selectedElement}
        onNotesChange={setStickyNotes}
        onSelectNote={setSelectedElement}
      />

      <MediaUploader onFileUpload={handleFileUpload} />

      <button
        onClick={() => setShowGrid(!showGrid)}
        className="absolute bottom-4 left-4 z-10 p-3 bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl border border-white/50 hover:bg-white hover:shadow-3xl transition-all duration-300 text-gray-700 text-lg transform hover:-translate-y-1"
        title={`${showGrid ? 'Izgarayı Gizle' : 'Izgarayı Göster'}`}
      >
        {showGrid ? '🔳' : '⬜'}
      </button>

      <button
        onClick={() => setShowWelcome(true)}
        className="absolute bottom-4 left-20 z-10 p-3 bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl border border-white/50 hover:bg-white hover:shadow-3xl transition-all duration-300 text-gray-700 text-lg transform hover:-translate-y-1"
        title="Yardım"
      >
        ❓
      </button>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 px-4 py-2 bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl border border-white/50 text-sm text-gray-700 font-medium">
        <span className="text-blue-600">{drawingState.tool.charAt(0).toUpperCase() + drawingState.tool.slice(1)}</span>
        <span className="mx-3 text-gray-400">•</span>
        <span className="text-purple-600">%{Math.round(zoom * 100)}</span>
        <span className="mx-3 text-gray-400">•</span>
        <span className="text-green-600">{elements.length + stickyNotes.length} öğe</span>
      </div>

      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ 
          cursor: isPanning || isPanMode ? 'grabbing' : 
                 drawingState.tool === 'silgi' ? 'crosshair' :
                 drawingState.tool === 'seç' ? 'default' : 
                 drawingState.tool === 'yapışkan-not' ? 'copy' : 'crosshair'
        }}
      />
    </div>
  );
} 