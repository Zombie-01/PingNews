import React from 'react';
import { NewsItem } from '../../types';
import { Clock } from 'lucide-react';

interface NewsCardProps {
  news: NewsItem;
}

const NewsCard: React.FC<NewsCardProps> = ({ news }) => {
  const description = news.body.length > 120 
    ? `${news.body.substring(0, 120)}...` 
    : news.body;

  // Use static values for year, day, and uuid
  const detailUrl = `/a/2024/06/525bb1d8-e8fa-4053-a6da-a5ba6cfe8a2a`;

  return (
    <div className="bg-white rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg border border-gray-100">
      <div className="relative">
        <a href={detailUrl}>
          <img 
            src={`https://source.unsplash.com/800x400/?${news.category}`}
            alt={news.title}
            className="w-full h-48 object-cover cursor-pointer"
          />
        </a>
        <div className="absolute top-4 left-4">
          <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full uppercase tracking-wide font-medium">
            {news.category}
          </span>
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex items-center space-x-2 mb-3 text-sm text-gray-500">
          <Clock className="w-4 h-4" />
          <span>1 hour ago</span>
        </div>
        
        <a href={detailUrl} className="block">
          <h3 className="text-xl font-semibold mb-2 line-clamp-2 text-gray-900 hover:underline cursor-pointer">
            {news.title}
          </h3>
        </a>
        
        <p className="text-gray-600 mb-4 line-clamp-2 text-sm">
          {description}
        </p>
        
        <div className="flex items-center justify-between">
          <a 
            href={detailUrl}
            className="text-blue-600 font-medium hover:text-blue-800 transition-colors text-sm flex items-center"
            aria-label="Read more"
          >
            Read more
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;