import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, Variants } from 'framer-motion';

// 1. Number Systems Animation
export const NumberSystemsAnimation: React.FC = () => {
  const [step, setStep] = useState(0);
  const maxSteps = 3;
  
  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prevStep) => (prevStep + 1) % maxSteps);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <motion.div 
      className="relative h-60 w-full rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 overflow-hidden p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Number Line Animation */}
      {step === 0 && (
        <motion.div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full max-w-md">
            {/* Number Line */}
            <motion.div 
              className="h-1 bg-gray-400 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 1 }}
            />
            
            {/* Tick Marks and Labels */}
            {[-4, -3, -2, -1, 0, 1, 2, 3, 4].map((number, index) => (
              <motion.div 
                key={index}
                className="absolute top-0 flex flex-col items-center"
                style={{ left: `${(index * 12.5) + 6.25}%` }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
              >
                <div className="h-3 w-0.5 bg-gray-400 mb-1" />
                <span className="text-sm font-medium">{number}</span>
              </motion.div>
            ))}
            
            {/* Highlight Integers */}
            <motion.div 
              className="absolute top-8 text-center w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
            >
              <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
                Integers on the Number Line
              </span>
            </motion.div>
          </div>
        </motion.div>
      )}
      
      {/* Prime Numbers Sieve Animation */}
      {step === 1 && (
        <motion.div className="absolute inset-0 flex flex-col items-center justify-center p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Sieve of Eratosthenes</h3>
          <div className="grid grid-cols-10 gap-1">
            {Array.from({ length: 50 }, (_, i) => i + 1).map((num) => {
              const isPrime = 
                num > 1 && 
                !Array.from({length: num - 2}, (_, i) => i + 2)
                  .some(i => num % i === 0);
                  
              return (
                <motion.div
                  key={num}
                  className={`flex items-center justify-center w-8 h-8 rounded-md ${
                    isPrime ? 'bg-purple-500 text-white' : 'bg-gray-100'
                  }`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    backgroundColor: isPrime ? '#8B5CF6' : '#F3F4F6'
                  }}
                  transition={{ 
                    delay: num * 0.02,
                    duration: 0.2
                  }}
                >
                  {num}
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}
      
      {/* Number Sets Visualization */}
      {step === 2 && (
        <motion.div className="absolute inset-0 flex flex-col items-center justify-center p-6">
          <div className="relative w-full max-w-md h-40">
            {/* Concentric sets animation */}
            <svg viewBox="0 0 400 200" className="w-full h-full">
              {/* Real numbers - outermost set */}
              <motion.ellipse 
                cx="200" cy="100" rx="180" ry="90" 
                fill="#F59E0B" fillOpacity="0.1" 
                stroke="#F59E0B" strokeWidth="1" 
                initial={{ rx: 0, ry: 0 }}
                animate={{ rx: 180, ry: 90 }}
                transition={{ duration: 0.8 }}
              />
              <motion.text 
                x="350" y="30" 
                fill="#F59E0B" 
                fontSize="12" 
                fontWeight="bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                Real Numbers
              </motion.text>
              
              {/* Rational numbers */}
              <motion.ellipse 
                cx="200" cy="100" rx="140" ry="70" 
                fill="#8B5CF6" fillOpacity="0.1" 
                stroke="#8B5CF6" strokeWidth="1" 
                initial={{ rx: 0, ry: 0 }}
                animate={{ rx: 140, ry: 70 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              />
              <motion.text 
                x="320" y="60" 
                fill="#8B5CF6" 
                fontSize="12" 
                fontWeight="bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                Rational Numbers
              </motion.text>
              
              {/* Integers */}
              <motion.ellipse 
                cx="200" cy="100" rx="100" ry="50" 
                fill="#10B981" fillOpacity="0.1" 
                stroke="#10B981" strokeWidth="1" 
                initial={{ rx: 0, ry: 0 }}
                animate={{ rx: 100, ry: 50 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              />
              <motion.text 
                x="280" y="90" 
                fill="#10B981" 
                fontSize="12" 
                fontWeight="bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                Integers
              </motion.text>
              
              {/* Natural numbers - innermost set */}
              <motion.ellipse 
                cx="200" cy="100" rx="60" ry="30" 
                fill="#3B82F6" fillOpacity="0.1" 
                stroke="#3B82F6" strokeWidth="1"
                initial={{ rx: 0, ry: 0 }}
                animate={{ rx: 60, ry: 30 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              />
              <motion.text 
                x="230" y="100" 
                fill="#3B82F6" 
                fontSize="12" 
                fontWeight="bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                Natural Numbers
              </motion.text>
              
              {/* Irrational points */}
              <motion.circle 
                cx="300" cy="130" r="5" 
                fill="#EC4899"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              />
              <motion.text 
                x="310" y="130" 
                fill="#EC4899" 
                fontSize="12" 
                fontWeight="bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                π
              </motion.text>
              
              <motion.circle 
                cx="120" cy="60" r="5" 
                fill="#EC4899"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3 }}
              />
              <motion.text 
                x="130" y="60" 
                fill="#EC4899" 
                fontSize="12" 
                fontWeight="bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3 }}
              >
                √2
              </motion.text>
              
              <motion.circle 
                cx="250" cy="160" r="5" 
                fill="#EC4899"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
              />
              <motion.text 
                x="260" y="160" 
                fill="#EC4899" 
                fontSize="12" 
                fontWeight="bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
              >
                e
              </motion.text>
            </svg>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

// 2. Algebraic Manipulation Animation
export const AlgebraicAnimation: React.FC = () => {
  const controls = useAnimation();
  const [step, setStep] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % 3);
    }, 4000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <motion.div 
      className="relative h-60 w-full rounded-xl bg-gradient-to-r from-green-50 to-teal-50 overflow-hidden p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Polynomial Expansion Animation */}
      {step === 0 && (
        <motion.div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.div 
            className="text-xl font-medium text-green-800"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            (a + b)² = ?
          </motion.div>
          
          <motion.div 
            className="mt-4 flex flex-col items-center space-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <motion.div 
              className="text-green-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              (a + b)(a + b)
            </motion.div>
            
            <motion.div 
              className="text-green-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.5 }}
            >
              a(a + b) + b(a + b)
            </motion.div>
            
            <motion.div 
              className="text-green-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 2 }}
            >
              a² + ab + ba + b²
            </motion.div>
            
            <motion.div 
              className="text-green-800 font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 2.5 }}
            >
              a² + 2ab + b²
            </motion.div>
          </motion.div>
        </motion.div>
      )}
      
      {/* Factorization Animation */}
      {step === 1 && (
        <motion.div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.div 
            className="text-xl font-medium text-green-800"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            x² - 9 = ?
          </motion.div>
          
          <motion.div 
            className="mt-4 flex flex-col items-center space-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <motion.div 
              className="text-green-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              x² - 3²
            </motion.div>
            
            <motion.div 
              className="text-green-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.5 }}
            >
              Difference of squares: a² - b² = (a+b)(a-b)
            </motion.div>
            
            <motion.div 
              className="text-green-800 font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 2 }}
            >
              (x+3)(x-3)
            </motion.div>
          </motion.div>
        </motion.div>
      )}
      
      {/* Exponent Rules Animation */}
      {step === 2 && (
        <motion.div className="absolute inset-0 flex flex-col items-center justify-center p-4">
          <motion.div 
            className="text-xl font-medium text-green-800 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Exponent Rules
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-center">
            <motion.div 
              className="bg-white p-2 rounded-lg shadow-sm text-green-700"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              x<sup>a</sup> × x<sup>b</sup> = x<sup>a+b</sup>
            </motion.div>
            
            <motion.div 
              className="bg-white p-2 rounded-lg shadow-sm text-green-700"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              x<sup>a</sup> ÷ x<sup>b</sup> = x<sup>a-b</sup>
            </motion.div>
            
            <motion.div 
              className="bg-white p-2 rounded-lg shadow-sm text-green-700"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              (x<sup>a</sup>)<sup>b</sup> = x<sup>a×b</sup>
            </motion.div>
            
            <motion.div 
              className="bg-white p-2 rounded-lg shadow-sm text-green-700"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              x<sup>0</sup> = 1
            </motion.div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

// 3. Mensuration Animation
export const MensurationAnimation: React.FC = () => {
  const [activeShape, setActiveShape] = useState(0);
  const shapes = ['rectangle', 'triangle', 'circle', 'sphere', 'cylinder'];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveShape((prev) => (prev + 1) % shapes.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [shapes.length]);
  
  const Rectangle = () => (
    <motion.div className="flex flex-col items-center">
      <svg width="120" height="80" viewBox="0 0 120 80">
        <motion.rect 
          x="10" y="10" width="100" height="60" 
          stroke="#16A34A" 
          strokeWidth="2" 
          fill="none" 
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1 }}
        />
        
        <motion.line 
          x1="10" y1="5" x2="110" y2="5" 
          stroke="#16A34A" 
          strokeWidth="1" 
          strokeDasharray="5,5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        />
        
        <motion.text 
          x="60" y="0" 
          fontSize="12" 
          textAnchor="middle" 
          fill="#16A34A"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
        >
          w
        </motion.text>
        
        <motion.line 
          x1="115" y1="10" x2="115" y2="70" 
          stroke="#16A34A" 
          strokeWidth="1" 
          strokeDasharray="5,5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        />
        
        <motion.text 
          x="120" y="40" 
          fontSize="12" 
          textAnchor="middle" 
          fill="#16A34A"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
        >
          h
        </motion.text>
      </svg>
      
      <motion.div 
        className="mt-4 text-center text-emerald-800"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <div>Area = w × h</div>
        <div>Perimeter = 2(w + h)</div>
      </motion.div>
    </motion.div>
  );
  
  const Triangle = () => (
    <motion.div className="flex flex-col items-center">
      <svg width="120" height="100" viewBox="0 0 120 100">
        <motion.path 
          d="M60,10 L110,80 L10,80 Z" 
          stroke="#16A34A" 
          strokeWidth="2" 
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1 }}
        />
        
        <motion.line 
          x1="60" y1="10" x2="60" y2="80" 
          stroke="#16A34A" 
          strokeWidth="1" 
          strokeDasharray="5,5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        />
        
        <motion.text 
          x="65" y="45" 
          fontSize="12" 
          textAnchor="middle" 
          fill="#16A34A"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
        >
          h
        </motion.text>
        
        <motion.line 
          x1="10" y1="85" x2="110" y2="85" 
          stroke="#16A34A" 
          strokeWidth="1" 
          strokeDasharray="5,5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        />
        
        <motion.text 
          x="60" y="95" 
          fontSize="12" 
          textAnchor="middle" 
          fill="#16A34A"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
        >
          b
        </motion.text>
      </svg>
      
      <motion.div 
        className="mt-4 text-center text-emerald-800"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <div>Area = ½ × b × h</div>
      </motion.div>
    </motion.div>
  );
  
  const Circle = () => (
    <motion.div className="flex flex-col items-center">
      <svg width="120" height="120" viewBox="0 0 120 120">
        <motion.circle 
          cx="60" cy="60" r="50" 
          stroke="#16A34A" 
          strokeWidth="2" 
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
        
        <motion.line 
          x1="60" y1="60" x2="110" y2="60" 
          stroke="#16A34A" 
          strokeWidth="1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
        />
        
        <motion.text 
          x="85" y="55" 
          fontSize="12" 
          textAnchor="middle" 
          fill="#16A34A"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.7 }}
        >
          r
        </motion.text>
        
        <motion.path
          d="M 70,25 A 40,40 0 0 1 95,60"
          fill="none"
          stroke="#16A34A"
          strokeWidth="1"
          strokeDasharray="3,3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        />
        
        <motion.text
          x="82" y="38"
          fontSize="12"
          fill="#16A34A"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.9 }}
        >
          θ
        </motion.text>
      </svg>
      
      <motion.div 
        className="mt-4 text-center text-emerald-800"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <div>Area = πr²</div>
        <div>Circumference = 2πr</div>
      </motion.div>
    </motion.div>
  );
  
  const renderActiveShape = () => {
    switch(shapes[activeShape]) {
      case 'rectangle':
        return <Rectangle />;
      case 'triangle':
        return <Triangle />;
      case 'circle':
        return <Circle />;
      default:
        return <Rectangle />;
    }
  };
  
  return (
    <motion.div 
      className="relative h-60 w-full rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 overflow-hidden p-4 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {renderActiveShape()}
    </motion.div>
  );
};

// 4. Linear Patterns Animation
export const LinearPatternsAnimation: React.FC = () => {
  const [showEquation, setShowEquation] = useState(false);
  const [showPoints, setShowPoints] = useState(false);
  
  useEffect(() => {
    const timer1 = setTimeout(() => setShowPoints(true), 500);
    const timer2 = setTimeout(() => setShowEquation(true), 2000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);
  
  // Sample linear function: y = 2x - 3
  const m = 2; // Slope
  const b = -3; // y-intercept
  
  // Generate points
  const points = [];
  for (let x = -3; x <= 3; x++) {
    const y = m * x + b;
    points.push({ x, y });
  }
  
  // Calculate SVG viewport coordinates
  const svgWidth = 240;
  const svgHeight = 240;
  const xScale = 30; // Pixels per unit on x-axis
  const yScale = 30; // Pixels per unit on y-axis
  const xOffset = svgWidth / 2; // Center x-axis
  const yOffset = svgHeight / 2; // Center y-axis
  
  // Convert data coordinates to SVG coordinates
  const toSvgX = (x: number) => xOffset + x * xScale;
  const toSvgY = (y: number) => yOffset - y * yScale; // Invert y-axis
  
  return (
    <motion.div
      className="relative h-60 w-full rounded-xl bg-gradient-to-r from-indigo-50 to-blue-50 overflow-hidden p-4 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
        {/* Coordinate system */}
        <motion.line 
          x1="0" y1={yOffset} x2={svgWidth} y2={yOffset} 
          stroke="#6366F1" strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5 }}
        />
        <motion.line 
          x1={xOffset} y1="0" x2={xOffset} y2={svgHeight} 
          stroke="#6366F1" strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5 }}
        />
        
        {/* X-axis labels */}
        {[-3, -2, -1, 0, 1, 2, 3].map((value) => (
          <motion.g key={`x-${value}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
            <line 
              x1={toSvgX(value)} 
              y1={yOffset - 3} 
              x2={toSvgX(value)} 
              y2={yOffset + 3} 
              stroke="#6366F1" strokeWidth="1" 
            />
            <text 
              x={toSvgX(value)} 
              y={yOffset + 15} 
              textAnchor="middle" 
              fontSize="10" 
              fill="#6366F1"
            >
              {value}
            </text>
          </motion.g>
        ))}
        
        {/* Y-axis labels */}
        {[-3, -2, -1, 0, 1, 2, 3].map((value) => (
          <motion.g key={`y-${value}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
            <line 
              x1={xOffset - 3} 
              y1={toSvgY(value)} 
              x2={xOffset + 3} 
              y2={toSvgY(value)} 
              stroke="#6366F1" strokeWidth="1" 
            />
            <text 
              x={xOffset - 10} 
              y={toSvgY(value) + 4} 
              textAnchor="end" 
              fontSize="10" 
              fill="#6366F1"
            >
              {value}
            </text>
          </motion.g>
        ))}
        
        {/* Line connecting all points */}
        <motion.line 
          x1={toSvgX(-3)} 
          y1={toSvgY(m * -3 + b)} 
          x2={toSvgX(3)} 
          y2={toSvgY(m * 3 + b)} 
          stroke="#4F46E5" 
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: showPoints ? 1 : 0 }}
          transition={{ duration: 1, delay: 1 }}
        />
        
        {/* Plot points */}
        {showPoints && points.map((point, index) => (
          <motion.circle 
            key={index}
            cx={toSvgX(point.x)} 
            cy={toSvgY(point.y)} 
            r="4" 
            fill="#4F46E5"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
          />
        ))}
        
        {/* Equation display */}
        {showEquation && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.5 }}
          >
            <rect x="10" y="10" width="95" height="30" rx="5" fill="white" fillOpacity="0.9" />
            <text x="15" y="30" fontSize="14" fill="#4F46E5" fontWeight="bold">y = 2x - 3</text>
          </motion.g>
        )}
      </svg>
    </motion.div>
  );
};

