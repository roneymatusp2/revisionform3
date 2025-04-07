import { resourceLinks } from '../data/externalResources';
import { pdfService } from '../services/pdfService';

export const migrateResources = async () => {
    try {
        // Migrar PDFs de Number & Algebra
        for (const [key, value] of Object.entries(resourceLinks.numberAlgebra)) {
            if (typeof value === 'string') {
                await pdfService.createPDFDocument({
                    title: key,
                    topicId: 'numberAlgebra',
                    subtopicId: key,
                    fileId: value,
                    type: 'reference'
                });
            } else if (typeof value === 'object') {
                if ('questions' in value) {
                    await pdfService.createPDFDocument({
                        title: `${key} - Questions`,
                        topicId: 'numberAlgebra',
                        subtopicId: key,
                        fileId: value.questions,
                        type: 'questions'
                    });
                }
                if ('answers' in value) {
                    await pdfService.createPDFDocument({
                        title: `${key} - Answers`,
                        topicId: 'numberAlgebra',
                        subtopicId: key,
                        fileId: value.answers,
                        type: 'answers'
                    });
                }
            }
        }

        // Migrar PDFs de Geometry & Measurement
        for (const [key, value] of Object.entries(resourceLinks.geometryMeasurement)) {
            if (typeof value === 'object') {
                if ('questions' in value) {
                    await pdfService.createPDFDocument({
                        title: `${key} - Questions`,
                        topicId: 'geometryMeasurement',
                        subtopicId: key,
                        fileId: value.questions,
                        type: 'questions'
                    });
                }
                if ('answers' in value) {
                    await pdfService.createPDFDocument({
                        title: `${key} - Answers`,
                        topicId: 'geometryMeasurement',
                        subtopicId: key,
                        fileId: value.answers,
                        type: 'answers'
                    });
                }
            }
        }

        // Migrar PDFs de Trigonometry
        for (const [key, value] of Object.entries(resourceLinks.trigonometry)) {
            if (typeof value === 'object') {
                if ('questions' in value) {
                    await pdfService.createPDFDocument({
                        title: `${key} - Questions`,
                        topicId: 'trigonometry',
                        subtopicId: key,
                        fileId: value.questions,
                        type: 'questions'
                    });
                }
                if ('answers' in value) {
                    await pdfService.createPDFDocument({
                        title: `${key} - Answers`,
                        topicId: 'trigonometry',
                        subtopicId: key,
                        fileId: value.answers,
                        type: 'answers'
                    });
                }
            }
        }

        console.log('Migration completed successfully!');
    } catch (error) {
        console.error('Error during migration:', error);
        throw error;
    }
}; 