import React, { useEffect, useState, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation, useInView, Variants } from 'framer-motion';
import topics from '../data/topics';
import { Topic, Subtopic } from '../data/topics';

// Animated Mathematical Features
const MathematicalHero: React.FC = () => {
  // Parallax effect state
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mathematical symbols array
  const mathSymbols = ['π', 'e', '∞', '∫', '∑', '√', 'Δ', '±', '≠', '≈', '⊂', '∪', '∩', '∀', '∃', '∇', 'φ', 'θ', 'λ', 'μ'];
  
  // Generate random positions for floating elements
  const floatingElements = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      symbol: mathSymbols[Math.floor(Math.random() * mathSymbols.length)],
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      speed: Math.random() * 0.15 + 0.05,
      delay: Math.random() * 1,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 0.5
    }));
  }, [mathSymbols]);

  return (
    <div className="relative w-full h-[550px] overflow-hidden bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900">
      {/* Grid Background - Graph Paper Effect */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          transform: `translateY(${scrollY * 0.1}px)`
        }}
      />
      
      {/* Golden Ratio Spiral */}
      <motion.div 
        className="absolute opacity-10 right-20 bottom-20 w-[300px] h-[300px]"
        initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
        animate={{ opacity: 0.1, scale: 1, rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        style={{ translateY: scrollY * -0.2 }}
      >
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50,0 A50,50 0 0,1 100,50 A50,50 0 0,1 50,100 A50,50 0 0,1 0,50 A50,50 0 0,1 50,0 Z" stroke="white" strokeWidth="0.5" />
          <path d="M50,50 A50,50 0 0,0 100,50 A50,50 0 0,0 50,0" stroke="white" strokeWidth="0.5" />
          <path d="M50,50 A30.9,30.9 0 0,0 80.9,19.1" stroke="white" strokeWidth="0.5" />
          <path d="M50,50 A19.1,19.1 0 0,1 69.1,69.1" stroke="white" strokeWidth="0.5" />
          <path d="M50,50 A11.8,11.8 0 0,0 38.2,61.8" stroke="white" strokeWidth="0.5" />
          <path d="M50,50 A7.3,7.3 0 0,1 42.7,42.7" stroke="white" strokeWidth="0.5" />
          <path d="M50,50 A4.5,4.5 0 0,0 54.5,45.5" stroke="white" strokeWidth="0.5" />
          <path d="M50,50 A2.8,2.8 0 0,1 52.8,52.8" stroke="white" strokeWidth="0.5" />
        </svg>
      </motion.div>
      
      {/* Floating Mathematical Symbols with Parallax Effect */}
      {floatingElements.map((el, i) => (
        <motion.div
          key={i}
          className="absolute text-white font-serif select-none"
          initial={{ 
            x: `${el.x}%`, 
            y: `${el.y}%`, 
            opacity: 0
          }}
          animate={{ 
            opacity: [0.2, 0.5, 0.2],
            rotate: [el.rotation, el.rotation + 360 * el.rotationSpeed]
          }}
          transition={{ 
            opacity: { 
              duration: 5 + el.delay * 3, 
              repeat: Infinity,
              ease: "easeInOut" 
            },
            rotate: {
              duration: 20 + el.delay * 10,
              repeat: Infinity,
              ease: "linear"
            }
          }}
          style={{
            fontSize: `${el.size}rem`,
            transform: `translate(${el.x}%, ${el.y}%) translateY(${scrollY * -el.speed}px)`
          }}
        >
          {el.symbol}
        </motion.div>
      ))}
      
      {/* Hero Content */}
      <div className="relative h-full flex flex-col justify-center items-center text-center px-4 z-10">
        <motion.h1 
          className="text-5xl md:text-6xl font-bold mb-4 text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Form 3 Mathematics
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl mb-8 max-w-2xl text-indigo-100"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Your journey through Cambridge IGCSE™ International Mathematics
        </motion.p>
        
        {/* Interactive Math Formula Animation */}
        <div className="mb-10">
          <QuadraticFormula />
        </div>
        
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <a 
            href="#main-content" 
            className="px-8 py-3 bg-white text-indigo-900 rounded-full font-bold hover:bg-opacity-90 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Start Learning
          </a>
          <Link
            to="/resources" 
            className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-full font-bold hover:bg-white hover:bg-opacity-10 transition-all"
          >
            Explore Resources
          </Link>
        </motion.div>
      </div>
      
      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg 
          className="relative block w-full h-[50px]" 
          data-name="Layer 1" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
        >
          <path 
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C57.11,101.47,118.75,86.39,162.77,66.28Z" 
            className="fill-gray-50"
          ></path>
        </svg>
      </div>
    </div>
  );
};

// Quadratic Formula Animation Component
const QuadraticFormula: React.FC = () => {
  const [raizWidth, setRaizWidth] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setRaizWidth(100);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <motion.div 
      className="flex items-center justify-center text-xl md:text-3xl text-white font-serif"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.6 }}
    >
      <motion.span 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        x = 
      </motion.span>
      <motion.span 
        className="mx-2 flex items-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1.0 }}
      >
        <span className="flex flex-col items-center">
          <span className="relative">
            {/* Numerator */}
            <motion.div
              className="flex items-center whitespace-nowrap relative z-10 px-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.3 }}
            >
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 1.3 }}
              >
                -b ± 
              </motion.span>
              
              {/* Square root symbol with animation */}
              <div className="relative inline-flex">
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 1.6 }}
                  className="text-indigo-200 mr-0.5"
                >
                  √
                </motion.span>
                
                {/* Content inside the root with a growing line on top */}
                <span className="relative inline-block">
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 1.9 }}
                  >
                    b² - 4ac
                  </motion.span>
                  
                  {/* Root line that extends */}
                  <motion.span 
                    className="absolute left-0 top-0 h-0.5 bg-indigo-200" 
                    initial={{ width: "0%" }}
                    animate={{ width: `${raizWidth}%` }}
                    transition={{ duration: 1, delay: 2.0 }}
                    style={{ marginTop: "-1px" }}
                  />
                </span>
              </div>
            </motion.div>
        
            
            {/* Division line */}
            <motion.div 
              className="h-0.5 bg-indigo-200 my-1"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 0.8, delay: 2.2 }}
            />
            
            {/* Denominator */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 2.5 }}
            >
              2a
            </motion.div>
          </span>
        </span>
      </motion.span>
    </motion.div>
  );
};

// Interactive Topic Card Component with Mathematical Visuals
interface TopicCardProps {
  topic: Topic;
  index: number;
}

