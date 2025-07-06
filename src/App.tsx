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
          path="/a/2024/06/c419225e-cfdb-4dd4-85a8-baaca1daf423"
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