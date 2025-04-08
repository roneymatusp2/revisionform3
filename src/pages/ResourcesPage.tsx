import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import topics from '../data/topics';
import { 
  getResources, 
  getFilePreview, 
  getFileView,
  RESOURCE_TYPES
} from '../lib/appwrite';
import { motion } from 'framer-motion';
import { mathCurriculum } from '../data/curriculum';

interface Resource {
  id?: string;
  $id?: string;
  topic: string;
  subtopic: string;
  title: string;
  url?: string;
  resourceType?: string;
  fileId?: string;
  bucketId?: string;
  description?: string;
}

interface ResourceTab {
    id: string;
    title: string;
    icon: string;
}

export const ResourcesPage: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [selectedSubtopic, setSelectedSubtopic] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>('practice');

  useEffect(() => {
    loadResources();
  }, []);

  const loadResources = async () => {
    setLoading(true);
    try {
      const result = await getResources();
      if (result.success) {
        // Convert Appwrite documents to Resource type
        const mappedResources = result.resources.map((doc: any) => ({
          $id: doc.$id,
          id: doc.$id,
          topic: doc.topic,
          subtopic: doc.subtopic,
          title: doc.title,
          url: doc.url,
          resourceType: doc.resourceType || RESOURCE_TYPES.EXTERNAL_LINK, // Default for backward compatibility
          fileId: doc.fileId,
          bucketId: doc.bucketId,
          description: doc.description
        }));
        setResources(mappedResources);
      } else {
        setError('Failed to load resources');
      }
    } catch (error) {
      setError('An error occurred while loading resources');
      console.error('Error loading resources:', error);
    } finally {
      setLoading(false);
    }
  };

  // Get all topics that have resources
  const getTopicsWithResources = () => {
    if (!resources || !topics) {
      return [];
    }
    
    const topicsWithResources = new Set<string>();
    resources.forEach(resource => {
      if (resource && resource.topic) {
        topicsWithResources.add(resource.topic);
      }
    });
    
    return topics.filter(topic => topic && topic.id && topicsWithResources.has(topic.id));
  };

  // Get subtopics for a specific topic that have resources
  const getSubtopicsWithResources = (topicId: string) => {
    if (!topicId) return [];
    
    const subtopicsWithResources = new Set<string>();
    resources.forEach(resource => {
      if (resource && resource.topic === topicId && resource.subtopic) {
        subtopicsWithResources.add(resource.subtopic);
      }
    });
    
    const topic = topics.find(t => t.id === topicId);
    if (!topic || !topic.subtopics) return [];
    
    return topic.subtopics.filter(subtopic => 
      subtopic && subtopic.id && subtopicsWithResources.has(subtopic.id)
    ) || [];
  };

  // Filter resources by topic and subtopic
  const getFilteredResources = () => {
    if (!resources || resources.length === 0) {
      return [];
    }
    
    return resources.filter(resource => {
      // Make sure resource has required properties
      if (!resource || !resource.topic || !resource.subtopic) {
        return false;
      }
      
      if (selectedTopic && resource.topic !== selectedTopic) {
        return false;
      }
      if (selectedSubtopic && resource.subtopic !== selectedSubtopic) {
        return false;
      }
      return true;
    });
  };

  // Reset filters
  const resetFilters = () => {
    setSelectedTopic(null);
    setSelectedSubtopic(null);
  };

  // Display resource content based on type
  const renderResourceContent = (resource: Resource) => {
    if (!resource) {
      return <span className="text-gray-500">Invalid resource</span>;
    }
    
    // For external links and YouTube videos
    if (resource.url) {
      if (resource.resourceType === RESOURCE_TYPES.YOUTUBE) {
        // Extract video ID for embedding
        let videoId;
        try {
          const url = new URL(resource.url);
          if (url.hostname.includes('youtube.com')) {
            videoId = url.searchParams.get('v');
          } else if (url.hostname.includes('youtu.be')) {
            videoId = url.pathname.substring(1);
          }
          
          if (videoId) {
            return (
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <iframe 
                  src={`https://www.youtube.com/embed/${videoId}`} 
                  title="Math Video Resource"
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen 
                  className="w-full h-64"
                ></iframe>
              </div>
            );
          }
        } catch (error) {
          console.error('Error parsing YouTube URL:', error);
          // Fall back to regular link display
        }
      }
      
      return (
        <a 
          href={resource.url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-blue-600 hover:underline flex items-center"
        >
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path>
            <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path>
          </svg>
          Open External Resource
        </a>
      );
    }
    
    // For uploaded files
    if (resource.fileId && resource.bucketId) {
      try {
        const previewUrl = getFilePreview(resource.bucketId, resource.fileId);
        const viewUrl = getFileView(resource.bucketId, resource.fileId);
        
        if (!previewUrl || !viewUrl) {
          return <span className="text-gray-500">File preview not available</span>;
        }
        
        if (resource.resourceType === RESOURCE_TYPES.PDF_EXERCISE || resource.resourceType === RESOURCE_TYPES.PDF_ANSWERS) {
          return (
            <div>
              <a 
                href={viewUrl.toString()} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-blue-600 hover:underline flex items-center mb-2"
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd"></path>
                </svg>
                View PDF {resource.resourceType === RESOURCE_TYPES.PDF_EXERCISE ? 'Exercise' : 'Answers'}
              </a>
            </div>
          );
        } else if (resource.resourceType === RESOURCE_TYPES.VIDEO) {
          return (
            <div>
              <video 
                controls 
                className="w-full max-h-64 rounded mb-2"
                src={viewUrl.toString()}
              >
                Your browser does not support the video tag.
              </video>
            </div>
          );
        }
      } catch (error) {
        console.error('Error generating file URLs:', error);
        return <span className="text-gray-500">Error loading file</span>;
      }
    }
    
    return <span className="text-gray-500">No preview available</span>;
  };

  const tabs: ResourceTab[] = [
    { id: 'practice', title: 'Practice Questions', icon: '📝' },
    { id: 'videos', title: 'Video Lessons', icon: '🎥' },
    { id: 'worksheets', title: 'Worksheets', icon: '📄' },
    { id: 'calculator', title: 'Calculator Tools', icon: '🔢' }
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <div className="text-center mb-12">
        <motion.h1 
          className="text-4xl font-bold text-indigo-900 mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Learning Resources
        </motion.h1>
        <motion.p 
          className="text-lg text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Explore our comprehensive collection of math learning materials
        </motion.p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center mb-8 space-x-4">
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 rounded-full flex items-center space-x-2 transition-colors ${
              activeTab === tab.id
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'bg-white text-indigo-600 hover:bg-indigo-50'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-xl">{tab.icon}</span>
            <span className="font-medium">{tab.title}</span>
          </motion.button>
        ))}
      </div>

      {/* Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {mathCurriculum.map((section) => (
          <motion.div
            key={section.id}
            variants={itemVariants}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
          >
            <div className="p-6">
              <h3 className="text-xl font-bold text-indigo-900 mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.topics.map((topic) => (
                  <li key={topic.id} className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600 mr-3">
                      {activeTab === 'practice' && '📝'}
                      {activeTab === 'videos' && '🎥'}
                      {activeTab === 'worksheets' && '📄'}
                      {activeTab === 'calculator' && '🔢'}
                    </span>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {topic.title}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {topic.content}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
              <motion.button
                className="mt-6 w-full px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg font-medium hover:bg-indigo-100 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                View All Resources
              </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Floating Action Button */}
      <motion.button
        className="fixed bottom-8 right-8 w-14 h-14 bg-indigo-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-indigo-700"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <span className="text-2xl">💡</span>
      </motion.button>
    </motion.div>
  );
};

export default ResourcesPage;