const TopicCard: React.FC<TopicCardProps> = ({ topic, index }) => {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false });
  
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);
  
  // Topic-specific math icon components
  const MathIcons: Record<string, React.ReactElement> = {
    'number-algebra': (
      <svg className="w-24 h-24 opacity-10 absolute right-4 bottom-4" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <text x="20" y="40" fontSize="24" fill="currentColor">x²</text>
        <text x="50" y="70" fontSize="24" fill="currentColor">y</text>
        <line x1="10" y1="50" x2="90" y2="50" stroke="currentColor" strokeWidth="2" />
        <text x="40" y="90" fontSize="24" fill="currentColor">π</text>
      </svg>
    ),
    'geometry-measurement': (
      <svg className="w-24 h-24 opacity-10 absolute right-4 bottom-4" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="2" />
        <line x1="10" y1="90" x2="90" y2="10" stroke="currentColor" strokeWidth="2" />
        <polyline points="10,10 30,40 70,20 90,50" fill="none" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
    'trigonometry': (
      <svg className="w-24 h-24 opacity-10 absolute right-4 bottom-4" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path d="M10,90 L90,90 L50,20 Z" fill="none" stroke="currentColor" strokeWidth="2" />
        <text x="40" y="75" fontSize="14" fill="currentColor">sin θ</text>
        <text x="65" y="50" fontSize="14" fill="currentColor">cos θ</text>
      </svg>
    )
  };
  
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };
  
  return (
    <motion.div 
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={controls}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 relative`}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
    >
      <div className={`h-3 ${
        topic.id === 'number-algebra' ? 'bg-blue-500' : 
        topic.id === 'geometry-measurement' ? 'bg-green-500' : 
        'bg-purple-500'
      }`}></div>
      
      <div className="p-6 relative z-10">
        <h2 className={`text-2xl font-bold mb-4 ${
          topic.id === 'number-algebra' ? 'text-blue-800' : 
          topic.id === 'geometry-measurement' ? 'text-green-800' : 
          'text-purple-800'
        }`}>
          {topic.title}
        </h2>
        
        <p className="text-gray-700 mb-6">{topic.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {(topic.subtopics || []).slice(0, 3).map((subtopic: Subtopic, i: number) => (
            <span 
              key={i} 
              className={`text-xs px-2 py-1 rounded-full ${
                topic.id === 'number-algebra' ? 'bg-blue-100 text-blue-800' : 
                topic.id === 'geometry-measurement' ? 'bg-green-100 text-green-800' : 
                'bg-purple-100 text-purple-800'
              }`}
            >
              {subtopic.title}
            </span>
          ))}
          {(topic.subtopics || []).length > 3 && (
            <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-800">
              +{(topic.subtopics || []).length - 3} more
            </span>
          )}
        </div>
        
        <Link
          to={`/topic/${topic.id}`}
          className={`inline-flex items-center px-6 py-2 rounded-lg text-white font-medium transition-colors ${
            topic.id === 'number-algebra' ? 'bg-blue-600 hover:bg-blue-700' : 
            topic.id === 'geometry-measurement' ? 'bg-green-600 hover:bg-green-700' : 
            'bg-purple-600 hover:bg-purple-700'
          }`}
        >
          Explore Topic
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </Link>
      </div>
      
      {/* Topic-specific mathematical visual */}
      <div className={`absolute inset-0 pointer-events-none ${
        topic.id === 'number-algebra' ? 'text-blue-800' : 
        topic.id === 'geometry-measurement' ? 'text-green-800' : 
        'text-purple-800'
      }`}>
        {MathIcons[topic.id]}
      </div>
    </motion.div>
  );
};

// Daily Challenge Component
const DailyChallenge: React.FC = () => {
  const [showSolution, setShowSolution] = useState(false);
  
  return (
    <motion.div 
      className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-6 shadow-md border border-indigo-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
    >
      <h3 className="text-xl font-bold text-indigo-900 mb-3">Today's Math Challenge</h3>
      <p className="text-gray-700 mb-4">
        If the sum of the roots of the quadratic equation x² + bx + 15 = 0 is equal to -6, find the value of b.
      </p>
      
      <div className="flex flex-wrap gap-4 mt-4">
        <button
          onClick={() => setShowSolution(!showSolution)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          {showSolution ? "Hide Solution" : "View Solution"}
        </button>
      </div>
      
      {showSolution && (
        <motion.div 
          className="mt-4 pt-4 border-t border-indigo-100"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-indigo-800 font-medium">Solution:</p>
          <p className="text-gray-700 mt-2">
            For a quadratic equation ax² + bx + c = 0, the sum of roots is equal to -b/a.<br />
            Given equation: x² + bx + 15 = 0 (where a = 1)<br />
            Sum of roots = -b/1 = -6<br />
            Therefore, b = 6
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

// Feature Card Component
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, delay }) => {
  return (
    <motion.div 
      className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="rounded-full w-12 h-12 flex items-center justify-center bg-indigo-100 text-indigo-600 mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

// Main HomePage Component
const HomePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [mathSymbols, setMathSymbols] = useState(['π', 'e', '∞', '∫', '∑', '√', 'Δ', '±', '≠', '≈', '⊂', '∪', '∩', '∀', '∃', '∇', 'φ', 'θ', 'λ', 'μ']);

  const filteredTopics = useMemo(() => {
    return topics.filter(topic => 
      topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      topic.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, mathSymbols]);

  return (
    <>
      {/* Hero Section with Mathematical Visuals */}
      <MathematicalHero />
      
      {/* Main Content */}
      <div id="main-content" className="container mx-auto px-4 py-12">
        {/* Explore Topics Section with Visual Math Elements */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Explore Mathematics Topics</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Our curriculum covers all essential areas of the Cambridge IGCSE™ International Mathematics Extended syllabus, 
              with comprehensive resources to help you excel.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {topics.map((topic, index) => (
              <TopicCard key={topic.id} topic={topic} index={index} />
            ))}
          </div>
        </motion.div>
        
        {/* Challenge of the Day Section */}
        <div className="mb-16">
          <DailyChallenge />
        </div>
        
        {/* Features Section */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Learning Resources</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Our platform offers a variety of resources designed to support your mathematical learning journey.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard 
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              }
              title="Video Tutorials"
              description="Watch detailed explanations and worked examples for every topic in the syllabus."
              delay={0.1}
            />
            <FeatureCard 
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              }
              title="Practice Worksheets"
              description="Download worksheets with solutions to strengthen your understanding and test your knowledge."
              delay={0.2}
            />
            <FeatureCard 
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              }
              title="Interactive Examples"
              description="Engage with interactive exercises and visualizations to deepen your mathematical intuition."
              delay={0.3}
            />
          </div>
        </motion.div>
        
        {/* About Section with Mathematical Elements */}
        <motion.div 
          className="bg-gradient-to-r from-gray-50 to-indigo-50 rounded-xl p-8 relative overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {/* Decorative Mathematical Elements */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
            <svg className="absolute right-0 bottom-0 w-64 h-64 text-indigo-900" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" />
              <line x1="10" y1="50" x2="90" y2="50" stroke="currentColor" strokeWidth="0.5" />
              <line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" strokeWidth="0.5" />
              <ellipse cx="50" cy="50" rx="20" ry="40" fill="none" stroke="currentColor" strokeWidth="0.5" />
              <ellipse cx="50" cy="50" rx="40" ry="20" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </svg>
            
            <div className="absolute left-10 top-10 font-mono text-indigo-800 transform rotate-12">
              E = mc²
            </div>
            
            <div className="absolute right-20 top-20 font-mono text-indigo-800 transform -rotate-6">
              ∫ f(x) dx
            </div>
            
            <div className="absolute left-1/4 bottom-12 font-mono text-indigo-800 transform rotate-3">
              eiπ + 1 = 0
            </div>
          </div>
          
          {/* Content */}
          <div className="relative z-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">About This Website</h2>
            <p className="text-gray-700 mb-4">
              This website is designed to help Form 3 students prepare for their End of Year examinations in Mathematics.
              It follows the Cambridge IGCSE™ International Mathematics (0607) Extended curriculum and provides a variety
              of resources including:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li>PDF worksheets and solutions from Corbett Maths and other sources</li>
              <li>Video tutorials for each topic</li>
              <li>External resources curated by teachers</li>
            </ul>
            <p className="text-gray-700">
              The website is structured by topic, making it easy to find the resources you need for specific areas of study.
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default HomePage;