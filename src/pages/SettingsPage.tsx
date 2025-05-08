import React, { useState, useEffect } from 'react';
import { UserProfile, NewsCategory } from '../types';
import { loadUserProfile, updatePreferredCategories } from '../services/storageService';
import ProfileSection from '../components/Settings/ProfileSection';
import BalanceSection from '../components/Settings/BalanceSection';
import CategoryPreferences from '../components/Settings/CategoryPreferences';

const SettingsPage: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Load user profile from local storage
    const userProfile = loadUserProfile();
    setProfile(userProfile);
    setIsLoading(false);
  }, []);
  
  const handleProfileUpdate = (updatedProfile: UserProfile) => {
    setProfile(updatedProfile);
  };
  
  const handleCategoryUpdate = (categories: NewsCategory[]) => {
    if (profile) {
      const updatedProfile = updatePreferredCategories(categories);
      setProfile(updatedProfile);
    }
  };
  
  if (isLoading || !profile) {
    return (
      <div className="container mx-auto px-4 pt-24 pb-12 flex justify-center">
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-6 py-1">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 pt-24 pb-12">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Settings</h1>
        <p className="text-gray-600">Manage your profile and preferences</p>
      </div>
      
      <div className="max-w-2xl mx-auto">
        <ProfileSection 
          profile={profile} 
          onProfileUpdate={handleProfileUpdate} 
        />
        
        <BalanceSection 
          balance={profile.balance} 
        />
        
        <CategoryPreferences
          selectedCategories={profile.preferredCategories as NewsCategory[]}
          onUpdate={handleCategoryUpdate}
        />
      </div>
    </div>
  );
};

export default SettingsPage;