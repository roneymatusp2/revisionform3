import React, { useState, useEffect, useRef } from 'react';
import { 
  teacherAuth, 
  addResource, 
  removeResource, 
  getResources,
  uploadFile,
  deleteFile,
  STORAGE_BUCKETS,
  RESOURCE_TYPES,
  getFilePreview
} from '../lib/appwrite';
import { Models } from 'appwrite';
import topics from '../data/topics';

// Define resource type
interface Resource {
  id?: string;
  $id?: string; // Appwrite document ID
  topic: string;
  subtopic: string;
  title: string;
  url?: string; // Optional for direct uploads
  resourceType: string;
  fileId?: string; // For uploaded files
  bucketId?: string; // For uploaded files
  description?: string;
}

const TeacherAdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [selectedSubtopic, setSelectedSubtopic] = useState('');
  const [resourceTitle, setResourceTitle] = useState('');
  const [resourceUrl, setResourceUrl] = useState('');
  const [resourceDescription, setResourceDescription] = useState('');
  const [resourceType, setResourceType] = useState(RESOURCE_TYPES.EXTERNAL_LINK);
  const [message, setMessage] = useState('');
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Check if there's a stored authentication state
    const authState = localStorage.getItem('teacherAuthenticated');
    if (authState === 'true') {
      setIsAuthenticated(true);
      loadResources();
    }
  }, []);

  const loadResources = async () => {
    setLoading(true);
    try {
      const result = await getResources();
      if (result.success) {
        // Convert Appwrite documents to Resource type
        const resources = result.resources.map((doc: Models.Document) => ({
          $id: doc.$id,
          id: doc.$id, // Keep id for compatibility
          topic: doc.topic,
          subtopic: doc.subtopic,
          title: doc.title,
          url: doc.url,
          resourceType: doc.resourceType || RESOURCE_TYPES.EXTERNAL_LINK, // Default for backward compatibility
          fileId: doc.fileId,
          bucketId: doc.bucketId,
          description: doc.description
        }));
        setResources(resources);
      }
    } catch (error) {
      console.error("Error loading resources:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setAuthError('');
    
    try {
      const result = await teacherAuth(password);
      if (result.success) {
        setIsAuthenticated(true);
        setPassword('');
        // Store authentication state in localStorage
        localStorage.setItem('teacherAuthenticated', 'true');
        // Store password securely for resource operations
        sessionStorage.setItem('teacherPassword', password);
        loadResources(); // Load resources after successful login
      } else {
        setAuthError('Incorrect password. Please try again.');
      }
    } catch (error) {
      setAuthError('Authentication error: ' + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('teacherAuthenticated');
    sessionStorage.removeItem('teacherPassword');
  };

  const handleAddResource = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTopic || !selectedSubtopic || !resourceTitle) {
      setMessage('Please fill in all required fields.');
      return;
    }

    // For URL resources, validate URL
    if (resourceType === RESOURCE_TYPES.EXTERNAL_LINK || resourceType === RESOURCE_TYPES.YOUTUBE) {
      if (!resourceUrl) {
        setMessage('URL is required for external links and YouTube videos.');
        return;
      }

      try {
        new URL(resourceUrl);
      } catch (error) {
        setMessage('Please enter a valid URL (include http:// or https://).');
        return;
      }
    }

    // For file uploads, check if file is selected
    if (resourceType !== RESOURCE_TYPES.EXTERNAL_LINK && resourceType !== RESOURCE_TYPES.YOUTUBE) {
      if (!fileInputRef.current?.files?.length) {
        setMessage('Please select a file to upload.');
        return;
      }
    }

    setLoading(true);
    setMessage('');

    try {
      const authPassword = sessionStorage.getItem('teacherPassword') || '';
      let fileId = '';
      let bucketId = '';

      // Handle file upload if needed
      if (resourceType !== RESOURCE_TYPES.EXTERNAL_LINK && resourceType !== RESOURCE_TYPES.YOUTUBE) {
        const file = fileInputRef.current?.files?.[0];
        if (!file) {
          setMessage('No file selected.');
          setLoading(false);
          return;
        }

        // Determine which bucket to use
        if (resourceType === RESOURCE_TYPES.PDF_EXERCISE || resourceType === RESOURCE_TYPES.PDF_ANSWERS) {
          bucketId = STORAGE_BUCKETS.PDF;
        } else if (resourceType === RESOURCE_TYPES.VIDEO) {
          bucketId = STORAGE_BUCKETS.VIDEOS;
        }

        // Upload the file
        const uploadResult = await uploadFile(bucketId, file, authPassword);
        if (!uploadResult.success) {
          setMessage('Error uploading file: ' + uploadResult.error);
          setLoading(false);
          return;
        }

        // Make sure file exists before accessing its properties
        if (uploadResult.file && uploadResult.file.$id) {
          fileId = uploadResult.file.$id;
        } else {
          setMessage('Error accessing uploaded file information');
          setLoading(false);
          return;
        }
      }

      // Create the resource document
      const resource: Resource = {
        topic: selectedTopic,
        subtopic: selectedSubtopic,
        title: resourceTitle,
        resourceType: resourceType,
        description: resourceDescription || undefined
      };

      // Add URL for external resources
      if (resourceType === RESOURCE_TYPES.EXTERNAL_LINK || resourceType === RESOURCE_TYPES.YOUTUBE) {
        resource.url = resourceUrl;
      }

      // Add file references for uploaded files
      if (fileId && bucketId) {
        resource.fileId = fileId;
        resource.bucketId = bucketId;
      }
      
      // Add the resource to the database
      const result = await addResource(resource, authPassword);
      
      if (result.success) {
        setMessage('Resource added successfully!');
        // Reset form
        setResourceTitle('');
        setResourceUrl('');
        setResourceDescription('');
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        // Reload resources list
        loadResources();
      } else {
        setMessage('Error adding resource: ' + result.error);
      }
    } catch (error) {
      setMessage('Error adding resource: ' + (error as Error).message);
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  const handleRemoveResource = async (resource: Resource) => {
    if (!resource.$id && !resource.id) {
      setMessage('Cannot remove resource: Invalid resource ID');
      return;
    }

    setLoading(true);
    try {
      const authPassword = sessionStorage.getItem('teacherPassword') || '';
      const resourceId = resource.$id || resource.id || '';

      // If resource has an associated file, delete it first
      if (resource.fileId && resource.bucketId) {
        const deleteFileResult = await deleteFile(resource.bucketId, resource.fileId, authPassword);
        if (!deleteFileResult.success) {
          setMessage('Error removing resource file: ' + deleteFileResult.error);
          setLoading(false);
          return;
        }
      }

      // Now delete the resource document
      const result = await removeResource(resourceId, authPassword);
      
      if (result.success) {
        setMessage('Resource removed successfully!');
        // Reload resources
        loadResources();
      } else {
        setMessage('Error removing resource: ' + result.error);
      }
    } catch (error) {
      setMessage('Error removing resource: ' + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  // Get subtopics for selected topic
  const getSubtopics = () => {
    if (!selectedTopic) return [];
    const topic = topics.find(t => t.id === selectedTopic);
    return topic ? topic.subtopics : [];
  };

  // Display resource type with appropriate link or preview
  const resourceTypeDisplay = (resource: Resource) => {
    // For external links and YouTube videos
    if (resource.url) {
      return (
        <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline truncate block max-w-xs">
          {resource.resourceType === RESOURCE_TYPES.YOUTUBE ? 'YouTube Video' : 'External Link'}
        </a>
      );
    }
    
    // For uploaded files
    if (resource.fileId && resource.bucketId) {
      const previewUrl = getFilePreview(resource.bucketId, resource.fileId);
      
      if (resource.resourceType === RESOURCE_TYPES.PDF_EXERCISE || resource.resourceType === RESOURCE_TYPES.PDF_ANSWERS) {
        return (
          <a href={previewUrl.toString()} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline truncate block max-w-xs">
            {resource.resourceType === RESOURCE_TYPES.PDF_EXERCISE ? 'PDF Exercise' : 'PDF Answers'}
          </a>
        );
      } else if (resource.resourceType === RESOURCE_TYPES.VIDEO) {
        return (
          <a href={previewUrl.toString()} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline truncate block max-w-xs">
            Video File
          </a>
        );
      }
    }
    
    return 'Unknown Type';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Teacher Area</h1>
      
      {!isAuthenticated ? (
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-6">Teacher Login</h2>
          {authError && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">Incorrect password. Please try again.</div>}
          
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Access Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your access password"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              {loading ? 'Authenticating...' : 'Login'}
            </button>
          </form>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Manage Resources</h2>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Logout
            </button>
          </div>
          
          {message && (
            <div className={`${message.includes('Error') ? 'bg-red-100 border-red-400 text-red-700' : 'bg-green-100 border-green-400 text-green-700'} px-4 py-3 rounded mb-4 border`}>
              {message}
            </div>
          )}
          
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h3 className="text-xl font-semibold mb-4">Add New Resource</h3>
            <form onSubmit={handleAddResource}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Topic*
                  </label>
                  <select
                    value={selectedTopic}
                    onChange={(e) => {
                      setSelectedTopic(e.target.value);
                      setSelectedSubtopic('');
                    }}
                    className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  >
                    <option value="">Select a topic</option>
                    {topics.map(topic => (
                      <option key={topic.id} value={topic.id}>{topic.title}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Subtopic*
                  </label>
                  <select
                    value={selectedSubtopic}
                    onChange={(e) => setSelectedSubtopic(e.target.value)}
                    className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    disabled={!selectedTopic}
                    required
                  >
                    <option value="">Select a subtopic</option>
                    {getSubtopics().map(subtopic => (
                      <option key={subtopic.id} value={subtopic.id}>{subtopic.title}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Resource Title*
                  </label>
                  <input
                    type="text"
                    value={resourceTitle}
                    onChange={(e) => setResourceTitle(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="E.g.: Algebra Exercises"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Resource Type*
                  </label>
                  <select
                    value={resourceType}
                    onChange={(e) => setResourceType(e.target.value)}
                    className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  >
                    <option value={RESOURCE_TYPES.EXTERNAL_LINK}>External Website Link</option>
                    <option value={RESOURCE_TYPES.YOUTUBE}>YouTube Video</option>
                    <option value={RESOURCE_TYPES.PDF_EXERCISE}>PDF Exercise</option>
                    <option value={RESOURCE_TYPES.PDF_ANSWERS}>PDF Answers</option>
                    <option value={RESOURCE_TYPES.VIDEO}>Video Upload</option>
                  </select>
                </div>
                
                {(resourceType === RESOURCE_TYPES.EXTERNAL_LINK || resourceType === RESOURCE_TYPES.YOUTUBE) ? (
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Resource URL*
                    </label>
                    <input
                      type="url"
                      value={resourceUrl}
                      onChange={(e) => setResourceUrl(e.target.value)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder={resourceType === RESOURCE_TYPES.YOUTUBE ? "https://www.youtube.com/watch?v=..." : "https://example.com/resource"}
                      required
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Upload File*
                    </label>
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      accept={resourceType.includes('pdf') ? ".pdf" : "video/*"}
                      required
                    />
                    {uploadProgress > 0 && uploadProgress < 100 && (
                      <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${uploadProgress}%` }}></div>
                      </div>
                    )}
                  </div>
                )}
                
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Description (Optional)
                  </label>
                  <textarea
                    value={resourceDescription}
                    onChange={(e) => setResourceDescription(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Brief description of this resource"
                    rows={3}
                  />
                </div>
              
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                >
                  {loading ? 'Adding...' : 'Add Resource'}
                </button>
              </div>
            </form>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Existing Resources</h3>
            {resources.length === 0 ? (
              <p className="text-gray-500">No resources added yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Topic
                      </th>
                      <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Subtopic
                      </th>
                      <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Title
                      </th>
                      <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Content
                      </th>
                      <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {resources.map((resource, index) => (
                      <tr key={index}>
                        <td className="py-2 px-4 border-b border-gray-200">
                          {topics.find(t => t.id === resource.topic)?.title || resource.topic}
                        </td>
                        <td className="py-2 px-4 border-b border-gray-200">
                          {topics.find(t => t.id === resource.topic)?.subtopics.find(s => s.id === resource.subtopic)?.title || resource.subtopic}
                        </td>
                        <td className="py-2 px-4 border-b border-gray-200">{resource.title}</td>
                        <td className="py-2 px-4 border-b border-gray-200">
                          {resourceTypeDisplay(resource)}
                        </td>
                        <td className="py-2 px-4 border-b border-gray-200">
                          <button
                            onClick={() => handleRemoveResource(resource)}
                            className="text-red-500 hover:text-red-700"
                            disabled={loading}
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherAdminPage;
