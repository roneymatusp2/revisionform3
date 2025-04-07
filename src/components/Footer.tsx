import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  // Pythagorean Theorem visualization
  const PythagoreanTheorem = () => (
    <div className="relative w-20 h-20">
      <div className="absolute top-0 left-0 w-12 h-12 bg-indigo-200 opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-8 h-8 bg-indigo-300 opacity-50"></div>
      <div className="absolute top-0 right-0 w-8 h-8 bg-indigo-300 opacity-50"></div>
      <div className="absolute bottom-0 right-0 w-12 h-12 bg-indigo-500 opacity-50"></div>
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
        <div className="font-serif text-indigo-600 text-sm">
          a² + b² = c²
        </div>
      </div>
    </div>
  );
  
  // Pi visualization
  const PiVisualization = () => (
    <div className="relative w-20 h-20">
      <svg viewBox="0 0 100 100" className="w-full h-full text-indigo-600 opacity-50">
        <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="2" />
        <line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" strokeWidth="1" />
        <line x1="10" y1="50" x2="90" y2="50" stroke="currentColor" strokeWidth="1" />
      </svg>
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
        <div className="font-serif text-indigo-800">π</div>
      </div>
    </div>
  );
  
  return (
    <footer className="bg-gray-50 border-t border-gray-200 pt-8 pb-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap">
          {/* Mathematical decorations */}
          <div className="hidden md:flex w-full md:w-1/4 justify-center mb-8 md:mb-0">
            <div className="flex flex-col items-center space-y-6">
              <PythagoreanTheorem />
              <PiVisualization />
              <motion.div 
                className="text-4xl font-serif text-indigo-400 opacity-70"
                animate={{ rotate: [0, 10, 0, -10, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              >
                ∑
              </motion.div>
            </div>
          </div>
          
          {/* Main content */}
          <div className="w-full md:w-2/4 mb-8 md:mb-0">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Form 3 Mathematics Revision</h3>
            <p className="text-gray-600 mb-4">
              A comprehensive resource for Cambridge IGCSE™ International Mathematics (0607) Extended.
              This platform brings together quality video tutorials, practice materials, and interactive content
              to help students excel in their mathematical journey.
            </p>
            <div className="flex space-x-4 mt-6">
              <Link to="/" className="text-indigo-600 hover:text-indigo-800 transition-colors">Home</Link>
              <Link to="/resources" className="text-indigo-600 hover:text-indigo-800 transition-colors">Resources</Link>
              <Link to="/teacher-admin" className="text-indigo-600 hover:text-indigo-800 transition-colors">Staff Access</Link>
            </div>
          </div>
          
          {/* Topics quick links */}
          <div className="w-full md:w-1/4">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Topics</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/topic/number-algebra" className="text-indigo-600 hover:text-indigo-800 transition-colors flex items-center">
                  <span className="mr-2 text-blue-500">•</span>
                  Number & Algebra
                </Link>
              </li>
              <li>
                <Link to="/topic/geometry-measurement" className="text-indigo-600 hover:text-indigo-800 transition-colors flex items-center">
                  <span className="mr-2 text-green-500">•</span>
                  Geometry & Measurement
                </Link>
              </li>
              <li>
                <Link to="/topic/trigonometry" className="text-indigo-600 hover:text-indigo-800 transition-colors flex items-center">
                  <span className="mr-2 text-purple-500">•</span>
                  Trigonometry
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Footer bottom */}
        <div className="border-t border-gray-200 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-gray-500 mb-4 sm:mb-0">
            © {new Date().getFullYear()} Mathematics Revision Resource. All rights reserved.
          </p>
          
          <div className="flex items-center">
            <div className="text-right text-sm text-gray-600 italic">
              Mr. Nascimento
            </div>
            
            {/* Golden ratio spiral icon */}
            <motion.div 
              className="ml-3 text-indigo-500"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <svg width="24" height="24" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M50,0 A50,50 0 0,1 100,50 A50,50 0 0,1 50,100 A50,50 0 0,1 0,50 A50,50 0 0,1 50,0 Z" stroke="currentColor" strokeWidth="2" fillOpacity="0" />
                <path d="M50,50 A50,50 0 0,0 100,50 A50,50 0 0,0 50,0" stroke="currentColor" strokeWidth="2" fillOpacity="0" />
                <path d="M50,50 A31,31 0 0,0 81,19" stroke="currentColor" strokeWidth="2" fillOpacity="0" />
                <path d="M50,50 A19,19 0 0,1 69,69" stroke="currentColor" strokeWidth="2" fillOpacity="0" />
                <path d="M50,50 A12,12 0 0,0 38,62" stroke="currentColor" strokeWidth="2" fillOpacity="0" />
                <path d="M50,50 A7,7 0 0,1 43,43" stroke="currentColor" strokeWidth="2" fillOpacity="0" />
              </svg>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;