// 5. Angles Animation
export const AnglesAnimation: React.FC = () => {
  const [step, setStep] = useState(0);
  const numSteps = 3;
  
  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % numSteps);
    }, 4000);
    
    return () => clearInterval(interval);
  }, []);
  
  // First animation: Basic angles
  const BasicAngles = () => (
    <svg width="280" height="160" viewBox="0 0 280 160">
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <motion.line 
          x1="40" y1="120" x2="240" y2="120" 
          stroke="#F59E0B" strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5 }}
        />
        
        <motion.line 
          x1="40" y1="120" x2="140" y2="40" 
          stroke="#F59E0B" strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        />
        
        <motion.path 
          d="M 60,120 A 20,20 0 0,1 66,105" 
          fill="none" 
          stroke="#F59E0B" 
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        />
        
        <motion.text 
          x="66" y="108" 
          fill="#F59E0B" 
          fontSize="14"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          α
        </motion.text>
        
        <motion.text 
          x="140" y="140" 
          fill="#F59E0B" 
          fontSize="14" 
          textAnchor="middle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.4 }}
        >
          Angle α = 45°
        </motion.text>
      </motion.g>
    </svg>
  );
  
  // Second animation: Parallel lines and transversal
  const ParallelLines = () => (
    <svg width="280" height="160" viewBox="0 0 280 160">
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <motion.line 
          x1="40" y1="60" x2="240" y2="60" 
          stroke="#F59E0B" strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5 }}
        />
        
        <motion.line 
          x1="40" y1="120" x2="240" y2="120" 
          stroke="#F59E0B" strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        />
        
        <motion.line 
          x1="100" y1="30" x2="180" y2="150" 
          stroke="#F59E0B" strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        />
        
        <motion.path 
          d="M 100,60 A 10,10 0 0,1 107,67" 
          fill="none" 
          stroke="#F59E0B" 
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.4, delay: 0.9 }}
        />
        
        <motion.text 
          x="112" y="67" 
          fill="#F59E0B" 
          fontSize="12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 1.0 }}
        >
          a
        </motion.text>
        
        <motion.path 
          d="M 100,120 A 10,10 0 0,0 107,113" 
          fill="none" 
          stroke="#F59E0B" 
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.4, delay: 1.1 }}
        />
        
        <motion.text 
          x="112" y="113" 
          fill="#F59E0B" 
          fontSize="12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 1.2 }}
        >
          b
        </motion.text>
        
        <motion.text 
          x="140" y="140" 
          fill="#F59E0B" 
          fontSize="14" 
          textAnchor="middle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.4 }}
        >
          Alternate angles: a = b
        </motion.text>
      </motion.g>
    </svg>
  );
  
  // Third animation: Triangle angles
  const TriangleAngles = () => (
    <svg width="280" height="160" viewBox="0 0 280 160">
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <motion.path 
          d="M 60,120 L 140,40 L 220,120 Z" 
          fill="none" 
          stroke="#F59E0B" 
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1 }}
        />
        
        <motion.path 
          d="M 70,120 A 15,15 0 0,1 80,110" 
          fill="none" 
          stroke="#F59E0B" 
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.4, delay: 1.1 }}
        />
        
        <motion.text 
          x="75" y="105" 
          fill="#F59E0B" 
          fontSize="12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 1.2 }}
        >
          A
        </motion.text>
        
        <motion.path 
          d="M 140,50 A 15,15 0 0,1 153,57" 
          fill="none" 
          stroke="#F59E0B" 
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.4, delay: 1.3 }}
        />
        
        <motion.text 
          x="153" y="52" 
          fill="#F59E0B" 
          fontSize="12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 1.4 }}
        >
          B
        </motion.text>
        
        <motion.path 
          d="M 210,120 A 15,15 0 0,0 200,110" 
          fill="none" 
          stroke="#F59E0B" 
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.4, delay: 1.5 }}
        />
        
        <motion.text 
          x="200" y="105" 
          fill="#F59E0B" 
          fontSize="12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 1.6 }}
        >
          C
        </motion.text>
        
        <motion.text 
          x="140" y="140" 
          fill="#F59E0B" 
          fontSize="14" 
          textAnchor="middle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.8 }}
        >
          A + B + C = 180°
        </motion.text>
      </motion.g>
    </svg>
  );
  
  const renderCurrentStep = () => {
    switch(step) {
      case 0:
        return <BasicAngles />;
      case 1:
        return <ParallelLines />;
      case 2:
        return <TriangleAngles />;
      default:
        return <BasicAngles />;
    }
  };
  
  return (
    <motion.div
      className="relative h-60 w-full rounded-xl bg-gradient-to-r from-amber-50 to-yellow-50 overflow-hidden p-4 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {renderCurrentStep()}
    </motion.div>
  );
};

