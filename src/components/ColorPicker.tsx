import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SketchPicker } from 'react-color';
import Tooltip from './Tooltip';

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  label: string;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ color, onChange, label }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <Tooltip content={label}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-8 h-8 rounded-lg border-2 border-gray-700 hover:border-[#FFA116] transition-all duration-200 shadow-inner"
          style={{ backgroundColor: color }}
        />
      </Tooltip>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute top-full left-0 mt-2 z-[9999]"
            style={{ position: 'fixed' }}
          >
            <div className="p-2 bg-[#1e1e1e] rounded-lg border border-gray-700 shadow-xl">
              <div onClick={(e) => e.stopPropagation()}>
                <SketchPicker
                  color={color}
                  onChange={(color) => onChange(color.hex)}
                  styles={{
                    default: {
                      picker: {
                        background: '#1e1e1e',
                        boxShadow: 'none',
                      }
                    }
                  }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ColorPicker;

