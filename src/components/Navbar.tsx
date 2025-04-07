import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { mathCurriculum } from '../data/curriculum';
import { motion } from 'framer-motion';

interface SubtopicItem {
  id: string;
  title: string;
  content: string;
}

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close mobile menu when location changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);
  
  // Math symbols for decorative purposes
  const mathSymbols = ['π', '∑', '∫', '√', '∞', 'θ', 'Δ', '≡'];
  
  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white text-indigo-900 shadow-md' 
        : 'bg-indigo-900 text-white'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-3 relative">
          {/* Decorative math symbols - visible only when scrolled */}
          {scrolled && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {mathSymbols.map((symbol, i) => (
                <span 
                  key={i}
                  className="absolute text-indigo-100 opacity-10 select-none"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${i * 12 + Math.random() * 5}%`,
                    fontSize: `${Math.random() * 0.8 + 0.8}rem`,
                    transform: `rotate(${Math.random() * 30 - 15}deg)`
                  }}
                >
                  {symbol}
                </span>
              ))}
            </div>
          )}
          
          {/* Logo and brand */}
          <div className="flex items-center space-x-2">
            <Link to="/" className="text-xl font-bold flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-2 ${
                scrolled ? 'bg-indigo-100 text-indigo-900' : 'bg-indigo-800 text-white'
              }`}>
                <span className="font-serif">∫</span>
              </div>
              <span className="hidden sm:inline">Form 3 Math Revision</span>
              <span className="sm:hidden">Math</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <NavLink to="/" scrolled={scrolled}>
              Home
            </NavLink>
            
            <NavDropdown 
              to="/topic/number-algebra" 
              title="Number & Algebra" 
              items={mathCurriculum[0].topics.map(topic => ({
                id: topic.id,
                title: topic.title,
                content: topic.content
              }))}
              scrolled={scrolled}
              color="blue"
            />
            
            <NavDropdown 
              to="/topic/geometry-measurement" 
              title="Geometry & Measurement" 
              items={mathCurriculum[1].topics.map(topic => ({
                id: topic.id,
                title: topic.title,
                content: topic.content
              }))}
              scrolled={scrolled}
              color="green"
            />
            
            <NavDropdown 
              to="/topic/trigonometry" 
              title="Trigonometry" 
              items={mathCurriculum[2].topics.map(topic => ({
                id: topic.id,
                title: topic.title,
                content: topic.content
              }))}
              scrolled={scrolled}
              color="purple"
            />
            
            <NavLink to="/resources" scrolled={scrolled}>
              Resources
            </NavLink>
            
            <div className="ml-2">
              <Link 
                to="/teacher-admin" 
                className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  scrolled 
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                    : 'bg-white text-indigo-900 hover:bg-indigo-50'
                }`}
              >
                Staff Access
              </Link>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-md transition-colors ${
                scrolled 
                  ? 'hover:bg-indigo-100' 
                  : 'hover:bg-indigo-800'
              }`}
              aria-label="Toggle menu"
            >
              {!isOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }} 
            animate={{ opacity: 1, height: 'auto' }} 
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className={`overflow-hidden md:hidden ${scrolled ? 'bg-white' : 'bg-indigo-800'}`}
          >
            <div className="py-2 space-y-1">
              <MobileNavLink to="/" scrolled={scrolled}>Home</MobileNavLink>
              <MobileNavLink to="/topic/number-algebra" scrolled={scrolled}>Number & Algebra</MobileNavLink>
              <MobileNavLink to="/topic/geometry-measurement" scrolled={scrolled}>Geometry & Measurement</MobileNavLink>
              <MobileNavLink to="/topic/trigonometry" scrolled={scrolled}>Trigonometry</MobileNavLink>
              <MobileNavLink to="/resources" scrolled={scrolled}>Resources</MobileNavLink>
              <div className="px-4 py-2">
                <Link 
                  to="/teacher-admin" 
                  className={`block w-full text-center py-2 rounded-md transition-colors ${
                    scrolled 
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                      : 'bg-white text-indigo-900 hover:bg-indigo-50'
                  }`}
                >
                  Staff Access
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  scrolled: boolean;
}

// Desktop navigation link
const NavLink: React.FC<NavLinkProps> = ({ to, children, scrolled }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link 
      to={to} 
      className={`relative px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        isActive 
          ? scrolled 
            ? 'bg-indigo-100 text-indigo-900' 
            : 'bg-indigo-800 text-white'
          : scrolled 
            ? 'hover:bg-indigo-50' 
            : 'hover:bg-indigo-800'
      }`}
    >
      {children}
      {isActive && (
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-current mx-3"
          layoutId="navbar-underline"
        />
      )}
    </Link>
  );
};

// Mobile navigation link
const MobileNavLink: React.FC<NavLinkProps> = ({ to, children, scrolled }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link 
      to={to} 
      className={`block px-4 py-2 text-base font-medium ${
        isActive 
          ? scrolled 
            ? 'bg-indigo-100 text-indigo-900' 
            : 'bg-indigo-700 text-white'
          : scrolled 
            ? 'text-indigo-900 hover:bg-indigo-50' 
            : 'text-white hover:bg-indigo-700'
      }`}
    >
      {children}
    </Link>
  );
};

interface NavDropdownProps {
  to: string;
  title: string;
  items: SubtopicItem[];
  scrolled: boolean;
  color: 'blue' | 'green' | 'purple';
}

type ColorMapType = {
  [key in 'blue' | 'green' | 'purple']: {
    bg: string;
    hover: string;
    text: string;
  }
};

// Navigation dropdown for desktop
const NavDropdown: React.FC<NavDropdownProps> = ({ to, title, items, scrolled, color }) => {
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();
  const isActive = location.pathname === to;
  
  const colorMap: ColorMapType = {
    blue: {
      bg: 'bg-blue-50',
      hover: 'hover:bg-blue-100',
      text: 'text-blue-800'
    },
    green: {
      bg: 'bg-green-50',
      hover: 'hover:bg-green-100',
      text: 'text-green-800'
    },
    purple: {
      bg: 'bg-purple-50',
      hover: 'hover:bg-purple-100',
      text: 'text-purple-800'
    }
  };
  
  const themeColor = colorMap[color] || colorMap.blue;
  
  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link 
        to={to} 
        className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
          isActive 
            ? scrolled 
              ? 'bg-indigo-100 text-indigo-900' 
              : 'bg-indigo-800 text-white'
            : scrolled 
              ? 'hover:bg-indigo-50' 
              : 'hover:bg-indigo-800'
        }`}
      >
        {title}
        <svg 
          className={`ml-1 w-4 h-4 transition-transform ${isHovered ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </Link>
      
      {isHovered && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className={`absolute left-0 mt-1 w-64 rounded-md shadow-lg z-20 ${scrolled ? themeColor.bg : 'bg-indigo-900'}`}
        >
          <div className="py-1 rounded-md ring-1 ring-black ring-opacity-5 text-sm">
            {/* Math symbols decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {['∫', '∑', '∞', '≡'].map((symbol, i) => (
                <span 
                  key={i}
                  className={`absolute opacity-5 select-none ${scrolled ? themeColor.text : 'text-white'}`}
                  style={{
                    top: `${20 + i * 25}%`,
                    right: '10%',
                    fontSize: '1.5rem',
                    transform: `rotate(${i * 45}deg)`
                  }}
                >
                  {symbol}
                </span>
              ))}
            </div>
            
            <div className="relative p-2 max-h-60 overflow-y-auto">
              {items.map((item) => (
                <Link 
                  key={item.id} 
                  to={`/subtopic/${item.id}`}
                  className={`block px-3 py-2 rounded-md ${
                    scrolled 
                      ? `${themeColor.text} ${themeColor.hover}` 
                      : 'text-white hover:bg-indigo-800'
                  }`}
                >
                  <p className="font-medium">{item.title}</p>
                  <p className={`text-xs truncate ${scrolled ? 'text-gray-600' : 'text-indigo-200'}`}>
                    {item.content}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Navbar;