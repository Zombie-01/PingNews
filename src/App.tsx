import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { initInstallPrompt } from './utils/pwaInstall';
import HomePage from './pages/HomePage';
import SettingsPage from './pages/SettingsPage';
import LoginPage from './pages/LoginPage';
import Navbar from './components/Layout/Navbar';
import NewsDetailPage from './pages/page';



function AppContent() {
  useEffect(() => {
    initInstallPrompt();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route 
          path="/settings" 
          element={
              <SettingsPage />
          } 
        />
        <Route
          path="/a/2024/06/525bb1d8-e8fa-4053-a6da-a5ba6cfe8a2a"
          element={<NewsDetailPage />}
        />
      </Routes>
    </div>
  );
}

function App() {
  return (
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
  );
}

export default App;