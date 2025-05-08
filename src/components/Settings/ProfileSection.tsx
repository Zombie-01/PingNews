import React, { useState } from 'react';
import { UserProfile } from '../../types';
import { saveUserProfile } from '../../services/storageService';

interface ProfileSectionProps {
  profile: UserProfile;
  onProfileUpdate: (profile: UserProfile) => void;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ profile, onProfileUpdate }) => {
  const [username, setUsername] = useState(profile.username);
  const [email, setEmail] = useState(profile.email);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    const updatedProfile = {
      ...profile,
      username,
      email
    };
    
    saveUserProfile(updatedProfile);
    onProfileUpdate(updatedProfile);
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
      
      {isEditing ? (
        <div className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Save
            </button>
            <button
              onClick={() => {
                setUsername(profile.username);
                setEmail(profile.email);
                setIsEditing(false);
              }}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="mb-4">
            <p className="text-sm text-gray-500 mb-1">Username</p>
            <p className="font-medium">{profile.username}</p>
          </div>
          
          <div className="mb-6">
            <p className="text-sm text-gray-500 mb-1">Email</p>
            <p className="font-medium">{profile.email}</p>
          </div>
          
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileSection;