import { Client } from 'appwrite';

export const APPWRITE_CONFIG = {
    endpoint: process.env.REACT_APP_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1',
    projectId: process.env.REACT_APP_APPWRITE_PROJECT_ID || '67eff58c0026f452ff3d',
    databaseId: '67f158d4000cb981963',
    collections: {
        topics: 'topics',
        subtopics: 'subtopics',
        resources: '67f3e9150020b2aeb068'
    },
    buckets: {
        pdfs: '67f03c12001381e227aa',
        videos: '67f03c7600242f02fd1a',
        external: '67f03d6f0021c674b'
    }
};

const client = new Client()
    .setEndpoint(APPWRITE_CONFIG.endpoint)
    .setProject(APPWRITE_CONFIG.projectId);

export { client };

// Database IDs
export const DATABASE_IDS = {
    MATH_REVISION: '67f158d4000cb981963',
    ALGEBRATICA: 'algebraticamentede-db'
};

// Bucket IDs
export const BUCKET_IDS = {
    MATH_PDFS: '67f03c12001381e227aa',
    MATH_VIDEOS: '67f03c7600242f02fd1a',
    MATH_EXTERNAL: '67f03d6f0021c674b'
};

// Collection IDs
export const COLLECTION_IDS = {
    PDFS: '67f3e9150020b2aeb068',
    VIDEOS: 'videos',
    RESOURCES: 'resources'
}; 