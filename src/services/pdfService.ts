import { storage, databases, COLLECTION_IDS, BUCKET_IDS, DATABASE_IDS } from '../config/appwrite';
import { ID } from 'appwrite';

export interface PDFDocument {
    $id?: string;
    title: string;
    topicId: string;
    subtopicId: string;
    fileId: string;
    type: 'questions' | 'answers' | 'reference';
    url?: string;
}

export const pdfService = {
    async uploadPDF(file: File): Promise<string> {
        try {
            const response = await storage.createFile(
                BUCKET_IDS.MATH_PDFS,
                ID.unique(),
                file
            );
            return response.$id;
        } catch (error) {
            console.error('Error uploading PDF:', error);
            throw error;
        }
    },

    async createPDFDocument(document: PDFDocument): Promise<PDFDocument> {
        try {
            const response = await databases.createDocument(
                DATABASE_IDS.MATH_REVISION,
                COLLECTION_IDS.PDFS,
                ID.unique(),
                document
            );
            return response as PDFDocument;
        } catch (error) {
            console.error('Error creating PDF document:', error);
            throw error;
        }
    },

    async getPDFUrl(fileId: string): Promise<string> {
        try {
            const response = await storage.getFileView(
                BUCKET_IDS.MATH_PDFS,
                fileId
            );
            return response.href;
        } catch (error) {
            console.error('Error getting PDF URL:', error);
            throw error;
        }
    },

    async getPDFsByTopic(topicId: string): Promise<PDFDocument[]> {
        try {
            const response = await databases.listDocuments(
                DATABASE_IDS.MATH_REVISION,
                COLLECTION_IDS.PDFS,
                [
                    `topicId=${topicId}`
                ]
            );
            return response.documents as PDFDocument[];
        } catch (error) {
            console.error('Error getting PDFs by topic:', error);
            throw error;
        }
    },

    async getPDFsBySubtopic(subtopicId: string): Promise<PDFDocument[]> {
        try {
            const response = await databases.listDocuments(
                DATABASE_IDS.MATH_REVISION,
                COLLECTION_IDS.PDFS,
                [
                    `subtopicId=${subtopicId}`
                ]
            );
            return response.documents as PDFDocument[];
        } catch (error) {
            console.error('Error getting PDFs by subtopic:', error);
            throw error;
        }
    }
}; 