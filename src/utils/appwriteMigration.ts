import { ID } from 'appwrite';
import { AppwriteService } from '../services/appwriteService';
import { topics } from '../data/topics';
import { pdfs } from '../data/pdfs';
import { videos } from '../data/videos';

export const migrateContent = async () => {
    try {
        let migratedCount = {
            topics: 0,
            subtopics: 0,
            pdfs: 0,
            videos: 0
        };

        // Migrate topics
        for (const topic of topics) {
            try {
                const topicDoc = await AppwriteService.createTopic({
                    name: topic.name,
                    slug: topic.slug
                });

                migratedCount.topics++;

                // Migrate subtopics for this topic
                for (const subtopic of topic.subtopics) {
                    try {
                        const subtopicDoc = await AppwriteService.createSubtopic({
                            name: subtopic.name,
                            slug: subtopic.slug,
                            topicId: topicDoc.$id
                        });

                        migratedCount.subtopics++;

                        // Migrate PDFs for this subtopic
                        const subtopicPdfs = pdfs.filter(pdf => pdf.subtopic === subtopic.slug);
                        for (const pdf of subtopicPdfs) {
                            try {
                                // Download PDF from current location
                                const response = await fetch(pdf.url);
                                const pdfBlob = await response.blob();
                                const file = new File([pdfBlob], `${pdf.title}.pdf`, { type: 'application/pdf' });

                                await AppwriteService.uploadFile(
                                    file,
                                    pdf.title,
                                    subtopicDoc.$id,
                                    pdf.type
                                );

                                migratedCount.pdfs++;
                            } catch (error) {
                                console.error(`Failed to migrate PDF ${pdf.title}:`, error);
                            }
                        }

                        // Migrate videos for this subtopic
                        const subtopicVideos = videos.filter(video => video.subtopic === subtopic.slug);
                        for (const video of subtopicVideos) {
                            try {
                                await AppwriteService.createVideoResource({
                                    title: video.title,
                                    url: video.url,
                                    subtopicId: subtopicDoc.$id
                                });

                                migratedCount.videos++;
                            } catch (error) {
                                console.error(`Failed to migrate video ${video.title}:`, error);
                            }
                        }
                    } catch (error) {
                        console.error(`Failed to migrate subtopic ${subtopic.name}:`, error);
                    }
                }
            } catch (error) {
                console.error(`Failed to migrate topic ${topic.name}:`, error);
            }
        }

        return {
            success: true,
            message: `Migration completed successfully! Migrated: ${migratedCount.topics} topics, ${migratedCount.subtopics} subtopics, ${migratedCount.pdfs} PDFs, ${migratedCount.videos} videos`
        };
    } catch (error) {
        console.error('Migration failed:', error);
        return {
            success: false,
            message: `Migration failed: ${error.message}`
        };
    }
}; 