import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import HomePage from './pages/HomePage';
import TopicPage from './pages/TopicPage';
import SubtopicPage from './pages/SubtopicPage';
import ResourcesPage from './pages/ResourcesPage';
import NotFoundPage from './pages/NotFoundPage';
import TeacherAdminPage from './pages/TeacherAdminPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><HomePage /></Layout>} />
        <Route path="/topic/:topicId" element={<Layout><TopicPage /></Layout>} />
        <Route path="/topic/:topicId/:subtopicId" element={<Layout><SubtopicPage /></Layout>} />
        <Route path="/resources" element={<Layout><ResourcesPage /></Layout>} />
        <Route path="/teacher-admin" element={<Layout><TeacherAdminPage /></Layout>} />
        <Route path="*" element={<Layout><NotFoundPage /></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;
