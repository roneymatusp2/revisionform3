import { Client, Storage, Account, ID, Databases, Query } from 'appwrite';

// Initialize Appwrite client
const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('67eff58c0026f452ff3d');

// Initialize Appwrite storage and account
const storage = new Storage(client);
const account = new Account(client);
const databases = new Databases(client);

// Database and Collection IDs
const DATABASE_ID = "67f158d4000cb981963";
const RESOURCES_COLLECTION_ID = "67f159550030e9e503e9";

// Resource types for categorization
export const RESOURCE_TYPES = {
    PDF_EXERCISE: 'pdf_exercise',
    PDF_ANSWERS: 'pdf_answers',
    VIDEO: 'video',
    YOUTUBE: 'youtube',
    EXTERNAL_LINK: 'external_link'
};

// Storage bucket IDs
export const STORAGE_BUCKETS = {
    PDF: '67f03c12001381e227aa',
    VIDEOS: '67f03c7600242f02fd1a',
    EXTERNAL: '67f03d6f0021c674bd8d'
};

// Teacher authentication password - keeping this simple
export const TEACHER_PASSWORD = "Stpauls2025";

// Teacher authentication function
export const teacherAuth = async (password) => {
    // Simply check if password matches
    return { 
        success: password === TEACHER_PASSWORD,
        message: password === TEACHER_PASSWORD ? 'Authentication successful' : 'Incorrect password'
    };
};

// Function to get file preview URL
export const getFilePreview = (bucketId, fileId) => {
    return storage.getFilePreview(bucketId, fileId);
};

// Function to get file download URL
export const getFileDownload = (bucketId, fileId) => {
    return storage.getFileDownload(bucketId, fileId);
};

// Function to get file view URL
export const getFileView = (bucketId, fileId) => {
    return storage.getFileView(bucketId, fileId);
};

// Function to list files in a bucket
export const listFiles = async (bucketId) => {
    try {
        const response = await storage.listFiles(bucketId);
        return { success: true, files: response.files };
    } catch (error) {
        console.error('Error listing files:', error);
        return { success: false, error: error.message, files: [] };
    }
};

// Function to upload a file
export const uploadFile = async (bucketId, file, authPassword) => {
    try {
        // Verify password
        if (authPassword !== TEACHER_PASSWORD) {
            return { success: false, error: 'Authentication failed', file: undefined };
        }
        
        // Generate a unique ID for the file
        const fileId = ID.unique();
        
        // Upload the file to Appwrite storage
        const response = await storage.createFile(bucketId, fileId, file);
        
        if (!response || !response.$id) {
            return { success: false, error: 'Failed to get file information from server', file: undefined };
        }
        
        return { success: true, file: response, error: null };
    } catch (error) {
        console.error('Error uploading file:', error);
        return { success: false, error: error.message, file: undefined };
    }
};

// Function to delete a file
export const deleteFile = async (bucketId, fileId, authPassword) => {
    try {
        // Verify password
        if (authPassword !== TEACHER_PASSWORD) {
            return { success: false, error: 'Authentication failed' };
        }
        
        // Delete the file from Appwrite storage
        await storage.deleteFile(bucketId, fileId);
        
        return { success: true };
    } catch (error) {
        console.error('Error deleting file:', error);
        return { success: false, error: error.message };
    }
};

// Function to get resources by topic and subtopic
export const getResourcesByTopic = async (topic, subtopic) => {
    try {
        let queries = [];
        
        if (topic) {
            queries.push(Query.equal('topic', topic));
        }
        
        if (subtopic) {
            queries.push(Query.equal('subtopic', subtopic));
        }
        
        const response = await databases.listDocuments(
            DATABASE_ID,
            RESOURCES_COLLECTION_ID,
            queries
        );
        
        if (!response || !response.documents) {
            return { success: false, error: 'Invalid response from server', resources: [] };
        }
        
        return { success: true, resources: response.documents, error: null };
    } catch (error) {
        console.error('Error getting resources:', error);
        return { success: false, error: error.message, resources: [] };
    }
};

// Function to get all resources
export const getResources = async () => {
    try {
        const response = await databases.listDocuments(
            DATABASE_ID,
            RESOURCES_COLLECTION_ID
        );
        
        if (!response || !response.documents) {
            return { success: false, error: 'Invalid response from server', resources: [] };
        }
        
        return { success: true, resources: response.documents, error: null };
    } catch (error) {
        console.error('Error getting resources:', error);
        return { success: false, error: error.message, resources: [] };
    }
};

// Function to add a resource (requires authentication)
export const addResource = async (resource, authPassword) => {
    try {
        // Verify password
        if (authPassword !== TEACHER_PASSWORD) {
            return { success: false, error: 'Authentication failed' };
        }
        
        // Add the resource to Appwrite database
        const response = await databases.createDocument(
            DATABASE_ID,
            RESOURCES_COLLECTION_ID,
            ID.unique(),
            resource
        );
        
        return { success: true, resource: response };
    } catch (error) {
        console.error('Error adding resource:', error);
        return { success: false, error: error.message };
    }
};

// Function to remove a resource (requires authentication)
export const removeResource = async (resourceId, authPassword) => {
    try {
        // Verify password
        if (authPassword !== TEACHER_PASSWORD) {
            return { success: false, error: 'Authentication failed' };
        }
        
        // Remove the resource from Appwrite database
        await databases.deleteDocument(
            DATABASE_ID,
            RESOURCES_COLLECTION_ID,
            resourceId
        );
        
        return { success: true };
    } catch (error) {
        console.error('Error removing resource:', error);
        return { success: false, error: error.message };
    }
};

// Legacy functions for backward compatibility
export const addExternalResource = addResource;
export const removeExternalResource = removeResource;

export { client, storage, account, databases };
