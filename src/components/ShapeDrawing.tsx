'use client';

import React from 'react';

export interface ShapeData {
  type: 'dikdörtgen' | 'daire' | 'ok' | 'çizgi' | 'üçgen' | 'yıldız' | 'kalp' | 'elips';
  startPoint: { x: number; y: number };
  endPoint: { x: number; y: number };
  color: string;
  size: number;
  opacity: number;
}

export const drawShape = (
  ctx: CanvasRenderingContext2D, 
  shape: ShapeData, 
  isPreview: boolean = false
) => {
  if (!shape || !shape.startPoint || !shape.endPoint) {
    return; // Güvenlik kontrolü
  }

  ctx.save();
  ctx.globalAlpha = isPreview ? shape.opacity * 0.7 : shape.opacity;
  ctx.strokeStyle = shape.color;
  ctx.lineWidth = shape.size;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  const { startPoint, endPoint } = shape;
  const width = endPoint.x - startPoint.x;
  const height = endPoint.y - startPoint.y;
  const centerX = startPoint.x + width / 2;
  const centerY = startPoint.y + height / 2;

  switch (shape.type) {
    case 'dikdörtgen':
      ctx.strokeRect(startPoint.x, startPoint.y, width, height);
      break;

    case 'daire':
      const radius = Math.sqrt(width * width + height * height) / 2;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      ctx.stroke();
      break;

    case 'elips':
      ctx.beginPath();
      ctx.ellipse(centerX, centerY, Math.abs(width) / 2, Math.abs(height) / 2, 0, 0, 2 * Math.PI);
      ctx.stroke();
      break;

    case 'çizgi':
      ctx.beginPath();
      ctx.moveTo(startPoint.x, startPoint.y);
      ctx.lineTo(endPoint.x, endPoint.y);
      ctx.stroke();
      break;

    case 'ok':
      // Ana çizgi
      ctx.beginPath();
      ctx.moveTo(startPoint.x, startPoint.y);
      ctx.lineTo(endPoint.x, endPoint.y);
      ctx.stroke();

      // Ok başı
      const angle = Math.atan2(height, width);
      const arrowLength = 20;
      const arrowAngle = Math.PI / 6;

      ctx.beginPath();
      ctx.moveTo(endPoint.x, endPoint.y);
      ctx.lineTo(
        endPoint.x - arrowLength * Math.cos(angle - arrowAngle),
        endPoint.y - arrowLength * Math.sin(angle - arrowAngle)
      );
      ctx.moveTo(endPoint.x, endPoint.y);
      ctx.lineTo(
        endPoint.x - arrowLength * Math.cos(angle + arrowAngle),
        endPoint.y - arrowLength * Math.sin(angle + arrowAngle)
      );
      ctx.stroke();
      break;

    case 'üçgen':
      ctx.beginPath();
      ctx.moveTo(centerX, startPoint.y); // Üst nokta
      ctx.lineTo(startPoint.x, endPoint.y); // Sol alt
      ctx.lineTo(endPoint.x, endPoint.y); // Sağ alt
      ctx.closePath();
      ctx.stroke();
      break;

    case 'yıldız':
      const outerRadius = Math.min(Math.abs(width), Math.abs(height)) / 2;
      const innerRadius = outerRadius * 0.4;
      const spikes = 5;
      
      ctx.beginPath();
      for (let i = 0; i < spikes * 2; i++) {
        const radius = i % 2 === 0 ? outerRadius : innerRadius;
        const angle = (i * Math.PI) / spikes;
        const x = centerX + Math.cos(angle - Math.PI / 2) * radius;
        const y = centerY + Math.sin(angle - Math.PI / 2) * radius;
        
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.closePath();
      ctx.stroke();
      break;

    case 'kalp':
      const heartWidth = Math.abs(width);
      const heartHeight = Math.abs(height);
      const scale = Math.min(heartWidth, heartHeight) / 100;
      
      ctx.beginPath();
      ctx.moveTo(centerX, centerY + heartHeight * 0.3);
      
      // Sol yarım kalp
      ctx.bezierCurveTo(
        centerX - heartWidth * 0.3, centerY - heartHeight * 0.1,
        centerX - heartWidth * 0.5, centerY - heartHeight * 0.4,
        centerX, centerY - heartHeight * 0.2
      );
      
      // Sağ yarım kalp
      ctx.bezierCurveTo(
        centerX + heartWidth * 0.5, centerY - heartHeight * 0.4,
        centerX + heartWidth * 0.3, centerY - heartHeight * 0.1,
        centerX, centerY + heartHeight * 0.3
      );
      
      ctx.stroke();
      break;
  }

  ctx.restore();
};

export const isShapeTool = (tool: string): tool is ShapeData['type'] => {
  return ['dikdörtgen', 'daire', 'ok', 'çizgi', 'üçgen', 'yıldız', 'kalp', 'elips'].includes(tool);
}; 