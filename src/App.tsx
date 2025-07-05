import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import { initInstallPrompt } from './utils/pwaInstall';
import HomePage from './pages/HomePage';
import SettingsPage from './pages/SettingsPage';
import LoginPage from './pages/LoginPage';
import Navbar from './components/Layout/Navbar';
import NewsDetailPage from './pages/page';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

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
            <PrivateRoute>
              <SettingsPage />
            </PrivateRoute>
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
    <Auth0Provider
      domain="your-auth0-domain.auth0.com"
      clientId="your-client-id"
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </Auth0Provider>
  );
}

export default App;