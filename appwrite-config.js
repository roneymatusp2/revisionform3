import { Client, Storage } from 'appwrite';

// Initialize Appwrite client
const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('67eff58c0026f452ff3d');

// Initialize Appwrite storage
const storage = new Storage(client);

// Storage bucket IDs
export const STORAGE_BUCKETS = {
    PDF: '67f03c12001381e227aa',
    VIDEOS: '67f03c7600242f02fd1a',
    EXTERNAL: '67f03d6f0021c674bd8d'
};

export { client, storage };
