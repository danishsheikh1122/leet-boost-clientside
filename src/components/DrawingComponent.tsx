import React, { useState, useRef, useEffect } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";
import type { ReactSketchCanvasRef } from "react-sketch-canvas";
import { motion } from "framer-motion";
import { Paintbrush, Eraser, Undo2, Redo2, Trash2, ChevronUp, ChevronDown, Layers, Move, Type, Image, Square, Circle, Minus, X } from 'lucide-react';
import Tooltip from './Tooltip';
import ColorPicker from './ColorPicker';

const tools = [
  { icon: Move, name: "Move", shortcut: "1" },
  { icon: Square, name: "Rectangle", shortcut: "2" },
  { icon: Circle, name: "Circle", shortcut: "3" },
  { icon: Minus, name: "Line", shortcut: "4" },
  { icon: Type, name: "Text", shortcut: "5" },
  { icon: Image, name: "Image", shortcut: "6" },
  { icon: Paintbrush, name: "Draw", shortcut: "7" },
];

const DrawingApp = () => {
  const [strokeColor, setStrokeColor] = useState("#FFA116"); // LeetCode yellow
  const [backgroundColor, setBackgroundColor] = useState("#1e1e1e");
  const [strokeWidth, setStrokeWidth] = useState(4);
  const [opacity, setOpacity] = useState(100);
  const [activeTool, setActiveTool] = useState(6);
  const [showToolbar, setShowToolbar] = useState(true);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentShape, setCurrentShape] = useState(null);
  const [shapes, setShapes] = useState([]);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const canvasRef = useRef<ReactSketchCanvasRef>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  const addToHistory = (newShapes) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newShapes);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setShapes(history[historyIndex - 1]);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setShapes(history[historyIndex + 1]);
    }
  };

  const clearCanvas = () => {
    setShapes([]);
    addToHistory([]);
    if (canvasRef.current) {
      canvasRef.current.clearCanvas();
    }
  };

  const removeAllShapes = () => {
    setShapes([]);
    addToHistory([]);
  };

  const startDrawingShape = (e: React.MouseEvent<HTMLDivElement>) => {
    if (activeTool >= 1 && activeTool <= 4) { // Shape tools
      const rect = canvasContainerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setIsDrawing(true);
      setCurrentShape({
        type: tools[activeTool].name,
        startX: x,
        startY: y,
        endX: x,
        endY: y,
        strokeColor,
        strokeWidth,
        opacity
      });
    }
  };

  const drawShape = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDrawing && currentShape) {
      const rect = canvasContainerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setCurrentShape(prev => ({
        ...prev,
        endX: x,
        endY: y
      }));
    }
  };

  const finishDrawingShape = () => {
    if (isDrawing && currentShape) {
      setShapes([...shapes, currentShape]);
      addToHistory([...shapes, currentShape]);
    }
    setIsDrawing(false);
    setCurrentShape(null);
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const num = parseInt(e.key);
      if (num >= 1 && num <= 7) {
        setActiveTool(num - 1);
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, []);

  return (
    <div className="flex flex-col h-screen w-full bg-white dark:bg-[#1e1e1e] text-gray-900 dark:text-white">
      {/* Main Toolbar */}
      <motion.div
        initial={false}
        animate={{ height: showToolbar ? "auto" : 0 }}
        className="bg-gray-100 dark:bg-[#2a2a2a] border-b border-gray-200 dark:border-gray-700 overflow-hidden"
      >
        <div className="p-4 flex items-center gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Stroke</span>
              <ColorPicker
                color={strokeColor}
                onChange={setStrokeColor}
                label="Stroke color"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Background</span>
              <ColorPicker
                color={backgroundColor}
                onChange={setBackgroundColor}
                label="Background color"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Width</span>
              <div className="flex gap-2">
                {[2, 4, 6].map((width) => (
                  <Tooltip key={width} content={`${width}px`}>
                    <button
                      onClick={() => setStrokeWidth(width)}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        strokeWidth === width
                          ? "bg-[#FFA116] text-white"
                          : "bg-gray-200 dark:bg-[#363636] text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-[#404040]"
                      }`}
                    >
                      <div
                        className="bg-current rounded-full"
                        style={{
                          width: width * 1.5,
                          height: width * 1.5
                        }}
                      />
                    </button>
                  </Tooltip>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Opacity</span>
              <input
                type="range"
                min="0"
                max="100"
                value={opacity}
                onChange={(e) => setOpacity(parseInt(e.target.value))}
                className="w-32 accent-[#FFA116]"
              />
              <span className="text-sm text-gray-600 dark:text-gray-400 w-8">{opacity}%</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Canvas Area */}
      <div 
        ref={canvasContainerRef}
        className="flex-1 relative"
        onMouseDown={startDrawingShape}
        onMouseMove={drawShape}
        onMouseUp={finishDrawingShape}
        onMouseLeave={finishDrawingShape}
      >
        <ReactSketchCanvas
          ref={canvasRef}
          strokeWidth={strokeWidth}
          strokeColor={strokeColor}
          canvasColor={backgroundColor}
          style={{
            width: "100%",
            height: "100%",
          }}
        />
        <svg
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
          style={{ zIndex: 1 }}
        >
          {shapes.map((shape, index) => {
            switch (shape.type) {
              case 'Rectangle':
                return (
                  <rect
                    key={index}
                    x={Math.min(shape.startX, shape.endX)}
                    y={Math.min(shape.startY, shape.endY)}
                    width={Math.abs(shape.endX - shape.startX)}
                    height={Math.abs(shape.endY - shape.startY)}
                    stroke={shape.strokeColor}
                    strokeWidth={shape.strokeWidth}
                    fill="none"
                    opacity={shape.opacity / 100}
                  />
                );
              case 'Circle':
                return (
                  <circle
                    key={index}
                    cx={shape.startX}
                    cy={shape.startY}
                    r={Math.sqrt(
                      Math.pow(shape.endX - shape.startX, 2) +
                      Math.pow(shape.endY - shape.startY, 2)
                    )}
                    stroke={shape.strokeColor}
                    strokeWidth={shape.strokeWidth}
                    fill="none"
                    opacity={shape.opacity / 100}
                  />
                );
              case 'Line':
                return (
                  <line
                    key={index}
                    x1={shape.startX}
                    y1={shape.startY}
                    x2={shape.endX}
                    y2={shape.endY}
                    stroke={shape.strokeColor}
                    strokeWidth={shape.strokeWidth}
                    opacity={shape.opacity / 100}
                  />
                );
              default:
                return null;
            }
          })}
          {currentShape && (
            <>
              {currentShape.type === 'Rectangle' && (
                <rect
                  x={Math.min(currentShape.startX, currentShape.endX)}
                  y={Math.min(currentShape.startY, currentShape.endY)}
                  width={Math.abs(currentShape.endX - currentShape.startX)}
                  height={Math.abs(currentShape.endY - currentShape.startY)}
                  stroke={currentShape.strokeColor}
                  strokeWidth={currentShape.strokeWidth}
                  fill="none"
                  opacity={currentShape.opacity / 100}
                />
              )}
              {currentShape.type === 'Circle' && (
                <circle
                  cx={currentShape.startX}
                  cy={currentShape.startY}
                  r={Math.sqrt(
                    Math.pow(currentShape.endX - currentShape.startX, 2) +
                    Math.pow(currentShape.endY - currentShape.startY, 2)
                  )}
                  stroke={currentShape.strokeColor}
                  strokeWidth={currentShape.strokeWidth}
                  fill="none"
                  opacity={currentShape.opacity / 100}
                />
              )}
              {currentShape.type === 'Line' && (
                <line
                  x1={currentShape.startX}
                  y1={currentShape.startY}
                  x2={currentShape.endX}
                  y2={currentShape.endY}
                  stroke={currentShape.strokeColor}
                  strokeWidth={currentShape.strokeWidth}
                  opacity={currentShape.opacity / 100}
                />
              )}
            </>
          )}
        </svg>
      </div>

      {/* Bottom Toolbar */}
      <div className="bg-gray-100 dark:bg-[#2a2a2a] border-t border-gray-200 dark:border-gray-700 p-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            {tools.map((tool, index) => (
              <Tooltip
                key={index}
                content={tool.name}
                shortcut={tool.shortcut}
                position="top"
              >
                <button
                  onClick={() => setActiveTool(index)}
                  className={`p-2 rounded-lg transition-colors duration-200 ${
                    activeTool === index
                      ? "bg-[#FFA116] text-white"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-[#363636]"
                  }`}
                >
                  <tool.icon size={20} />
                </button>
              </Tooltip>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Tooltip content="Undo" position="top">
              <button
                onClick={undo}
                className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-[#363636] rounded-lg transition-colors duration-200"
              >
                <Undo2 size={20} />
              </button>
            </Tooltip>
            <Tooltip content="Redo" position="top">
              <button
                onClick={redo}
                className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-[#363636] rounded-lg transition-colors duration-200"
              >
                <Redo2 size={20} />
              </button>
            </Tooltip>
            <Tooltip content="Clear canvas" position="top">
              <button
                onClick={clearCanvas}
                className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-[#363636] rounded-lg transition-colors duration-200"
              >
                <Trash2 size={20} />
              </button>
            </Tooltip>
            <Tooltip content="Remove all shapes" position="top">
              <button
                onClick={removeAllShapes}
                className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-[#363636] rounded-lg transition-colors duration-200"
              >
                <X size={20} />
              </button>
            </Tooltip>
            <Tooltip content="Toggle toolbar" position="top">
              <button
                onClick={() => setShowToolbar(!showToolbar)}
                className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-[#363636] rounded-lg transition-colors duration-200"
              >
                {showToolbar ? (
                  <ChevronDown size={20} />
                ) : (
                  <ChevronUp size={20} />
                )}
              </button>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrawingApp;

