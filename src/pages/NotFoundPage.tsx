import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFoundPage: React.FC = () => {
  const [rotateCount, setRotateCount] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setRotateCount(prev => prev + 1);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Mathematics equations for visual appeal
  const equations = [
    '404 = 4 × 101',
    '404 = 2² × 101',
    '404 = 20² + 2² + 2²',
    '404 = 400 + 4',
    '404 = 4 × 100 + 4 × 1'
  ];
  
  const currentEquation = equations[rotateCount % equations.length];
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full flex flex-col items-center text-center">
        {/* Mathematical decorative elements */}
        <div className="relative w-full h-40 mb-6">
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-mono text-8xl font-bold text-indigo-900 opacity-60"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            404
          </motion.div>
          
          <motion.div 
            className="absolute top-0 left-0 w-full h-full"
            animate={{ rotateZ: [0, 360] }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          >
            {[...Array(12)].map((_, i) => (
              <motion.div 
                key={i} 
                className="absolute w-3 h-3 rounded-full bg-indigo-200"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: `rotate(${i * 30}deg) translateY(-120px) rotate(-${i * 30}deg)`,
                }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: i * 0.1
                }}
              />
            ))}
          </motion.div>
          
          <motion.div
            className="absolute top-3/4 left-1/2 transform -translate-x-1/2 text-indigo-700 font-mono text-xl"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            key={currentEquation}
          >
            {currentEquation}
          </motion.div>
        </div>
        
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Page Not Found</h1>
        <p className="text-lg text-gray-600 max-w-md mb-8">
          The mathematical formula for this page seems to be incomplete. Let's navigate back to a solution that exists.
        </p>
        
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <Link
            to="/"
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-transform duration-200"
          >
            Return Home
          </Link>
          
          <Link
            to="/resources"
            className="px-6 py-3 bg-white text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors shadow-sm"
          >
            Explore Resources
          </Link>
        </div>
        
        {/* Mathematical symbols floating in the background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[
            { symbol: 'π', x: 85, y: 20, size: 2.5, color: '#818CF8' },
            { symbol: '∫', x: 15, y: 70, size: 3, color: '#6366F1' },
            { symbol: '∑', x: 80, y: 80, size: 2.8, color: '#4F46E5' },
            { symbol: '√', x: 10, y: 30, size: 2.5, color: '#4338CA' },
            { symbol: '∞', x: 50, y: 15, size: 3, color: '#3730A3' },
            { symbol: 'θ', x: 20, y: 85, size: 2.2, color: '#312E81' },
            { symbol: 'Δ', x: 70, y: 25, size: 2.4, color: '#1E3A8A' },
            { symbol: '≡', x: 75, y: 60, size: 2.7, color: '#1E40AF' },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="absolute font-serif select-none"
              style={{
                left: `${item.x}%`,
                top: `${item.y}%`,
                fontSize: `${item.size}rem`,
                color: item.color,
                opacity: 0.1
              }}
              animate={{
                y: [0, -15, 0],
                rotate: [0, item.y % 2 === 0 ? 10 : -10, 0],
                opacity: [0.1, 0.15, 0.1]
              }}
              transition={{
                duration: 5 + index,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.5
              }}
            >
              {item.symbol}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;