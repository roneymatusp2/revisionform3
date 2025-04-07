import React, { useEffect, useState } from 'react';
import { AppwriteService } from '../services/appwriteService';

interface Resource {
    $id: string;
    title: string;
    type: string;
    fileId: string;
    resourceType: string;
}

interface ResourceDisplayProps {
    subtopicId: string;
}

export const ResourceDisplay: React.FC<ResourceDisplayProps> = ({ subtopicId }) => {
    const [resources, setResources] = useState<{
        questions: Resource[];
        answers: Resource[];
        reference: Resource[];
        videos: Resource[];
    }>({
        questions: [],
        answers: [],
        reference: [],
        videos: []
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchResources = async () => {
            try {
                setLoading(true);
                const allResources = await AppwriteService.getResourcesBySubtopic(subtopicId);
                
                // Organize resources by type
                const organized = {
                    questions: [] as Resource[],
                    answers: [] as Resource[],
                    reference: [] as Resource[],
                    videos: [] as Resource[]
                };

                allResources.forEach((resource: Resource) => {
                    if (resource.resourceType in organized) {
                        organized[resource.resourceType as keyof typeof organized].push(resource);
                    }
                });

                setResources(organized);
            } catch (err) {
                setError('Failed to load resources');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchResources();
    }, [subtopicId]);

    const handleResourceClick = async (resource: Resource) => {
        try {
            if (resource.type === 'pdf') {
                const url = AppwriteService.getFileView(resource.fileId);
                window.open(url, '_blank');
            } else if (resource.type === 'video') {
                window.open(resource.fileId, '_blank'); // fileId contains YouTube URL for videos
            }
        } catch (err) {
            console.error('Error opening resource:', err);
            setError('Failed to open resource');
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-48">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-red-500 p-4 text-center">
                {error}
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Questions Section */}
            {resources.questions.length > 0 && (
                <section>
                    <h3 className="text-xl font-semibold mb-4">Practice Questions</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {resources.questions.map((resource) => (
                            <button
                                key={resource.$id}
                                onClick={() => handleResourceClick(resource)}
                                className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
                            >
                                <h4 className="font-medium">{resource.title}</h4>
                                <p className="text-sm text-gray-500">Click to open PDF</p>
                            </button>
                        ))}
                    </div>
                </section>
            )}

            {/* Answers Section */}
            {resources.answers.length > 0 && (
                <section>
                    <h3 className="text-xl font-semibold mb-4">Solutions</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {resources.answers.map((resource) => (
                            <button
                                key={resource.$id}
                                onClick={() => handleResourceClick(resource)}
                                className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
                            >
                                <h4 className="font-medium">{resource.title}</h4>
                                <p className="text-sm text-gray-500">Click to open PDF</p>
                            </button>
                        ))}
                    </div>
                </section>
            )}

            {/* Reference Materials Section */}
            {resources.reference.length > 0 && (
                <section>
                    <h3 className="text-xl font-semibold mb-4">Reference Materials</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {resources.reference.map((resource) => (
                            <button
                                key={resource.$id}
                                onClick={() => handleResourceClick(resource)}
                                className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
                            >
                                <h4 className="font-medium">{resource.title}</h4>
                                <p className="text-sm text-gray-500">Click to open PDF</p>
                            </button>
                        ))}
                    </div>
                </section>
            )}

            {/* Videos Section */}
            {resources.videos.length > 0 && (
                <section>
                    <h3 className="text-xl font-semibold mb-4">Video Lessons</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {resources.videos.map((resource) => (
                            <button
                                key={resource.$id}
                                onClick={() => handleResourceClick(resource)}
                                className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
                            >
                                <h4 className="font-medium">{resource.title}</h4>
                                <p className="text-sm text-gray-500">Click to watch video</p>
                            </button>
                        ))}
                    </div>
                </section>
            )}

            {Object.values(resources).every(arr => arr.length === 0) && (
                <div className="text-center text-gray-500 py-8">
                    No resources available for this topic yet.
                </div>
            )}
        </div>
    );
}; 