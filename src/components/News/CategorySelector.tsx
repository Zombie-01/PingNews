import React from 'react';
import { CATEGORIES, NewsCategory } from '../../types';

interface CategorySelectorProps {
  selectedCategory: NewsCategory;
  onSelect: (category: NewsCategory) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ selectedCategory, onSelect }) => {
  return (
    <>
      {CATEGORIES.map((category) => (
        <button
          key={category}
          onClick={() => onSelect(category)}
          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
            selectedCategory === category
              ? 'bg-gray-900 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </button>
      ))}
    </>
  );
};

export default CategorySelector;