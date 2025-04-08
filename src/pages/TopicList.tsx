import React from 'react';
import { Link } from 'react-router-dom';
import { Models } from 'appwrite';
import topics from '../data/topics';

interface Topic extends Models.Document {
    name: string;
    slug: string;
}

export const TopicList: React.FC = () => {

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Topics</h1>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {topics.map(topic => (
                    <Link
                        key={topic.$id}
                        to={`/topic/${topic.$id}`}
                        className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow border border-gray-200"
                    >
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">
                            {topic.name}
                        </h2>
                        <p className="text-gray-600">
                            Explore subtopics and resources
                        </p>
                        <div className="mt-4 flex items-center text-blue-600">
                            <span className="text-sm">Get started</span>
                            <svg
                                className="w-4 h-4 ml-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default TopicList; 