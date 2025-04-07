import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import topics from '../data/topics';
import videos from '../data/videos';
import pdfs from '../data/pdfs';

type VideoType = {
  id: string;
  title: string;
  url: string;
};

type PdfType = {
  id: string;
  title: string;
  url: string;
  type: string;
};

type VideosDataType = {
  [key: string]: {
    [key: string]: VideoType[];
  };
};

type PdfsDataType = {
  [key: string]: {
    [key: string]: PdfType[];
  };
};

const SubtopicPage: React.FC = () => {
  const { topicId, subtopicId } = useParams<{ topicId: string; subtopicId: string }>();
  const [activeTab, setActiveTab] = useState<'pdfs' | 'videos' | 'external'>('pdfs');

  // Find the current topic and subtopic
  const currentTopic = topics.find(topic => topic.id === topicId);
  const currentSubtopic = currentTopic?.subtopics.find(subtopic => subtopic.id === subtopicId);

  // Get resources for this subtopic
  const subtopicVideos = topicId && subtopicId ? 
    ((videos as VideosDataType)[topicId]?.[subtopicId] || []) : 
    [];
    
  const subtopicPdfs = topicId && subtopicId ? 
    ((pdfs as PdfsDataType)[topicId]?.[subtopicId] || []) : 
    [];

  if (!currentTopic || !currentSubtopic) {
    return (
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-red-600">Subtopic not found</h1>
          <p className="mt-4">
            The subtopic you're looking for doesn't exist. Please return to the{' '}
            <Link to="/" className="text-blue-600 hover:underline">
              homepage
            </Link>
            .
          </p>
        </div>
    );
  }

  return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to={`/topic/${topicId}`} className="text-blue-600 hover:underline">
            &larr; Back to {currentTopic.title}
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-indigo-700 mb-6">{currentSubtopic.title}</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="border-b border-gray-200 mb-6">
            <nav className="flex space-x-8">
              <button
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'pdfs'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('pdfs')}
              >
                PDF Resources
              </button>
              <button
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'videos'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('videos')}
              >
                Video Tutorials
              </button>
              <button
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'external'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('external')}
              >
                External Resources
              </button>
            </nav>
          </div>

          {activeTab === 'pdfs' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">PDF Worksheets and Solutions</h2>
              
              {subtopicPdfs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {subtopicPdfs.map((pdf) => (
                    <div key={pdf.id} className="bg-gray-50 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                      <h3 className="font-medium text-indigo-600 mb-2">{pdf.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">
                        {pdf.type === 'questions' && 'Practice questions and exercises'}
                        {pdf.type === 'answers' && 'Solutions and answers'}
                        {pdf.type === 'reference' && 'Reference material and theory'}
                      </p>
                      <a
                        href={pdf.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
                      >
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
                          <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"></path>
                        </svg>
                        View PDF
                      </a>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">No PDF resources available for this subtopic yet.</p>
              )}
            </div>
          )}

          {activeTab === 'videos' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Video Tutorials</h2>
              
              {subtopicVideos.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {subtopicVideos.map((video) => (
                    <div key={video.id} className="bg-gray-50 rounded-lg overflow-hidden shadow-sm">
                      <div className="aspect-w-16 aspect-h-9">
                        <iframe
                          src={video.url}
                          title={video.title}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="w-full h-full"
                        ></iframe>
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium text-indigo-600">{video.title}</h3>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">No video tutorials available for this subtopic yet.</p>
              )}
            </div>
          )}

          {activeTab === 'external' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">External Resources</h2>
              
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-blue-700">
                      External resources are added by teachers. Visit the Resources page to add new links.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                <ul className="divide-y divide-gray-200">
                  <li className="px-4 py-3">
                    <a href="https://www.drfrostmaths.com/" target="_blank" rel="noopener noreferrer" className="flex items-center hover:bg-gray-50">
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-indigo-600">Dr. Frost Maths</p>
                        <p className="text-sm text-gray-500">Interactive resources and practice questions</p>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                          <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                        </svg>
                      </div>
                    </a>
                  </li>
                  <li className="px-4 py-3">
                    <a href="https://www.mathsgenie.co.uk/" target="_blank" rel="noopener noreferrer" className="flex items-center hover:bg-gray-50">
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-indigo-600">Maths Genie</p>
                        <p className="text-sm text-gray-500">GCSE revision with worksheets and solutions</p>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                          <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                        </svg>
                      </div>
                    </a>
                  </li>
                  <li className="px-4 py-3">
                    <a href="https://www.mathswatch.co.uk/" target="_blank" rel="noopener noreferrer" className="flex items-center hover:bg-gray-50">
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-indigo-600">MathsWatch</p>
                        <p className="text-sm text-gray-500">Video tutorials and practice questions</p>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                          <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                        </svg>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
  );
};

export default SubtopicPage;
