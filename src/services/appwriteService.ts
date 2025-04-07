import { Storage, Databases, Query, ID } from 'appwrite';
import { APPWRITE_CONFIG, client } from '../config/appwrite';

const storage = new Storage(client);
const databases = new Databases(client);

const {
    databaseId: DATABASE_ID,
    collections: { topics: TOPICS_COLLECTION, subtopics: SUBTOPICS_COLLECTION, resources: RESOURCES_COLLECTION },
    buckets: { pdfs: PDF_BUCKET }
} = APPWRITE_CONFIG;

export const AppwriteService = {
    // Topics
    async getTopics() {
        try {
            const response = await databases.listDocuments(
                DATABASE_ID,
                TOPICS_COLLECTION
            );
            return response.documents;
        } catch (error) {
            console.error('Error fetching topics:', error);
            throw new Error('Failed to fetch topics. Please try again later.');
        }
    },

    async getTopic(topicId: string) {
        try {
            return await databases.getDocument(
                DATABASE_ID,
                TOPICS_COLLECTION,
                topicId
            );
        } catch (error) {
            console.error('Error fetching topic:', error);
            throw new Error('Failed to fetch topic. Please try again later.');
        }
    },

    // Subtopics
    async getSubtopicsByTopic(topicId: string) {
        try {
            const response = await databases.listDocuments(
                DATABASE_ID,
                SUBTOPICS_COLLECTION,
                [Query.equal('topicId', topicId)]
            );
            return response.documents;
        } catch (error) {
            console.error('Error fetching subtopics:', error);
            throw new Error('Failed to fetch subtopics. Please try again later.');
        }
    },

    async getSubtopic(subtopicId: string) {
        try {
            return await databases.getDocument(
                DATABASE_ID,
                SUBTOPICS_COLLECTION,
                subtopicId
            );
        } catch (error) {
            console.error('Error fetching subtopic:', error);
            throw new Error('Failed to fetch subtopic. Please try again later.');
        }
    },

    // Resources
    async getResourcesBySubtopic(subtopicId: string) {
        try {
            const response = await databases.listDocuments(
                DATABASE_ID,
                RESOURCES_COLLECTION,
                [Query.equal('subtopicId', subtopicId)]
            );
            return response.documents;
        } catch (error) {
            console.error('Error fetching resources:', error);
            throw new Error('Failed to fetch resources. Please try again later.');
        }
    },

    async getResourcesByType(subtopicId: string, resourceType: string) {
        try {
            const response = await databases.listDocuments(
                DATABASE_ID,
                RESOURCES_COLLECTION,
                [
                    Query.equal('subtopicId', subtopicId),
                    Query.equal('resourceType', resourceType)
                ]
            );
            return response.documents;
        } catch (error) {
            console.error('Error fetching resources by type:', error);
            throw new Error('Failed to fetch resources. Please try again later.');
        }
    },

    // File operations
    getFileView(fileId: string) {
        return storage.getFileView(PDF_BUCKET, fileId);
    },

    async uploadFile(file: File, title: string, subtopicId: string, resourceType: string) {
        try {
            // Upload file to storage
            const uploadedFile = await storage.createFile(
                PDF_BUCKET,
                ID.unique(),
                file
            );

            // Create resource document
            const resource = await databases.createDocument(
                DATABASE_ID,
                RESOURCES_COLLECTION,
                ID.unique(),
                {
                    title,
                    type: 'pdf',
                    fileId: uploadedFile.$id,
                    subtopicId,
                    resourceType
                }
            );

            return resource;
        } catch (error) {
            console.error('Error uploading file:', error);
            throw new Error('Failed to upload file. Please try again later.');
        }
    },

    async deleteResource(resourceId: string, fileId: string) {
        try {
            // Delete the file from storage
            await storage.deleteFile(PDF_BUCKET, fileId);

            // Delete the resource document
            await databases.deleteDocument(
                DATABASE_ID,
                RESOURCES_COLLECTION,
                resourceId
            );

            return true;
        } catch (error) {
            console.error('Error deleting resource:', error);
            throw new Error('Failed to delete resource. Please try again later.');
        }
    },

    async createTopic({ name, slug }: { name: string; slug: string }) {
        try {
            return await databases.createDocument(
                DATABASE_ID,
                TOPICS_COLLECTION,
                ID.unique(),
                { name, slug }
            );
        } catch (error) {
            console.error('Error creating topic:', error);
            throw new Error('Failed to create topic. Please try again later.');
        }
    },

    async createSubtopic({ name, slug, topicId }: { name: string; slug: string; topicId: string }) {
        try {
            return await databases.createDocument(
                DATABASE_ID,
                SUBTOPICS_COLLECTION,
                ID.unique(),
                { name, slug, topicId }
            );
        } catch (error) {
            console.error('Error creating subtopic:', error);
            throw new Error('Failed to create subtopic. Please try again later.');
        }
    },

    async createVideoResource({ title, url, subtopicId }: { title: string; url: string; subtopicId: string }) {
        try {
            return await databases.createDocument(
                DATABASE_ID,
                RESOURCES_COLLECTION,
                ID.unique(),
                {
                    title,
                    type: 'video',
                    fileId: url,
                    subtopicId,
                    resourceType: 'videos'
                }
            );
        } catch (error) {
            console.error('Error creating video resource:', error);
            throw new Error('Failed to create video resource. Please try again later.');
        }
    }
}; 