export interface Subtopic {
  id: string;
  title: string;
  description: string;
}

export interface Topic {
  id: string;
  title: string;
  description: string;
  subtopics: Subtopic[];
}

const topics: Topic[] = [
  {
    id: 'number-algebra',
    title: 'Number & Algebra',
    description: 'Explore natural numbers, integers, operations, fractions, ratios, equations, and functions.',
    subtopics: [
      {
        id: 'number-types',
        title: 'Numbers and Types',
        description: 'Identify and use: natural numbers, integers, primes, squares, cubes, triangles, rational numbers, irrational numbers, real numbers, reciprocals.'
      },
      {
        id: 'factors-multiples',
        title: 'Factors and Multiples',
        description: 'Common factors, common multiples, prime factors, Highest common factor (HCF), lowest common multiple (LCM).'
      },
      {
        id: 'standard-form',
        title: 'Standard Form',
        description: 'Standard Form and four operations with it.'
      },
      {
        id: 'operations',
        title: 'Operations and Brackets',
        description: 'Use of the four operations and brackets. Calculation of powers and roots. Including fractions (proper, improper, mixed numbers) and decimals.'
      },
      {
        id: 'equivalences',
        title: 'Numerical Equivalences',
        description: 'Equivalences between decimals, fractions and percentages.'
      },
      {
        id: 'ratio-proportion',
        title: 'Ratio and Proportion',
        description: 'Understanding and using ratio and proportion to solve problems.'
      },
      {
        id: 'surds',
        title: 'Surds',
        description: 'Surds, simplification and rationalise the denominator.'
      },
      {
        id: 'exponents',
        title: 'Exponents and Indices',
        description: 'Rules for exponents, Indices.'
      },
      {
        id: 'expansion',
        title: 'Expansion of Brackets',
        description: 'Expansion of brackets, including the square of a binomial. Also, rationalisation.'
      },
      {
        id: 'factorisation',
        title: 'Factorisation',
        description: 'Factorisation: common factor, common factor by grouping, difference of squares, trinomials.'
      },
      {
        id: 'linear-equations',
        title: 'Linear Equations',
        description: 'Solution of linear equations including those with fractional expressions.'
      },
      {
        id: 'inequalities',
        title: 'Inequalities',
        description: 'Writing, showing and interpretation of inequalities, including those on the real number line. Solution of linear inequalities.'
      },
      {
        id: 'linear-functions',
        title: 'Linear Functions',
        description: 'Linear functions on the forms of y = mx + c, ax + by = d, writing, graphing, function notation, vertical and horizontal lines, midpoints.'
      },
      {
        id: 'simultaneous-equations',
        title: 'Simultaneous Equations',
        description: 'Solving systems of linear equations using different methods.'
      }
    ]
  },
  {
    id: 'geometry-measurement',
    title: 'Geometry & Measurement',
    description: 'Learn about points, lines, angles, shapes, measurements, and geometric properties.',
    subtopics: [
      {
        id: 'geometric-terms',
        title: 'Geometric Terms and Vocabulary',
        description: 'Use and interpret the geometrical terms: point, vertex, line, plane, parallel, perpendicular, right angle, acute, obtuse, reflex, interior, exterior.'
      },
      {
        id: 'shape-vocabulary',
        title: 'Shape Vocabulary',
        description: 'Use and interpret vocabulary of triangles, special quadrilaterals, polygons and simple solid figures.'
      },
      {
        id: 'angles-bearings',
        title: 'Angles and Bearings',
        description: 'Measure and draw angles. Draw and interpret three-figure bearings.'
      },
      {
        id: 'angle-relationships',
        title: 'Angle Relationships',
        description: 'Angles at a point, angles on a straight line and intersecting straight lines, vertically opposite angles, alternate, corresponding and co-interior angles on parallel lines.'
      },
      {
        id: 'polygon-angles',
        title: 'Polygon Angles',
        description: 'Angle sum of a triangle, quadrilateral and polygons, Interior and exterior angles of a polygon, and angles of regular polygons.'
      },
      {
        id: 'pythagoras',
        title: 'Pythagoras\' Theorem',
        description: 'Pythagoras\' Theorem and its converse in two dimensions. Including: 1) chord length; 2) distance of a chord from the centre of a circle; 3) distance between two points given on a grid.'
      },
      {
        id: 'measurement-units',
        title: 'Measurement Units',
        description: 'Units: mm, cm, m, km, mm², cm², m², km², mm³, cm³, m³, ml, g, kg.'
      },
      {
        id: 'perimeter-area',
        title: 'Perimeter and Area',
        description: 'Perimeter and area of rectangle, triangle, parallelogram and trapezium and compound shapes and parts of shapes derived from these.'
      },
      {
        id: 'circle-geometry',
        title: 'Circle Geometry',
        description: 'Use and interpret vocabulary of a circle. Circumference and area of a circle. Arc length and area of sector.'
      },
      {
        id: 'right-angled-trig',
        title: 'Right-angled Trigonometry',
        description: 'Right-angled triangle trigonometry. Solve problems in two dimensions using Pythagoras\' theorem and trigonometry.'
      },
      {
        id: 'angles-elevation-depression',
        title: 'Angles of Elevation/Depression',
        description: 'Angles of elevation and depression. Know that the perpendicular distance from a point to a line is the shortest distance to the line.'
      }
    ]
  },
  {
    id: 'trigonometry',
    title: 'Trigonometry',
    description: 'Study right-angled triangles, trigonometric ratios, and applications.',
    subtopics: [
      {
        id: 'right-angled-triangle',
        title: 'Right-angled Triangle Trigonometry',
        description: 'Understanding and applying trigonometric ratios in right-angled triangles.'
      },
      {
        id: 'pythagoras-trig',
        title: 'Pythagoras and Trigonometry',
        description: 'Solve problems in two dimensions using Pythagoras\' theorem and trigonometry.'
      },
      {
        id: 'elevation-depression',
        title: 'Elevation and Depression',
        description: 'Angles of elevation and depression in practical applications.'
      },
      {
        id: 'perpendicular-distance',
        title: 'Perpendicular Distance',
        description: 'Know that the perpendicular distance from a point to a line is the shortest distance to the line.'
      }
    ]
  }
];

export { topics };
export default topics;
