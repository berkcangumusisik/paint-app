# 🎨 Modern Whiteboard

A professional-grade digital whiteboard application built with Next.js, React, TypeScript, and Tailwind CSS. Inspired by Microsoft Whiteboard with modern UI/UX and advanced features.


## ✨ Features

### 🖊️ Drawing Tools
- **Pen**: Smooth curved lines with pressure sensitivity simulation
- **Pencil**: Natural drawing with anti-aliasing
- **Marker**: Semi-transparent drawing with multiply blend mode
- **Eraser**: Advanced erasing with destination-out blending
- **Multiple brush sizes**: 8 different sizes from 1px to 24px
- **Variable opacity**: 10% to 100% transparency control

### 🔺 Shapes & Objects
- **Rectangle**: Perfect rectangles with drag-to-resize
- **Circle**: Circles drawn from center with radius control
- **Line**: Straight lines with precise endpoints
- **Arrow**: Lines with professional arrowheads
- **Real-time preview**: See shapes while drawing
- **Text tool**: Add text with custom styling (coming soon)

### 🎨 Color System
- **30+ preset colors**: Carefully curated color palette
- **Custom color picker**: Full spectrum color selection
- **Quick access**: 4 most-used colors for rapid switching
- **Color validation**: HEX code input with real-time validation
- **Color history**: Remember recently used colors

### ⚡ Advanced Features
- **Unlimited undo/redo**: Complete action history
- **Zoom & pan**: Mouse wheel zoom, Alt+click to pan
- **Grid system**: Toggle-able alignment grid
- **Export functionality**: Save as high-quality PNG
- **Keyboard shortcuts**: Professional workflow shortcuts
- **Responsive design**: Works on all screen sizes
- **Performance optimized**: Smooth 60fps drawing

### 🚀 User Experience
- **Welcome screen**: Interactive feature tour
- **Status bar**: Real-time tool and canvas information
- **Glassmorphism UI**: Modern frosted glass design
- **Smooth animations**: 200ms transitions throughout
- **Accessibility**: Keyboard navigation support
- **Professional tooltips**: Helpful guidance on hover

## 🎮 Controls & Shortcuts

### Mouse Controls
- **Left click + drag**: Draw/create shapes
- **Alt + left click + drag**: Pan the canvas
- **Mouse wheel**: Zoom in/out
- **Middle mouse + drag**: Pan (alternative)

### Keyboard Shortcuts
- `Ctrl + Z`: Undo last action
- `Ctrl + Y` or `Ctrl + Shift + Z`: Redo action
- `Ctrl + Delete`: Clear entire canvas
- `Home`: Reset zoom and pan to default
- `Escape`: Cancel current tool/action

### Tool Shortcuts (Coming Soon)
- `P`: Pen tool
- `E`: Eraser tool
- `R`: Rectangle tool
- `C`: Circle tool
- `T`: Text tool

## 🛠️ Technical Implementation

### Architecture
```
src/
├── app/
│   ├── globals.css     # Global styles & animations
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Main application entry
├── components/
│   ├── Whiteboard.tsx       # Main canvas component
│   ├── Toolbar.tsx          # Drawing tools sidebar
│   ├── ColorPalette.tsx     # Color selection panel
│   ├── CanvasControls.tsx   # Zoom & pan controls
│   ├── ShapeDrawing.tsx     # Shape rendering utilities
│   ├── WelcomeScreen.tsx    # Onboarding modal
│   ├── KeyboardShortcuts.tsx # Shortcut handler
│   └── TextTool.tsx         # Text input component
```

### Key Technologies
- **Next.js 15**: React framework with App Router
- **React 19**: Latest React with concurrent features
- **TypeScript**: Full type safety
- **Tailwind CSS v4**: Utility-first styling
- **HTML5 Canvas**: High-performance drawing
- **Canvas 2D Context**: Advanced drawing operations

### Performance Features
- **Optimized rendering**: Only redraw when necessary
- **Smooth curves**: Quadratic Bézier curve interpolation
- **Memory efficient**: Automatic cleanup of event listeners
- **60fps drawing**: Debounced mouse events
- **Lazy loading**: Components loaded on demand

## 🚀 Getting Started

### Prerequisites
- Node.js 18.17 or later
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd paint-app
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## 📱 Browser Support

- **Chrome**: 88+ (recommended)
- **Firefox**: 85+
- **Safari**: 14+
- **Edge**: 88+

### Required Features
- HTML5 Canvas
- ES2017+ JavaScript
- CSS Grid & Flexbox
- Pointer Events

## 🎯 Roadmap

### Upcoming Features
- [ ] **Text tool**: Rich text with formatting
- [ ] **Selection tool**: Multi-select and transform
- [ ] **Layer system**: Organize drawings in layers
- [ ] **Templates**: Pre-made templates and backgrounds
- [ ] **Collaboration**: Real-time multi-user editing
- [ ] **Cloud sync**: Save and sync across devices
- [ ] **Mobile optimizations**: Touch gestures
- [ ] **Plugin system**: Extensible tool architecture

### Performance Improvements
- [ ] **WebGL renderer**: Hardware-accelerated drawing
- [ ] **Web Workers**: Background processing
- [ ] **Virtual canvas**: Infinite canvas size
- [ ] **Delta compression**: Efficient state management

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Guidelines
1. Use TypeScript for all new code
2. Follow the existing code style
3. Add comments for complex logic
4. Test on multiple browsers
5. Optimize for performance

### Reporting Issues
Please use the GitHub issue tracker to report bugs or request features.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by Microsoft Whiteboard
- UI design influenced by Figma and Miro
- Icons from various emoji sets
- Color palette inspired by Tailwind CSS

---

**Made with ❤️ using Next.js, React, and TypeScript**
