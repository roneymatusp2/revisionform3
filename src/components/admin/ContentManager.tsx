import React, { useState } from 'react';
import { migrateContent } from '../../utils/appwriteMigration';
import { AppwriteService } from '../../services/appwriteService';

export const ContentManager: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploadDetails, setUploadDetails] = useState({
        title: '',
        subtopic: '',
        resourceType: 'questions' // default value
    });

    const handleMigration = async () => {
        setIsLoading(true);
        setMessage('Starting migration...');
        try {
            const result = await migrateContent();
            setMessage(result.message);
        } catch (error) {
            setMessage(`Migration failed: ${error.message}`);
        }
        setIsLoading(false);
    };

    const handleFileUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedFile) {
            setMessage('Please select a file first');
            return;
        }

        setIsLoading(true);
        setMessage('Uploading file...');

        try {
            await AppwriteService.uploadFile(
                selectedFile,
                uploadDetails.title,
                uploadDetails.subtopic,
                uploadDetails.resourceType
            );

            setMessage('File uploaded successfully!');
            setSelectedFile(null);
            setUploadDetails({
                title: '',
                subtopic: '',
                resourceType: 'questions'
            });
        } catch (error) {
            setMessage(error.message);
        }

        setIsLoading(false);
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-8">Content Manager</h1>

            {/* Migration Section */}
            <section className="mb-12 p-6 bg-white rounded-lg shadow">
                <h2 className="text-2xl font-semibold mb-4">Content Migration</h2>
                <p className="text-gray-600 mb-4">
                    This will migrate all existing content from the old system to AppWrite.
                    Make sure you have the correct permissions before proceeding.
                </p>
                <button
                    onClick={handleMigration}
                    disabled={isLoading}
                    className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
                >
                    {isLoading ? 'Migrating...' : 'Start Migration'}
                </button>
            </section>

            {/* Manual Upload Section */}
            <section className="p-6 bg-white rounded-lg shadow">
                <h2 className="text-2xl font-semibold mb-4">Upload New Content</h2>
                <form onSubmit={handleFileUpload} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Title
                        </label>
                        <input
                            type="text"
                            value={uploadDetails.title}
                            onChange={(e) => setUploadDetails({
                                ...uploadDetails,
                                title: e.target.value
                            })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Subtopic ID
                        </label>
                        <input
                            type="text"
                            value={uploadDetails.subtopic}
                            onChange={(e) => setUploadDetails({
                                ...uploadDetails,
                                subtopic: e.target.value
                            })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Resource Type
                        </label>
                        <select
                            value={uploadDetails.resourceType}
                            onChange={(e) => setUploadDetails({
                                ...uploadDetails,
                                resourceType: e.target.value
                            })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        >
                            <option value="questions">Questions</option>
                            <option value="answers">Answers</option>
                            <option value="reference">Reference Material</option>
                            <option value="videos">Video</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            PDF File
                        </label>
                        <input
                            type="file"
                            accept=".pdf"
                            onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                            className="mt-1 block w-full"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading || !selectedFile}
                        className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 disabled:bg-gray-400"
                    >
                        {isLoading ? 'Uploading...' : 'Upload File'}
                    </button>
                </form>
            </section>

            {/* Message Display */}
            {message && (
                <div className={`mt-6 p-4 rounded-lg ${
                    message.includes('failed') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                }`}>
                    <p>{message}</p>
                </div>
            )}
        </div>
    );
}; 