import React, { useState, useEffect } from 'react';
import { NewsItem, NewsCategory } from '../types';
import { fetchNewsByCategory } from '../services/newsService';
import { loadUserProfile } from '../services/storageService';
import NewsGrid from '../components/News/NewsGrid';
import CategorySelector from '../components/News/CategorySelector';
import InstallPrompt from '../components/UI/InstallPrompt';

const HomePage: React.FC = () => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<NewsCategory>('technology');
  
  useEffect(() => {
    const userProfile = loadUserProfile();
    if (userProfile.preferredCategories.length > 0) {
      setSelectedCategory(userProfile.preferredCategories[0] as NewsCategory);
    }
  }, []);
  
  useEffect(() => {
    const loadNews = async () => {
      setIsLoading(true);
      try {
        const news = await fetchNewsByCategory(selectedCategory);
        setNewsItems(news);
      } catch (error) {
        console.error('Error loading news:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadNews();
  }, [selectedCategory]);
  
  return (
    <div className="pt-16 pb-12">
      <div className="px-4">
        <div className="flex items-center space-x-4 overflow-x-auto py-3 scrollbar-hide">
          <CategorySelector 
            selectedCategory={selectedCategory}
            onSelect={setSelectedCategory}
          />
        </div>
        
        <NewsGrid 
          newsItems={newsItems}
          isLoading={isLoading}
        />
      </div>
      
      <InstallPrompt />
    </div>
  );
};

export default HomePage;