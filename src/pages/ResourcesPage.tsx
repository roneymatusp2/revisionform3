import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import topics from '../data/topics';
import { 
  getResources, 
  getFilePreview, 
  getFileView,
  RESOURCE_TYPES
} from '../lib/appwrite';

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

const ResourcesPage: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [selectedSubtopic, setSelectedSubtopic] = useState<string | null>(null);

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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-indigo-700 mb-6">Math Resources</h1>
      
      {loading ? (
        <div className="flex justify-center items-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      ) : (
        <div>
          {/* Filters */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex flex-wrap items-center space-x-4">
              <div className="mb-4 sm:mb-0">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Filter by Topic
                </label>
                <select
                  value={selectedTopic || ''}
                  onChange={(e) => {
                    const value = e.target.value;
                    setSelectedTopic(value || null);
                    setSelectedSubtopic(null);
                  }}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="">All Topics</option>
                  {getTopicsWithResources().map((topic) => (
                    <option key={topic.id} value={topic.id}>
                      {topic.title}
                    </option>
                  ))}
                </select>
              </div>
              
              {selectedTopic && (
                <div className="mb-4 sm:mb-0">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Filter by Subtopic
                  </label>
                  <select
                    value={selectedSubtopic || ''}
                    onChange={(e) => {
                      const value = e.target.value;
                      setSelectedSubtopic(value || null);
                    }}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  >
                    <option value="">All Subtopics</option>
                    {getSubtopicsWithResources(selectedTopic).map((subtopic) => (
                      <option key={subtopic.id} value={subtopic.id}>
                        {subtopic.title}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              
              <div className="flex-shrink-0 self-end mb-4 sm:mb-0">
                <button
                  onClick={resetFilters}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                  </svg>
                  Reset Filters
                </button>
              </div>
            </div>
          </div>
          
          {/* Resources Grid */}
          {getFilteredResources().length === 0 ? (
            <div className="text-center py-10 bg-white rounded-lg shadow-md">
              <p className="text-gray-600 mb-2">No resources found.</p>
              <p className="text-sm text-gray-500">Try adjusting your filters or check back later for new resources.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getFilteredResources().map((resource) => {
                const topic = topics.find(t => t.id === resource.topic);
                const subtopic = topic?.subtopics.find(s => s.id === resource.subtopic);
                
                return (
                  <div key={resource.$id || resource.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
                    <div className="p-6 flex-grow">
                      <div className="text-xs text-gray-500 font-medium mb-2">
                        {topic?.title} &gt; {subtopic?.title}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">
                        {resource.title}
                      </h3>
                      {resource.description && (
                        <p className="text-gray-600 mb-4 text-sm">
                          {resource.description}
                        </p>
                      )}
                    </div>
                    
                    <div className="px-6 pb-6">
                      {renderResourceContent(resource)}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ResourcesPage;
