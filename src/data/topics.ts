import { Models } from 'appwrite';

export interface Topic extends Models.Document {
    name: string;
    slug: string;
    subtopics?: Subtopic[];
}

export interface Subtopic extends Models.Document {
    $collectionId: string;
    $databaseId: string;
    $createdAt: string;
    $updatedAt: string;
    $permissions: string[];
    name: string;
    slug: string;
    topicId: string;
}

const topics: Topic[] = [
    {
        $id: 'number-systems',
        name: 'Number Systems',
        slug: 'number-systems',
        $collectionId: 'topics',
        $databaseId: 'database',
        $createdAt: new Date().toISOString(),
        $updatedAt: new Date().toISOString(),
        $permissions: [],
        subtopics: [
            {
                $id: 'ns-1',
                name: 'Natural numbers, integers, primes, etc.',
                slug: 'natural-numbers',
                topicId: 'number-systems',
                $collectionId: 'subtopics',
                $databaseId: 'database',
                $createdAt: new Date().toISOString(),
                $updatedAt: new Date().toISOString(),
                $permissions: []
            },
            {
                $id: 'ns-2',
                name: 'Standard Form',
                slug: 'standard-form',
                topicId: 'number-systems',
                $collectionId: 'subtopics',
                $databaseId: 'database',
                $createdAt: new Date().toISOString(),
                $updatedAt: new Date().toISOString(),
                $permissions: []
            },
            {
                $id: 'ns-3',
                name: 'Common factors, HCF, LCM',
                slug: 'common-factors',
                topicId: 'number-systems',
                $collectionId: 'subtopics',
                $databaseId: 'database',
                $createdAt: new Date().toISOString(),
                $updatedAt: new Date().toISOString(),
                $permissions: []
            },
            {
                $id: 'ns-4',
                name: 'Four operations and brackets',
                slug: 'four-operations',
                topicId: 'number-systems',
                $collectionId: 'subtopics',
                $databaseId: 'database',
                $createdAt: new Date().toISOString(),
                $updatedAt: new Date().toISOString(),
                $permissions: []
            },
            {
                $id: 'ns-5',
                name: 'Surds and rationalization',
                slug: 'surds',
                topicId: 'number-systems',
                $collectionId: 'subtopics',
                $databaseId: 'database',
                $createdAt: new Date().toISOString(),
                $updatedAt: new Date().toISOString(),
                $permissions: []
            },
            {
                $id: 'ns-6',
                name: 'Decimals, fractions and percentages',
                slug: 'decimals-fractions',
                topicId: 'number-systems',
                $collectionId: 'subtopics',
                $databaseId: 'database',
                $createdAt: new Date().toISOString(),
                $updatedAt: new Date().toISOString(),
                $permissions: []
            }
        ]
    },
    {
        $id: 'algebraic-manipulation',
        name: 'Algebraic Manipulation',
        slug: 'algebraic-manipulation',
        $collectionId: 'topics',
        $databaseId: 'database',
        $createdAt: new Date().toISOString(),
        $updatedAt: new Date().toISOString(),
        $permissions: [],
        subtopics: [
            {
                $id: 'am-1',
                name: 'Rules for exponents, Indices',
                slug: 'exponents-indices',
                topicId: 'algebraic-manipulation',
                $collectionId: 'subtopics',
                $databaseId: 'database',
                $createdAt: new Date().toISOString(),
                $updatedAt: new Date().toISOString(),
                $permissions: []
            },
            {
                $id: 'am-2',
                name: 'Expansion of brackets',
                slug: 'expansion-brackets',
                topicId: 'algebraic-manipulation',
                $collectionId: 'subtopics',
                $databaseId: 'database',
                $createdAt: new Date().toISOString(),
                $updatedAt: new Date().toISOString(),
                $permissions: []
            },
            {
                $id: 'am-3',
                name: 'Factorisation techniques',
                slug: 'factorisation',
                topicId: 'algebraic-manipulation',
                $collectionId: 'subtopics',
                $databaseId: 'database',
                $createdAt: new Date().toISOString(),
                $updatedAt: new Date().toISOString(),
                $permissions: []
            }
        ]
    },
    {
        $id: 'mensuration',
        name: 'Mensuration',
        slug: 'mensuration',
        $collectionId: 'topics',
        $databaseId: 'database',
        $createdAt: new Date().toISOString(),
        $updatedAt: new Date().toISOString(),
        $permissions: [],
        subtopics: [
            {
                $id: 'mns-1',
                name: 'Units of Measurement',
                slug: 'units-measurement',
                topicId: 'mensuration',
                $collectionId: 'subtopics',
                $databaseId: 'database',
                $createdAt: new Date().toISOString(),
                $updatedAt: new Date().toISOString(),
                $permissions: []
            },
            {
                $id: 'mns-2',
                name: 'Perimeter and area of shapes',
                slug: 'perimeter-area',
                topicId: 'mensuration',
                $collectionId: 'subtopics',
                $databaseId: 'database',
                $createdAt: new Date().toISOString(),
                $updatedAt: new Date().toISOString(),
                $permissions: []
            },
            {
                $id: 'mns-3',
                name: 'Circle properties',
                slug: 'circle-properties',
                topicId: 'mensuration',
                $collectionId: 'subtopics',
                $databaseId: 'database',
                $createdAt: new Date().toISOString(),
                $updatedAt: new Date().toISOString(),
                $permissions: []
            }
        ]
    },
    {
        $id: 'linear-patterns',
        name: 'Linear Patterns and Models',
        slug: 'linear-patterns',
        $collectionId: 'topics',
        $databaseId: 'database',
        $createdAt: new Date().toISOString(),
        $updatedAt: new Date().toISOString(),
        $permissions: [],
        subtopics: [
            {
                $id: 'lpm-1',
                name: 'Linear equations',
                slug: 'linear-equations',
                topicId: 'linear-patterns',
                $collectionId: 'subtopics',
                $databaseId: 'database',
                $createdAt: new Date().toISOString(),
                $updatedAt: new Date().toISOString(),
                $permissions: []
            },
            {
                $id: 'lpm-2',
                name: 'Inequalities',
                slug: 'inequalities',
                topicId: 'linear-patterns',
                $collectionId: 'subtopics',
                $databaseId: 'database',
                $createdAt: new Date().toISOString(),
                $updatedAt: new Date().toISOString(),
                $permissions: []
            },
            {
                $id: 'lpm-3',
                name: 'Linear functions',
                slug: 'linear-functions',
                topicId: 'linear-patterns',
                $collectionId: 'subtopics',
                $databaseId: 'database',
                $createdAt: new Date().toISOString(),
                $updatedAt: new Date().toISOString(),
                $permissions: []
            },
            {
                $id: 'lpm-4',
                name: 'Simultaneous equations',
                slug: 'simultaneous-equations',
                topicId: 'linear-patterns',
                $collectionId: 'subtopics',
                $databaseId: 'database',
                $createdAt: new Date().toISOString(),
                $updatedAt: new Date().toISOString(),
                $permissions: []
            }
        ]
    },
    {
        $id: 'angles',
        name: 'Angles',
        slug: 'angles',
        $collectionId: 'topics',
        $databaseId: 'database',
        $createdAt: new Date().toISOString(),
        $updatedAt: new Date().toISOString(),
        $permissions: [],
        subtopics: [
            {
                $id: 'ang-1',
                name: 'Geometric terms and vocabulary',
                slug: 'geometric-terms',
                topicId: 'angles',
                $collectionId: 'subtopics',
                $databaseId: 'database',
                $createdAt: new Date().toISOString(),
                $updatedAt: new Date().toISOString(),
                $permissions: []
            },
            {
                $id: 'ang-2',
                name: 'Measuring and drawing angles',
                slug: 'measuring-angles',
                topicId: 'angles',
                $collectionId: 'subtopics',
                $databaseId: 'database',
                $createdAt: new Date().toISOString(),
                $updatedAt: new Date().toISOString(),
                $permissions: []
            },
            {
                $id: 'ang-3',
                name: 'Angle relationships',
                slug: 'angle-relationships',
                topicId: 'angles',
                $collectionId: 'subtopics',
                $databaseId: 'database',
                $createdAt: new Date().toISOString(),
                $updatedAt: new Date().toISOString(),
                $permissions: []
            },
            {
                $id: 'ang-4',
                name: 'Pythagoras Theorem',
                slug: 'pythagoras-theorem',
                topicId: 'angles',
                $collectionId: 'subtopics',
                $databaseId: 'database',
                $createdAt: new Date().toISOString(),
                $updatedAt: new Date().toISOString(),
                $permissions: []
            }
        ]
    },
    {
        $id: 'trigonometry',
        name: 'Trigonometry',
        slug: 'trigonometry',
        $collectionId: 'topics',
        $databaseId: 'database',
        $createdAt: new Date().toISOString(),
        $updatedAt: new Date().toISOString(),
        $permissions: [],
        subtopics: [
            {
                $id: 'trig-1',
                name: 'Right-angled Trigonometry',
                slug: 'right-angled-trigonometry',
                topicId: 'trigonometry',
                $collectionId: 'subtopics',
                $databaseId: 'database',
                $createdAt: new Date().toISOString(),
                $updatedAt: new Date().toISOString(),
                $permissions: []
            },
            {
                $id: 'trig-2',
                name: 'Angles of elevation and depression',
                slug: 'angles-elevation-depression',
                topicId: 'trigonometry',
                $collectionId: 'subtopics',
                $databaseId: 'database',
                $createdAt: new Date().toISOString(),
                $updatedAt: new Date().toISOString(),
                $permissions: []
            },
            {
                $id: 'trig-3',
                name: 'Periodic Functions',
                slug: 'periodic-functions',
                topicId: 'trigonometry',
                $collectionId: 'subtopics',
                $databaseId: 'database',
                $createdAt: new Date().toISOString(),
                $updatedAt: new Date().toISOString(),
                $permissions: []
            }
        ]
    }
];

export default topics;
