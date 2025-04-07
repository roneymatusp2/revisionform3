import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppwriteService } from '../services/appwriteService';
import { ResourceDisplay } from '../components/ResourceDisplay';

interface Subtopic {
    $id: string;
    name: string;
    topicId: string;
}

interface Topic {
    $id: string;
    name: string;
}

export const SubtopicPage: React.FC = () => {
    const { subtopicId } = useParams<{ subtopicId: string }>();
    const [subtopic, setSubtopic] = useState<Subtopic | null>(null);
    const [topic, setTopic] = useState<Topic | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            if (!subtopicId) return;

            try {
                setLoading(true);
                // Fetch subtopic details
                const subtopicData = await AppwriteService.getSubtopic(subtopicId);
                setSubtopic(subtopicData);

                // Fetch parent topic details
                if (subtopicData.topicId) {
                    const topicData = await AppwriteService.getTopic(subtopicData.topicId);
                    setTopic(topicData);
                }
            } catch (err) {
                setError('Failed to load topic details');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [subtopicId]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error || !subtopic) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-red-500 text-center">
                    {error || 'Subtopic not found'}
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <div className="text-sm text-gray-500 mb-2">
                    {topic?.name}
                </div>
                <h1 className="text-3xl font-bold mb-4">
                    {subtopic.name}
                </h1>
            </div>

            <ResourceDisplay subtopicId={subtopicId} />
        </div>
    );
};
