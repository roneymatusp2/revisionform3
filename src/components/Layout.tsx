import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { LoadingSpinner } from './LoadingSpinner';

export interface LayoutProps {
    children: React.ReactNode;
    isLoading?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({ children, isLoading = false }) => {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />
            <main className="flex-grow">
                {isLoading ? <LoadingSpinner /> : children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;