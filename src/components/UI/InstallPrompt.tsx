import React, { useState, useEffect } from 'react';
import { showInstallPrompt, isAppInstalled } from '../../utils/pwaInstall';
import { Download } from 'lucide-react';

const InstallPrompt: React.FC = () => {
  const [showPrompt, setShowPrompt] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    // Check if the app is not already installed and localStorage doesn't have a dismissed flag
    const hasPromptBeenDismissed = localStorage.getItem('installPromptDismissed') === 'true';
    
    if (!isAppInstalled() && !hasPromptBeenDismissed) {
      // Show the prompt after 3 seconds
      const timer = setTimeout(() => {
        setShowPrompt(true);
        setTimeout(() => setAnimateIn(true), 100);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleInstall = async () => {
    const wasInstalled = await showInstallPrompt();
    if (wasInstalled) {
      handleDismiss();
    }
  };

  const handleDismiss = () => {
    setAnimateIn(false);
    setTimeout(() => {
      setShowPrompt(false);
      localStorage.setItem('installPromptDismissed', 'true');
    }, 300);
  };

  if (!showPrompt) return null;

  return (
    <div 
      className={`fixed bottom-0 left-0 right-0 bg-white shadow-lg rounded-t-lg transition-transform duration-300 ease-out ${
        animateIn ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center">
          <Download className="h-6 w-6 text-blue-600 mr-3" />
          <div>
            <h3 className="font-medium text-gray-900">Install this app</h3>
            <p className="text-sm text-gray-600">Add to your home screen for quick access</p>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <button 
            onClick={handleDismiss} 
            className="px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded"
          >
            Not now
          </button>
          <button 
            onClick={handleInstall} 
            className="px-3 py-1.5 text-sm bg-blue-600 text-white hover:bg-blue-700 rounded"
          >
            Install
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstallPrompt;