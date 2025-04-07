import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="text-center py-12">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Page Not Found</h1>
      <p className="text-gray-600 mb-8">The page you are looking for doesn't exist or has been moved.</p>
      <Link 
        to="/" 
        className="inline-block px-6 py-3 bg-primary text-white font-medium rounded-md hover:bg-primary-dark"
      >
        Return to Home
      </Link>
    </div>
  );
}
