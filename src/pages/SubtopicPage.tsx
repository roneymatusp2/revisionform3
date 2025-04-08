import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Models } from 'appwrite';
import { AppwriteService } from '../services/appwriteService';
import { ResourceDisplay } from '../components/ResourceDisplay';

interface Topic extends Models.Document {
    name: string;
    slug: string;
}

interface Subtopic extends Models.Document {
    name: string;
    slug: string;
    topicId: string;
}

export const SubtopicPage: React.FC = () => {
    const { topicId, subtopicId } = useParams<{ topicId: string; subtopicId: string }>();
    const [subtopic, setSubtopic] = useState<Subtopic | null>(null);
    const [topic, setTopic] = useState<Topic | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!topicId || !subtopicId) {
                setError('Invalid topic or subtopic ID');
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const [fetchedTopic, fetchedSubtopic] = await Promise.all([
                    AppwriteService.getTopic(topicId),
                    AppwriteService.getSubtopic(subtopicId)
                ]);

                if (!fetchedTopic || !fetchedSubtopic) {
                    setError('Topic or subtopic not found');
                    return;
                }

                setTopic(fetchedTopic);
                setSubtopic(fetchedSubtopic);
                setError(null);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Failed to load content. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [topicId, subtopicId]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-48">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-12">
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-6">
                    {error}
                </div>
                <Link
                    to="/topics"
                    className="text-blue-500 hover:text-blue-600 font-medium"
                >
                    Return to Topics
                </Link>
            </div>
        );
    }

    if (!topic || !subtopic) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-600 mb-4">Content not found</p>
                <Link
                    to="/topics"
                    className="text-blue-500 hover:text-blue-600 font-medium"
                >
                    Return to Topics
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="space-y-2">
                <Link
                    to={`/topics/${topic.$id}/subtopics`}
                    className="text-blue-500 hover:text-blue-600 font-medium"
                >
                    ← Back to {topic.name}
                </Link>
                <h1 className="text-3xl font-bold text-gray-900">{subtopic.name}</h1>
            </div>

            <ResourceDisplay subtopicId={subtopic.$id} />
        </div>
    );
};

export default SubtopicPage;
