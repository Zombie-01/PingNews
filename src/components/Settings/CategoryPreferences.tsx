import React, { useState } from 'react';
import { CATEGORIES, NewsCategory } from '../../types';

interface CategoryPreferencesProps {
  selectedCategories: NewsCategory[];
  onUpdate: (categories: NewsCategory[]) => void;
}

const CategoryPreferences: React.FC<CategoryPreferencesProps> = ({ 
  selectedCategories, 
  onUpdate 
}) => {
  const [categories, setCategories] = useState<NewsCategory[]>(selectedCategories);

  const toggleCategory = (category: NewsCategory) => {
    let newCategories: NewsCategory[];
    
    if (categories.includes(category)) {
      // Don't allow deselecting all categories
      if (categories.length === 1) {
        return;
      }
      newCategories = categories.filter(c => c !== category);
    } else {
      newCategories = [...categories, category];
    }
    
    setCategories(newCategories);
  };

  const handleSave = () => {
    onUpdate(categories);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">News Preferences</h2>
      <p className="text-gray-600 mb-4">Select categories you're interested in:</p>
      
      <div className="space-y-3 mb-6">
        {CATEGORIES.map(category => (
          <div key={category} className="flex items-center">
            <input
              type="checkbox"
              id={`category-${category}`}
              className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
              checked={categories.includes(category)}
              onChange={() => toggleCategory(category)}
            />
            <label 
              htmlFor={`category-${category}`}
              className="ml-3 text-gray-700 cursor-pointer"
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </label>
          </div>
        ))}
      </div>
      
      <button
        onClick={handleSave}
        className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        Save Preferences
      </button>
    </div>
  );
};

export default CategoryPreferences;