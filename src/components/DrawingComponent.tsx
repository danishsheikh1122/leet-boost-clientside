import React, { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Paintbrush, Undo2, Redo2, Trash2, ChevronUp, ChevronDown, Move, Type, ZoomIn, ZoomOut } from "lucide-react"
import Tooltip from "./Tooltip"
import ColorPicker from "./ColorPicker"

const tools = [
  { icon: Move, name: "Move", shortcut: "1" },
  { icon: Type, name: "Text", shortcut: "2" },
  { icon: Paintbrush, name: "Draw", shortcut: "3" },
]

const DrawingApp = () => {
  const [strokeColor, setStrokeColor] = useState("#FFA116")
  const [backgroundColor, setBackgroundColor] = useState("#1e1e1e")
  const [strokeWidth, setStrokeWidth] = useState(4)
  const [opacity, setOpacity] = useState(100)
  const [activeTool, setActiveTool] = useState(2)
  const [showToolbar, setShowToolbar] = useState(true)
  const [scale, setScale] = useState(1)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0 })
  const [elements, setElements] = useState([])
  const [history, setHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)

  const canvasRef = useRef(null)

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const num = Number.parseInt(e.key)
      if (num >= 1 && num <= 3) {
        setActiveTool(num - 1)
      }
    }

    window.addEventListener("keypress", handleKeyPress)
    return () => window.removeEventListener("keypress", handleKeyPress)
  }, [])

  const addToHistory = (newElements) => {
    const newHistory = history.slice(0, historyIndex + 1)
    newHistory.push(newElements)
    setHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)
  }

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1)
      setElements(history[historyIndex - 1])
    }
  }

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1)
      setElements(history[historyIndex + 1])
    }
  }

  const clearCanvas = () => {
    setElements([])
    addToHistory([])
  }

  const startDrawing = (e) => {
    if (activeTool === 0) {
      // Move tool
      setIsDragging(true)
      setStartPoint({ x: e.clientX, y: e.clientY })
    } else {
      const { offsetX, offsetY } = e.nativeEvent
      const element = {
        type: activeTool === 1 ? "text" : "path",
        offsetX,
        offsetY,
        path: activeTool === 2 ? [[offsetX, offsetY]] : [],
        stroke: strokeColor,
        strokeWidth,
        opacity: opacity / 100,
        text: activeTool === 1 ? "" : null,
      }
      setElements((prevElements) => [...prevElements, element])
    }
  }

  const draw = (e) => {
    if (activeTool === 0 && isDragging) {
      // Move tool
      const deltaX = e.clientX - startPoint.x
      const deltaY = e.clientY - startPoint.y
      setOffset((prev) => ({ x: prev.x + deltaX, y: prev.y + deltaY }))
      setStartPoint({ x: e.clientX, y: e.clientY })
    } else if (activeTool === 2) {
      // Draw tool
      const { offsetX, offsetY } = e.nativeEvent
      setElements((prevElements) => {
        const lastElement = prevElements[prevElements.length - 1]
        const newElement = {
          ...lastElement,
          path: [...lastElement.path, [offsetX, offsetY]],
        }
        return [...prevElements.slice(0, -1), newElement]
      })
    }
  }

  const endDrawing = () => {
    if (activeTool === 0) {
      // Move tool
      setIsDragging(false)
    } else {
      addToHistory(elements)
    }
  }

  const handleTextInput = (e, index) => {
    const newElements = [...elements]
    newElements[index].text = e.target.value
    setElements(newElements)
    addToHistory(newElements)
  }

  const renderElement = (element, index) => {
    switch (element.type) {
      case "path":
        return (
          <path
            key={index}
            d={`M ${element.path.map(([x, y]) => `${x} ${y}`).join(" L ")}`}
            fill="none"
            stroke={element.stroke}
            strokeWidth={element.strokeWidth}
            opacity={element.opacity}
          />
        )
      case "text":
        return (
          <foreignObject key={index} x={element.offsetX} y={element.offsetY} width="200" height="40">
            <input
              type="text"
              value={element.text}
              onChange={(e) => handleTextInput(e, index)}
              className="bg-transparent border-none outline-none text-white"
              style={{
                color: element.stroke,
                fontSize: `${element.strokeWidth * 4}px`,
                opacity: element.opacity,
              }}
            />
          </foreignObject>
        )
      default:
        return null
    }
  }

  const zoomIn = () => setScale(scale * 1.2)
  const zoomOut = () => setScale(Math.max(0.1, scale / 1.2))

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
              <ColorPicker color={strokeColor} onChange={setStrokeColor} label="Stroke color" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Background</span>
              <ColorPicker color={backgroundColor} onChange={setBackgroundColor} label="Background color" />
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
                          height: width * 1.5,
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
                onChange={(e) => setOpacity(Number.parseInt(e.target.value))}
                className="w-32 accent-[#FFA116]"
              />
              <span className="text-sm text-gray-600 dark:text-gray-400 w-8">{opacity}%</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Canvas Area */}
      <div
        className="flex-1 relative overflow-hidden"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={endDrawing}
        onMouseLeave={endDrawing}
      >
        <svg
          ref={canvasRef}
          className="absolute top-0 left-0"
          style={{
            width: "100%",
            height: "100%",
            transform: `scale(${scale}) translate(${offset.x}px, ${offset.y}px)`,
            transformOrigin: "0 0",
          }}
        >
          <rect width="100%" height="100%" fill={backgroundColor} />
          {elements.map(renderElement)}
        </svg>
      </div>

      {/* Bottom Toolbar */}
      <div className="bg-gray-100 dark:bg-[#2a2a2a] border-t border-gray-200 dark:border-gray-700 p-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            {tools.map((tool, index) => (
              <Tooltip key={index} content={tool.name} shortcut={tool.shortcut} position="top">
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
            <Tooltip content="Zoom In" position="top">
              <button
                onClick={zoomIn}
                className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-[#363636] rounded-lg transition-colors duration-200"
              >
                <ZoomIn size={20} />
              </button>
            </Tooltip>
            <Tooltip content="Zoom Out" position="top">
              <button
                onClick={zoomOut}
                className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-[#363636] rounded-lg transition-colors duration-200"
              >
                <ZoomOut size={20} />
              </button>
            </Tooltip>
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
            <Tooltip content="Toggle toolbar" position="top">
              <button
                onClick={() => setShowToolbar(!showToolbar)}
                className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-[#363636] rounded-lg transition-colors duration-200"
              >
                {showToolbar ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
              </button>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DrawingApp

