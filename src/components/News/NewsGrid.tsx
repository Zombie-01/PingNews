import React from 'react';
import NewsCard from './NewsCard';
import { NewsItem } from '../../types';

interface NewsGridProps {
  newsItems: NewsItem[];
  isLoading: boolean;
}

const NewsGrid: React.FC<NewsGridProps> = ({ newsItems, isLoading }) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="aspect-[16/9] bg-gray-200 rounded-2xl animate-pulse" />
        <div className="space-y-4">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="bg-white rounded-xl p-4 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-3" />
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
              <div className="h-4 bg-gray-200 rounded w-5/6" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (newsItems.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500 text-lg">No news articles found.</p>
      </div>
    );
  }

  const [featuredNews, ...otherNews] = newsItems;

  return (
    <div className="space-y-6">
      {/* Featured News */}
      <div className="relative aspect-[16/9] rounded-2xl overflow-hidden">
        <img 
          src={`https://source.unsplash.com/1200x800/?${featuredNews.category}`}
          alt={featuredNews.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex items-center space-x-2 mb-3">
            <img 
              src="https://api.dicebear.com/7.x/avatars/svg?seed=John"
              alt="Author"
              className="w-6 h-6 rounded-full"
            />
            <span className="text-white/80 text-sm">Wade Warren</span>
            <span className="text-white/60 text-sm">• Mar 10, 2024</span>
          </div>
          <h2 className="text-xl font-bold text-white mb-2">{featuredNews.title}</h2>
          <div className="inline-block px-3 py-1 bg-gray-900/50 backdrop-blur-sm rounded-full">
            <span className="text-white text-sm font-medium">{featuredNews.category}</span>
          </div>
        </div>
      </div>

      {/* Other News */}
      <div className="space-y-4">
        {otherNews.map(news => (
          <div
            key={news.id}
            className="flex gap-4 bg-white rounded-xl p-4 border border-gray-100 cursor-pointer hover:shadow"
            onClick={() => {
              window.location.href = '/a/2024/06/c419225e-cfdb-4dd4-85a8-baaca1daf423';
            }}
          >
            <img 
              src={`https://source.unsplash.com/200x200/?${news.category}`}
              alt={news.title}
              className="w-24 h-24 rounded-lg object-cover flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-medium text-gray-500">1 day ago</span>
                <span className="text-xs font-medium text-gray-500">• 4 min read</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">{news.title}</h3>
              <span className="inline-block px-2 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-700">
                {news.category}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsGrid;