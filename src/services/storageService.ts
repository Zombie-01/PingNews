import { UserProfile, NewsCategory } from '../types';

const USER_PROFILE_KEY = 'news-pwa-user-profile';

const DEFAULT_PROFILE: UserProfile = {
  username: 'User',
  email: 'user@example.com',
  balance: 1000,
  preferredCategories: ['technology', 'sports']
};

export const loadUserProfile = (): UserProfile => {
  try {
    const profileJson = localStorage.getItem(USER_PROFILE_KEY);
    if (!profileJson) {
      saveUserProfile(DEFAULT_PROFILE);
      return DEFAULT_PROFILE;
    }
    return JSON.parse(profileJson);
  } catch (error) {
    console.error('Error loading user profile:', error);
    return DEFAULT_PROFILE;
  }
};

export const saveUserProfile = (profile: UserProfile): void => {
  try {
    localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(profile));
  } catch (error) {
    console.error('Error saving user profile:', error);
  }
};

export const updateUsername = (username: string): UserProfile => {
  const profile = loadUserProfile();
  const updatedProfile = { ...profile, username };
  saveUserProfile(updatedProfile);
  return updatedProfile;
};

export const updateEmail = (email: string): UserProfile => {
  const profile = loadUserProfile();
  const updatedProfile = { ...profile, email };
  saveUserProfile(updatedProfile);
  return updatedProfile;
};

export const updatePreferredCategories = (categories: NewsCategory[]): UserProfile => {
  const profile = loadUserProfile();
  const updatedProfile = { ...profile, preferredCategories: categories };
  saveUserProfile(updatedProfile);
  return updatedProfile;
};