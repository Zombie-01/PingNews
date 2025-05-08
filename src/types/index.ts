export interface NewsItem {
  id: number;
  title: string;
  body: string;
  category: string;
  userId: number;
}

export interface UserProfile {
  username: string;
  email: string;
  balance: number;
  preferredCategories: string[];
}

export type NewsCategory = 'technology' | 'politics' | 'sports' | 'business' | 'entertainment' | 'health' | 'science';

export const CATEGORIES: NewsCategory[] = [
  'technology',
  'politics',
  'sports',
  'business',
  'entertainment',
  'health',
  'science'
];