// 6. Trigonometry Animation
export const TrigonometryAnimation: React.FC = () => {
  const [angle, setAngle] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setAngle((prev) => (prev + 2) % 360);
    }, 50);
    
    return () => clearInterval(interval);
  }, []);
  
  // Unit circle properties
  const radius = 60;
  const centerX = 140;
  const centerY = 80;
  
  // Calculate point on circle for current angle
  const radians = (angle * Math.PI) / 180;
  const x = centerX + radius * Math.cos(radians);
  const y = centerY - radius * Math.sin(radians); // Negate for SVG coordinate system
  
  // Calculate sin and cos values
  const sinValue = Math.sin(radians);
  const cosValue = Math.cos(radians);
  
  return (
    <motion.div
      className="relative h-60 w-full rounded-xl bg-gradient-to-r from-purple-50 to-fuchsia-50 overflow-hidden p-4 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <svg width="280" height="160" viewBox="0 0 280 160">
        {/* Coordinate axes */}
        <line x1="20" y1="80" x2="260" y2="80" stroke="#9333EA" strokeWidth="1" />
        <line x1="140" y1="10" x2="140" y2="150" stroke="#9333EA" strokeWidth="1" />
        
        {/* Unit circle */}
        <circle cx={centerX} cy={centerY} r={radius} stroke="#9333EA" strokeWidth="1" fill="none" />
        
        {/* Angle marking */}
        <path 
          d={`M ${centerX+15},${centerY} A 15,15 0 ${radians > Math.PI ? 1 : 0},1 ${centerX + 15 * Math.cos(radians)},${centerY - 15 * Math.sin(radians)}`} 
          stroke="#9333EA" 
          strokeWidth="1" 
          fill="none" 
        />
        
        <text 
          x={centerX + 25 * Math.cos(radians/2)} 
          y={centerY - 25 * Math.sin(radians/2)} 
          fontSize="12" 
          fill="#9333EA"
        >
          θ
        </text>
        
        {/* Angle value */}
        <text x="20" y="20" fontSize="12" fill="#9333EA">θ = {angle.toFixed(0)}°</text>
        
        {/* Point on circle */}
        <circle cx={x} cy={y} r="4" fill="#D946EF" />
        
        {/* Line from origin to point */}
        <line x1={centerX} y1={centerY} x2={x} y2={y} stroke="#D946EF" strokeWidth="1.5" />
        
        {/* Sine projection */}
        <line x1={x} y1={y} x2={x} y2={centerY} stroke="#DB2777" strokeWidth="1.5" strokeDasharray="3,2" />
        <text x={x + 5} y={(y + centerY) / 2} fontSize="12" fill="#DB2777">sin(θ)</text>
        
        {/* Cosine projection */}
        <line x1={x} y1={y} x2={centerX} y2={y} stroke="#8B5CF6" strokeWidth="1.5" strokeDasharray="3,2" />
        <text x={(x + centerX) / 2} y={y - 5} fontSize="12" fill="#8B5CF6">cos(θ)</text>
        
        {/* Values */}
        <text x="180" y="20" fontSize="12" fill="#DB2777">sin(θ) = {sinValue.toFixed(2)}</text>
        <text x="180" y="35" fontSize="12" fill="#8B5CF6">cos(θ) = {cosValue.toFixed(2)}</text>
      </svg>
    </motion.div>
  );
};

// Enhanced Math Symbol component with floating animation
interface MathSymbolProps {
  symbol: string;
  size?: number;
  color?: string;
  x: number;
  y: number;
  delay?: number;
  duration?: number;
}

export const FloatingMathSymbol: React.FC<MathSymbolProps> = ({
  symbol,
  size = 2,
  color = "#3B82F6",
  x,
  y,
  delay = 0,
  duration = 5
}) => {
  return (
    <motion.div
      className="absolute font-serif pointer-events-none select-none"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        fontSize: `${size}rem`,
        color: color,
        textShadow: `0 0 5px ${color}33, 0 0 15px ${color}22`
      }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ 
        opacity: [0.2, 0.6, 0.2],
        y: [y, y-10, y],
        rotate: [0, 5, -5, 0]
      }}
      transition={{
        delay,
        duration,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
      }}
    >
      {symbol}
    </motion.div>
  );
};

// Export all animations in a collection
export const TopicAnimations = {
  NumberSystems: NumberSystemsAnimation,
  AlgebraicManipulation: AlgebraicAnimation,
  Mensuration: MensurationAnimation,
  LinearPatterns: LinearPatternsAnimation,
  Angles: AnglesAnimation,
  Trigonometry: TrigonometryAnimation
};
